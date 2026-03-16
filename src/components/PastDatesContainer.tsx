import { Task } from '@/types/task'
import { AppSettings } from '@/types/settings'
import { DateSection } from './DateSection'

interface PastDatesContainerProps {
  pastTasksByDate: Map<string, Task[]>
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  onSetCompletionDate?: (id: string, date: string | null) => void
  settings: AppSettings
  selectedTaskId?: string | null
}

export function PastDatesContainer({
  pastTasksByDate,
  onDelete,
  onEdit,
  onSetCompletionDate,
  settings,
  selectedTaskId,
}: PastDatesContainerProps) {
  if (pastTasksByDate.size === 0) {
    return null
  }

  return (
    <div className="border-t pt-6">
      {Array.from(pastTasksByDate.entries()).map(([date, tasks]) => (
        <DateSection
          key={date}
          date={date}
          tasks={tasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onSetCompletionDate={onSetCompletionDate}
          settings={settings}
          selectedTaskId={selectedTaskId}
        />
      ))}
    </div>
  )
}
