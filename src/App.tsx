import { Routes, Route } from 'react-router-dom'
import PageWrapper from './components/layout/PageWrapper'
import HomePage from './pages/HomePage'
import ReadingPage from './pages/ReadingPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </PageWrapper>
  )
}

export default App
