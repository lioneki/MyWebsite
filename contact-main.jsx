import React from 'react'
import ReactDOM from 'react-dom/client'
import { LanguageProvider } from './LanguageContext.jsx'
import ContactPage from './ContactPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ContactPage />
    </LanguageProvider>
  </React.StrictMode>
)
