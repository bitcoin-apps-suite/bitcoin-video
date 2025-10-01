'use client'

import { useDevSidebar } from './DevSidebarProvider'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  const { isCollapsed } = useDevSidebar()
  
  // Responsive margin based on sidebar state
  const marginClass = isCollapsed 
    ? 'ml-0 lg:ml-16' // Collapsed sidebar width (60px = 3.75rem = ~16 in Tailwind)
    : 'ml-0 lg:ml-64' // Expanded sidebar width (260px = 16rem = 64 in Tailwind)
  
  return (
    <div className={`transition-all duration-300 ${marginClass} ${className}`}>
      {children}
    </div>
  )
}