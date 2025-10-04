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
  TrendingUp,
  Search,
  Briefcase,
  Users,
  Store
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
    // Token & Rewards at top
    { path: '/token', icon: Coins, label: '$BVIDEO', badge: 'NEW' },
    { path: '/rewards', icon: TrendingUp, label: 'Creator Rewards' },
    { path: '/commissions', icon: Video, label: 'Commission Hub', badge: 'BETA' },
    
    // Video Creators Section
    { divider: true },
    { section: 'CREATORS' },
    { path: '/studio', icon: Monitor, label: 'Video Studio' },
    { path: '/create', icon: Upload, label: 'Upload & Edit', badge: 'NEW' },
    { path: '/creator/offers', icon: FileText, label: 'Create Content Offer' },
    { path: '/publisher/requests', icon: Search, label: 'Find Sponsors', badge: '8' },
    { path: '/docs/creator-guide', icon: BookOpen, label: 'Creator Guide' },
    
    // Publishers Section
    { divider: true },
    { section: 'PUBLISHERS' },
    { path: '/publisher/offer', icon: Briefcase, label: 'Commission Videos' },
    { path: '/creator/marketplace', icon: Users, label: 'Find Creators', badge: '24' },
    { path: '/analytics', icon: BarChart3, label: 'Campaign Analytics' },
    { path: '/enterprise', icon: Store, label: 'Enterprise Plan' },
    
    // Developers Section
    { divider: true },
    { section: 'DEVELOPERS' },
    { path: '/developer/offer', icon: Sparkles, label: 'Create Dev Offer' },
    { path: '/contracts', icon: Terminal, label: 'Find Work', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/contributions', icon: Users, label: 'Contributors', badge: '3' },
    { path: '/api', icon: Package, label: 'API Reference' },
    
    // System
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-video', icon: Github, label: 'GitHub', external: true },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status', badge: 'OK' }
  ]

  const stats = {
    totalRewards: '₿2.5',
    activeCreators: '156',
    totalCommissions: '₿12.8',
    openContracts: issueCount || 0,
    platformShare: '95%'
  }

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Sparkles className="dev-sidebar-logo" />
            <span>Creator Hub</span>
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
          <h4>Creator Economy</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Rewards</span>
            <span className="dev-stat-value">{stats.totalRewards}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Active Creators</span>
            <span className="dev-stat-value">{stats.activeCreators}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Commissions</span>
            <span className="dev-stat-value">{stats.totalCommissions}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Open Contracts</span>
            <span className="dev-stat-value">{stats.openContracts}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Creator Share</span>
            <span className="dev-stat-value">{stats.platformShare}</span>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Start Earning Bitcoin</p>
            <a 
              href="/studio" 
              className="dev-sidebar-cta-button"
            >
              Create Your First Video
            </a>
          </div>
        </div>
      )}
    </div>
  )
}