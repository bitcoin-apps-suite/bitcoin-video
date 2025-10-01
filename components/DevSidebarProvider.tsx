'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface DevSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const DevSidebarContext = createContext<DevSidebarContextType | undefined>(undefined)

export function DevSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed')
      // Default to collapsed (closed) for first-time visitors
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString())
    }
  }, [isCollapsed])

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