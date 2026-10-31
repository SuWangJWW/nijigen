import type { EarType } from '@/lib/themes'

const LEAF = 'rounded-[0_100%_0_100%]'

function Ear({
  side,
  size,
  scaleY,
  tilt,
  innerInset,
  twitch,
}: {
  side: 'left' | 'right'
  size: string
  scaleY: number
  tilt: number
  innerInset: string
  twitch?: boolean
}) {
  const rotation = side === 'left' ? 45 - tilt : 45 + tilt
  return (
    <div
      className={side === 'left' ? 'absolute left-2' : 'absolute right-2'}
      style={{ top: 0, transformOrigin: 'bottom center' }}
    >
      <div
        className={twitch && side === 'right' ? 'animate-[ear-twitch_5s_ease-in-out_infinite]' : undefined}
        style={{ transformOrigin: '50% 90%' }}
      >
        <div
          className={`relative ${size} ${LEAF} bg-ear shadow-lg shadow-glow`}
          style={{ transform: `scaleY(${scaleY}) rotate(${rotation}deg)` }}
        >
          <div className={`absolute ${innerInset} ${LEAF} bg-ear-inner`} />
        </div>
      </div>
    </div>
  )
}

export function CharacterEars({ type }: { type: EarType }) {
  if (type === 'cat') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-16">
        <Ear side="left" size="size-14" scaleY={1} tilt={14} innerInset="inset-3" twitch />
        <Ear side="right" size="size-14" scaleY={1} tilt={14} innerInset="inset-3" twitch />
      </div>
    )
  }

  if (type === 'wolf') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-9 h-20">
        <Ear side="left" size="size-14" scaleY={1.45} tilt={8} innerInset="inset-[0.85rem]" />
        <Ear side="right" size="size-14" scaleY={1.45} tilt={8} innerInset="inset-[0.85rem]" />
      </div>
    )
  }

  if (type === 'fox') {
    return (
      <div aria-hidden className="pointer-events-none absolute -inset-x-2 -top-10 h-20">
        <Ear side="left" size="size-[4.25rem]" scaleY={1.3} tilt={18} innerInset="inset-3.5" twitch />
        <Ear side="right" size="size-[4.25rem]" scaleY={1.3} tilt={18} innerInset="inset-3.5" twitch />
      </div>
    )
  }

  if (type === 'leaf') {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-5 z-20 flex justify-center">
        <div className="relative h-10 w-24">
          <span className={`absolute left-3 top-3 size-7 ${LEAF} -rotate-12 bg-ear shadow-md`} />
          <span className={`absolute right-3 top-3 size-7 ${LEAF} rotate-[100deg] bg-ear shadow-md`} />
          <span className={`absolute left-1/2 top-0 size-8 -translate-x-1/2 ${LEAF} rotate-45 bg-primary shadow-md`} />
          <span className="absolute left-1/2 top-6 size-3 -translate-x-1/2 rounded-full bg-ear-inner ring-2 ring-card" />
        </div>
      </div>
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {(['left', 'right'] as const).map((side) => (
        <div
          key={side}
          className={`absolute top-4 h-14 w-20 ${side === 'left' ? '-left-14' : '-right-14 -scale-x-100'}`}
        >
          <div
            className="size-full origin-right animate-[ear-twitch_3s_ease-in-out_infinite] bg-gradient-to-l from-ear-inner to-ear"
            style={{
              clipPath:
                'polygon(100% 25%, 72% 0%, 48% 18%, 22% 4%, 0% 30%, 14% 46%, 4% 78%, 30% 62%, 50% 96%, 70% 66%, 100% 85%)',
            }}
          />
        </div>
      ))}
    </div>
  )
}
