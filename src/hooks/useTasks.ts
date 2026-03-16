import { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from 'uuid'
import { Task } from '@/types/task'
import { getToday } from '@/utils/dateHelpers'
import {
  filterTodayTasks,
  sortTodayTasks,
  groupPastTasks,
} from '@/utils/taskHelpers'
import { useLocalStorage, getFromLocalStorage } from './useLocalStorage'
import { getSeedTasks } from '@/utils/seedData'

const STORAGE_KEY = 'done-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getFromLocalStorage<Task[] | null>(STORAGE_KEY, null)
    if (stored && Array.isArray(stored)) {
      setTasks(stored)
    } else {
      // First load - seed with examples
      const seed = getSeedTasks()
      setTasks(seed)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage on tasks change (after initial load)
  useLocalStorage(STORAGE_KEY, tasks)

  // Computed values
  const todayTasksRaw = useMemo(() => filterTodayTasks(tasks), [tasks])
  const todayTasks = useMemo(() => sortTodayTasks(todayTasksRaw), [todayTasksRaw])
  const pastTasksByDate = useMemo(() => groupPastTasks(tasks), [tasks])

  // Add task
  const addTask = (text: string, date?: string) => {
    const newTask: Task = {
      id: uuid(),
      text,
      completed: date ? true : false, // Tasks added to past dates are auto-completed
      completedDate: date || null,
    }

    setTasks(prev => [newTask, ...prev])
  }

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newCompleted = !task.completed
          return {
            ...task,
            completed: newCompleted,
            completedDate: newCompleted ? getToday() : null,
          }
        }
        return task
      })
    )
  }

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  // Edit task text
  const editTask = (id: string, text: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, text } : task))
    )
  }

  // Set completion date
  const setCompletionDate = (id: string, date: string | null) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          return {
            ...task,
            completedDate: date,
            completed: date !== null,
          }
        }
        return task
      })
    )
  }

  // Move task up or down in the list
  const moveTask = (id: string, direction: 'up' | 'down') => {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    const today = getToday()
    const isToday = !task.completed || task.completedDate === today

    if (isToday) {
      // Moving within Today section
      const todayIncomplete = todayTasks.filter(t => !t.completed)
      const todayCompleted = todayTasks.filter(t => t.completed)

      if (!task.completed) {
        // Moving incomplete task
        const index = todayIncomplete.findIndex(t => t.id === id)
        if (index === -1) return

        if (direction === 'up' && index > 0) {
          // Swap with previous incomplete task
          const newIncomplete = [...todayIncomplete]
          ;[newIncomplete[index], newIncomplete[index - 1]] =
            [newIncomplete[index - 1], newIncomplete[index]]

          // Rebuild tasks array
          const otherTasks = tasks.filter(t => !todayTasks.includes(t))
          setTasks([...newIncomplete, ...todayCompleted, ...otherTasks])
        } else if (direction === 'down' && index < todayIncomplete.length - 1) {
          // Swap with next incomplete task
          const newIncomplete = [...todayIncomplete]
          ;[newIncomplete[index], newIncomplete[index + 1]] =
            [newIncomplete[index + 1], newIncomplete[index]]

          const otherTasks = tasks.filter(t => !todayTasks.includes(t))
          setTasks([...newIncomplete, ...todayCompleted, ...otherTasks])
        } else if (direction === 'down' && index === todayIncomplete.length - 1) {
          // At bottom of incomplete - can't move into completed section
          return
        }
      } else {
        // Moving completed task
        const index = todayCompleted.findIndex(t => t.id === id)
        if (index === -1) return

        if (direction === 'up' && index > 0) {
          // Swap with previous completed task
          const newCompleted = [...todayCompleted]
          ;[newCompleted[index], newCompleted[index - 1]] =
            [newCompleted[index - 1], newCompleted[index]]

          const otherTasks = tasks.filter(t => !todayTasks.includes(t))
          setTasks([...todayIncomplete, ...newCompleted, ...otherTasks])
        } else if (direction === 'up' && index === 0) {
          // At top of completed - can't move into incomplete section
          return
        } else if (direction === 'down') {
          // Move to first past date or stay at bottom if no past dates
          const pastDates = Array.from(pastTasksByDate.keys()).sort().reverse()
          if (pastDates.length > 0) {
            const targetDate = pastDates[0]
            setTasks(prev =>
              prev.map(t =>
                t.id === id
                  ? { ...t, completedDate: targetDate }
                  : t
              )
            )
          }
        }
      }
    } else {
      // Moving within Past dates
      const pastDates = Array.from(pastTasksByDate.keys()).sort().reverse()
      const taskDate = task.completedDate
      if (!taskDate) return

      const dateIndex = pastDates.indexOf(taskDate)
      if (dateIndex === -1) return

      const tasksInDate = pastTasksByDate.get(taskDate) || []
      const indexInDate = tasksInDate.findIndex(t => t.id === id)
      if (indexInDate === -1) return

      if (direction === 'up') {
        if (indexInDate > 0) {
          // Swap with previous task in same date
          const allTasks = [...tasks]
          const taskIndex = allTasks.findIndex(t => t.id === id)
          const prevTask = tasksInDate[indexInDate - 1]
          const prevTaskIndex = allTasks.findIndex(t => t.id === prevTask.id)

          if (taskIndex !== -1 && prevTaskIndex !== -1) {
            ;[allTasks[taskIndex], allTasks[prevTaskIndex]] =
              [allTasks[prevTaskIndex], allTasks[taskIndex]]
            setTasks(allTasks)
          }
        } else {
          // At top of date - move to previous date or Today completed
          if (dateIndex === 0) {
            // Move to Today completed section
            setTasks(prev =>
              prev.map(t =>
                t.id === id
                  ? { ...t, completedDate: today }
                  : t
              )
            )
          } else {
            // Move to next more recent date (dateIndex - 1)
            const targetDate = pastDates[dateIndex - 1]
            setTasks(prev =>
              prev.map(t =>
                t.id === id
                  ? { ...t, completedDate: targetDate }
                  : t
              )
            )
          }
        }
      } else {
        // direction === 'down'
        if (indexInDate < tasksInDate.length - 1) {
          // Swap with next task in same date
          const allTasks = [...tasks]
          const taskIndex = allTasks.findIndex(t => t.id === id)
          const nextTask = tasksInDate[indexInDate + 1]
          const nextTaskIndex = allTasks.findIndex(t => t.id === nextTask.id)

          if (taskIndex !== -1 && nextTaskIndex !== -1) {
            ;[allTasks[taskIndex], allTasks[nextTaskIndex]] =
              [allTasks[nextTaskIndex], allTasks[taskIndex]]
            setTasks(allTasks)
          }
        } else {
          // At bottom of date - move to next older date
          if (dateIndex < pastDates.length - 1) {
            const targetDate = pastDates[dateIndex + 1]
            setTasks(prev =>
              prev.map(t =>
                t.id === id
                  ? { ...t, completedDate: targetDate }
                  : t
              )
            )
          }
        }
      }
    }
  }

  return {
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
  }
}
