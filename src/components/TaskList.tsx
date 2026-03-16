import { motion, AnimatePresence } from 'framer-motion'
import { Task } from '@/types/task'
import { AppSettings } from '@/types/settings'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  context: 'today' | 'past'
  onToggle?: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onSetCompletionDate?: (id: string, date: string | null) => void
  settings: AppSettings
  selectedTaskId?: string | null
}

export function TaskList({
  tasks,
  context,
  onToggle,
  onDelete,
  onEdit,
  onSetCompletionDate,
  settings,
  selectedTaskId,
}: TaskListProps) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: `${settings.lineSpacing}rem` }}
      layout
    >
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            context={context}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onSetCompletionDate={onSetCompletionDate}
            settings={settings}
            isSelected={selectedTaskId === task.id}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
