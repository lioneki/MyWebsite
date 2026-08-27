import { useEffect } from 'react'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Profile from './Profile.jsx'
import Work from './Work.jsx'
import Support from './Support.jsx'
import ContactFooter from './ContactFooter.jsx'

export default function App() {
  // 从别的页面跳过来带 #hash（比如 portfolio.html 点"打赏"跳到 index.html#support）时，
  // 浏览器在 React 渲染完内容之前就已经尝试过一次锚点定位，那时候目标元素还不存在，会定位失败。
  // 这里在挂载后再手动定位一次。
  useEffect(() => {
    if (!window.location.hash) return
    const el = document.querySelector(window.location.hash)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'auto' })
      })
    }
  }, [])

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Profile />
        <Work />
        <Support />
        <ContactFooter />
      </main>
    </>
  )
}
