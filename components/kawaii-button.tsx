import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const kawaiiButton = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-medium tracking-wide outline-none !transition-all !duration-300 focus-visible:ring-4 focus-visible:ring-ring/40 active:scale-95 disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-lg shadow-glow hover:-translate-y-0.5 hover:shadow-xl hover:shadow-glow before:pointer-events-none before:absolute before:inset-x-3 before:top-1 before:h-1/3 before:rounded-full before:bg-white/25',
        secondary: 'bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground',
        outline: 'border-2 border-primary/40 bg-transparent text-primary hover:border-primary hover:bg-primary/10',
        ghost: 'text-foreground hover:bg-muted',
        danger: 'bg-destructive text-white shadow-lg shadow-destructive/30 hover:-translate-y-0.5 hover:brightness-110',
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export function KawaiiButton({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof kawaiiButton>) {
  return <button type={type} className={cn(kawaiiButton({ variant, size }), className)} {...props} />
}
