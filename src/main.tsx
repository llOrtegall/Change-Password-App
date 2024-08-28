import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_URL_API as string
axios.defaults.withCredentials = true

console.log(import.meta.env.VITE_URL_API);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
