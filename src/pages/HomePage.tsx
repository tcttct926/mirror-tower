import { Navigate } from 'react-router-dom'
import { useReadingStore } from '../store/useReadingStore'
import HeroSection from '../components/landing/HeroSection'
import SpreadSelector from '../components/landing/SpreadSelector'
import FeatureCards from '../components/landing/FeatureCards'

function HomePage() {
  const currentUser = useReadingStore((s) => s.currentUser)

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="slide-up">
      <HeroSection />
      <SpreadSelector />
      <FeatureCards />
    </div>
  )
}

export default HomePage
