'use client'

import { useDevSidebar } from './DevSidebarProvider'
import { useTickerSidebar } from './TickerSidebarProvider'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const { isCollapsed: devSidebarCollapsed } = useDevSidebar()
  const { isCollapsed: tickerCollapsed, isVisible: tickerVisible } = useTickerSidebar()
  
  // Calculate left margin for dev sidebar
  const leftMargin = devSidebarCollapsed 
    ? 'ml-0 lg:ml-16' // 60px = 4rem = 16 in Tailwind
    : 'ml-0 lg:ml-64' // 260px = 16rem = 64 in Tailwind
  
  // Calculate right margin for ticker sidebar
  let tickerMarginClass = ''
  if (tickerVisible) {
    tickerMarginClass = tickerCollapsed ? 'ticker-sidebar-collapsed' : 'ticker-sidebar-expanded'
  }
  
  return (
    <div className={`transition-all duration-300 ${leftMargin} ${tickerMarginClass} ${className}`}>
      {children}
    </div>
  )
}