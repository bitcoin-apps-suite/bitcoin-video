'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, BookOpen } from 'lucide-react'
import './TopMenuBar.css'

interface MenuItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  icon?: string
  external?: boolean
}

interface Menu {
  label: string
  items: MenuItem[]
}

interface TopMenuBarProps {
  onOpenApp?: (appName: string) => void
}

export default function TopMenuBar({ onOpenApp }: TopMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBAppsMenu, setShowBAppsMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = [
    { name: 'Bitcoin Video', color: '#f97316', url: '/' },
    { name: 'Bitcoin Apps Store', color: '#f97316', url: 'https://www.bitcoinapps.store/' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', color: '#06b6d4', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', color: '#d946ef', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Search', color: '#3b82f6', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#6b7280', url: 'https://bitcoin-jobs.vercel.app/' }
  ]

  const menus: Menu[] = [
    {
      label: 'Bitcoin Video',
      items: [
        { 
          label: 'Home', 
          shortcut: '⌘⇧H',
          action: () => window.location.href = '/'
        },
        { divider: true },
        { 
          label: 'About Bitcoin Video', 
          action: () => alert('Bitcoin Video v1.0\n\nThe YouTube of Bitcoin\n\n© 2025 The Bitcoin Corporation LTD')
        },
        { divider: true },
        { 
          label: 'Create Video', 
          shortcut: '⌘N',
          action: () => window.location.href = '/create'
        },
        { 
          label: 'Trending Videos', 
          action: () => window.location.href = '/trending'
        },
        { 
          label: 'AI Videos', 
          action: () => window.location.href = '/automated'
        }
      ]
    },
    {
      label: 'Create',
      items: [
        { 
          label: 'New Video', 
          shortcut: '⌘N',
          action: () => window.location.href = '/create'
        },
        { 
          label: 'Upload Video', 
          action: () => window.location.href = '/create?tab=upload'
        },
        { divider: true },
        { 
          label: 'AI Automation', 
          action: () => window.location.href = '/create?tab=ai'
        },
        { 
          label: 'News → Video', 
          action: () => console.log('News to Video')
        },
        { 
          label: 'Tweet → Video', 
          action: () => console.log('Tweet to Video')
        }
      ]
    },
    {
      label: 'View',
      items: [
        { 
          label: 'Home Feed', 
          action: () => window.location.href = '/'
        },
        { 
          label: 'Trending', 
          action: () => window.location.href = '/trending'
        },
        { 
          label: 'Categories', 
          action: () => console.log('Categories')
        },
        { divider: true },
        { 
          label: 'Search Videos', 
          shortcut: '⌘F',
          action: () => document.getElementById('search-input')?.focus()
        },
        { divider: true },
        { 
          label: 'Full Screen', 
          shortcut: '⌃⌘F',
          action: () => document.documentElement.requestFullscreen()
        }
      ]
    },
    {
      label: 'Tools',
      items: [
        { 
          label: 'Bitcoin Apps Store', 
          action: () => window.open('https://www.bitcoinapps.store/', '_blank')
        },
        { 
          label: 'Video Analytics', 
          action: () => console.log('Video Analytics')
        },
        { divider: true },
        { 
          label: 'Video Studio', 
          action: () => window.location.href = '/'
        },
        { 
          label: 'Monetization', 
          action: () => console.log('Monetization')
        },
        { 
          label: 'Copyright Center', 
          action: () => console.log('Copyright Center')
        }
      ]
    },
    {
      label: 'Help',
      items: [
        { 
          label: 'Bitcoin Video Help', 
          shortcut: '⌘?',
          action: () => alert('Bitcoin Video v1.0\n\nThe YouTube of Bitcoin\n\nBuilt for Bitcoin content creators')
        },
        { 
          label: 'Creator Guidelines', 
          action: () => console.log('Creator Guidelines')
        },
        { 
          label: 'Community Standards', 
          action: () => console.log('Community Standards')
        },
        { divider: true },
        { 
          label: 'Documentation', 
          action: () => window.open('/docs', '_blank')
        },
        { 
          label: 'API Reference', 
          action: () => window.open('/docs/api', '_blank')
        },
        { divider: true },
        { 
          label: 'GitHub Repository', 
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-video',
          external: true
        },
        { 
          label: 'Report an Issue', 
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-video/issues',
          external: true
        }
      ]
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setShowBAppsMenu(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setShowBAppsMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={menuRef} className="bitcoin-os-taskbar">
      {/* Bitcoin Logo with BApps Menu */}
      <div style={{ position: 'relative' }}>
        <button 
          className={`taskbar-logo ${showBAppsMenu ? 'menu-open' : ''}`}
          onClick={() => {
            setShowBAppsMenu(!showBAppsMenu)
            setActiveMenu(null)
          }}
          onDoubleClick={() => window.location.href = '/'}
          title="Click for apps • Double-click to go home"
          style={{ 
            background: showBAppsMenu ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            transition: 'background 0.15s ease'
          }}
        >
          <span className="bitcoin-symbol">₿</span>
        </button>
        
        {/* BApps Dropdown */}
        {showBAppsMenu && (
          <div style={{
            position: 'absolute',
            top: '28px',
            left: 0,
            minWidth: '220px',
            background: '#1a1a1a',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            padding: '8px 0',
            zIndex: 1000
          }}>
            <div style={{
              padding: '8px 16px',
              fontSize: '12px',
              color: '#f97316',
              fontWeight: '600',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '4px'
            }}>
              Bitcoin Apps
            </div>
            
            {bitcoinApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  color: '#ffffff',
                  background: 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'background 0.15s ease',
                  cursor: 'pointer'
                }}
                onClick={(e) => {
                  if (app.url === '#') {
                    e.preventDefault()
                  } else {
                    e.preventDefault()
                    window.location.href = app.url
                  }
                  setShowBAppsMenu(false)
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span 
                  style={{ 
                    color: app.color,
                    marginRight: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ₿
                </span>
                <span>
                  {app.name}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="taskbar-menus">
        {menus.map((menu) => (
          <div key={menu.label} className="menu-container">
            <button
              className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            >
              {menu.label}
            </button>

            {/* Dropdown Menu */}
            {activeMenu === menu.label && (
              <div className="dropdown-menu">
                {menu.items.map((item, index) => (
                  item.divider ? (
                    <div key={index} className="menu-divider" />
                  ) : item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="menu-item"
                      onClick={() => setActiveMenu(null)}
                    >
                      <span className="menu-item-content">
                        {item.icon && <span className="menu-icon">{item.icon}</span>}
                        <span className="menu-label">{item.label}</span>
                      </span>
                      {item.shortcut && (
                        <span className="menu-shortcut">{item.shortcut}</span>
                      )}
                    </a>
                  ) : (
                    <button
                      key={index}
                      className="menu-item"
                      onClick={() => {
                        item.action?.()
                        setActiveMenu(null)
                      }}
                    >
                      <span className="menu-item-content">
                        {item.icon && <span className="menu-icon">{item.icon}</span>}
                        <span className="menu-label">{item.label}</span>
                      </span>
                      {item.shortcut && (
                        <span className="menu-shortcut">{item.shortcut}</span>
                      )}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side - Status */}
      <div className="taskbar-status">
        <a 
          href="https://github.com/bitcoin-apps-suite/bitcoin-video" 
          target="_blank" 
          rel="noopener noreferrer"
          className="taskbar-link"
          title="GitHub"
        >
          <Github className="taskbar-link-icon" />
        </a>
        <a 
          href="/docs" 
          className="taskbar-link"
          title="Documentation"
        >
          <BookOpen className="taskbar-link-icon" />
        </a>
      </div>
    </div>
  )
}