import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </ErrorBoundary>,
);
