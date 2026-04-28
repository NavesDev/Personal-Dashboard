import { useState, useEffect } from 'react'
import { X, Palette, Key } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useStorage } from '@/hooks/useStorage'
import type { ApiKeys } from '@/types/settings'
import { defaultApiKeys } from '@/types/settings'

interface SettingsProps {
  open: boolean
  onClose: () => void
}

export default function Settings({ open, onClose }: SettingsProps) {
  const { theme, setThemeId, allThemes } = useTheme()
  const [apiKeys, setApiKeys] = useStorage<ApiKeys>('dashboard_api_keys', defaultApiKeys)
  const [localKeys, setLocalKeys] = useState<ApiKeys>(defaultApiKeys)
  const [tab, setTab] = useState<'theme' | 'api'>('theme')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setLocalKeys(apiKeys)
  }, [apiKeys])

  const handleSaveKeys = () => {
    setApiKeys(localKeys)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="settings-modal">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--t-border)]
                    bg-[var(--t-bg)] shadow-2xl overflow-hidden animate-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--t-border)]">
          <h2 className="text-base font-semibold text-[var(--t-text)]">Configurações</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--t-text-muted)] hover:text-[var(--t-text)]
                       hover:bg-[var(--t-card-hover)] transition-colors"
            aria-label="Fechar configurações"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--t-border)]">
          <button
            onClick={() => setTab('theme')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium
                        transition-colors border-b-2 ${
                          tab === 'theme'
                            ? 'border-[var(--t-accent)] text-[var(--t-accent)]'
                            : 'border-transparent text-[var(--t-text-muted)] hover:text-[var(--t-text)]'
                        }`}
          >
            <Palette size={15} /> Temas
          </button>
          <button
            onClick={() => setTab('api')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium
                        transition-colors border-b-2 ${
                          tab === 'api'
                            ? 'border-[var(--t-accent)] text-[var(--t-accent)]'
                            : 'border-transparent text-[var(--t-text-muted)] hover:text-[var(--t-text)]'
                        }`}
          >
            <Key size={15} /> Chaves de API
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-auto">
          {tab === 'theme' ? (
            <div className="grid grid-cols-3 gap-3">
              {allThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  data-testid={`theme-${t.id}`}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200
                              text-left hover:scale-[1.02] ${
                                theme.id === t.id
                                  ? 'border-[var(--t-accent)] ring-1 ring-[var(--t-accent)]'
                                  : 'border-[var(--t-border)] hover:border-[var(--t-border-hover)]'
                              }`}
                >
                  {/* Theme preview */}
                  <div
                    className="w-full h-12 rounded-lg mb-2 border border-black/10 flex items-end p-1.5 gap-1"
                    style={{ backgroundColor: t.colors['--t-bg'] }}
                  >
                    <div
                      className="w-4 h-3 rounded-sm"
                      style={{ backgroundColor: t.colors['--t-card'] }}
                    />
                    <div
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: t.colors['--t-accent'] }}
                    />
                    <div
                      className="w-4 h-2.5 rounded-sm"
                      style={{ backgroundColor: t.colors['--t-border'] }}
                    />
                  </div>
                  <p className="text-xs font-medium text-[var(--t-text)]">
                    {t.emoji} {t.name}
                  </p>
                  <p className="text-[10px] text-[var(--t-text-muted)] capitalize mt-0.5">
                    {t.mode === 'dark' ? 'Escuro' : 'Claro'}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[var(--t-text-muted)] mb-4">
                Configure suas chaves de API para conectar os widgets aos serviços reais.
              </p>
              {(
                [
                  { key: 'gmail' as const, label: 'Gmail API Key', placeholder: 'AIza...' },
                  { key: 'news' as const, label: 'News API Key', placeholder: 'Sua chave da News API' },
                  { key: 'finance' as const, label: 'Finance API Key', placeholder: 'Sua chave de finanças' },
                  { key: 'calendar' as const, label: 'Calendar API Key', placeholder: 'AIza...' },
                ] as const
              ).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-[var(--t-text-secondary)] mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    value={localKeys[field.key]}
                    onChange={(e) =>
                      setLocalKeys((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm
                               bg-[var(--t-input)] border border-[var(--t-input-border)]
                               text-[var(--t-text)] placeholder:text-[var(--t-text-muted)]
                               outline-none focus:border-[var(--t-border-hover)]
                               transition-colors"
                  />
                </div>
              ))}
              <button
                onClick={handleSaveKeys}
                className="w-full py-2.5 rounded-lg text-sm font-medium
                           bg-[var(--t-accent)] text-[var(--t-accent-text)]
                           hover:bg-[var(--t-accent-hover)] transition-colors"
              >
                {saved ? '✓ Salvo!' : 'Salvar chaves'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
