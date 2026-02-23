import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
