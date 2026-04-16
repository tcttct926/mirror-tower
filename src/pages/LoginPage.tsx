import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useReadingStore } from '../store/useReadingStore'
import SvgIcon from '../components/ui/SvgIcon'

function LoginPage() {
  const navigate = useNavigate()
  const loginUser = useReadingStore((s) => s.loginUser)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone.trim() || !password) {
      setError('请填写手机号和密码')
      return
    }

    const success = loginUser(phone.trim(), password)
    if (success) {
      navigate('/')
    } else {
      setError('手机号或密码错误')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <SvgIcon name="crystal-ball" size={48} className="mb-4 text-primary-glow" />
          <h2 className="font-serif text-2xl text-primary-glow">欢迎回来</h2>
          <p className="text-text-muted text-sm mt-2">登录镜塔，继续探索命运</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-muted text-sm mb-1.5">手机号</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号"
              className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                         text-text-main placeholder:text-text-muted/40 text-sm
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                         text-text-main placeholder:text-text-muted/40 text-sm
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-glow
                       text-white font-serif text-base transition-colors duration-200"
          >
            登录
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          还没有账号？
          <Link to="/register" className="text-primary-glow hover:underline ml-1">
            注册
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
