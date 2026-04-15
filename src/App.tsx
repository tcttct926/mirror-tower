import { Routes, Route } from 'react-router-dom'
import PageWrapper from './components/layout/PageWrapper'
import HomePage from './pages/HomePage'
import ReadingPage from './pages/ReadingPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </PageWrapper>
  )
}

export default App
