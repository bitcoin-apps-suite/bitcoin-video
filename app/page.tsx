'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Upload, 
  User,
  Bitcoin,
  TrendingUp,
  Play,
  Sparkles,
  BarChart3,
  Home,
  Compass,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'
import VideoCard from '@/components/VideoCard'
import VideoSkeleton from '@/components/VideoSkeleton'
import MobileNav from '@/components/MobileNav'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: string
  views: string
  timestamp: string
  duration: string
  verified: boolean
  live?: boolean
  automated?: boolean
  category: string
}

export default function BitcoinVideo() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [btcPrice, setBtcPrice] = useState('67,432')
  const [priceChange, setPriceChange] = useState('+2.4%')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All', icon: <Home className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'news', name: 'News', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'analysis', name: 'Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tutorials', name: 'Tutorials', icon: <Compass className="w-4 h-4" /> },
    { id: 'automated', name: 'AI Generated', icon: <Sparkles className="w-4 h-4" /> },
  ]

  const videos: Video[] = [
    {
      id: '1',
      title: 'POV: You bought Bitcoin at $69K and now you eat ramen 💀',
      thumbnail: '/api/placeholder/320/180',
      channel: 'TikTokCrypto',
      views: '2.4M',
      timestamp: '2 hours ago',
      duration: '0:23',
      verified: false,
      live: true,
      category: 'news'
    },
    {
      id: '2',
      title: 'Day 847 of telling my wife Bitcoin will moon tomorrow 🚀',
      thumbnail: '/api/placeholder/320/180',
      channel: 'HodlOrDivorce',
      views: '890K',
      timestamp: '5 hours ago',
      duration: '0:15',
      verified: false,
      category: 'education'
    },
    {
      id: '3',
      title: 'This Bitcoin bro really thinks he\'s Warren Buffet 💸',
      thumbnail: '/api/placeholder/320/180',
      channel: 'CryptoClownShow',
      views: '1.2M',
      timestamp: '1 hour ago',
      duration: '0:38',
      verified: false,
      automated: true,
      category: 'automated'
    },
    {
      id: '4',
      title: 'When someone asks how my Bitcoin investment is going...',
      thumbnail: '/api/placeholder/320/180',
      channel: 'DeadInside420',
      views: '3.1M',
      timestamp: '1 day ago',
      duration: '0:12',
      verified: false,
      category: 'news'
    },
    {
      id: '5',
      title: 'Bitcoin influencers explaining why they\'re not financial advisors 🤡',
      thumbnail: '/api/placeholder/320/180',
      channel: 'InfluencerReality',
      views: '567K',
      timestamp: '3 days ago',
      duration: '1:45',
      verified: false,
      category: 'tutorials'
    },
    {
      id: '6',
      title: 'Me pretending I understand blockchain at dinner parties',
      thumbnail: '/api/placeholder/320/180',
      channel: 'FakeItTillYouMakeIt',
      views: '4.2M',
      timestamp: '30 minutes ago',
      duration: '0:29',
      verified: false,
      automated: true,
      category: 'automated'
    },
    {
      id: '7',
      title: 'Bitcoin Twitter spaces be like: "GM frens, wagmi" 💀💀💀',
      thumbnail: '/api/placeholder/320/180',
      channel: 'CryptoTwitterRoast',
      views: '1.8M',
      timestamp: '6 hours ago',
      duration: '0:41',
      verified: false,
      category: 'analysis'
    },
    {
      id: '8',
      title: 'Every Bitcoin documentary: "I threw away my hard drive" 😭',
      thumbnail: '/api/placeholder/320/180',
      channel: 'CryptoTragedies',
      views: '2.9M',
      timestamp: '2 days ago',
      duration: '0:33',
      verified: false,
      category: 'education'
    }
  ]

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
    
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 5
      setBtcPrice((prev) => {
        const newPrice = parseFloat(prev.replace(',', '')) + change
        return newPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })
      })
      setPriceChange(change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24">
        <ProofOfConceptBar />
        <TopMenuBar />
        
        <ResponsiveLayout>
          {/* Header */}
          <header className="sticky top-8 z-50 glass border-b border-white/10 shadow-2xl mt-8">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile Nav */}
            <MobileNav />
            
            {/* Logo and Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 group-hover:scale-110 animate-glow">
                  <Bitcoin className="w-5 sm:w-6 h-5 sm:h-6 text-black group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-lg sm:text-xl font-bold hidden sm:block text-gradient">Bitcoin Video</span>
              </Link>
              
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bitcoin content..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 glass rounded-full focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 focus:shadow-lg focus:shadow-orange-500/20 text-sm sm:text-base"
                  />
                  <Search className="absolute left-3 top-2 sm:top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* BTC Price Ticker */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20 shadow-lg">
                <Bitcoin className="w-4 h-4 text-orange-500" />
                <span className="font-mono font-bold">${btcPrice}</span>
                <span className={`text-sm ${priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange}
                </span>
              </div>

              <Link
                href="/create"
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg sm:rounded-xl font-medium sm:font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <Upload className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="hidden sm:block">Upload</span>
              </Link>
              
              <button className="p-2 sm:p-2.5 glass-hover rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg hidden sm:block">
                <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
              
              <button className="p-2 sm:p-2.5 glass-hover rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg">
                <User className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-3 sm:px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

          {/* Main Content */}
          <main className="p-6 lg:p-8">
          {/* Featured Section */}
          {selectedCategory === 'all' && (
            <section className="mb-8">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-yellow-500/20 p-10 border border-orange-500/20 backdrop-blur-sm shadow-2xl">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-red-600 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bitcoin Halving Countdown</h2>
                <p className="text-gray-300 mb-6 text-lg">Next halving in 142 days - Watch live analysis and predictions</p>
                <div className="flex gap-4">
                  <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-500/25 transform hover:scale-105">
                    <Play className="w-5 h-5" />
                    Watch Live
                  </button>
                  <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
                    Set Reminder
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <VideoSkeleton key={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          </main>
        </ResponsiveLayout>
        
        <DevSidebar />
        <Dock />
      </div>
    </DevSidebarProvider>
  )
}
