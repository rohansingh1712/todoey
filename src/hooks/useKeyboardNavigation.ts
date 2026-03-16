import { useState, useEffect, useCallback, RefObject } from 'react'

interface UseKeyboardNavigationProps {
  orderedTaskIds: string[]
  mainInputRef: RefObject<HTMLInputElement>
  onMoveTask: (id: string, direction: 'up' | 'down') => void
  onToggleTask: (id: string) => void
}

export function useKeyboardNavigation({
  orderedTaskIds,
  mainInputRef,
  onMoveTask,
  onToggleTask,
}: UseKeyboardNavigationProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  // Helper to check if we're in an input element
  const isInInputElement = useCallback(() => {
    const activeElement = document.activeElement
    return (
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement
    )
  }, [])

  // Navigate to next task
  const selectNext = useCallback(() => {
    if (orderedTaskIds.length === 0) return

    if (!selectedTaskId) {
      // No selection - select first task
      setSelectedTaskId(orderedTaskIds[0])
    } else {
      const currentIndex = orderedTaskIds.indexOf(selectedTaskId)
      if (currentIndex !== -1 && currentIndex < orderedTaskIds.length - 1) {
        setSelectedTaskId(orderedTaskIds[currentIndex + 1])
      }
    }
  }, [selectedTaskId, orderedTaskIds])

  // Navigate to previous task
  const selectPrevious = useCallback(() => {
    if (orderedTaskIds.length === 0) return

    if (!selectedTaskId) {
      // No selection - select last task
      setSelectedTaskId(orderedTaskIds[orderedTaskIds.length - 1])
    } else {
      const currentIndex = orderedTaskIds.indexOf(selectedTaskId)
      if (currentIndex > 0) {
        setSelectedTaskId(orderedTaskIds[currentIndex - 1])
      }
    }
  }, [selectedTaskId, orderedTaskIds])

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedTaskId(null)
  }, [])

  // Verify selected task still exists in the list
  useEffect(() => {
    if (selectedTaskId && !orderedTaskIds.includes(selectedTaskId)) {
      setSelectedTaskId(null)
    }
  }, [selectedTaskId, orderedTaskIds])

  // Global keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if in input element
      if (isInInputElement()) return

      // Spacebar - Focus main input and clear selection
      if (e.key === ' ') {
        e.preventDefault()
        clearSelection()
        mainInputRef.current?.focus()
        return
      }

      // Arrow Down - Navigate to next task
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectNext()
        return
      }

      // Arrow Up - Navigate to previous task
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectPrevious()
        return
      }

      // Shift+Enter - Toggle completion
      if (e.key === 'Enter' && e.shiftKey && selectedTaskId) {
        e.preventDefault()
        onToggleTask(selectedTaskId)
        return
      }

      // Cmd+ArrowUp - Move task up
      if (e.key === 'ArrowUp' && (e.metaKey || e.ctrlKey) && selectedTaskId) {
        e.preventDefault()
        onMoveTask(selectedTaskId, 'up')
        return
      }

      // Cmd+ArrowDown - Move task down
      if (e.key === 'ArrowDown' && (e.metaKey || e.ctrlKey) && selectedTaskId) {
        e.preventDefault()
        onMoveTask(selectedTaskId, 'down')
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isInInputElement,
    selectNext,
    selectPrevious,
    clearSelection,
    selectedTaskId,
    onMoveTask,
    onToggleTask,
    mainInputRef,
  ])

  return {
    selectedTaskId,
    clearSelection,
  }
}
