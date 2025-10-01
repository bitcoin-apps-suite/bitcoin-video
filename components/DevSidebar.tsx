'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useDevSidebar } from './DevSidebarProvider'
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  FileCode,
  FileText,
  Coins,
  Github,
  GitPullRequest,
  BookOpen,
  History,
  CheckCircle,
  Terminal,
  Package,
  Upload,
  Video,
  Sparkles,
  BarChart3,
  TrendingUp
} from 'lucide-react'
import './DevSidebar.css'

export default function DevSidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useDevSidebar()
  const [issueCount, setIssueCount] = useState<number>(0)

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-video/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : 0)
      } catch (error) {
        console.error('Error fetching issues:', error)
        setIssueCount(0)
      }
    }
    fetchIssues()
  }, [])

  const menuItems: Array<{
    path?: string
    icon?: React.ComponentType<{ size?: number; className?: string }>
    label?: string
    badge?: string
    divider?: boolean
    section?: string
    external?: boolean
  }> = [
    // Video Platform Features
    { path: '/', icon: Video, label: 'Home Feed' },
    { path: '/create', icon: Upload, label: 'Create Video', badge: 'NEW' },
    { path: '/trending', icon: TrendingUp, label: 'Trending Videos' },
    { path: '/automated', icon: Sparkles, label: 'AI Videos', badge: 'BETA' },
    
    // Analytics & Tools
    { divider: true },
    { section: 'ANALYTICS' },
    { path: '/analytics', icon: BarChart3, label: 'Video Analytics' },
    { path: '/creator-studio', icon: Monitor, label: 'Creator Studio' },
    { path: '/monetization', icon: Coins, label: 'Monetization' },
    
    // Development
    { divider: true },
    { section: 'DEVELOPMENT' },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-video', icon: Github, label: 'GitHub Repository', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-video/issues', icon: FileCode, label: 'Issues', badge: issueCount > 0 ? String(issueCount) : '0', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-video/pulls', icon: GitPullRequest, label: 'Pull Requests', external: true },
    
    // Documentation
    { divider: true },
    { section: 'DOCS' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/docs/creator-guide', icon: FileText, label: 'Creator Guide' },
    { path: '/docs/api', icon: Terminal, label: 'API Docs' },
    
    // System Status
    { divider: true },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'System Status', badge: 'OK' }
  ]

  const stats = {
    totalVideos: '1,234',
    activeCreators: '156',
    totalViews: '89.2K',
    openIssues: issueCount || 0,
    uptime: '99.9%'
  }

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Video className="dev-sidebar-logo" />
            <span>Bitcoin Video</span>
          </div>
        )}
        <button 
          className="dev-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="dev-sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />
          }

          if (item.section) {
            return !isCollapsed ? (
              <div key={index} className="dev-sidebar-section">
                {item.section}
              </div>
            ) : null
          }

          const Icon = item.icon
          const isActive = pathname === item.path

          if (item.external) {
            return (
              <a
                key={`${item.path}-${index}`}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {!isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            )
          }

          return (
            <a
              key={`${item.path}-${index}`}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              {!isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </a>
          )
        })}
      </nav>

      {/* Stats section */}
      {!isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>Platform Stats</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Videos</span>
            <span className="dev-stat-value">{stats.totalVideos}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Active Creators</span>
            <span className="dev-stat-value">{stats.activeCreators}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Views</span>
            <span className="dev-stat-value">{stats.totalViews}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Open Issues</span>
            <span className="dev-stat-value">{stats.openIssues}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Uptime</span>
            <span className="dev-stat-value">{stats.uptime}</span>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Join Development</p>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-video" 
              target="_blank" 
              rel="noopener noreferrer"
              className="dev-sidebar-cta-button"
            >
              Start Contributing
            </a>
          </div>
        </div>
      )}
    </div>
  )
}