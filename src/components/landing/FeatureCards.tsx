const features = [
  {
    icon: '🤖',
    title: 'AI 智能解读',
    desc: '由 Claude AI 提供个性化塔罗解读，深入洞察每一张牌的含义与关联',
  },
  {
    icon: '🎴',
    title: '多种牌阵',
    desc: '单牌指引、三牌时序、凯尔特十字——不同深度的探索方式',
  },
  {
    icon: '📖',
    title: '历史回顾',
    desc: '保存每一次占卜，回顾命运的轨迹，看见成长的变化',
  },
]

function FeatureCards() {
  return (
    <div className="px-4 pb-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="text-center p-4">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-serif text-lg text-text-main mb-2">{f.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureCards
