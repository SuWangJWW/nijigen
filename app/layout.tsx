import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka', weight: ['400', '500', '600', '700'] })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Kemono UI · 二次元主题组件框架',
  description: '支持六种角色主题的动漫风格 UI 框架预览：樱花猫娘、冰川狼、薄荷治愈师、夕阳狐、绯红吸血鬼与暗影狼人。',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#fdf2f8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      data-theme="pink-neko"
      data-mode="light"
      className={`${fredoka.variable} ${nunito.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
