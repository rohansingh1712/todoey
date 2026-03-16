import { Task } from '@/types/task'
import { AppSettings } from '@/types/settings'
import { TaskList } from './TaskList'
import { formatDateHeader } from '@/utils/dateHelpers'

interface DateSectionProps {
  date: string
  tasks: Task[]
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onSetCompletionDate?: (id: string, date: string | null) => void
  settings: AppSettings
  selectedTaskId?: string | null
}

export function DateSection({
  date,
  tasks,
  onDelete,
  onEdit,
  onSetCompletionDate,
  settings,
  selectedTaskId,
}: DateSectionProps) {
  const dateHeader = formatDateHeader(date)

  return (
    <div className="mb-6">
      <div className="mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-accent text-accent-foreground">
          {dateHeader}
        </span>
      </div>

      <TaskList
        tasks={tasks}
        context="past"
        onDelete={onDelete}
        onEdit={onEdit}
        onSetCompletionDate={onSetCompletionDate}
        settings={settings}
        selectedTaskId={selectedTaskId}
      />
    </div>
  )
}
