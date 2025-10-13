'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface DevSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const DevSidebarContext = createContext<DevSidebarContextType | undefined>(undefined)

export function DevSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true) // Always start collapsed to match server
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // After hydration, check localStorage and update state if needed
    setIsHydrated(true)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed')
      if (saved !== null) {
        setIsCollapsed(saved === 'true')
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever state changes (but only after hydration)
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString())
    }
  }, [isCollapsed, isHydrated])

  return (
    <DevSidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </DevSidebarContext.Provider>
  )
}

export function useDevSidebar() {
  const context = useContext(DevSidebarContext)
  if (context === undefined) {
    throw new Error('useDevSidebar must be used within a DevSidebarProvider')
  }
  return context
}