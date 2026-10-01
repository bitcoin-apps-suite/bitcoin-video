'use client'

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react'

interface DevSidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const DevSidebarContext = createContext<DevSidebarContextType | undefined>(undefined)

const STORAGE_KEY = 'devSidebarCollapsed'
const CHANGE_EVENT = 'devSidebarCollapsedChanged'

const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

// Default to collapsed when nothing is stored (and on the server) so the
// first client render matches the server render.
const getSnapshot = () => localStorage.getItem(STORAGE_KEY) !== 'false'
const getServerSnapshot = () => true

export function DevSidebarProvider({ children }: { children: React.ReactNode }) {
  const isCollapsed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setIsCollapsed = useCallback((collapsed: boolean) => {
    localStorage.setItem(STORAGE_KEY, collapsed.toString())
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

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