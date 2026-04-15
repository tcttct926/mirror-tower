import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  life: number
  maxLife: number
}

export function useParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement
    if (!canvas) return
    canvasRef.current = canvas

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = []
    const starCount = Math.min(250, Math.floor(window.innerWidth * window.innerHeight / 5000))

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }

    const shootingStars: ShootingStar[] = []

    function spawnShootingStar() {
      if (shootingStars.length >= 2) return
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      })
    }

    let frame = 0

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      frame++

      // Spawn shooting star occasionally
      if (frame % 200 === 0 && Math.random() < 0.4) {
        spawnShootingStar()
      }

      // Draw stars
      for (const star of stars) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset)
        const currentOpacity = star.opacity * (0.5 + 0.5 * twinkle)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 180, 255, ${currentOpacity})`
        ctx.fill()

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(167, 139, 250, ${currentOpacity * 0.2})`
          ctx.fill()
        }

        // Slow drift
        star.y -= star.speed
        if (star.y < -5) {
          star.y = canvas.height + 5
          star.x = Math.random() * canvas.width
        }
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i]
        ss.life++
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity = 1 - (ss.life / ss.maxLife)

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length
        const tailY = ss.y - Math.sin(ss.angle) * ss.length

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        gradient.addColorStop(0, `rgba(167, 139, 250, 0)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Head glow
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return canvasRef
}
