import { useState, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'

interface TaskInputProps {
  onAdd: (text: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function TaskInput({ onAdd, placeholder = 'Add a task...', autoFocus }: TaskInputProps) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim())
      setValue('')
    } else if (e.key === 'Escape') {
      setValue('')
    }
  }

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="bg-background"
      aria-label={placeholder}
    />
  )
}
