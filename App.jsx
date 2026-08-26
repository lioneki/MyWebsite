import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Profile from './Profile.jsx'
import Work from './Work.jsx'
import Support from './Support.jsx'
import ContactFooter from './ContactFooter.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Profile />
        <Work />
        <Support />
        <ContactFooter />
      </main>
    </>
  )
}
