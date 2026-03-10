import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import SmoothScrollManager from './components/SmoothScrollManager.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <SmoothScrollManager />
    <App />
  </ErrorBoundary>,
)
