import HeroSection from '../components/landing/HeroSection'
import SpreadSelector from '../components/landing/SpreadSelector'
import FeatureCards from '../components/landing/FeatureCards'

function HomePage() {
  return (
    <div className="slide-up">
      <HeroSection />
      <SpreadSelector />
      <FeatureCards />
    </div>
  )
}

export default HomePage
