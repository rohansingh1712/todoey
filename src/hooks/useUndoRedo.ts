import { useState, useCallback, useRef, useEffect } from 'react'

const MAX_HISTORY = 10

export function useUndoRedo<T>(
  value: T,
  setValue: (value: T) => void
) {
  const [history, setHistory] = useState<T[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const isUndoRedoRef = useRef(false)

  // Save snapshot before mutation
  const saveSnapshot = useCallback((snapshotValue: T) => {
    setHistory(prev => {
      // Remove any future history if we're not at the end
      const trimmed = prev.slice(0, currentIndex + 1)

      // Add new snapshot
      const newHistory = [...trimmed, snapshotValue]

      // Keep only last MAX_HISTORY items
      if (newHistory.length > MAX_HISTORY) {
        return newHistory.slice(newHistory.length - MAX_HISTORY)
      }

      return newHistory
    })

    setCurrentIndex(prev => {
      const newIndex = prev + 1
      return newIndex >= MAX_HISTORY ? MAX_HISTORY - 1 : newIndex
    })
  }, [currentIndex])

  // Undo
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoRef.current = true
      const previousValue = history[currentIndex - 1]
      setValue(previousValue)
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex, history, setValue])

  // Redo
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoRef.current = true
      const nextValue = history[currentIndex + 1]
      setValue(nextValue)
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, history, setValue])

  // Reset flag after setValue completes
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false
    }
  }, [value])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    saveSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
    isUndoRedo: isUndoRedoRef.current,
  }
}
