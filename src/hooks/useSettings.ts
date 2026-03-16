import { useState, useEffect } from 'react'
import { AppSettings, DEFAULT_SETTINGS } from '@/types/settings'
import { getFromLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'done-settings'

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getFromLocalStorage<AppSettings | null>(STORAGE_KEY, null)
    if (stored) {
      setSettings({ ...DEFAULT_SETTINGS, ...stored })
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when settings change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
  }, [settings, isLoaded])

  return {
    settings,
    setSettings,
    isLoaded,
  }
}
