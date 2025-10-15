'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface TickerSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
}

const TickerSidebarContext = createContext<TickerSidebarContextType | undefined>(undefined)

export function TickerSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Handle responsive visibility
  useEffect(() => {
    const handleResize = () => {
      // Hide ticker sidebar on screens smaller than 1200px
      if (window.innerWidth < 1200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    // Check on mount
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <TickerSidebarContext.Provider value={{
      isCollapsed,
      setIsCollapsed,
      isVisible,
      setIsVisible
    }}>
      {children}
    </TickerSidebarContext.Provider>
  )
}

export function useTickerSidebar() {
  const context = useContext(TickerSidebarContext)
  if (context === undefined) {
    throw new Error('useTickerSidebar must be used within a TickerSidebarProvider')
  }
  return context
}