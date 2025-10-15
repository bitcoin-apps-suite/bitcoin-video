'use client'

import React from 'react'
import { Video, User, Star, Trophy, Clock, DollarSign, Play, Eye, ThumbsUp, MessageCircle, Zap, Award } from 'lucide-react'
import DevSidebar from '@/components/DevSidebar'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import MinimalDock from '@/components/MinimalDock'
import CleanTaskbar from '@/components/CleanTaskbar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './offers.css'

export default function CreatorOffersPage() {
  return (
    <div className="offers-page">
        <ProofOfConceptBar />
        <CleanTaskbar 
          onNewVideo={() => console.log('New project')}
          onSaveVideo={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          <div className="offers-container">
            {/* Hero Section */}
            <section className="offers-hero">
              <h1><span style={{color: '#ffffff'}}>Creator</span> <span style={{color: '#dc2626'}}>Service</span> <span style={{color: '#ffffff'}}>Offers</span></h1>
              <p className="offers-tagline">
                Discover professional Bitcoin video creators ready to bring your vision to life
              </p>
              <div className="offers-badge">Verified Creators</div>
            </section>

            {/* Featured Creators Section */}
            <section className="featured-creators-section">
              <h2>Featured Bitcoin Video Creators</h2>
              <div className="creators-grid">
                <div className="creator-card featured">
                  <div className="creator-header">
                    <div className="creator-avatar">
                      <User className="avatar-icon" />
                    </div>
                    <div className="creator-info">
                      <h3>BitcoinEducator</h3>
                      <div className="creator-rating">
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <span className="rating-number">5.0 (47 reviews)</span>
                      </div>
                      <div className="creator-badges">
                        <span className="badge verified">Verified</span>
                        <span className="badge top-rated">Top Rated</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="creator-specialties">
                    <span className="specialty">Educational Content</span>
                    <span className="specialty">Lightning Network</span>
                    <span className="specialty">Technical Analysis</span>
                  </div>

                  <p className="creator-bio">
                    Specializing in educational Bitcoin content with 5+ years experience. Created 200+ videos 
                    with over 2M total views. Expert in Lightning Network and DeFi explanations.
                  </p>

                  <div className="creator-stats">
                    <div className="stat">
                      <Eye className="stat-icon" />
                      <span>2.1M views</span>
                    </div>
                    <div className="stat">
                      <Video className="stat-icon" />
                      <span>200+ videos</span>
                    </div>
                    <div className="stat">
                      <Clock className="stat-icon" />
                      <span>3-5 day delivery</span>
                    </div>
                  </div>

                  <div className="creator-pricing">
                    <h4>Starting at $500</h4>
                    <p>5-minute educational video</p>
                  </div>

                  <div className="creator-actions">
                    <button className="action-btn primary">View Portfolio</button>
                    <button className="action-btn secondary">Contact</button>
                  </div>
                </div>

                <div className="creator-card">
                  <div className="creator-header">
                    <div className="creator-avatar">
                      <User className="avatar-icon" />
                    </div>
                    <div className="creator-info">
                      <h3>CryptoDocumentarian</h3>
                      <div className="creator-rating">
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon half" />
                        <span className="rating-number">4.8 (32 reviews)</span>
                      </div>
                      <div className="creator-badges">
                        <span className="badge verified">Verified</span>
                        <span className="badge documentary">Documentary</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="creator-specialties">
                    <span className="specialty">Documentary</span>
                    <span className="specialty">Mining Operations</span>
                    <span className="specialty">Interviews</span>
                  </div>

                  <p className="creator-bio">
                    Award-winning documentary filmmaker with focus on Bitcoin mining and adoption stories. 
                    Featured at Bitcoin Film Festival 2024.
                  </p>

                  <div className="creator-stats">
                    <div className="stat">
                      <Trophy className="stat-icon" />
                      <span>3 awards</span>
                    </div>
                    <div className="stat">
                      <Video className="stat-icon" />
                      <span>25 projects</span>
                    </div>
                    <div className="stat">
                      <Clock className="stat-icon" />
                      <span>7-14 day delivery</span>
                    </div>
                  </div>

                  <div className="creator-pricing">
                    <h4>Starting at $2,000</h4>
                    <p>10-minute documentary piece</p>
                  </div>

                  <div className="creator-actions">
                    <button className="action-btn primary">View Portfolio</button>
                    <button className="action-btn secondary">Contact</button>
                  </div>
                </div>

                <div className="creator-card">
                  <div className="creator-header">
                    <div className="creator-avatar">
                      <User className="avatar-icon" />
                    </div>
                    <div className="creator-info">
                      <h3>AnimatedBitcoin</h3>
                      <div className="creator-rating">
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <Star className="star-icon filled" />
                        <span className="rating-number">4.9 (28 reviews)</span>
                      </div>
                      <div className="creator-badges">
                        <span className="badge verified">Verified</span>
                        <span className="badge animation">Animation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="creator-specialties">
                    <span className="specialty">2D Animation</span>
                    <span className="specialty">Explainer Videos</span>
                    <span className="specialty">Motion Graphics</span>
                  </div>

                  <p className="creator-bio">
                    Professional animator creating engaging Bitcoin explainer videos. Specialist in 
                    complex concept visualization and motion graphics.
                  </p>

                  <div className="creator-stats">
                    <div className="stat">
                      <Play className="stat-icon" />
                      <span>1.5M views</span>
                    </div>
                    <div className="stat">
                      <Video className="stat-icon" />
                      <span>80+ animations</span>
                    </div>
                    <div className="stat">
                      <Clock className="stat-icon" />
                      <span>5-7 day delivery</span>
                    </div>
                  </div>

                  <div className="creator-pricing">
                    <h4>Starting at $800</h4>
                    <p>2-minute animated explainer</p>
                  </div>

                  <div className="creator-actions">
                    <button className="action-btn primary">View Portfolio</button>
                    <button className="action-btn secondary">Contact</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Categories Section */}
            <section className="services-section">
              <h2>Creator Services by Category</h2>
              <div className="services-grid">
                <div className="service-category">
                  <Video className="service-icon" />
                  <h3>Educational Content</h3>
                  <p>Bitcoin basics, technology explainers, and investment guides</p>
                  <div className="service-stats">
                    <span className="price-range">$300 - $2,000</span>
                    <span className="creator-count">45 creators</span>
                  </div>
                  <ul className="service-features">
                    <li>Beginner-friendly explanations</li>
                    <li>Technical deep-dives</li>
                    <li>Investment strategies</li>
                    <li>Security best practices</li>
                  </ul>
                </div>

                <div className="service-category featured">
                  <Trophy className="service-icon" />
                  <h3>Documentary Films</h3>
                  <p>Professional documentaries on Bitcoin adoption, mining, and culture</p>
                  <div className="service-stats">
                    <span className="price-range">$1,500 - $10,000</span>
                    <span className="creator-count">12 creators</span>
                  </div>
                  <ul className="service-features">
                    <li>Interview-based storytelling</li>
                    <li>Mining farm visits</li>
                    <li>Adoption case studies</li>
                    <li>Festival-quality production</li>
                  </ul>
                </div>

                <div className="service-category">
                  <Zap className="service-icon" />
                  <h3>Animation & Motion</h3>
                  <p>Animated explainers, motion graphics, and visual storytelling</p>
                  <div className="service-stats">
                    <span className="price-range">$500 - $3,000</span>
                    <span className="creator-count">28 creators</span>
                  </div>
                  <ul className="service-features">
                    <li>2D & 3D animation</li>
                    <li>Complex concept visualization</li>
                    <li>Brand animation</li>
                    <li>Interactive elements</li>
                  </ul>
                </div>

                <div className="service-category">
                  <MessageCircle className="service-icon" />
                  <h3>News & Analysis</h3>
                  <p>Market analysis, news commentary, and trend discussions</p>
                  <div className="service-stats">
                    <span className="price-range">$200 - $1,200</span>
                    <span className="creator-count">67 creators</span>
                  </div>
                  <ul className="service-features">
                    <li>Daily market updates</li>
                    <li>Technical analysis</li>
                    <li>News breakdown</li>
                    <li>Opinion pieces</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Creator Benefits Section */}
            <section className="benefits-section">
              <h2>Why Creators Choose Bitcoin Video</h2>
              <div className="benefits-content">
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <DollarSign className="benefit-icon" />
                    <h3>Higher Earnings</h3>
                    <p>Keep 95% of your earnings with transparent, fast Bitcoin payments</p>
                  </div>
                  <div className="benefit-item">
                    <Award className="benefit-icon" />
                    <h3>Build Your Brand</h3>
                    <p>Showcase your work to a growing community of Bitcoin enthusiasts</p>
                  </div>
                  <div className="benefit-item">
                    <Zap className="benefit-icon" />
                    <h3>Fast Payments</h3>
                    <p>Lightning-fast Bitcoin payments upon project completion</p>
                  </div>
                  <div className="benefit-item">
                    <ThumbsUp className="benefit-icon" />
                    <h3>Quality Clients</h3>
                    <p>Work with serious Bitcoin businesses and content publishers</p>
                  </div>
                </div>

                <div className="creator-success-stats">
                  <h3>Creator Success Stories</h3>
                  <div className="success-stats">
                    <div className="success-stat">
                      <span className="stat-number">$2.4M+</span>
                      <span className="stat-label">Paid to creators in 2024</span>
                    </div>
                    <div className="success-stat">
                      <span className="stat-number">94%</span>
                      <span className="stat-label">Client satisfaction rate</span>
                    </div>
                    <div className="success-stat">
                      <span className="stat-number">450+</span>
                      <span className="stat-label">Active creators</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Get Started Section */}
            <section className="getting-started-section">
              <h2>Start Offering Your Services</h2>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Create Your Profile</h3>
                  <p>Showcase your best Bitcoin video work and define your specialties</p>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Set Your Rates</h3>
                  <p>Define competitive pricing for different types of video content</p>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Get Hired</h3>
                  <p>Respond to requests and start earning with Bitcoin Video projects</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <h2>Ready to Start Creating?</h2>
              <p>Join the Bitcoin Video creator community and monetize your skills</p>
              <div className="cta-buttons">
                <a href="/creator/signup" className="cta-btn primary">
                  <User className="cta-icon" />
                  Become a Creator
                </a>
                <a href="/publisher/requests" className="cta-btn secondary">
                  <Video className="cta-icon" />
                  Browse Requests
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