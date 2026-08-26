import React from 'react'
import ReactDOM from 'react-dom/client'
import { LanguageProvider } from './LanguageContext.jsx'
import PortfolioPage from './PortfolioPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <PortfolioPage />
    </LanguageProvider>
  </React.StrictMode>
)
