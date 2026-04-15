function CardBack() {
  return (
    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#2a1a4a] via-[#1a1a3e] to-[#0a1a2a]
                     border-2 border-primary/30 relative overflow-hidden card-shimmer">
      {/* Inner border */}
      <div className="absolute inset-2 rounded-lg border border-primary/20" />

      {/* Center symbol - eye/moon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer circle */}
          <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center">
            {/* Inner crescent */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/20
                             flex items-center justify-center shadow-lg shadow-primary/20">
              {/* Eye pupil */}
              <div className="w-4 h-4 rounded-full bg-primary/60 shadow-inner shadow-primary/50" />
            </div>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/30" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/30" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/30" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/30" />
    </div>
  )
}

export default CardBack
