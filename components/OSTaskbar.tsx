'use client'

import { Bitcoin, Home, Upload, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface TaskbarProps {
  currentPage?: string
}

export default function OSTaskbar({ currentPage }: TaskbarProps) {
  const pages = [
    { id: 'home', name: 'Home', icon: Home, href: '/' },
    { id: 'create', name: 'Create', icon: Upload, href: '/create' },
    { id: 'trending', name: 'Trending', icon: TrendingUp, href: '/trending' },
    { id: 'ai', name: 'AI Videos', icon: Sparkles, href: '/automated' },
  ]

  return (
    <div className="flex fixed top-12 left-0 right-0 h-8 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-[99996] items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <button className="p-1 hover:bg-white/10 rounded transition-colors">
          <Bitcoin className="w-4 h-4 text-red-600" />
        </button>
        
        <div className="border-l border-gray-600 h-4 mx-2" />
        
        {/* Open Pages */}
        <div className="flex space-x-1">
          {pages.map((page) => {
            const Icon = page.icon
            const isActive = currentPage === page.id
            return (
              <Link
                key={page.id}
                href={page.href}
                className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1 ${
                  isActive 
                    ? 'bg-red-600 text-black' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {page.name}
              </Link>
            )
          })}
        </div>
      </div>
      
      <div className="text-xs text-gray-400">
        Bitcoin Video OS
      </div>
    </div>
  )
}