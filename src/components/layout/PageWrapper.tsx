import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useParticleBackground } from '../../hooks/useParticleBackground'

interface PageWrapperProps {
  children: ReactNode
}

function PageWrapper({ children }: PageWrapperProps) {
  useParticleBackground()

  return (
    <div className="relative min-h-screen">
      <canvas id="particle-canvas" className="fixed inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default PageWrapper
