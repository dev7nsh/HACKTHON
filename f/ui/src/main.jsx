import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Whatwedo from './pages/Whatwedo.jsx'
import GoogleSearchBoxDemo from './component/Searchbarui'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Whatwedo /> */}
    {/* <GoogleSearchBoxDemo /> */}

  </StrictMode>,
)
