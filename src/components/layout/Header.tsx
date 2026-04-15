import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/history', label: '历史' },
    { path: '/settings', label: '设置' },
  ]

  return (
    <header className="border-b border-primary/20 backdrop-blur-sm bg-background/80">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl text-glow text-primary-glow">
          镜塔
        </Link>
        <nav className="flex gap-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? 'text-primary-glow'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
