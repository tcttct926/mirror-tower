import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReadingStore } from '../store/useReadingStore'
import { getZodiacNameZh, getZodiacSymbol, getZodiacSign } from '../utils/zodiac'
import { solarToLunar, formatLunarDate } from '../utils/lunarCalendar'
import SvgIcon from '../components/ui/SvgIcon'

function SettingsPage() {
  const navigate = useNavigate()
  const currentUser = useReadingStore((s) => s.currentUser)
  const updateProfile = useReadingStore((s) => s.updateProfile)
  const logoutUser = useReadingStore((s) => s.logoutUser)

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(currentUser?.name || '')
  const [editBirthDate, setEditBirthDate] = useState(currentUser?.birthDate || '')
  const [editGender, setEditGender] = useState(currentUser?.gender || 'other')

  const editPreview = useMemo(() => {
    if (!editBirthDate) return null
    const [year, month, day] = editBirthDate.split('-').map(Number)
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
  }, [editBirthDate])

  if (!currentUser) {
    navigate('/login')
    return null
  }

  const zodiacName = getZodiacNameZh(currentUser.zodiacSign)
  const zodiacSymbol = getZodiacSymbol(currentUser.zodiacSign)
  const maskedPhone = currentUser.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

  const handleSave = () => {
    updateProfile({ name: editName.trim(), gender: editGender, birthDate: editBirthDate })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="font-serif text-2xl text-primary-glow mb-8 text-center">我的</h2>

      <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-primary/20 p-6">
        {/* Zodiac badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-lg">{zodiacSymbol}</span>
            <span className="text-primary-glow font-serif">{zodiacName}</span>
          </div>
        </div>

        {/* User info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">姓名</span>
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-background border border-primary/20 rounded px-3 py-1 text-sm text-text-main
                           focus:outline-none focus:border-primary/50 w-40 text-right"
              />
            ) : (
              <span className="text-text-main text-sm">{currentUser.name}</span>
            )}
          </div>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">星座</span>
            <span className="text-primary-glow text-sm">
              {isEditing && editPreview ? editPreview.zodiacName : zodiacName}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">公历生日</span>
            {isEditing ? (
              <input
                type="date"
                value={editBirthDate}
                onChange={(e) => setEditBirthDate(e.target.value)}
                className="bg-background border border-primary/20 rounded px-3 py-1 text-sm text-text-main
                           focus:outline-none focus:border-primary/50 text-right"
              />
            ) : (
              <span className="text-text-main text-sm">{currentUser.birthDate}</span>
            )}
          </div>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">农历生日</span>
            <span className="text-text-main text-sm">
              {isEditing && editPreview ? editPreview.lunarStr : currentUser.birthDateLunar}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">性别</span>
            {isEditing ? (
              <div className="flex gap-2">
                {([
                  { value: 'male' as const, label: '男' },
                  { value: 'female' as const, label: '女' },
                  { value: 'other' as const, label: '其他' },
                ]).map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setEditGender(g.value)}
                    className={`px-3 py-1 rounded text-xs transition-colors ${
                      editGender === g.value
                        ? 'bg-primary/10 text-primary-glow border border-primary/30'
                        : 'text-text-muted border border-primary/10'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-text-main text-sm">
                {currentUser.gender === 'male' ? '男' : currentUser.gender === 'female' ? '女' : '其他'}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-text-muted text-sm">手机号</span>
            <span className="text-text-main text-sm">{maskedPhone}</span>
          </div>
        </div>

        {/* Edit / Save buttons */}
        <div className="mt-6 flex justify-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-primary hover:bg-primary-glow
                           text-white text-sm transition-colors"
              >
                <SvgIcon name="check" size={16} />
                保存
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditName(currentUser.name)
                  setEditBirthDate(currentUser.birthDate)
                  setEditGender(currentUser.gender)
                }}
                className="px-5 py-2 rounded-lg border border-primary/20 text-text-muted text-sm
                           hover:border-primary/40 transition-colors"
              >
                取消
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg border border-primary/20
                         text-text-muted text-sm hover:border-primary/40 transition-colors"
            >
              <SvgIcon name="edit" size={16} />
              编辑
            </button>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 mx-auto px-5 py-2 rounded-lg
                     text-text-muted/60 text-sm hover:text-red-400 transition-colors"
        >
          <SvgIcon name="log-out" size={16} />
          退出登录
        </button>
      </div>

      {/* About */}
      <div className="mt-8 text-center text-text-muted/40 text-xs">
        <p>镜塔 · 塔罗牌占卜</p>
        <p className="mt-1">78 张牌 · 4 种牌阵 · 无限可能</p>
      </div>
    </div>
  )
}

export default SettingsPage
