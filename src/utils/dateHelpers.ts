/**
 * Returns today's date in YYYY-MM-DD format
 */
export function getToday(): string {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

/**
 * Returns "Yesterday" for D-1, otherwise formatted with day of week
 */
export function formatDateHeader(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.getTime() === yesterday.getTime()) {
    return 'Yesterday'
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const dayOfWeek = days[date.getDay()]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${dayOfWeek}, ${month} ${day}, ${year}`
}

/**
 * Returns "from MM/DD" for rollover badges
 */
export function formatRolloverBadge(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `from ${month}/${day}`
}

/**
 * Checks if a date string is today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getToday()
}

/**
 * Checks if a date string is yesterday
 */
export function isYesterday(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  return date.getTime() === yesterday.getTime()
}

/**
 * Parses date input with multiple formats and Y2K logic
 * Accepts: MM/DD/YYYY, MM/DD/YY (Y2K), MM/DD (current year)
 * Returns: YYYY-MM-DD string or null if invalid
 */
export function parseDate(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  // Try MM/DD/YYYY format
  const fullMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (fullMatch) {
    const [, month, day, year] = fullMatch
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  // Try MM/DD/YY format (Y2K logic: 00-49 = 2000s, 50-99 = 1900s)
  const shortYearMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/)
  if (shortYearMatch) {
    const [, month, day, yy] = shortYearMatch
    const yearNum = parseInt(yy, 10)
    const fullYear = yearNum < 50 ? 2000 + yearNum : 1900 + yearNum
    return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  // Try MM/DD format (assume current year)
  const noYearMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})$/)
  if (noYearMatch) {
    const [, month, day] = noYearMatch
    const year = new Date().getFullYear()
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  return null
}

/**
 * Parses task input text to extract inline @date syntax
 * Example: "Finished project @3/15/2024" -> { text: "Finished project", date: "2024-03-15" }
 * Returns: { text: cleaned task text, date: parsed date or null }
 */
export function parseTaskInput(input: string): { text: string; date: string | null } {
  const trimmed = input.trim()

  // Match @date pattern anywhere in string
  const datePattern = /@(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/
  const match = trimmed.match(datePattern)

  if (match) {
    const dateStr = match[1]
    const parsedDate = parseDate(dateStr)
    const text = trimmed.replace(datePattern, '').trim()
    return { text, date: parsedDate }
  }

  return { text: trimmed, date: null }
}
