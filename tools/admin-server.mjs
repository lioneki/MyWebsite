import http from 'node:http'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IncomingForm } from 'formidable'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_FILE = path.join(ROOT, 'content.js')
const WORKS_DIR = path.join(ROOT, 'public', 'works')
const ADMIN_HTML = path.join(__dirname, 'admin.html')
const PORT = 5175

const CATEGORY_KEYS = ['video', 'static', 'game', 'music', 'painting']

function slugify(str) {
  const s = String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s
}

function jsString(str) {
  return (
    "'" +
    String(str || '')
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r?\n/g, ' ')
      .trim() +
    "'"
  )
}

async function nextId() {
  const text = await fsp.readFile(CONTENT_FILE, 'utf8')
  const ids = [...text.matchAll(/id:\s*'(\d+)'/g)].map((m) => parseInt(m[1], 10))
  const max = ids.length ? Math.max(...ids) : 0
  return String(max + 1).padStart(2, '0')
}

async function fileExists(p) {
  try {
    await fsp.access(p)
    return true
  } catch {
    return false
  }
}

async function uniqueBase(baseSlug) {
  await fsp.mkdir(WORKS_DIR, { recursive: true })
  let base = baseSlug || 'work'
  let n = 2
  while (await fileExists(path.join(WORKS_DIR, `${base}-web.jpg`))) {
    base = `${baseSlug || 'work'}-${n}`
    n += 1
  }
  return base
}

async function saveCompressed(srcPath, destName, maxWidth) {
  const dest = path.join(WORKS_DIR, destName)
  await sharp(srcPath).rotate().resize({ width: maxWidth, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(dest)
  return `/works/${destName}`
}

function buildEntryBlock(f) {
  const lines = ['  {']
  lines.push(`    id: '${f.id}',`)
  lines.push(`    year: ${jsString(f.year)},`)
  lines.push(`    type: '${f.type}',`)
  lines.push(`    titleZh: ${jsString(f.titleZh)},`)
  lines.push(`    titleEn: ${jsString(f.titleEn)},`)
  lines.push(`    categoryZh: ${jsString(f.categoryZh)},`)
  lines.push(`    categoryEn: ${jsString(f.categoryEn)},`)
  if (f.duration) lines.push(`    duration: ${jsString(f.duration)},`)
  if (f.image) lines.push(`    image: '${f.image}',`)
  if (f.images && f.images.length) {
    lines.push('    images: [')
    f.images.forEach((img) => lines.push(`      '${img}',`))
    lines.push('    ],')
  }
  if (f.descZh) lines.push(`    descZh: ${jsString(f.descZh)},`)
  if (f.descEn) lines.push(`    descEn: ${jsString(f.descEn)},`)
  lines.push('  },')
  return lines.join('\n')
}

async function insertEntry(entryBlock) {
  const text = await fsp.readFile(CONTENT_FILE, 'utf8')
  const anchor = '\n]\n\n// 每日作品'
  const idx = text.indexOf(anchor)
  if (idx === -1) throw new Error('在 content.js 中找不到 mainWorks 数组的结尾标记，写入失败，请检查文件是否被手动改动过')
  const insertPos = idx + 1 // 紧跟在最后一个 \n 之后，独占一行的 "]" 之前
  const newText = text.slice(0, insertPos) + entryBlock + '\n' + text.slice(insertPos)
  await fsp.writeFile(CONTENT_FILE, newText, 'utf8')
}

function send(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(obj))
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/admin' || req.url === '/index.html')) {
      const html = await fsp.readFile(ADMIN_HTML, 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(html)
      return
    }

    if (req.method === 'POST' && req.url === '/api/add-work') {
      const form = new IncomingForm({ multiples: true, keepExtensions: true })
      form.parse(req, async (err, fields, files) => {
        if (err) {
          send(res, 400, { ok: false, error: String(err.message || err) })
          return
        }
        try {
          const get = (v) => (Array.isArray(v) ? v[0] : v) || ''
          const titleZh = get(fields.titleZh).trim()
          const titleEn = get(fields.titleEn).trim()
          const categoryZh = get(fields.categoryZh).trim()
          const categoryEn = get(fields.categoryEn).trim()
          const type = get(fields.type).trim()
          const year = get(fields.year).trim()
          const duration = get(fields.duration).trim()
          const descZh = get(fields.descZh).trim()
          const descEn = get(fields.descEn).trim()

          if (!titleZh || !titleEn || !categoryZh || !categoryEn || !year || !CATEGORY_KEYS.includes(type)) {
            throw new Error('必填字段缺失，或类型不合法')
          }

          let coverFile = files.image
          if (Array.isArray(coverFile)) coverFile = coverFile[0]
          if (!coverFile || !coverFile.filepath) throw new Error('请上传封面图')

          const baseSlug = await uniqueBase(slugify(titleEn || titleZh))
          const image = await saveCompressed(coverFile.filepath, `${baseSlug}-web.jpg`, 1600)

          const images = []
          let galleryFiles = files.images
          if (galleryFiles) {
            if (!Array.isArray(galleryFiles)) galleryFiles = [galleryFiles]
            let i = 1
            for (const gf of galleryFiles) {
              if (!gf || !gf.filepath || !gf.size) continue
              const name = `${baseSlug}-${String(i).padStart(2, '0')}.jpg`
              images.push(await saveCompressed(gf.filepath, name, 2000))
              i += 1
            }
          }

          const id = await nextId()
          const entryBlock = buildEntryBlock({
            id,
            year,
            type,
            titleZh,
            titleEn,
            categoryZh,
            categoryEn,
            duration,
            image,
            images,
            descZh,
            descEn,
          })
          await insertEntry(entryBlock)

          send(res, 200, { ok: true, id, titleZh, titleEn, image, images })
        } catch (e2) {
          send(res, 400, { ok: false, error: String(e2.message || e2) })
        }
      })
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Server error: ' + (e.message || e))
  }
})

server.listen(PORT, () => {
  console.log(`\n添加作品的本地管理页面已启动：http://localhost:${PORT}\n`)
  console.log('填表提交后会自动压缩图片、存进 public/works，并把作品信息写入 content.js。')
  console.log('写完可以用 npm run dev 看效果，没问题再照常发布。按 Ctrl+C 结束。\n')
})
