'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Video, 
  Upload, 
  Edit3, 
  Share2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  BookOpen,
  Monitor,
  Zap,
  Target,
  Award,
  ChevronRight,
  ExternalLink,
  Play,
  Download,
  Settings,
  BarChart3,
  Heart,
  MessageCircle,
  Bitcoin
} from 'lucide-react'
import Link from 'next/link'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import Footer from '@/components/Footer'
import CleanTaskbar from '@/components/CleanTaskbar'
import DockManager from '@/components/DockManager'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import TickerSidebar from '@/components/TickerSidebar'

export default function CreatorGuide() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="w-5 h-5" />,
      content: {
        title: 'Welcome to Bitcoin Video Creator Program',
        description: 'Everything you need to know to start creating and monetizing Bitcoin content',
        steps: [
          {
            title: 'Create Your Account',
            description: 'Sign up for a Bitcoin Video creator account to access all studio features',
            action: 'Sign Up Now'
          },
          {
            title: 'Set Up Your Channel',
            description: 'Customize your channel branding, description, and Bitcoin wallet integration',
            action: 'Customize Channel'
          },
          {
            title: 'Upload Your First Video',
            description: 'Use our browser-based studio to upload and edit your Bitcoin content',
            action: 'Start Creating'
          }
        ]
      }
    },
    {
      id: 'studio-features',
      title: 'Studio Features',
      icon: <Monitor className="w-5 h-5" />,
      content: {
        title: 'Professional Video Creation Tools',
        description: 'Powerful editing features built for Bitcoin content creators',
        features: [
          {
            icon: <Edit3 className="w-6 h-6" />,
            title: 'Browser-Based Editor',
            description: 'No software installation required. Edit videos directly in your browser with professional-grade tools.'
          },
          {
            icon: <Bitcoin className="w-6 h-6" />,
            title: 'Bitcoin Price Overlays',
            description: 'Add real-time Bitcoin price charts and data overlays to your videos automatically.'
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Templates',
            description: 'Pre-designed templates optimized for Bitcoin education, news, and analysis content.'
          },
          {
            icon: <Target className="w-6 h-6" />,
            title: 'Smart Thumbnails',
            description: 'AI-powered thumbnail generation that maximizes click-through rates for Bitcoin content.'
          }
        ]
      }
    },
    {
      id: 'monetization',
      title: 'Monetization',
      icon: <DollarSign className="w-5 h-5" />,
      content: {
        title: 'Earn Bitcoin from Your Content',
        description: 'Multiple revenue streams for Bitcoin content creators',
        methods: [
          {
            title: 'Lightning Tips',
            description: 'Viewers can send instant Bitcoin tips through Lightning Network integration',
            earning: 'Up to 95% of tips'
          },
          {
            title: 'Channel Subscriptions',
            description: 'Monthly Bitcoin subscriptions for exclusive content and community access',
            earning: '80% revenue share'
          },
          {
            title: 'Creator Fund',
            description: 'Earn from our Bitcoin Creator Fund based on views and engagement',
            earning: 'Performance-based'
          },
          {
            title: 'Sponsorships',
            description: 'Connect with Bitcoin companies for sponsored content opportunities',
            earning: 'Negotiated rates'
          }
        ]
      }
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: <Award className="w-5 h-5" />,
      content: {
        title: 'Creating Successful Bitcoin Content',
        description: 'Proven strategies to grow your audience and maximize earnings',
        tips: [
          {
            category: 'Content Strategy',
            items: [
              'Focus on educational content - teach Bitcoin concepts clearly',
              'Cover breaking news with quick, informative updates',
              'Create evergreen tutorials that remain valuable long-term',
              'Use data and charts to support your analysis'
            ]
          },
          {
            category: 'Production Quality',
            items: [
              'Invest in good audio - poor sound kills engagement',
              'Use consistent branding and thumbnails for recognition',
              'Keep videos focused - edit out unnecessary content',
              'Add captions for accessibility and SEO'
            ]
          },
          {
            category: 'Community Building',
            items: [
              'Respond to comments and build relationships',
              'Create series and recurring content formats',
              'Collaborate with other Bitcoin creators',
              'Share insights from your unique perspective'
            ]
          }
        ]
      }
    },
    {
      id: 'analytics',
      title: 'Analytics & Growth',
      icon: <BarChart3 className="w-5 h-5" />,
      content: {
        title: 'Track Performance & Optimize',
        description: 'Use data to improve your content and grow your audience',
        metrics: [
          {
            name: 'View Duration',
            description: 'Average time viewers spend watching your videos',
            target: '60%+ retention'
          },
          {
            name: 'Lightning Tips',
            description: 'Total Bitcoin received through viewer tips',
            target: 'Growing monthly'
          },
          {
            name: 'Engagement Rate',
            description: 'Likes, comments, and shares per view',
            target: '5%+ engagement'
          },
          {
            name: 'Subscriber Growth',
            description: 'New subscribers gained over time',
            target: 'Consistent growth'
          }
        ]
      }
    }
  ]

  const currentSection = sections.find(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24">
      <ProofOfConceptBar />
      <CleanTaskbar 
        onNewVideo={() => {}}
        onSaveVideo={() => {}}
      />
      
      <ResponsiveLayout>
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-2xl mt-8">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl shadow-lg group-hover:shadow-red-600/25 transition-all duration-300">
                    <img 
                      src="/bitcoin-video.jpg" 
                      alt="Bitcoin Video"
                      className="w-8 h-8 object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xl font-bold text-gradient">Bitcoin Video</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-500" />
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-red-400" />
                  <span className="font-semibold">Creator Guide</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href="/create"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Start Creating
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex gap-8 p-8">
          {/* Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="font-bold text-lg mb-4 text-gradient">Guide Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-red-600/20 to-yellow-500/20 border border-red-600/30 text-white'
                          : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 rounded-3xl border border-red-600/20 backdrop-blur-sm p-8">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {currentSection?.content.title}
                </h1>
                <p className="text-xl text-gray-300">
                  {currentSection?.content.description}
                </p>
              </div>

              {/* Section Content */}
              {activeSection === 'getting-started' && (
                <div className="space-y-6">
                  {currentSection?.content.steps?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-yellow-500 rounded-lg flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-gray-300 mb-4">{step.description}</p>
                          <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-medium hover:from-red-700 hover:to-yellow-500 transition-all duration-300">
                            {step.action}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeSection === 'studio-features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSection?.content.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-red-600/20 to-yellow-500/20 rounded-xl border border-red-600/20">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                          <p className="text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeSection === 'monetization' && (
                <div className="space-y-6">
                  {currentSection?.content.methods?.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{method.title}</h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                          {method.earning}
                        </span>
                      </div>
                      <p className="text-gray-300">{method.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeSection === 'best-practices' && (
                <div className="space-y-8">
                  {currentSection?.content.tips?.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                    >
                      <h3 className="text-xl font-bold mb-4 text-gradient">{tip.category}</h3>
                      <ul className="space-y-3">
                        {tip.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeSection === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSection?.content.metrics?.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">{metric.name}</h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                          {metric.target}
                        </span>
                      </div>
                      <p className="text-gray-300">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 rounded-3xl border border-red-600/20 backdrop-blur-sm p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Start Creating?</h2>
                <p className="text-gray-300 mb-6">Join thousands of creators earning Bitcoin through video content</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/create"
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Your First Video
                  </Link>
                  <Link
                    href="/studio"
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 flex items-center gap-2"
                  >
                    <Monitor className="w-5 h-5" />
                    Explore Studio
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveLayout>

      <TickerSidebar userHandle="creator" />
      <Footer />
        <DockManager currentApp="bitcoin-video" />
    </div>
  )
}
