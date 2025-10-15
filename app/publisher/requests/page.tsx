'use client'

import React from 'react'
import { Briefcase, FileText, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Users, TrendingUp, Star, Badge, Zap } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import MinimalDock from '@/components/MinimalDock'
import CleanTaskbar from '@/components/CleanTaskbar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './requests.css'

export default function PublisherRequestsPage() {
  return (
    <div className="requests-page">
        <ProofOfConceptBar />
        <CleanTaskbar 
          onNewVideo={() => console.log('New project')}
          onSaveVideo={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="requests-container">
            {/* Hero Section */}
            <section className="requests-hero">
              <h1><span style={{color: '#ffffff'}}>Publisher</span> <span style={{color: '#dc2626'}}>Content</span> <span style={{color: '#ffffff'}}>Requests</span></h1>
              <p className="requests-tagline">
                Connect with creators and commission high-quality Bitcoin video content
              </p>
              <div className="requests-badge">Active Marketplace</div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
              <h2>How Publisher Requests Work</h2>
              <div className="workflow-grid">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <Briefcase className="workflow-icon" />
                  <h3>Post Your Request</h3>
                  <p>Define your content requirements, budget, and timeline for Bitcoin video projects</p>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <Users className="workflow-icon" />
                  <h3>Review Proposals</h3>
                  <p>Receive proposals from qualified Bitcoin Video creators and select the best fit</p>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <CheckCircle className="workflow-icon" />
                  <h3>Commission & Deliver</h3>
                  <p>Work directly with creators using our escrow system and receive your content</p>
                </div>
              </div>
            </section>

            {/* Active Requests Section */}
            <section className="active-requests-section">
              <h2>Browse Active Requests</h2>
              <div className="requests-grid">
                <div className="request-card featured">
                  <div className="request-header">
                    <Badge className="request-priority high" />
                    <span className="request-budget">$2,500 - $5,000</span>
                  </div>
                  <h3>Bitcoin Lightning Network Explainer Series</h3>
                  <p>Looking for a 5-part educational series explaining Lightning Network for beginners to advanced users.</p>
                  <div className="request-details">
                    <div className="detail-item">
                      <Calendar className="detail-icon" />
                      <span>Due: March 15, 2025</span>
                    </div>
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span>3-5 min per video</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp className="detail-icon" />
                      <span>7 proposals</span>
                    </div>
                  </div>
                  <div className="request-tags">
                    <span className="tag">Educational</span>
                    <span className="tag">Lightning Network</span>
                    <span className="tag">Series</span>
                  </div>
                </div>

                <div className="request-card">
                  <div className="request-header">
                    <Badge className="request-priority medium" />
                    <span className="request-budget">$1,000 - $2,000</span>
                  </div>
                  <h3>Bitcoin Mining Farm Documentary</h3>
                  <p>Documentary-style video showcasing sustainable Bitcoin mining operations and their environmental impact.</p>
                  <div className="request-details">
                    <div className="detail-item">
                      <Calendar className="detail-icon" />
                      <span>Due: April 1, 2025</span>
                    </div>
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span>10-15 minutes</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp className="detail-icon" />
                      <span>12 proposals</span>
                    </div>
                  </div>
                  <div className="request-tags">
                    <span className="tag">Documentary</span>
                    <span className="tag">Mining</span>
                    <span className="tag">Environment</span>
                  </div>
                </div>

                <div className="request-card">
                  <div className="request-header">
                    <Badge className="request-priority low" />
                    <span className="request-budget">$500 - $1,000</span>
                  </div>
                  <h3>Bitcoin DCA Strategy Animation</h3>
                  <p>Animated video explaining Dollar Cost Averaging strategies for Bitcoin investment newcomers.</p>
                  <div className="request-details">
                    <div className="detail-item">
                      <Calendar className="detail-icon" />
                      <span>Due: March 30, 2025</span>
                    </div>
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span>2-4 minutes</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp className="detail-icon" />
                      <span>5 proposals</span>
                    </div>
                  </div>
                  <div className="request-tags">
                    <span className="tag">Animation</span>
                    <span className="tag">Investment</span>
                    <span className="tag">DCA</span>
                  </div>
                </div>

                <div className="request-card">
                  <div className="request-header">
                    <Badge className="request-priority high" />
                    <span className="request-budget">$3,000 - $7,000</span>
                  </div>
                  <h3>Bitcoin Conference Highlight Reel</h3>
                  <p>Professional highlight reel from Bitcoin 2025 conference featuring key speakers and moments.</p>
                  <div className="request-details">
                    <div className="detail-item">
                      <Calendar className="detail-icon" />
                      <span>Due: February 28, 2025</span>
                    </div>
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span>5-8 minutes</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp className="detail-icon" />
                      <span>15 proposals</span>
                    </div>
                  </div>
                  <div className="request-tags">
                    <span className="tag">Conference</span>
                    <span className="tag">Professional</span>
                    <span className="tag">Event</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Publisher Benefits Section */}
            <section className="benefits-section">
              <h2>Why Publishers Choose Bitcoin Video</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <Star className="benefit-icon" />
                  <h3>Verified Creators</h3>
                  <p>Work with pre-vetted Bitcoin content creators who understand the space</p>
                  <ul className="benefit-list">
                    <li>Portfolio verification</li>
                    <li>Community reputation scores</li>
                    <li>Previous client reviews</li>
                    <li>Bitcoin knowledge certification</li>
                  </ul>
                </div>

                <div className="benefit-card">
                  <Zap className="benefit-icon" />
                  <h3>Fast Turnaround</h3>
                  <p>Get your content delivered quickly with our streamlined process</p>
                  <ul className="benefit-list">
                    <li>Average 7-day completion</li>
                    <li>Real-time progress tracking</li>
                    <li>Milestone-based payments</li>
                    <li>Rush delivery options</li>
                  </ul>
                </div>

                <div className="benefit-card">
                  <DollarSign className="benefit-icon" />
                  <h3>Transparent Pricing</h3>
                  <p>Fair, competitive pricing with escrow protection for all parties</p>
                  <ul className="benefit-list">
                    <li>Fixed-price contracts</li>
                    <li>Escrow payment protection</li>
                    <li>No hidden fees</li>
                    <li>Revision guarantees</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Request Categories Section */}
            <section className="categories-section">
              <h2>Popular Request Categories</h2>
              <div className="categories-grid">
                <div className="category-item">
                  <h4>Educational Content</h4>
                  <p>$800 - $3,000</p>
                  <span className="category-count">24 active</span>
                </div>
                <div className="category-item">
                  <h4>Product Demos</h4>
                  <p>$500 - $2,500</p>
                  <span className="category-count">18 active</span>
                </div>
                <div className="category-item">
                  <h4>News & Analysis</h4>
                  <p>$300 - $1,500</p>
                  <span className="category-count">31 active</span>
                </div>
                <div className="category-item">
                  <h4>Documentary</h4>
                  <p>$2,000 - $10,000</p>
                  <span className="category-count">8 active</span>
                </div>
                <div className="category-item">
                  <h4>Animation</h4>
                  <p>$1,000 - $5,000</p>
                  <span className="category-count">12 active</span>
                </div>
                <div className="category-item">
                  <h4>Live Streaming</h4>
                  <p>$200 - $1,000</p>
                  <span className="category-count">15 active</span>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <h2>Ready to Post Your Request?</h2>
              <p>Connect with Bitcoin Video creators and get your content produced professionally</p>
              <div className="cta-buttons">
                <a href="/publisher/post" className="cta-btn primary">
                  <Briefcase className="cta-icon" />
                  Post New Request
                </a>
                <a href="/creator/offers" className="cta-btn secondary">
                  <Users className="cta-icon" />
                  Browse Creator Offers
                </a>
              </div>
            </section>
          </div>
        </ResponsiveLayout>
        
        <DevSidebar />
        <MinimalDock />
      </div>
  );
}