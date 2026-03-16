import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Settings, HelpCircle } from 'lucide-react'
import { useTasks } from './hooks/useTasks'
import { useUndoRedo } from './hooks/useUndoRedo'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'
import { useSettings } from './hooks/useSettings'
import { TodaySection } from './components/TodaySection'
import { PastDatesContainer } from './components/PastDatesContainer'
import { UndoToast } from './components/UndoToast'
import { SettingsPanel } from './components/SettingsPanel'
import { HelpPanel } from './components/HelpPanel'
import { applyTheme } from './utils/themeHelpers'

function App() {
  const {
    tasks,
    setTasks,
    todayTasks,
    pastTasksByDate,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setCompletionDate,
    moveTask,
    isLoaded,
  } = useTasks()

  const { saveSnapshot, undo, redo, canUndo, canRedo } = useUndoRedo(tasks, setTasks)
  const { settings, setSettings, isLoaded: isSettingsLoaded } = useSettings()
  const [toastMessage, setToastMessage] = useState<'Undone' | 'Redone' | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const mainInputRef = useRef<HTMLInputElement>(null)

  // Compute ordered task IDs for navigation
  const orderedTaskIds = useMemo(() => {
    const todayIds = todayTasks.map(t => t.id)
    const pastIds = Array.from(pastTasksByDate.entries())
      .flatMap(([, tasks]) => tasks.map(t => t.id))
    return [...todayIds, ...pastIds]
  }, [todayTasks, pastTasksByDate])

  // Wrapped CRUD actions that save snapshots
  const handleAddTask = useCallback(
    (text: string, date?: string) => {
      saveSnapshot(tasks)
      addTask(text, date)
    },
    [tasks, saveSnapshot, addTask]
  )

  const handleToggleTask = useCallback(
    (id: string) => {
      saveSnapshot(tasks)
      toggleTask(id)
    },
    [tasks, saveSnapshot, toggleTask]
  )

  const handleDeleteTask = useCallback(
    (id: string) => {
      saveSnapshot(tasks)
      deleteTask(id)
    },
    [tasks, saveSnapshot, deleteTask]
  )

  const handleMoveTask = useCallback(
    (id: string, direction: 'up' | 'down') => {
      saveSnapshot(tasks)
      moveTask(id, direction)
    },
    [tasks, saveSnapshot, moveTask]
  )

  const handleEditTask = useCallback(
    (id: string, text: string) => {
      saveSnapshot(tasks)
      editTask(id, text)
    },
    [tasks, saveSnapshot, editTask]
  )

  const handleSetCompletionDate = useCallback(
    (id: string, date: string | null) => {
      saveSnapshot(tasks)
      setCompletionDate(id, date)
    },
    [tasks, saveSnapshot, setCompletionDate]
  )

  // Undo/Redo handlers with toast
  const handleUndo = useCallback(() => {
    if (canUndo) {
      undo()
      setToastMessage('Undone')
    }
  }, [canUndo, undo])

  const handleRedo = useCallback(() => {
    if (canRedo) {
      redo()
      setToastMessage('Redone')
    }
  }, [canRedo, redo])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: handleUndo,
    onRedo: handleRedo,
  })

  // Keyboard navigation
  const { selectedTaskId } = useKeyboardNavigation({
    orderedTaskIds,
    mainInputRef,
    onMoveTask: handleMoveTask,
    onToggleTask: handleToggleTask,
  })

  // Apply theme when settings change
  useEffect(() => {
    if (isSettingsLoaded) {
      applyTheme(settings.theme)
    }
  }, [settings.theme, isSettingsLoaded])

  if (!isLoaded || !isSettingsLoaded) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header at top */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm z-10">
        <h1 className="text-sm font-medium text-muted-foreground">Done</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHelpOpen(true)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content with top padding to account for fixed header */}
      <div className="max-w-2xl mx-auto px-8 pt-20 pb-8">
        <TodaySection
          ref={mainInputRef}
          todayTasks={todayTasks}
          onAdd={handleAddTask}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onSetCompletionDate={handleSetCompletionDate}
          settings={settings}
          selectedTaskId={selectedTaskId}
        />

        <PastDatesContainer
          pastTasksByDate={pastTasksByDate}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onSetCompletionDate={handleSetCompletionDate}
          settings={settings}
          selectedTaskId={selectedTaskId}
        />
      </div>

      <UndoToast message={toastMessage} onDismiss={() => setToastMessage(null)} />

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <HelpPanel
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </div>
  )
}

export default App
