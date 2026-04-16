import GlowText from '../ui/GlowText'
import SvgIcon from '../ui/SvgIcon'

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-12 px-4 text-center">
      <div className="mb-6">
        <SvgIcon name="crystal-ball" size={64} className="mb-4 opacity-80 text-primary-glow" />
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">
          <GlowText>镜塔</GlowText>
        </h1>
      </div>
      <p className="text-text-muted text-lg md:text-xl max-w-lg leading-relaxed mb-2">
        命运的镜像，由你解读
      </p>
      <p className="text-text-muted/60 text-sm max-w-md leading-relaxed">
        在星辰与直觉之间，聆听宇宙的低语
      </p>
    </div>
  )
}

export default HeroSection
