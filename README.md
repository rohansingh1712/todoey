# Done

A todo list app that celebrates what you've accomplished, not just what's ahead.

## Features

- **Today Section**: Shows current tasks and automatically rolls over incomplete tasks from past dates
- **Past Dates Section**: Date-grouped log of all tasks in reverse chronological order
- **Rollover Logic**: Incomplete tasks from past dates automatically appear in Today
- **Undo/Redo**: Full history support with Cmd+Z / Ctrl+Z (max 10 actions)
- **localStorage**: All data persists locally in your browser
- **Inline Editing**: Click any task to edit it
- **Clean UI**: Built with shadcn/ui and Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

### Today Section
- Add new tasks using the input at the bottom
- Check off tasks to mark them complete
- Incomplete tasks from past dates automatically appear here with a "from MM/DD" badge
- Click any task to edit it inline
- Hover over tasks to reveal delete button

### Past Dates Section
- All past dates are grouped and sorted (most recent first)
- Add tasks to any past date (they're marked completed automatically)
- Incomplete tasks show a "→ Today" tag indicating they've rolled over
- Headers show "Yesterday" for the previous day, "MM/DD/YYYY" for older dates

### Keyboard Shortcuts
- **Cmd+Z / Ctrl+Z**: Undo last action
- **Cmd+Shift+Z / Ctrl+Shift+Z**: Redo
- **Enter**: Submit new task or save edit
- **Escape**: Cancel edit or clear input

## Data Model

Each task contains:
- `id`: Unique identifier (UUID)
- `text`: Task description
- `completed`: Completion status
- `createdDate`: Date the task was originally added (YYYY-MM-DD)
- `completedDate`: Date the task was completed (YYYY-MM-DD or null)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- localStorage for persistence

## License

MIT
