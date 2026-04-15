function GlowText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-glow ${className}`}>
      {children}
    </span>
  )
}

export default GlowText
