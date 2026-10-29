import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silenciar errores inofensivos de WebSocket HMR en el entorno iframe de AI Studio
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason?.message?.includes?.('WebSocket') ||
      event.reason?.message?.includes?.('failed to connect')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
