import { useState } from 'react'
import { useReadingStore } from '../store/useReadingStore'
import Button from '../components/ui/Button'

function SettingsPage() {
  const apiKey = useReadingStore((s) => s.apiKey)
  const setApiKey = useReadingStore((s) => s.setApiKey)
  const [inputKey, setInputKey] = useState(apiKey || '')
  const [showKey, setShowKey] = useState(false)
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSave = () => {
    setApiKey(inputKey.trim() || null)
  }

  const handleTest = async () => {
    if (!inputKey.trim()) return

    setTestStatus('testing')
    setErrorMsg('')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': inputKey.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      })

      if (response.ok) {
        setTestStatus('success')
        setTimeout(() => setTestStatus('idle'), 3000)
      } else {
        const data = await response.json().catch(() => ({}))
        setErrorMsg(data.error?.message || `HTTP ${response.status}`)
        setTestStatus('error')
      }
    } catch (err) {
      setErrorMsg('网络请求失败')
      setTestStatus('error')
    }
  }

  const statusDot = () => {
    switch (testStatus) {
      case 'success': return <span className="w-2 h-2 rounded-full bg-green-500" />
      case 'error': return <span className="w-2 h-2 rounded-full bg-red-500" />
      case 'testing': return <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
      default: return apiKey ? <span className="w-2 h-2 rounded-full bg-green-500/50" /> : <span className="w-2 h-2 rounded-full bg-gray-500" />
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="font-serif text-2xl text-primary-glow mb-8 text-center">设置</h2>

      {/* API Key Section */}
      <div className="bg-surface/80 backdrop-blur-sm rounded-xl border border-primary/20 p-6">
        <div className="flex items-center gap-2 mb-4">
          {statusDot()}
          <h3 className="font-serif text-lg text-text-main">Anthropic API Key</h3>
        </div>

        <p className="text-text-muted text-sm mb-4 leading-relaxed">
          输入你的 Anthropic API Key 以启用 AI 解读功能。没有 Key 时，系统将使用本地模板引擎进行解读。
        </p>

        <div className="relative mb-4">
          <input
            type={showKey ? 'text' : 'password'}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full bg-background border border-primary/20 rounded-lg px-4 py-2.5
                       text-text-main placeholder:text-text-muted/40 text-sm
                       focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs hover:text-text-main"
          >
            {showKey ? '隐藏' : '显示'}
          </button>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" size="sm" onClick={handleSave}>
            保存
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTest}
            disabled={!inputKey.trim() || testStatus === 'testing'}
          >
            {testStatus === 'testing' ? '测试中...' : '测试连接'}
          </Button>
        </div>

        {errorMsg && (
          <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>
        )}

        <div className="mt-4 p-3 bg-background/50 rounded-lg">
          <p className="text-text-muted/60 text-xs leading-relaxed">
            ⚠️ 你的 API Key 仅存储在浏览器本地（localStorage），不会发送到除 Anthropic 以外的任何服务器。
            建议使用设置了消费限额的专用 Key。
          </p>
        </div>
      </div>

      {/* About */}
      <div className="mt-8 text-center text-text-muted/40 text-xs">
        <p>镜塔 · AI塔罗牌占卜</p>
        <p className="mt-1">78 张牌 · 3 种牌阵 · 无限可能</p>
      </div>
    </div>
  )
}

export default SettingsPage
