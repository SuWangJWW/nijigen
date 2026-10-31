'use client'

import { CharacterCard } from './character-card'
import { ComponentShowcase } from './component-showcase'
import { GalgameDialog } from './galgame-dialog'
import { NavBar } from './nav-bar'
import { ThemeProvider, useCharacterTheme } from './theme-provider'

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i * 1.3) % 12}s`,
  duration: `${12 + ((i * 7) % 10)}s`,
  size: 8 + ((i * 5) % 10),
}))

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-32 -top-32 size-[36rem] rounded-full bg-blob-1 opacity-70 blur-3xl" />
      <div className="absolute -bottom-40 -right-24 size-[40rem] rounded-full bg-blob-2 opacity-60 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 size-[22rem] -translate-x-1/2 rounded-full bg-primary opacity-10 blur-3xl" />
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 rounded-[0_100%_0_100%] bg-primary/40"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `float-petal ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

function Content() {
  const { theme } = useCharacterTheme()

  return (
    <>
      <Backdrop />
      <NavBar />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-display text-xs font-semibold text-primary">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              v1.0 · 六大角色主题
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              为你的二次元世界，
              <span className="text-primary">换一身角色皮肤</span>
            </h1>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Kemono UI 基于 CSS 变量与 <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs">data-theme</code>{' '}
              构建，一键切换 4 款亮色与 2 款暗色角色主题，所有组件平滑过渡。
            </p>
          </div>
          <dl className="flex gap-6 font-display">
            <div>
              <dt className="text-xs text-muted-foreground">当前角色</dt>
              <dd className="text-lg font-semibold">{theme.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">主题</dt>
              <dd className="text-lg font-semibold text-primary">{theme.themeName}</dd>
            </div>
          </dl>
        </header>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <CharacterCard />
          </div>
          <div className="lg:col-span-8">
            <GalgameDialog key={theme.id} theme={theme} />
          </div>
        </div>

        <ComponentShowcase />
      </main>
      <footer className="pb-10 text-center text-xs text-muted-foreground">
        Kemono UI · 用 Tailwind CSS 与 CSS 变量精心打造
      </footer>
    </>
  )
}

export function PreviewShell() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  )
}
