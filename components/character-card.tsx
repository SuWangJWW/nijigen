'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Heart, Mars, Moon, Sun, Venus } from 'lucide-react'
import { CharacterEars } from './character-ears'
import { KawaiiButton } from './kawaii-button'
import { useCharacterTheme } from './theme-provider'

export function CharacterCard() {
  const { theme } = useCharacterTheme()
  const [affection, setAffection] = useState(42)

  const tags = [
    {
      label: theme.gender,
      icon: theme.gender === '女性' ? <Venus aria-hidden className="size-3.5" /> : <Mars aria-hidden className="size-3.5" />,
    },
    { label: theme.species },
    { label: theme.role },
    {
      label: theme.mode === 'dark' ? '暗色主题' : '亮色主题',
      icon: theme.mode === 'dark' ? <Moon aria-hidden className="size-3.5" /> : <Sun aria-hidden className="size-3.5" />,
    },
  ]

  return (
    <article
      id="character"
      aria-labelledby="character-name"
      className="glass glow-shadow relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2rem] border p-6 sm:p-7"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-blob-1 to-transparent opacity-80" />

      <div className="relative mx-auto mt-12 size-44">
        <CharacterEars key={theme.id} type={theme.ears} />
        <div className="relative z-10 size-full overflow-hidden rounded-[2.25rem] border-4 border-card bg-muted shadow-2xl shadow-glow">
          <Image
            key={theme.avatar}
            src={theme.avatar}
            alt={`${theme.name} 的头像`}
            fill
            priority
            sizes="176px"
            className="animate-in fade-in zoom-in-105 object-cover object-top duration-700"
          />
        </div>
        <span className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 font-display text-xs font-semibold text-primary-foreground shadow-lg shadow-glow">
          {theme.age}
        </span>
      </div>

      <div className="relative mt-7 text-center">
        <p className="font-display text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">{theme.romaji}</p>
        <h2 id="character-name" className="mt-1 font-display text-3xl font-bold tracking-tight text-balance">
          {theme.name}
        </h2>
      </div>

      <ul className="relative mt-4 flex flex-wrap justify-center gap-2" aria-label="角色标签">
        {tags.map((tag) => (
          <li
            key={tag.label}
            className="inline-flex items-center gap-1 rounded-full border bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
          >
            {tag.icon}
            {tag.label}
          </li>
        ))}
      </ul>

      <p className="relative mt-5 text-center text-sm leading-relaxed text-muted-foreground text-pretty">{theme.bio}</p>

      <dl className="relative mt-6 flex flex-col gap-3">
        {theme.stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex items-center justify-between text-xs font-bold">
              <dt>{stat.label}</dt>
              <dd className="font-display text-primary">{stat.value}</dd>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary !transition-[width] !duration-1000"
                style={{ width: `${stat.value}%` }}
              />
            </div>
          </div>
        ))}
      </dl>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-7">
        <div>
          <p className="text-xs font-bold text-muted-foreground">好感度</p>
          <p className="font-display text-2xl font-bold text-primary" aria-live="polite">
            {affection}
            <span className="text-sm text-muted-foreground"> / 100</span>
          </p>
        </div>
        <KawaiiButton onClick={() => setAffection((a) => Math.min(100, a + 7))} disabled={affection >= 100}>
          <Heart aria-hidden className="fill-current" />
          {affection >= 100 ? '已满' : '送礼物'}
        </KawaiiButton>
      </div>
    </article>
  )
}
