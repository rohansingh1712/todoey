import { v4 as uuid } from 'uuid'
import { Task } from '@/types/task'
import { getToday } from './dateHelpers'

/**
 * Returns seed tasks for first-time app load
 */
export function getSeedTasks(): Task[] {
  const today = getToday()

  // Calculate past dates
  const getPastDate = (daysAgo: number): string => {
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return date.toISOString().split('T')[0]
  }

  const yesterday = getPastDate(1)
  const twoDaysAgo = getPastDate(2)
  const threeDaysAgo = getPastDate(3)

  return [
    // Today's incomplete tasks
    {
      id: uuid(),
      text: 'Welcome to Done! Check me off to get started',
      completed: false,
      completedDate: null,
    },
    {
      id: uuid(),
      text: 'Try adding a new task at the top',
      completed: false,
      completedDate: null,
    },
    // Today's completed tasks
    {
      id: uuid(),
      text: 'Checked off this task today',
      completed: true,
      completedDate: today,
    },
    // Yesterday's tasks
    {
      id: uuid(),
      text: 'Finished the project proposal',
      completed: true,
      completedDate: yesterday,
    },
    {
      id: uuid(),
      text: 'Reviewed code with the team',
      completed: true,
      completedDate: yesterday,
    },
    // Two days ago
    {
      id: uuid(),
      text: 'Set up development environment',
      completed: true,
      completedDate: twoDaysAgo,
    },
    {
      id: uuid(),
      text: 'Created initial wireframes',
      completed: true,
      completedDate: twoDaysAgo,
    },
    // Three days ago
    {
      id: uuid(),
      text: 'Had kickoff meeting',
      completed: true,
      completedDate: threeDaysAgo,
    },
  ]
}
