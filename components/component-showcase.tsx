'use client'

import { useState, type ReactNode } from 'react'
import { Bell, CircleCheck, Heart, Info, Loader2, Sparkles, Star, TriangleAlert, Wand2 } from 'lucide-react'
import { AlertModal, type AlertConfig } from './alert-modal'
import { KawaiiButton } from './kawaii-button'
import { useCharacterTheme } from './theme-provider'
import { cn } from '@/lib/utils'

function Panel({ title, description, children, className }: { title: string; description: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn('glass glow-shadow rounded-[2rem] border p-6', className)}>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  )
}

const PALETTE = [
  { name: 'Primary', token: '--primary', cls: 'bg-primary' },
  { name: 'Secondary', token: '--secondary', cls: 'bg-secondary' },
  { name: 'Accent', token: '--accent', cls: 'bg-accent' },
  { name: 'Muted', token: '--muted', cls: 'bg-muted' },
  { name: 'Background', token: '--background', cls: 'bg-background' },
  { name: 'Foreground', token: '--foreground', cls: 'bg-foreground' },
]

export function ComponentShowcase() {
  const { theme } = useCharacterTheme()
  const [alert, setAlert] = useState<AlertConfig | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState(true)
  const [volume, setVolume] = useState(68)

  const openInfo = () =>
    setAlert({
      variant: 'info',
      title: `与${theme.name}缔结契约？`,
      description: '缔结契约后，你们的羁绊等级将提升，并解锁专属剧情与语音。',
      confirmLabel: '缔结契约',
    })

  const openDanger = () =>
    setAlert({
      variant: 'danger',
      title: '确定要删除存档吗？',
      description: `与${theme.name}的所有回忆将会消失，此操作无法撤销。`,
      confirmLabel: '确认删除',
    })

  const confirm = () => {
    setResult(alert?.variant === 'danger' ? '存档已删除（只是演示啦）' : `已与${theme.name}缔结契约 ✦`)
    setAlert(null)
  }

  const fakeLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1600)
  }

  return (
    <div id="components" className="grid scroll-mt-28 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Panel title="按钮 Buttons" description="五种变体 · 三种尺寸 · 状态演示" className="lg:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <KawaiiButton>
            <Sparkles aria-hidden />
            主要按钮
          </KawaiiButton>
          <KawaiiButton variant="secondary">次要按钮</KawaiiButton>
          <KawaiiButton variant="outline">描边按钮</KawaiiButton>
          <KawaiiButton variant="ghost">幽灵按钮</KawaiiButton>
          <KawaiiButton variant="danger">危险操作</KawaiiButton>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <KawaiiButton size="sm">小号</KawaiiButton>
          <KawaiiButton size="md" variant="secondary">
            中号
          </KawaiiButton>
          <KawaiiButton size="lg">
            <Wand2 aria-hidden />
            大号按钮
          </KawaiiButton>
          <KawaiiButton size="icon" variant="outline" aria-label="收藏">
            <Star aria-hidden />
          </KawaiiButton>
          <KawaiiButton size="icon" aria-label="喜欢">
            <Heart aria-hidden className="fill-current" />
          </KawaiiButton>
          <KawaiiButton onClick={fakeLoad} disabled={loading} variant="secondary">
            {loading ? <Loader2 aria-hidden className="animate-spin" /> : <Bell aria-hidden />}
            {loading ? '召唤中…' : '加载状态'}
          </KawaiiButton>
          <KawaiiButton disabled>禁用</KawaiiButton>
        </div>
      </Panel>

      <Panel title="弹窗 Alert Modal" description="原生 dialog · 焦点管理 · Esc 关闭">
        <div className="flex flex-col gap-3">
          <KawaiiButton onClick={openInfo} className="w-full">
            <Info aria-hidden />
            打开提示弹窗
          </KawaiiButton>
          <KawaiiButton onClick={openDanger} variant="outline" className="w-full">
            <TriangleAlert aria-hidden />
            打开警告弹窗
          </KawaiiButton>
          <p role="status" className="min-h-5 text-center text-xs font-semibold text-muted-foreground">
            {result}
          </p>
        </div>
      </Panel>

      <Panel title="提示条 Alerts" description="信息 · 成功 · 警告">
        <ul className="flex flex-col gap-3 text-sm">
          <li className="flex gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-3">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              <strong className="font-bold">新剧情解锁：</strong>
              {theme.name}的第二章已开放。
            </span>
          </li>
          <li className="flex gap-3 rounded-2xl border bg-secondary p-3 text-secondary-foreground">
            <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>存档同步成功，羁绊值 +10。</span>
          </li>
          <li className="flex gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-3">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-destructive" />
            <span>体力不足，请稍后再来冒险。</span>
          </li>
        </ul>
      </Panel>

      <Panel title="表单控件 Controls" description="开关 · 滑块 · 输入框">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span id="notify-label" className="text-sm font-bold">
              角色语音提醒
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              aria-labelledby="notify-label"
              onClick={() => setNotify((n) => !n)}
              className={cn(
                'relative h-7 w-12 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/40',
                notify ? 'bg-primary' : 'bg-muted',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 size-5 rounded-full bg-white shadow-md !transition-all !duration-300',
                  notify ? 'left-6' : 'left-1',
                )}
              />
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm font-bold">
              <label htmlFor="volume">BGM 音量</label>
              <span className="font-display text-primary">{volume}</span>
            </div>
            <input
              id="volume"
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--primary)]"
            />
          </div>
          <div>
            <label htmlFor="nickname" className="text-sm font-bold">
              你的昵称
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="旅行者"
              className="mt-2 h-11 w-full rounded-full border-2 bg-background/60 px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/20"
            />
          </div>
        </div>
      </Panel>

      <Panel title="调色板 Palette" description={`当前主题：${theme.themeName} · data-theme="${theme.id}"`}>
        <ul className="grid grid-cols-3 gap-3">
          {PALETTE.map((p) => (
            <li key={p.token} className="flex flex-col items-center gap-1.5">
              <span className={cn('size-12 rounded-2xl border-2 shadow-md', p.cls)} />
              <span className="text-xs font-bold">{p.name}</span>
              <code className="text-[10px] text-muted-foreground">{p.token}</code>
            </li>
          ))}
        </ul>
      </Panel>

      <AlertModal config={alert} onClose={() => setAlert(null)} onConfirm={confirm} />
    </div>
  )
}
