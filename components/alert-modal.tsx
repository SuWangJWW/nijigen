'use client'

import { useEffect, useRef } from 'react'
import { Info, TriangleAlert } from 'lucide-react'
import { KawaiiButton } from './kawaii-button'
import { cn } from '@/lib/utils'

export interface AlertConfig {
  variant: 'info' | 'danger'
  title: string
  description: string
  confirmLabel: string
}

export function AlertModal({
  config,
  onClose,
  onConfirm,
}: {
  config: AlertConfig | null
  onClose: () => void
  onConfirm: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (config && !dialog.open) dialog.showModal()
    if (!config && dialog.open) dialog.close()
  }, [config])

  const danger = config?.variant === 'danger'

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="alert-title"
      aria-describedby="alert-desc"
      className="m-auto w-[min(92vw,26rem)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/40 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-90 open:duration-300"
    >
      {config && (
        <div className="relative rounded-[2rem] border bg-popover p-7 pt-12 text-center text-popover-foreground shadow-2xl shadow-glow">
          <div
            className={cn(
              'absolute -top-8 left-1/2 grid size-16 -translate-x-1/2 place-items-center rounded-full border-4 border-popover shadow-lg',
              danger ? 'bg-destructive text-white' : 'bg-primary text-primary-foreground shadow-glow',
            )}
          >
            {danger ? <TriangleAlert aria-hidden className="size-7" /> : <Info aria-hidden className="size-7" />}
          </div>
          <h2 id="alert-title" className="font-display text-xl font-bold text-balance">
            {config.title}
          </h2>
          <p id="alert-desc" className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {config.description}
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <KawaiiButton variant="secondary" onClick={onClose} className="sm:min-w-28">
              再想想
            </KawaiiButton>
            <KawaiiButton
              variant={danger ? 'danger' : 'primary'}
              onClick={onConfirm}
              autoFocus
              className="sm:min-w-28"
            >
              {config.confirmLabel}
            </KawaiiButton>
          </div>
        </div>
      )}
    </dialog>
  )
}
