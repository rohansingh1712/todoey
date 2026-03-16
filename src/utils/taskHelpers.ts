import { Task } from '@/types/task'
import { getToday } from './dateHelpers'

/**
 * Returns all incomplete tasks and tasks completed today
 */
export function filterTodayTasks(tasks: Task[]): Task[] {
  const today = getToday()
  return tasks.filter(task => !task.completed || task.completedDate === today)
}

/**
 * Separates today tasks into incomplete (top) and completed (bottom)
 */
export function sortTodayTasks(tasks: Task[]): Task[] {
  const incomplete = tasks.filter(task => !task.completed)
  const completed = tasks.filter(task => task.completed)
  return [...incomplete, ...completed]
}

/**
 * Groups completed tasks by completedDate (excluding today), sorted reverse chronological
 */
export function groupPastTasks(tasks: Task[]): Map<string, Task[]> {
  const today = getToday()
  const pastTasks = tasks.filter(
    task => task.completed && task.completedDate && task.completedDate < today
  )

  const grouped = new Map<string, Task[]>()

  for (const task of pastTasks) {
    if (task.completedDate) {
      const existing = grouped.get(task.completedDate) || []
      grouped.set(task.completedDate, [...existing, task])
    }
  }

  // Sort dates in reverse chronological order
  const sorted = new Map(
    Array.from(grouped.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  )

  return sorted
}
