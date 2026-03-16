import { X } from 'lucide-react'

interface HelpPanelProps {
  open: boolean
  onClose: () => void
}

export function HelpPanel({ open, onClose }: HelpPanelProps) {
  if (!open) return null

  return (
    <>
      {/* Side Panel - force default theme */}
      <div
        className="fixed top-0 right-0 h-full w-96 border-l shadow-xl z-50 overflow-y-auto"
        style={{
          backgroundColor: 'hsl(0 0% 100%)',
          color: 'hsl(222.2 84% 4.9%)',
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Help</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Close help"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 text-sm">
            {/* About Section */}
            <section>
              <h3 className="font-semibold mb-2 text-base">About Done</h3>
              <p className="text-muted-foreground leading-relaxed">
                Done is a minimalist task manager focused on what you've accomplished today.
                It encourages you to track completed tasks rather than endless to-do lists,
                helping you see your daily progress at a glance.
              </p>
            </section>

            {/* Creating Tasks */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Creating Tasks</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Type and press Enter</strong> in the input
                  field to add a new task.
                </p>
                <p>
                  <strong className="text-foreground">Set a date:</strong> Add <code className="bg-muted px-1 py-0.5 rounded text-blue-600">@MM/DD</code> to
                  assign a completion date:
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">@3/15</code> - March 15th (current year)</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">@12/25/2025</code> - Full date</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">@today</code> - Today's date</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">@yesterday</code> - Yesterday</li>
                </ul>
              </div>
            </section>

            {/* Completing Tasks */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Completing Tasks</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Click the checkbox</strong> to mark a task
                  as complete. It will move to the bottom of Today's list.
                </p>
                <p>
                  <strong className="text-foreground">Keyboard:</strong> Press{' '}
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border">Shift</kbd> +{' '}
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border">Enter</kbd> when a task
                  is selected.
                </p>
                <p>
                  Completed tasks show with a bullet (• or *, +, -) instead of a checkbox.
                </p>
              </div>
            </section>

            {/* Editing Tasks */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Editing Tasks</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Click on task text</strong> to edit it inline.
                </p>
                <p>
                  <strong className="text-foreground">Keyboard:</strong> Press{' '}
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border">Enter</kbd> when a task
                  is selected to start editing.
                </p>
                <p>
                  Press <kbd className="bg-muted px-1.5 py-0.5 rounded border">Enter</kbd> to save
                  or <kbd className="bg-muted px-1.5 py-0.5 rounded border">Esc</kbd> to cancel.
                </p>
              </div>
            </section>

            {/* Deleting Tasks */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Deleting Tasks</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Hover over a task</strong> and click the
                  trash icon that appears.
                </p>
                <p>
                  <strong className="text-foreground">Keyboard:</strong> Press{' '}
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border">Delete</kbd> or{' '}
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border">Backspace</kbd> when a
                  task is selected.
                </p>
              </div>
            </section>

            {/* Completion Dates */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Completion Dates</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Hover over a task</strong> and click the
                  calendar icon to set or edit the completion date.
                </p>
                <p>
                  Tasks are automatically grouped by date. Today's tasks appear at the top,
                  while past dates appear below in reverse chronological order.
                </p>
              </div>
            </section>

            {/* Keyboard Navigation */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Keyboard Navigation</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">↑</kbd> /
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">↓</kbd>
                    <span className="ml-2">Navigate between tasks</span>
                  </p>
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Enter</kbd>
                    <span className="ml-2">Edit selected task</span>
                  </p>
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Shift</kbd> +
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">Enter</kbd>
                    <span className="ml-2">Toggle task completion</span>
                  </p>
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Shift</kbd> +
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">↑</kbd> /
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">↓</kbd>
                    <span className="ml-2">Reorder task position</span>
                  </p>
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Delete</kbd> or
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">Backspace</kbd>
                    <span className="ml-2">Delete selected task</span>
                  </p>
                  <p className="text-muted-foreground">
                    <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Esc</kbd>
                    <span className="ml-2">Return to main input</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Undo/Redo */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Undo & Redo</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Cmd</kbd> +
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">Z</kbd>
                  <span className="ml-2">Undo last action</span>
                </p>
                <p>
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground">Cmd</kbd> +
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">Shift</kbd> +
                  <kbd className="bg-muted px-1.5 py-0.5 rounded border text-foreground ml-1">Z</kbd>
                  <span className="ml-2">Redo action</span>
                </p>
                <p className="text-xs italic mt-2">
                  All task changes (add, edit, delete, toggle, move) can be undone.
                </p>
              </div>
            </section>

            {/* Customization */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Customization</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  Click the settings icon (gear) in the top right to customize:
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Theme (4 color schemes)</li>
                  <li>Animation speed (smooth, snappy, instant)</li>
                  <li>Font size (8px - 40px)</li>
                  <li>Line spacing</li>
                  <li>Completed task bullet style</li>
                  <li>Completed task appearance (strikethrough, italic, bold, opacity)</li>
                </ul>
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="font-semibold mb-3 text-base">Tips</h3>
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                  <li>Tasks are automatically saved to your browser's local storage</li>
                  <li>Use keyboard shortcuts for fastest workflow</li>
                  <li>The app focuses on "done" items rather than endless to-dos</li>
                  <li>Check off tasks as you complete them throughout the day</li>
                  <li>Review past dates to see your accomplishments over time</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
