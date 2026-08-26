# 个人网站 v2

React + Vite，多页面（MPA）结构，轻度哥特 / 黑白 / 蓝灰极简风格，支持中 / EN 双语。

## 本地运行

```bash
npm install
npm run dev
```

打开终端提示的地址（默认 `http://localhost:5173`）。

打包：

```bash
npm run build
npm run preview
```

## 页面结构

三个独立 html 入口，对应三个真实页面（不是单页路由）：

- `index.html` — 首页：Hero / Profile（01 ABOUT · 02 CV 侧边栏切换）/ Work 预览 / Support / Contact 收尾
- `portfolio.html` — 完整作品集：主要作品 + 每日作品（从 2026.07 开始）
- `contact.html` — 项目咨询表单，通过 [FormSubmit](https://formsubmit.co) 直接转发到邮箱，不需要自建后端

## 文案与数据

- `content.js` — 所有中英文文案，`content.zh` / `content.en` 结构一一对应，改文案改这一个文件就够了
- `mainWorks` / `dailyWorks` — 作品集数据，替换成真实作品时改这里
- `social` — Instagram / YouTube / PayPal / Email 链接

## 语言切换

`LanguageContext.jsx` 提供全局语言状态，写入 `localStorage`（key: `site-lang`），三个页面独立加载但共享同一份存储，所以刷新、跳转页面语言都会保持。

## 邮件咨询表单说明（FormSubmit）

`contact.html` 的表单直接 POST 到 `https://formsubmit.co/lionekikun@gmail.com`，不需要任何后端或第三方账号注册。

**重要**：第一次有人真实提交表单后，FormSubmit 会给 `lionekikun@gmail.com` 发一封激活确认邮件，需要点一下确认链接，之后的消息才会正常送达收件箱。建议网站上线前自己先提交一次测试一下。

## 关于名字

我把 `content.js` 里的英文名暂时填成了 `LEON YI`（从你给的 PayPal 链接 `paypalme/LeonYi138` 猜的），中文名还是占位。如果不对，告诉我改成什么。

## 部署到 GitHub + 上线建议

1. **GitHub Desktop 上传**：在 `File > Add Local Repository` 里选中这个项目文件夹（或者先把整个文件夹挪到你说的 `E:\ProjectFile\MyWebsite`），发布为新仓库即可。记得 `node_modules` 已经在 `.gitignore` 里，不会被提交。
2. **托管选择**：
   - 免费、部署简单、对海外访客友好：Vercel / Netlify / Cloudflare Pages / GitHub Pages（连上 GitHub 仓库自动构建），都不需要 ICP 备案，几分钟能上线。
   - 但这几个平台的服务器都在境外，国内访问速度和稳定性不一定好，偶尔会慢或者抽风。
   - 如果目标观众主要在国内、需要稳定快速访问：得用境内云服务器/虚拟主机 + 域名，域名必须做 ICP 备案（通常一到两周，需要实名资料），成本和流程都比海外托管重不少。
   - 折中方案：先用免费的海外平台（比如 Vercel）挂着给作品集/海外机构和客户用，如果之后确实需要国内稳定访问，再单独走备案这条路，两边不冲突。

这部分我没法替你决定，需要看你网站主要给谁看、预算和时间。真要走备案流程的话，跟我说一声，我可以帮你理清楚要准备哪些材料。
