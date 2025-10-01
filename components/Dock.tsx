'use client'

import React, { useState, useEffect } from 'react'
import { 
  Wallet, 
  Mail, 
  Music, 
  FileText, 
  HardDrive, 
  Calendar, 
  Search, 
  Table, 
  Share2, 
  Briefcase, 
  Store, 
  Wifi, 
  Volume2, 
  Battery, 
  Clock, 
  TrendingUp, 
  Building2, 
  Shield,
  Video,
  Play
} from 'lucide-react'

interface DockApp {
  id?: string
  name: string
  icon: any
  color: string
  url?: string
  disabled?: boolean
  current?: boolean
  isImage?: boolean
}

const Dock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getIconColor = (colorClass: string): string => {
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316',
      'text-bitcoin-orange': '#f7931a',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7',
      'text-fuchsia-500': '#d946ef',
      'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6',
      'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8',
      'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee'
    }
    return colorMap[colorClass] || '#ffffff'
  }

  const dockApps: DockApp[] = [
    { name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/' },
    { name: 'Bitcoin Video', icon: Video, color: 'text-orange-500', current: true },
    { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-gray-500', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Search', icon: Search, color: 'text-blue-500', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-cyan-400', url: 'https://bitcoin-jobs.vercel.app/' },
  ]

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[99997] p-2 bg-black/75 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between h-16 px-2">
        {/* App icons on the left */}
        <div className="flex items-center gap-2">
          {dockApps.map((app) => {
            const Icon = app.icon
            return (
              <button
                key={app.name}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 ${
                  app.current ? '' : ''
                } ${
                  app.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => handleAppClick(app)}
                title={app.name}
                disabled={app.disabled}
              >
                <Icon 
                  className="w-9 h-9 transition-all duration-200" 
                  style={{ color: getIconColor(app.color) }} 
                />
                {app.current && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
        
        {/* Status icons on the right */}
        <div className="flex items-center gap-3 pl-4 ml-4 border-l border-white/20">
          <button className="p-1 hover:bg-white/10 rounded" title="Connected">
            <Wifi className="w-4 h-4 text-green-500" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded" title="Volume">
            <Volume2 className="w-4 h-4 text-white/60" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded" title="Battery: 100%">
            <Battery className="w-4 h-4 text-green-500" />
          </button>
          <div className="flex items-center gap-1.5 text-white/80 text-xs" title={mounted ? currentTime.toLocaleDateString() : ''}>
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {mounted ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dock