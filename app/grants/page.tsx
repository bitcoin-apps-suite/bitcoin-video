'use client'

import { useState } from 'react'
import { Flower2, DollarSign, Users, Code, Video, Zap, CheckCircle, Clock, TrendingUp, Github } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import DockManager from '@/components/DockManager'
import CleanTaskbar from '@/components/CleanTaskbar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './grants.css'

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState('available')

  const grants = [
    {
      id: 1,
      title: 'Video Processing Infrastructure',
      description: 'Build scalable video encoding, compression, and streaming infrastructure for high-quality content delivery.',
      reward: 'Large $BVIDEO',
      equity: '2%',
      timeline: '3-6 months',
      status: 'available',
      category: 'Infrastructure',
      requirements: ['Video Processing', 'Cloud Infrastructure', 'CDN', 'FFmpeg'],
      milestones: [
        'Video upload and validation system',
        'Multi-format encoding pipeline',
        'Streaming optimization',
        'Performance testing and deployment'
      ]
    },
    {
      id: 2,
      title: 'Creator NFT Marketplace',
      description: 'Develop a complete NFT marketplace for video content with minting, trading, and royalty distribution.',
      reward: 'Large $BVIDEO',
      equity: '3%',
      timeline: '4-8 months',
      status: 'available',
      category: 'Web3',
      requirements: ['Smart Contracts', 'NFT Standards', 'BSV', 'Web3 UX'],
      milestones: [
        'NFT minting system',
        'Marketplace interface',
        'Royalty distribution',
        'Secondary market trading'
      ]
    },
    {
      id: 3,
      title: 'Mobile Creator App',
      description: 'React Native mobile application for content creators with video recording, editing, and publishing.',
      reward: 'Large $BVIDEO',
      equity: '2.5%',
      timeline: '4-7 months',
      status: 'in_progress',
      category: 'Mobile',
      requirements: ['React Native', 'Video Editing', 'Mobile UX', 'Camera APIs'],
      milestones: [
        'Core app structure',
        'Video recording and editing',
        'Publishing workflow',
        'App store deployment'
      ]
    },
    {
      id: 4,
      title: 'Creator Analytics Dashboard',
      description: 'Comprehensive analytics platform for creators to track performance, earnings, and audience insights.',
      reward: 'Substantial $BVIDEO',
      equity: '1.5%',
      timeline: '2-4 months',
      status: 'completed',
      category: 'Analytics',
      requirements: ['Data Visualization', 'Real-time Analytics', 'Dashboard Design'],
      milestones: [
        'Data collection system',
        'Visualization components',
        'Performance metrics',
        'Export and reporting'
      ]
    }
  ]

  const filteredGrants = grants.filter(grant => 
    activeTab === 'all' || grant.status === activeTab
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'in_progress': return 'bg-blue-500'
      case 'completed': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Zap className="w-4 h-4" />
      case 'in_progress': return <Clock className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="grants-page">
        <ProofOfConceptBar />
        <CleanTaskbar 
          onNewVideo={() => console.log('New project')}
          onSaveVideo={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="grants-container">
        {/* Hero Section */}
        <section className="grants-hero">
          <h1><span style={{color: '#ffffff'}}>Developer</span> <span style={{color: '#f97316'}}>Grants</span> <span style={{color: '#ffffff'}}>Program</span></h1>
          <p className="grants-tagline">
            Large-scale development grants for building core platform features
          </p>
          <div className="grants-badge">Major Funding</div>
        </section>

        {/* Grant Benefits */}
        <section className="benefits-section">
          <h2>Grant Benefits & Rewards</h2>
          <div className="benefits-content">
            <p className="intro">
              Our developer grant program offers substantial rewards for building core platform features. 
              Contributors receive significant $BVIDEO token allocations plus potential platform equity.
            </p>
            <div className="benefits-points">
              <div className="point">
                <h3>Large Token Rewards</h3>
                <p>Substantial $BVIDEO tokens per completed grant</p>
              </div>
              <div className="point">
                <h3>Platform Equity</h3>
                <p>1.5% - 5% ownership participation for major contributors</p>
              </div>
              <div className="point">
                <h3>Technical Support</h3>
                <p>Direct mentorship and guidance from core team</p>
              </div>
              <div className="point">
                <h3>Milestone Payments</h3>
                <p>Progressive token distribution as you complete deliverables</p>
              </div>
            </div>
          </div>
        </section>

        {/* Grant Filter Section */}
        <section className="filter-section">
          <h2>Available Grants</h2>
          <div className="filter-tabs">
            {[
              { id: 'available', label: 'Available', icon: Zap },
              { id: 'in_progress', label: 'In Progress', icon: Clock },
              { id: 'completed', label: 'Completed', icon: CheckCircle },
              { id: 'all', label: 'All Grants', icon: Code }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`filter-tab ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* Grants Listing */}
        <section className="grants-section">
          <div className="grants-grid">
            {filteredGrants.map(grant => (
              <div key={grant.id} className="grant-card">
                <div className="grant-header">
                  <div className="grant-meta">
                    <span className="category-badge">{grant.category}</span>
                    <span className={`status-badge status-${grant.status}`}>
                      {getStatusIcon(grant.status)}
                      {grant.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="grant-title">{grant.title}</h3>
                </div>
                
                <p className="grant-description">{grant.description}</p>
                
                <div className="grant-stats">
                  <div className="stat">
                    <span className="stat-label">Token Reward</span>
                    <span className="stat-value">{grant.reward}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Equity</span>
                    <span className="stat-value">{grant.equity}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Timeline</span>
                    <span className="stat-value">{grant.timeline}</span>
                  </div>
                </div>
                
                <div className="grant-requirements">
                  <span className="requirements-label">Required Skills</span>
                  <div className="requirements-tags">
                    {grant.requirements.map((req, index) => (
                      <span key={index} className="requirement-tag">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grant-milestones">
                  <span className="milestones-label">Key Milestones</span>
                  <ul className="milestones-list">
                    {grant.milestones.slice(0, 3).map((milestone, index) => (
                      <li key={index}>
                        <span className="milestone-bullet">•</span>
                        {milestone}
                      </li>
                    ))}
                    {grant.milestones.length > 3 && (
                      <li className="milestone-more">...and {grant.milestones.length - 3} more</li>
                    )}
                  </ul>
                </div>
                
                <div className="grant-actions">
                  <button 
                    className={`apply-btn ${
                      grant.status === 'available' ? 'active' : 'disabled'
                    }`}
                    disabled={grant.status !== 'available'}
                  >
                    {grant.status === 'available' ? 'Apply for Grant' : 'Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="process-section">
          <h2>Grant Application Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Proposal</h3>
              <p>Submit detailed proposal with timeline and technical approach</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Technical Review</h3>
              <p>Technical evaluation and team interview process</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Grant Approval</h3>
              <p>Approval and milestone agreement finalization</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Development</h3>
              <p>Build with ongoing support and milestone payments</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Ready to Build the Future?</h2>
          <div className="cta-buttons">
            <button className="cta-btn primary">
              <Flower2 className="w-4 h-4" />
              Apply for Grant
            </button>
            <a 
              href="/commissions"
              className="cta-btn secondary"
            >
              <Code className="w-4 h-4" />
              Browse Smaller Contracts
            </a>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-video"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn secondary"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
          </div>
        </section>
          </div>
        </ResponsiveLayout>
        
        <DevSidebar />
        <DockManager currentApp="bitcoin-video" />
      </div>
  )
}