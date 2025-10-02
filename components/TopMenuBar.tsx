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
    { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
    { name: 'Bitcoin Calendar', color: '#d946ef', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Chat', color: '#ff6500', url: '#' },
    { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
    { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Email', color: '#06b6d4', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#6b7280', url: '#' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
    { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Search', color: '#6b7280', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: 'https://bitcoin-shares.vercel.app' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', color: '#65a30d', url: '/' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
  ]

  const menus: Menu[] = [
    {
      label: 'Bitcoin Code',
      items: [
        { 
          label: 'Home', 
          shortcut: '⌘⇧H',
          action: () => window.location.href = '/'
        },
        { divider: true },
        { 
          label: 'About Bitcoin Code', 
          action: () => alert('Bitcoin Code v1.0\n\nThe IDE of Bitcoin\n\n© 2025 The Bitcoin Corporation LTD')
        },
        { divider: true },
        { 
          label: 'New Project', 
          shortcut: '⌘N',
          action: () => window.location.href = '/create'
        },
        { 
          label: 'Browse Code', 
          action: () => window.location.href = '/browse'
        },
        { 
          label: 'AI Code', 
          action: () => window.location.href = '/automated'
        }
      ]
    },
    {
      label: 'Create',
      items: [
        { 
          label: 'New Project', 
          shortcut: '⌘N',
          action: () => window.location.href = '/create'
        },
        { 
          label: 'Import Repository', 
          action: () => window.location.href = '/create?tab=import'
        },
        { divider: true },
        { 
          label: 'AI Code Generator', 
          action: () => window.location.href = '/create?tab=ai'
        },
        { 
          label: 'Code → App', 
          action: () => console.log('Code to App')
        },
        { 
          label: 'Idea → Code', 
          action: () => console.log('Idea to Code')
        }
      ]
    },
    {
      label: 'View',
      items: [
        { 
          label: 'Dashboard', 
          action: () => window.location.href = '/'
        },
        { 
          label: 'Trending Code', 
          action: () => window.location.href = '/trending'
        },
        { 
          label: 'Categories', 
          action: () => console.log('Categories')
        },
        { divider: true },
        { 
          label: 'Search Code', 
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
          label: 'Code Analytics', 
          action: () => console.log('Code Analytics')
        },
        { divider: true },
        { 
          label: 'Developer Studio', 
          action: () => console.log('Developer Studio')
        },
        { 
          label: 'Code Monetization', 
          action: () => console.log('Code Monetization')
        },
        { 
          label: 'License Center', 
          action: () => console.log('License Center')
        }
      ]
    },
    {
      label: 'Help',
      items: [
        { 
          label: 'Bitcoin Code Help', 
          shortcut: '⌘?',
          action: () => alert('Bitcoin Code v1.0\n\nThe IDE of Bitcoin\n\nBuilt for Bitcoin developers')
        },
        { 
          label: 'Developer Guidelines', 
          action: () => console.log('Developer Guidelines')
        },
        { 
          label: 'Coding Standards', 
          action: () => console.log('Coding Standards')
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
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-code',
          external: true
        },
        { 
          label: 'Report an Issue', 
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-code/issues',
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
            background: showBAppsMenu ? '#0058d1' : 'transparent',
            border: 'none',
            cursor: 'default',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            transition: 'background 0.05s ease'
          }}
        >
          <span className="bitcoin-symbol">₿</span>
        </button>
        
        {/* BApps Dropdown */}
        {showBAppsMenu && (
          <div style={{
            position: 'absolute',
            top: '22px',
            left: 0,
            minWidth: '200px',
            background: 'rgba(36, 36, 36, 0.98)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '0.5px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '5px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)',
            padding: '3px 0',
            zIndex: 1000
          }}>
            <div style={{
              padding: '0 12px',
              height: '19px',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '400',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '3px',
              display: 'flex',
              alignItems: 'center'
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
                  width: '100%',
                  height: '19px',
                  padding: '0 12px',
                  margin: '0',
                  background: 'transparent',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '11px',
                  lineHeight: '19px',
                  fontWeight: '400',
                  cursor: 'default',
                  transition: 'none',
                  position: 'relative'
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0058d1'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'
                }}
              >
                <span 
                  style={{ 
                    color: app.color,
                    marginRight: '8px',
                    fontSize: '11px',
                    fontWeight: '400'
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