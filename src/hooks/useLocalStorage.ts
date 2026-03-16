import { useEffect } from 'react'

/**
 * Saves value to localStorage whenever it changes
 */
export function useLocalStorage<T>(key: string, value: T) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [key, value])
}

/**
 * Reads value from localStorage with error handling
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return defaultValue
  }
}
