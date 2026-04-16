import SvgIcon from '../ui/SvgIcon'

const features = [
  {
    icon: 'scroll' as const,
    title: '深度解读',
    desc: '结合星座与牌面的个性化解读，深入洞察每一张牌的含义与关联',
  },
  {
    icon: 'cards-stack' as const,
    title: '多种牌阵',
    desc: '单牌指引、三牌时序、凯尔特十字、直觉选牌——不同深度的探索方式',
  },
  {
    icon: 'compass' as const,
    title: '星座洞察',
    desc: '根据你的星座特质，获得个性化的塔罗解读与命运指引',
  },
]

function FeatureCards() {
  return (
    <div className="px-4 pb-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="text-center p-4">
            <SvgIcon name={f.icon} size={28} className="mb-3 text-primary-glow" />
            <h3 className="font-serif text-lg text-text-main mb-2">{f.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureCards
