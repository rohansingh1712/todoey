import { useState, KeyboardEvent, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Calendar } from 'lucide-react'
import { Task } from '@/types/task'
import { AppSettings } from '@/types/settings'
import { Input } from '@/components/ui/input'
import { TaskList } from './TaskList'
import { parseTaskInput, parseDate } from '@/utils/dateHelpers'

interface TodaySectionProps {
  todayTasks: Task[]
  onAdd: (text: string, date?: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onSetCompletionDate?: (id: string, date: string | null) => void
  settings: AppSettings
  selectedTaskId?: string | null
}

export const TodaySection = forwardRef<HTMLInputElement, TodaySectionProps>(
  (
    {
      todayTasks,
      onAdd,
      onToggle,
      onDelete,
      onEdit,
      onSetCompletionDate,
      settings,
      selectedTaskId,
    },
    ref
  ) => {
  const [value, setValue] = useState('')
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)

  // Forward ref to parent
  useImperativeHandle(ref, () => inputRef.current!)

  useEffect(() => {
    if (isEditingDate && dateInputRef.current) {
      dateInputRef.current.focus()
      dateInputRef.current.select()
    }
  }, [isEditingDate])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      const { text, date } = parseTaskInput(value.trim())
      if (text) {
        onAdd(text, date || undefined)
        setValue('')
      }
    } else if (e.key === 'Escape') {
      // Clear value and blur to enable keyboard navigation
      setValue('')
      inputRef.current?.blur()
    }
  }

  const handleDateKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parsedDate = parseDate(dateValue)
      if (parsedDate) {
        // Insert @date into the main input
        const date = new Date(parsedDate + 'T00:00:00')
        const formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        setValue(prev => `${prev} @${formatted}`.trim())
        setIsEditingDate(false)
        setDateValue('')
        inputRef.current?.focus()
      }
    } else if (e.key === 'Escape') {
      setIsEditingDate(false)
      setDateValue('')
      inputRef.current?.focus()
    }
  }

  const handleDateBlur = () => {
    setIsEditingDate(false)
    setDateValue('')
  }

  const handleCalendarClick = () => {
    setIsEditingDate(true)
  }

  return (
    <div className="mb-8">
      <div className="mb-6 flex gap-2">
        <div className="flex-1 relative">
          {/* Actual input - always visible for interaction */}
          <Input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder=""
            autoFocus
            className="relative focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              fontSize: `${settings.fontSize}px`,
              color: 'transparent',
              caretColor: 'hsl(var(--foreground))',
              borderWidth: '0.5px',
            }}
            aria-label="Add a task"
          />
          {/* Colored overlay - on top, matches input position */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center px-3 py-2 whitespace-pre overflow-hidden"
            style={{
              fontSize: `${settings.fontSize}px`,
            }}
            aria-hidden="true"
          >
            {value ? (
              value.split(/(@[\d\/]*)/g).map((part, i) =>
                part.startsWith('@') ? (
                  <span key={i} style={{ color: '#3b82f6' }}>
                    {part}
                  </span>
                ) : (
                  <span key={i} style={{ color: 'hsl(var(--foreground))' }}>
                    {part}
                  </span>
                )
              )
            ) : (
              <span className="text-muted-foreground">Write right here...</span>
            )}
          </div>
        </div>
        {isEditingDate ? (
          <Input
            ref={dateInputRef}
            value={dateValue}
            onChange={e => setDateValue(e.target.value)}
            onKeyDown={handleDateKeyDown}
            onBlur={handleDateBlur}
            placeholder="MM/DD"
            className="h-10 w-32 py-0 px-2"
            style={{ fontSize: `${settings.fontSize}px` }}
          />
        ) : (
          <button
            onClick={handleCalendarClick}
            className="flex-shrink-0 px-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Add date"
          >
            <Calendar className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-accent text-accent-foreground">
          Today
        </span>
      </div>

      <TaskList
        tasks={todayTasks}
        context="today"
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        onSetCompletionDate={onSetCompletionDate}
        settings={settings}
        selectedTaskId={selectedTaskId}
      />
    </div>
  )
})

TodaySection.displayName = 'TodaySection'
