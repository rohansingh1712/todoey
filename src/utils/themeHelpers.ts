import { Theme } from '@/types/settings'

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement

  if (theme === 'theme2') {
    // Theme 2: Ocean Blues (#8ECAE6, #219EBC, #023047, #FFB703, #FB8500)
    root.style.setProperty('--background', '200 94% 14%') // #023047 - dark blue
    root.style.setProperty('--foreground', '210 40% 98%') // near-white text
    root.style.setProperty('--card', '200 90% 18%') // slightly lighter
    root.style.setProperty('--card-foreground', '210 40% 98%')
    root.style.setProperty('--popover', '200 90% 18%')
    root.style.setProperty('--popover-foreground', '210 40% 98%')
    root.style.setProperty('--primary', '198 67% 73%') // #8ECAE6 - light blue (sparing)
    root.style.setProperty('--primary-foreground', '200 94% 14%')
    root.style.setProperty('--secondary', '192 70% 23%') // darker blue
    root.style.setProperty('--secondary-foreground', '210 40% 98%')
    root.style.setProperty('--muted', '200 85% 20%') // input background
    root.style.setProperty('--muted-foreground', '200 20% 60%') // soft gray-blue
    root.style.setProperty('--accent', '192 70% 43%') // #219EBC - medium blue
    root.style.setProperty('--accent-foreground', '210 40% 98%')
    root.style.setProperty('--destructive', '0 84% 60%')
    root.style.setProperty('--destructive-foreground', '210 40% 98%')
    root.style.setProperty('--border', '192 70% 43% / 0.2') // subtle blue border
    root.style.setProperty('--input', '200 85% 20%')
    root.style.setProperty('--ring', '198 67% 73%')
  } else if (theme === 'theme3') {
    // Theme 3: Warm Earth (#606C38, #283618, #FEFAE0, #DDA15E, #BC6C25)
    root.style.setProperty('--background', '88 38% 15%') // #283618 - dark olive
    root.style.setProperty('--foreground', '52 88% 94%') // #FEFAE0 - cream text
    root.style.setProperty('--card', '88 35% 20%') // slightly lighter
    root.style.setProperty('--card-foreground', '52 88% 94%')
    root.style.setProperty('--popover', '88 35% 20%')
    root.style.setProperty('--popover-foreground', '52 88% 94%')
    root.style.setProperty('--primary', '32 64% 62%') // #DDA15E - tan (sparing)
    root.style.setProperty('--primary-foreground', '88 38% 15%')
    root.style.setProperty('--secondary', '74 32% 28%') // olive
    root.style.setProperty('--secondary-foreground', '52 88% 94%')
    root.style.setProperty('--muted', '88 30% 22%') // input background
    root.style.setProperty('--muted-foreground', '52 30% 70%') // muted cream
    root.style.setProperty('--accent', '74 32% 32%') // #606C38 - olive green
    root.style.setProperty('--accent-foreground', '52 88% 94%')
    root.style.setProperty('--destructive', '0 84% 60%')
    root.style.setProperty('--destructive-foreground', '52 88% 94%')
    root.style.setProperty('--border', '32 64% 62% / 0.2') // subtle tan border
    root.style.setProperty('--input', '88 30% 22%')
    root.style.setProperty('--ring', '32 64% 62%')
  } else if (theme === 'theme4') {
    // Theme 4: Navy & Gold (#000000, #14213D, #FCA311, #E5E5E5, #FFFFFF)
    root.style.setProperty('--background', '221 51% 16%') // #14213D - navy
    root.style.setProperty('--foreground', '0 0% 90%') // #E5E5E5 - light gray
    root.style.setProperty('--card', '221 48% 20%') // slightly lighter
    root.style.setProperty('--card-foreground', '0 0% 90%')
    root.style.setProperty('--popover', '221 48% 20%')
    root.style.setProperty('--popover-foreground', '0 0% 90%')
    root.style.setProperty('--primary', '37 97% 53%') // #FCA311 - gold (sparing)
    root.style.setProperty('--primary-foreground', '221 51% 16%')
    root.style.setProperty('--secondary', '221 50% 22%') // darker navy
    root.style.setProperty('--secondary-foreground', '0 0% 90%')
    root.style.setProperty('--muted', '221 45% 24%') // input background
    root.style.setProperty('--muted-foreground', '220 10% 60%') // soft gray
    root.style.setProperty('--accent', '37 97% 53%') // #FCA311 - gold
    root.style.setProperty('--accent-foreground', '221 51% 16%')
    root.style.setProperty('--destructive', '0 84% 60%')
    root.style.setProperty('--destructive-foreground', '0 0% 90%')
    root.style.setProperty('--border', '37 97% 53% / 0.15') // very subtle gold
    root.style.setProperty('--input', '221 45% 24%')
    root.style.setProperty('--ring', '37 97% 53%')
  } else {
    // Default light theme
    root.style.setProperty('--background', '0 0% 100%')
    root.style.setProperty('--foreground', '222.2 84% 4.9%')
    root.style.setProperty('--card', '0 0% 100%')
    root.style.setProperty('--card-foreground', '222.2 84% 4.9%')
    root.style.setProperty('--popover', '0 0% 100%')
    root.style.setProperty('--popover-foreground', '222.2 84% 4.9%')
    root.style.setProperty('--primary', '222.2 47.4% 11.2%')
    root.style.setProperty('--primary-foreground', '210 40% 98%')
    root.style.setProperty('--secondary', '210 40% 96.1%')
    root.style.setProperty('--secondary-foreground', '222.2 47.4% 11.2%')
    root.style.setProperty('--muted', '210 40% 96.1%')
    root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%')
    root.style.setProperty('--accent', '210 40% 96.1%')
    root.style.setProperty('--accent-foreground', '222.2 47.4% 11.2%')
    root.style.setProperty('--destructive', '0 84.2% 60.2%')
    root.style.setProperty('--destructive-foreground', '210 40% 98%')
    root.style.setProperty('--border', '214.3 31.8% 91.4%')
    root.style.setProperty('--input', '214.3 31.8% 91.4%')
    root.style.setProperty('--ring', '222.2 84% 4.9%')
  }
}
