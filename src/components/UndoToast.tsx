import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface UndoToastProps {
  message: 'Undone' | 'Redone' | null
  onDismiss: () => void
}

export function UndoToast({ message, onDismiss }: UndoToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [message, onDismiss])

  if (!message) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 rounded-md shadow-lg',
        'animate-in',
        'text-sm font-medium'
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
