'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { THEME_MAP, type CharacterTheme, type ThemeId } from '@/lib/themes'

interface ThemeContextValue {
  theme: CharacterTheme
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('pink-neko')

  const setTheme = useCallback((id: ThemeId) => {
    const root = document.documentElement
    root.dataset.theme = id
    root.dataset.mode = THEME_MAP[id].mode
    setThemeId(id)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: THEME_MAP[themeId], setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useCharacterTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useCharacterTheme must be used within ThemeProvider')
  return ctx
}
