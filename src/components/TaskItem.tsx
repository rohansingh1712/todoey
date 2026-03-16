import { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Calendar } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Task } from '@/types/task'
import { AppSettings } from '@/types/settings'
import { cn } from '@/lib/utils'
import { parseDate, parseTaskInput } from '@/utils/dateHelpers'

interface TaskItemProps {
  task: Task
  context: 'today' | 'past'
  onToggle?: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onSetCompletionDate?: (id: string, date: string | null) => void
  settings: AppSettings
  isSelected?: boolean
}

export function TaskItem({
  task,
  context: _context,
  onToggle,
  onDelete,
  onEdit,
  onSetCompletionDate,
  settings,
  isSelected = false,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.text)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const [isAnimatingCompletion, setIsAnimatingCompletion] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (isEditingDate && dateInputRef.current) {
      dateInputRef.current.focus()
      dateInputRef.current.select()
    }
  }, [isEditingDate])

  // Cleanup completion timer on unmount
  useEffect(() => {
    return () => {
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current)
      }
    }
  }, [])

  // Handle Enter key to enter edit mode when selected
  useEffect(() => {
    if (!isSelected) return

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setIsEditing(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSelected])

  // Handle toggle with completion animation delay
  const handleToggleClick = () => {
    if (!onToggle) return

    // If already animating, ignore
    if (isAnimatingCompletion) return

    // For completing tasks (not uncompleting), add delay
    if (!task.completed) {
      setIsAnimatingCompletion(true)

      // Delay the actual toggle to create visual feedback
      completionTimerRef.current = setTimeout(() => {
        onToggle(task.id)
        setIsAnimatingCompletion(false)
      }, 300) // 300ms delay
    } else {
      // Uncompleting is instant (no delay needed)
      onToggle(task.id)
    }
  }

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editValue.trim()) {
      const { text, date } = parseTaskInput(editValue.trim())
      if (text) {
        onEdit(task.id, text)
        // If a date was provided, update the completion date
        if (date && onSetCompletionDate) {
          onSetCompletionDate(task.id, date)
        }
      }
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setEditValue(task.text)
      setIsEditing(false)
    }
  }

  const handleEditBlur = () => {
    if (editValue.trim() && editValue !== task.text) {
      const { text, date } = parseTaskInput(editValue.trim())
      if (text) {
        onEdit(task.id, text)
        // If a date was provided, update the completion date
        if (date && onSetCompletionDate) {
          onSetCompletionDate(task.id, date)
        }
      }
    } else {
      setEditValue(task.text)
    }
    setIsEditing(false)
  }

  const handleDateKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsedDate = parseDate(dateValue)
      if (parsedDate && onSetCompletionDate) {
        onSetCompletionDate(task.id, parsedDate)
      }
      setIsEditingDate(false)
      setDateValue('')
    } else if (e.key === 'Escape') {
      setIsEditingDate(false)
      setDateValue('')
    }
  }

  const handleDateBlur = () => {
    setIsEditingDate(false)
    setDateValue('')
  }

  const handleCalendarClick = () => {
    // Pre-fill with existing completion date if any
    if (task.completedDate) {
      const date = new Date(task.completedDate + 'T00:00:00')
      const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      setDateValue(formatted)
    }
    setIsEditingDate(true)
  }

  // Render bullet based on completion state and settings
  const renderBullet = () => {
    // Incomplete tasks always use checkbox
    if (!task.completed) {
      return onToggle ? (
        <Checkbox
          checked={isAnimatingCompletion}
          onCheckedChange={handleToggleClick}
          className="flex-shrink-0"
          aria-label="Mark task as complete"
        />
      ) : null
    }

    // Completed tasks use the configured bullet character (clickable to unmark)
    const bulletChars = {
      asterisk: '*',
      plus: '+',
      dash: '-',
      dot: '•',
    }

    return onToggle ? (
      <button
        onClick={(e) => {
          e.stopPropagation() // Prevent row click from triggering edit
          handleToggleClick()
        }}
        className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Mark task as incomplete"
      >
        {bulletChars[settings.completedBullet]}
      </button>
    ) : (
      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground">
        {bulletChars[settings.completedBullet]}
      </span>
    )
  }

  // Apply completed task styles
  const completedClasses = cn(
    'transition-colors',
    task.completed && {
      'line-through': settings.completedStyle.strikethrough,
      italic: settings.completedStyle.italic,
      'font-bold': settings.completedStyle.bold,
    }
  )

  // Apply font size and opacity to tasks
  const customStyles = {
    fontSize: `${settings.fontSize}px`,
    opacity: task.completed ? settings.completedStyle.opacity : 1,
  }

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger edit if clicking on buttons or checkbox
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('[role="checkbox"]') ||
      target.closest('input')
    ) {
      return
    }
    setIsEditing(true)
  }

  // Animation configurations
  const animationConfig = {
    smooth: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        layout: { duration: 0.2, ease: "linear" as const },
        opacity: { duration: 0.15 }
      }
    },
    snappy: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        layout: { duration: 0.08, ease: "linear" as const },
        opacity: { duration: 0.06 }
      }
    },
    instant: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        layout: { duration: 0 },
        opacity: { duration: 0.02 }
      }
    }
  }

  const animation = animationConfig[settings.animationSpeed]

  return (
    <motion.div
      layout
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      className={cn(
        "group flex items-center gap-3 px-1 rounded-md transition-all cursor-pointer",
        isSelected
          ? "bg-accent ring-1 ring-accent-foreground/20"
          : "hover:bg-muted/50"
      )}
      style={{ paddingTop: `${settings.lineSpacing}rem`, paddingBottom: `${settings.lineSpacing}rem` }}
      onClick={handleRowClick}
    >
      {/* Bullet (checkbox or custom) */}
      {renderBullet()}

      {/* Task text or edit input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="relative">
            <Input
              ref={inputRef}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditBlur}
              className="py-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 relative"
              style={{
                fontSize: `${settings.fontSize}px`,
                height: 'auto',
                minHeight: '1.75rem',
                borderWidth: '0.5px',
                color: 'transparent',
                caretColor: 'hsl(var(--foreground))',
              }}
            />
            {/* Colored overlay for @date syntax */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center px-2 whitespace-pre overflow-hidden"
              style={{
                fontSize: `${settings.fontSize}px`,
              }}
              aria-hidden="true"
            >
              {editValue.split(/(@[\d\/]*)/g).map((part, i) =>
                part.startsWith('@') ? (
                  <span key={i} style={{ color: '#3b82f6' }}>
                    {part}
                  </span>
                ) : (
                  <span key={i} style={{ color: 'hsl(var(--foreground))' }}>
                    {part}
                  </span>
                )
              )}
            </div>
          </div>
        ) : (
          <span className={completedClasses} style={customStyles}>
            {task.text}
          </span>
        )}
      </div>

      {/* Calendar button/input (hover reveal) */}
      {onSetCompletionDate && (
        isEditingDate ? (
          <Input
            ref={dateInputRef}
            value={dateValue}
            onChange={e => setDateValue(e.target.value)}
            onKeyDown={handleDateKeyDown}
            onBlur={handleDateBlur}
            placeholder="MM/DD"
            className="w-24 py-0 px-2"
            style={{ fontSize: `${settings.fontSize}px`, height: 'auto', minHeight: '1.75rem' }}
          />
        ) : (
          <button
            onClick={handleCalendarClick}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            aria-label="Edit completion date"
          >
            <Calendar className="w-4 h-4" />
          </button>
        )
      )}

      {/* Delete button (hover reveal) */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
