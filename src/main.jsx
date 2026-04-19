import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import SmoothScrollManager from './components/SmoothScrollManager.jsx'
import ThemeProvider from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <ThemeProvider>
      <SmoothScrollManager />
      <App />
    </ThemeProvider>
  </ErrorBoundary>,
)
