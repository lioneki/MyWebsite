import React from 'react'
import ReactDOM from 'react-dom/client'
import { LanguageProvider } from './LanguageContext.jsx'
import WorkDetailPage from './WorkDetailPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <WorkDetailPage />
    </LanguageProvider>
  </React.StrictMode>
)
