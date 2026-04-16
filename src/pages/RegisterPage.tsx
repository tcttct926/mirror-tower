import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useReadingStore } from '../store/useReadingStore'
import { getZodiacSign, getZodiacNameZh } from '../utils/zodiac'
import { solarToLunar, formatLunarDate } from '../utils/lunarCalendar'
import SvgIcon from '../components/ui/SvgIcon'

function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useReadingStore((s) => s.registerUser)
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('other')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const lunarInfo = useMemo(() => {
    if (!birthDate) return null
    const [year, month, day] = birthDate.split('-').map(Number)
    if (!year || !month || !day) return null
    try {
      const lunar = solarToLunar(year, month, day)
      const zodiacSign = getZodiacSign(month, day)
      return {
        lunarStr: formatLunarDate(lunar),
        zodiacName: getZodiacNameZh(zodiacSign),
      }
    } catch {
      return null
    }
  }, [birthDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError('请输入姓名'); return }
    if (!birthDate) { setError('请选择出生日期'); return }
    if (!phone.trim()) { setError('请输入手机号'); return }
    if (phone.trim().length < 11) { setError('请输入有效的手机号'); return }
    if (!password) { setError('请设置密码'); return }
    if (password.length < 6) { setError('密码至少6位'); return }
    if (password !== confirmPassword) { setError('两次密码不一致'); return }

    const success = registerUser({
      name: name.trim(),
      birthDate,
      gender,
      phone: phone.trim(),
      password,
    })

    if (success) {
      navigate('/')
    } else {
      setError('该手机号已注册')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <SvgIcon name="crystal-ball" size={48} className="mb-4 text-primary-glow" />
          <h2 className="font-serif text-2xl text-primary-glow">创建账号</h2>
          <p className="text-text-muted text-sm mt-2">开启你的塔罗之旅</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-muted text-sm mb-1.5">姓名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入姓名"
              className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                         text-text-main placeholder:text-text-muted/40 text-sm
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">出生日期</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                         text-text-main text-sm
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
            {lunarInfo && (
              <p className="mt-1.5 text-xs text-primary-glow/70">
                农历 {lunarInfo.lunarStr} · {lunarInfo.zodiacName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">性别</label>
            <div className="flex gap-3">
              {([
                { value: 'male' as const, label: '男' },
                { value: 'female' as const, label: '女' },
                { value: 'other' as const, label: '其他' },
              ]).map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGender(g.value)}
                  className={`flex-1 py-2 rounded-lg text-sm transition-colors border ${
                    gender === g.value
                      ? 'border-primary/50 bg-primary/10 text-primary-glow'
                      : 'border-primary/20 text-text-muted hover:border-primary/30'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

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
              placeholder="至少6位"
              className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                         text-text-main placeholder:text-text-muted/40 text-sm
                         focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-text-muted text-sm mb-1.5">确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="再次输入密码"
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
            注册
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          已有账号？
          <Link to="/login" className="text-primary-glow hover:underline ml-1">
            登录
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
