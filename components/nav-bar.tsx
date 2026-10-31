'use client'

import Image from 'next/image'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { THEMES } from '@/lib/themes'
import { useCharacterTheme } from './theme-provider'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#character', label: '角色' },
  { href: '#dialog', label: '对话' },
  { href: '#components', label: '组件' },
]

export function NavBar() {
  const { theme, setTheme } = useCharacterTheme()

  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-6">
      <nav
        aria-label="主导航"
        className="glass glow-shadow mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 sm:px-5"
      >
        <a href="#" className="flex items-center gap-2 rounded-full pr-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-md shadow-glow">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
            Kemono<span className="text-primary">UI</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground lg:inline-flex">
            {theme.mode === 'dark' ? <Moon className="size-3.5" aria-hidden /> : <Sun className="size-3.5" aria-hidden />}
            {theme.themeName}
          </span>
          <div role="radiogroup" aria-label="切换角色主题" className="flex items-center gap-1 sm:gap-1.5">
            {THEMES.map((t) => {
              const active = t.id === theme.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${t.themeName} · ${t.name}`}
                  title={`${t.themeName} · ${t.name}`}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    'group relative grid size-8 place-items-center rounded-full outline-none !transition-all !duration-300 focus-visible:ring-4 focus-visible:ring-ring/40 sm:size-9',
                    active ? 'scale-110' : 'opacity-75 hover:scale-105 hover:opacity-100',
                  )}
                  style={{ boxShadow: `0 0 0 2px ${active ? t.swatch : 'transparent'}` }}
                >
                  <span className="relative size-full overflow-hidden rounded-full border-2 border-card">
                    <Image src={t.avatar} alt="" fill sizes="36px" className="object-cover object-top" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card"
                    style={{ backgroundColor: t.swatch }}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
