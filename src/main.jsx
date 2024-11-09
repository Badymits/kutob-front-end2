import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { GameProvider } from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <GameProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GameProvider>
)
