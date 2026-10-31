'use client'

import Image from 'next/image'
import { useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import { ChevronDown, FastForward, History, Play, Save, SendHorizontal, Settings2, X } from 'lucide-react'
import type { CharacterTheme } from '@/lib/themes'
import { KawaiiButton } from './kawaii-button'
import { cn } from '@/lib/utils'

interface LogEntry {
  speaker: string
  text: string
}

function useTypewriter(text: string, speed = 38) {
  const [shownText, setShownText] = useState(text)
  const [count, setCount] = useState(0)

  if (shownText !== text) {
    setShownText(text)
    setCount(0)
  }

  const done = count >= text.length

  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(timer)
  }, [count, done, speed])

  return { visible: text.slice(0, count), done, finish: () => setCount(text.length) }
}

export function GalgameDialog({ theme }: { theme: CharacterTheme }) {
  const [current, setCurrent] = useState<LogEntry>({ speaker: theme.name, text: theme.lines[0] })
  const [lineIndex, setLineIndex] = useState(0)
  const [replyIndex, setReplyIndex] = useState(0)
  const [log, setLog] = useState<LogEntry[]>([{ speaker: theme.name, text: theme.lines[0] }])
  const [auto, setAuto] = useState(false)
  const [showLog, setShowLog] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const { visible, done, finish } = useTypewriter(current.text)
  const showChoices = done && lineIndex === theme.lines.length - 1 && current.speaker === theme.name

  const say = (entry: LogEntry) => {
    setCurrent(entry)
    setLog((l) => [...l, entry])
  }

  const advance = () => {
    if (!done) return finish()
    const next = (lineIndex + 1) % theme.lines.length
    setLineIndex(next)
    say({ speaker: theme.name, text: theme.lines[next] })
  }

  const respond = (userText: string) => {
    setLog((l) => [...l, { speaker: '你', text: userText }])
    const reply = theme.replies[replyIndex % theme.replies.length]
    setReplyIndex((i) => i + 1)
    say({ speaker: theme.name, text: reply })
  }

  useEffect(() => {
    if (!auto || !done) return
    const timer = setTimeout(advance, 1800)
    return () => clearTimeout(timer)
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    respond(text)
    setDraft('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing || e.keyCode === 229) return
    e.preventDefault()
    onSubmit(e)
  }

  const controls = [
    { label: '自动', icon: Play, active: auto, onClick: () => setAuto((a) => !a) },
    { label: '快进', icon: FastForward, onClick: finish },
    { label: '记录', icon: History, active: showLog, onClick: () => setShowLog((s) => !s) },
    {
      label: '存档',
      icon: Save,
      onClick: () => setSavedAt(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })),
    },
    { label: '设置', icon: Settings2 },
  ]

  return (
    <section
      id="dialog"
      aria-labelledby="dialog-title"
      className="glass glow-shadow flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2rem] border"
    >
      <div className="flex items-center justify-between gap-3 px-6 pt-5">
        <div>
          <h2 id="dialog-title" className="font-display text-lg font-semibold">
            Galgame 对话框
          </h2>
          <p className="text-xs text-muted-foreground">点击对话框推进剧情，或在下方输入你的回应</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 font-display text-xs font-semibold text-secondary-foreground">
          第 {lineIndex + 1} 幕
        </span>
      </div>

      <div className="relative m-4 mb-0 min-h-[24rem] flex-1 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blob-1 via-background to-blob-2 sm:min-h-[26rem]">
        <div aria-hidden className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

        <div className="absolute inset-y-0 right-0 w-[78%] sm:w-[62%]">
          <Image
            key={theme.avatar}
            src={theme.avatar}
            alt={`${theme.name} 立绘`}
            fill
            sizes="(min-width: 1024px) 480px, 80vw"
            className="animate-in fade-in slide-in-from-right-8 object-cover object-top duration-700 [mask-image:linear-gradient(to_right,transparent,black_30%),linear-gradient(to_top,transparent,black_35%)] [mask-composite:intersect]"
          />
        </div>

        {showChoices && (
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 sm:left-6 sm:top-6" role="group" aria-label="剧情选项">
            {theme.choices.map((choice, i) => (
              <button
                key={choice}
                type="button"
                onClick={() => respond(choice)}
                style={{ animationDelay: `${i * 90}ms` }}
                className="glass animate-in fade-in slide-in-from-left-4 fill-mode-both rounded-full border px-5 py-2 text-left text-sm font-bold shadow-md !transition-all hover:translate-x-1 hover:border-primary hover:text-primary"
              >
                {'◆ '}
                {choice}
              </button>
            ))}
          </div>
        )}

        {showLog && (
          <div className="glass absolute inset-3 z-20 flex flex-col rounded-[1.25rem] border p-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold">对话记录</h3>
              <button
                type="button"
                onClick={() => setShowLog(false)}
                aria-label="关闭记录"
                className="grid size-8 place-items-center rounded-full hover:bg-muted"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <ol className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pr-1 text-sm">
              {log.map((entry, i) => (
                <li key={i} className="rounded-xl bg-muted/70 px-3 py-2">
                  <span className={cn('font-bold', entry.speaker === '你' ? 'text-muted-foreground' : 'text-primary')}>
                    {entry.speaker}
                  </span>
                  <span className="text-muted-foreground">{'：'}</span>
                  {entry.text}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
          <div className="relative">
            <span className="absolute -top-4 left-5 z-10 rounded-full bg-primary px-5 py-1.5 font-display text-sm font-semibold text-primary-foreground shadow-lg shadow-glow">
              {current.speaker}
            </span>
            <button
              type="button"
              onClick={advance}
              aria-label="继续对话"
              className="glass block min-h-32 w-full rounded-[1.5rem] border-2 border-primary/30 px-6 pb-5 pt-7 text-left shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              <p className="text-base font-semibold leading-relaxed sm:text-lg" aria-live="polite">
                {visible}
                {!done && <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-[caret-blink_0.8s_step-end_infinite] bg-primary" />}
              </p>
              {done && (
                <ChevronDown aria-hidden className="absolute bottom-3 right-5 size-5 animate-bounce text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 px-4 pt-3">
        {controls.map(({ label, icon: Icon, active, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-display text-xs font-semibold',
              active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon aria-hidden className="size-3.5" />
            {label}
          </button>
        ))}
        {savedAt && (
          <span className="ml-auto animate-in fade-in text-xs font-semibold text-muted-foreground" role="status">
            已存档 · {savedAt}
          </span>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-end gap-2 p-4">
        <label htmlFor="dialog-input" className="sr-only">
          输入你的回应
        </label>
        <textarea
          id="dialog-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
          maxLength={120}
          placeholder={`对${theme.name}说点什么…（Enter 发送，Shift+Enter 换行）`}
          className="min-h-14 flex-1 resize-none rounded-[1.25rem] border-2 bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/20"
        />
        <div className="flex flex-col gap-2">
          <KawaiiButton type="submit" disabled={!draft.trim()} className="h-14 px-6">
            <SendHorizontal aria-hidden />
            <span className="hidden sm:inline">发送</span>
          </KawaiiButton>
        </div>
      </form>
    </section>
  )
}
