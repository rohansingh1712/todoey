export type CompletedBullet = 'asterisk' | 'plus' | 'dash' | 'dot'
export type Theme = 'default' | 'theme2' | 'theme3' | 'theme4'
export type AnimationSpeed = 'smooth' | 'snappy' | 'instant'

export interface CompletedStyle {
  strikethrough: boolean
  italic: boolean
  bold: boolean
  opacity: number // 0 to 1
}

export interface AppSettings {
  lineSpacing: number // in rem
  completedBullet: CompletedBullet
  completedStyle: CompletedStyle
  fontSize: number // in pixels - applies to all tasks and inputs
  theme: Theme
  animationSpeed: AnimationSpeed
}

export const DEFAULT_SETTINGS: AppSettings = {
  lineSpacing: 0.25, // rem
  completedBullet: 'asterisk',
  completedStyle: {
    strikethrough: true,
    italic: false,
    bold: false,
    opacity: 0.6,
  },
  fontSize: 16, // px
  theme: 'default',
  animationSpeed: 'smooth',
}
