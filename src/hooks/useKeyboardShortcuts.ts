import { useEffect } from 'react'

interface KeyboardShortcutHandlers {
  onUndo: () => void
  onRedo: () => void
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect platform (Mac vs Windows/Linux)
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Cmd+Shift+Z / Ctrl+Shift+Z = Redo
      if (modifier && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        handlers.onRedo()
      }
      // Cmd+Z / Ctrl+Z = Undo
      else if (modifier && e.key === 'z') {
        e.preventDefault()
        handlers.onUndo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
