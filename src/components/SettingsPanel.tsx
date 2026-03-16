import { X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { AppSettings, CompletedBullet, Theme, AnimationSpeed } from '@/types/settings'

interface SettingsPanelProps {
  open: boolean
  onClose: () => void
  settings: AppSettings
  onSettingsChange: (settings: AppSettings) => void
}

export function SettingsPanel({
  open,
  onClose,
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  const updateSettings = (updates: Partial<AppSettings>) => {
    onSettingsChange({ ...settings, ...updates })
  }

  const updateCompletedStyle = (updates: Partial<AppSettings['completedStyle']>) => {
    onSettingsChange({
      ...settings,
      completedStyle: { ...settings.completedStyle, ...updates },
    })
  }

  if (!open) return null

  return (
    <>
      {/* Side Panel - force default theme */}
      <div
        className="fixed top-0 right-0 h-full w-80 border-l shadow-xl z-50 overflow-y-auto"
        style={{
          backgroundColor: 'hsl(0 0% 100%)',
          color: 'hsl(222.2 84% 4.9%)',
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="space-y-2">
                {[
                  { value: 'default', label: 'Default' },
                  { value: 'theme2', label: 'Theme 2' },
                  { value: 'theme3', label: 'Theme 3' },
                  { value: 'theme4', label: 'Theme 4' },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      checked={settings.theme === value}
                      onChange={() => updateSettings({ theme: value as Theme })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Animation Speed */}
            <div>
              <label className="text-sm font-medium mb-3 block">Animation Speed</label>
              <div className="space-y-2">
                {[
                  { value: 'smooth', label: 'Smooth' },
                  { value: 'snappy', label: 'Snappy' },
                  { value: 'instant', label: 'Instant' },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="animationSpeed"
                      checked={settings.animationSpeed === value}
                      onChange={() => updateSettings({ animationSpeed: value as AnimationSpeed })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Font Size: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="8"
                max="40"
                step="1"
                value={settings.fontSize}
                onChange={e => updateSettings({ fontSize: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>8px</span>
                <span>40px</span>
              </div>
            </div>

            {/* Line Spacing Slider */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Line Spacing: {settings.lineSpacing.toFixed(2)}rem
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.lineSpacing}
                onChange={e => updateSettings({ lineSpacing: parseFloat(e.target.value) })}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Touching</span>
                <span>Relaxed</span>
              </div>
            </div>

            {/* Completed Task Bullet */}
            <div>
              <label className="text-sm font-medium mb-3 block">Completed Task Bullet</label>
              <div className="space-y-2">
                {[
                  { value: 'asterisk', label: '*' },
                  { value: 'plus', label: '+' },
                  { value: 'dash', label: '-' },
                  { value: 'dot', label: '•' },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="completedBullet"
                      checked={settings.completedBullet === value}
                      onChange={() =>
                        updateSettings({ completedBullet: value as CompletedBullet })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Completed Task Style */}
            <div>
              <label className="text-sm font-medium mb-3 block">Completed Task Style</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={settings.completedStyle.strikethrough}
                    onCheckedChange={checked =>
                      updateCompletedStyle({ strikethrough: checked === true })
                    }
                  />
                  <span className="text-sm">Strikethrough</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={settings.completedStyle.italic}
                    onCheckedChange={checked =>
                      updateCompletedStyle({ italic: checked === true })
                    }
                  />
                  <span className="text-sm">Italic</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={settings.completedStyle.bold}
                    onCheckedChange={checked =>
                      updateCompletedStyle({ bold: checked === true })
                    }
                  />
                  <span className="text-sm">Bold</span>
                </label>

                {/* Opacity Slider */}
                <div className="pt-2">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Opacity: {Math.round(settings.completedStyle.opacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={settings.completedStyle.opacity}
                    onChange={e =>
                      updateCompletedStyle({ opacity: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>20%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
