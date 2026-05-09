import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { RoutesApp } from './hooks/routes'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RoutesApp/>
    </BrowserRouter>
  </StrictMode>,
)
