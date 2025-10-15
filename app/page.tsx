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
  BookOpen,
  Video,
  ToggleRight,
  Settings,
  Monitor,
  Plus,
  FileVideo,
  Clock,
  Folder
} from 'lucide-react'
import Link from 'next/link'
import VideoCard from '@/components/VideoCard'
import VideoSkeleton from '@/components/VideoSkeleton'
import MobileNav from '@/components/MobileNav'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import CleanTaskbar from '@/components/CleanTaskbar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import BitcoinVideoStudio from '@/components/BitcoinVideoStudio'
import VideoProjectSidebar from '@/components/VideoProjectSidebar'
import TickerSidebar from '@/components/TickerSidebar'

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

interface VideoProject {
  id: string
  name: string
  thumbnail: string
  duration: string
  lastModified: string
  status: 'draft' | 'published' | 'processing'
  created_at: string
  updated_at: string
}

export default function BitcoinVideo() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [btcPrice, setBtcPrice] = useState('67,432')
  const [priceChange, setPriceChange] = useState('+2.4%')
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'split' | 'studio' | 'watch'>('split')
  const [studioView, setStudioView] = useState<'projects' | 'editor'>('projects')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null)
  const [projectSidebarRefresh, setProjectSidebarRefresh] = useState(0)

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
      title: 'Craig Wright Finally Admits: He\'s Actually the Guy Who Invented Excel 📊',
      thumbnail: 'https://picsum.photos/320/180?random=1',
      channel: 'The Crypto Onion',
      views: '42.3M',
      timestamp: '2 hours ago',
      duration: '0:47',
      verified: true,
      live: true,
      category: 'news'
    },
    {
      id: '2',
      title: 'Cookie Monster Reveals Addiction: It Was Blocksize All Along 🍪',
      thumbnail: 'https://picsum.photos/320/180?random=2',
      channel: 'SesameStreetCrypto',
      views: '38.9M',
      timestamp: '5 hours ago',
      duration: '0:23',
      verified: true,
      category: 'education'
    },
    {
      id: '3',
      title: 'BSV Surpasses 7 Daily Users: Network in Crisis from Overload 💥',
      thumbnail: 'https://picsum.photos/320/180?random=3',
      channel: 'Blockchain News Network',
      views: '15.7M',
      timestamp: '1 hour ago',
      duration: '2:34',
      verified: true,
      automated: true,
      category: 'automated'
    },
    {
      id: '4',
      title: 'Miners Demand Bigger Blocks, Core Suggests Smaller Brains 🧠',
      thumbnail: 'https://picsum.photos/320/180?random=4',
      channel: 'Bitcoin Satirical Times',
      views: '22.1M',
      timestamp: '1 day ago',
      duration: '1:12',
      verified: true,
      category: 'news'
    },
    {
      id: '5',
      title: 'Lightning Devs Introduce New Feature: Pay $5 to Wait Faster ⚡',
      thumbnail: 'https://picsum.photos/320/180?random=5',
      channel: 'TechSatire Today',
      views: '29.4M',
      timestamp: '3 days ago',
      duration: '0:31',
      verified: true,
      category: 'tutorials'
    },
    {
      id: '6',
      title: 'Vitalik Explains ETH Merge in 47 Hours, Audience Still Waiting for Block Confirmation',
      thumbnail: 'https://picsum.photos/320/180?random=6',
      channel: 'Ethereum Comedy Central',
      views: '19.2M',
      timestamp: '30 minutes ago',
      duration: '47:03',
      verified: false,
      automated: true,
      category: 'automated'
    },
    {
      id: '7',
      title: 'Wall Street Firm Buys Bitcoin, Accidentally Purchases Dogecoin Instead 🐕',
      thumbnail: 'https://picsum.photos/320/180?random=7',
      channel: 'Financial Comedy Hour',
      views: '34.8M',
      timestamp: '6 hours ago',
      duration: '0:29',
      verified: false,
      category: 'analysis'
    },
    {
      id: '8',
      title: 'Influencer Loses Keys, Blames Mercury Retrograde 🔮',
      thumbnail: 'https://picsum.photos/320/180?random=8',
      channel: 'CryptoAstrology',
      views: '28.7M',
      timestamp: '2 days ago',
      duration: '0:15',
      verified: false,
      category: 'education'
    }
  ]

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory)

  // Studio projects data  
  const projects = [
    {
      id: '1',
      name: 'Bitcoin Halving Analysis',
      thumbnail: 'https://picsum.photos/320/180?random=10',
      duration: '3:24',
      lastModified: '2 hours ago',
      status: 'draft' as const
    },
    {
      id: '2', 
      name: 'Lightning Network Tutorial',
      thumbnail: 'https://picsum.photos/320/180?random=11',
      duration: '8:45',
      lastModified: '1 day ago', 
      status: 'published' as const
    },
    {
      id: '3',
      name: 'Market Analysis Oct 2024',
      thumbnail: 'https://picsum.photos/320/180?random=12',
      duration: '5:12',
      lastModified: '3 days ago',
      status: 'processing' as const
    }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setStudioView('editor')
      setViewMode('studio') // Switch to full studio mode
    }
  }

  const createNewProject = () => {
    setSelectedProject(null)
    setUploadedFile(null)
    setStudioView('editor')
    setViewMode('studio') // Switch to full studio mode
  }

  const handleProjectSelect = (project: VideoProject) => {
    setSelectedProject(project)
    setStudioView('editor')
    setViewMode('studio') // Switch to full studio mode
  }

  const handleVideoClick = (video: Video) => {
    // Switch to full watch mode when clicking on a video
    setViewMode('watch')
    // Here you could also navigate to a video player page
    console.log('Playing video:', video.title)
  }

  const handleNewProject = () => {
    createNewProject()
  }

  const openProject = (project: VideoProject) => {
    setStudioView('editor')
  }

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24 main-app-container">
        <ProofOfConceptBar />
        <CleanTaskbar 
          onNewVideo={createNewProject}
          onSaveVideo={() => console.log('Save project')}
        />
        
        <ResponsiveLayout>
          {/* Header */}
          <header className="sticky top-0 z-50 glass border-b border-white/10 shadow-2xl mt-8">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile Nav */}
            <MobileNav />
            
            {/* Logo and Search */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-1 sm:p-1.5 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl shadow-lg group-hover:shadow-red-600/25 transition-all duration-300 group-hover:scale-110 animate-glow">
                  <img 
                    src="/bitcoin-video.jpg" 
                    alt="Bitcoin Video"
                    className="w-6 sm:w-8 h-6 sm:h-8 object-cover rounded-lg group-hover:rotate-3 transition-transform"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold hidden sm:block text-gradient">Bitcoin Video</span>
              </Link>
              
              {/* Mode Navigation */}
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
                <button
                  onClick={() => setViewMode('studio')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'studio' 
                      ? 'bg-red-600/20 border border-red-600/30 text-red-400' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:block">Studio</span>
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'split' 
                      ? 'bg-gradient-to-r from-red-600/20 to-blue-500/20 border border-white/20 text-white' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:block">Both</span>
                </button>
                <button
                  onClick={() => setViewMode('watch')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    viewMode === 'watch' 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' 
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:block">Watch</span>
                </button>
              </div>
              
              <div className="flex-1 max-w-2xl hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Bitcoin content..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 glass rounded-full focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 focus:shadow-lg focus:shadow-red-600/20 text-sm sm:text-base"
                  />
                  <Search className="absolute left-3 top-2 sm:top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* BTC Price Ticker */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 to-yellow-500/10 rounded-xl border border-red-600/20 shadow-lg">
                <Bitcoin className="w-4 h-4 text-red-600" />
                <span className="font-mono font-bold">${btcPrice}</span>
                <span className={`text-sm ${priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/create"
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg sm:rounded-xl font-medium sm:font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-red-600/25 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <Upload className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden sm:block">Create</span>
                </Link>
                
                <Link
                  href="/studio"
                  className="px-2 sm:px-3 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 flex items-center gap-1 text-sm sm:text-base"
                  title="Video Studio"
                >
                  <Video className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden lg:block">Studio</span>
                </Link>
              </div>
              
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
                    ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg shadow-red-600/25'
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

          {/* Main Content - Dynamic View Modes */}
          <main className="p-6 lg:p-8">
            {viewMode === 'split' ? (
              /* Split View - Both Modes Side by Side */
              <div className="flex gap-6 h-[calc(100vh-200px)]">
                {/* Left Side - Studio Mode */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-red-400 mb-2">🎬 Studio Mode</h2>
                    <p className="text-gray-400 text-sm">Professional video creation and editing tools</p>
                  </div>
                  <div className="flex h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-red-600/30">
                    {/* Video Projects Sidebar */}
                    <div className="w-[280px] flex-shrink-0">
                      <VideoProjectSidebar
                        onProjectSelect={handleProjectSelect}
                        onNewProject={handleNewProject}
                        currentProjectId={selectedProject?.id}
                        refreshTrigger={projectSidebarRefresh}
                        uploadedFile={uploadedFile}
                      />
                    </div>
                    
                    {/* Main Studio Content */}
                    <div className="flex-1 overflow-hidden">
                      {studioView === 'editor' ? (
                        /* Studio Editor View */
                        <div className="h-full">
                          <BitcoinVideoStudio 
                            initialVideoFile={uploadedFile}
                            onSave={(blob) => {
                              console.log('Video saved:', blob)
                              setProjectSidebarRefresh(prev => prev + 1)
                            }}
                            onExport={(blob, format) => {
                              console.log(`Video exported as ${format}:`, blob)
                            }}
                          />
                        </div>
                      ) : (
                        /* Studio Welcome/Dashboard View */
                        <div className="p-8 h-full flex items-center justify-center">
                          <div className="text-center max-w-xl">
                            <div className="p-6 bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 rounded-3xl border border-red-600/20 backdrop-blur-sm shadow-2xl">
                              <FileVideo className="w-12 h-12 mx-auto mb-4 text-red-400" />
                              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Bitcoin Video Studio
                              </h3>
                              <p className="text-gray-300 mb-6 text-sm">
                                Create, edit, and publish professional Bitcoin content
                              </p>
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={createNewProject}
                                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-600/25 transform hover:scale-105 text-sm"
                                >
                                  <Plus className="w-4 h-4" />
                                  Start Creating
                                </button>
                                <label className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer flex items-center gap-2 text-sm">
                                  <input
                                    type="file"
                                    accept="video/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                  />
                                  <Upload className="w-4 h-4" />
                                  Import Video
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Watch Mode */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-blue-400 mb-2">📺 Watch Mode</h2>
                    <p className="text-gray-400 text-sm">YouTube-style video feed and discovery</p>
                  </div>
                  <div className="h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-blue-500/30 p-4">
                    <div className="h-full overflow-y-auto">
                      {/* Featured Section */}
                      {selectedCategory === 'all' && (
                        <section className="mb-6">
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 p-6 border border-red-600/20 backdrop-blur-sm shadow-xl">
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 bg-red-600 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                LIVE
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bitcoin Halving Countdown</h3>
                            <p className="text-gray-300 mb-4 text-sm">Next halving in 142 days - Watch live analysis</p>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => handleVideoClick({ id: 'live', title: 'Bitcoin Halving Countdown', thumbnail: '', channel: 'Live', views: '', timestamp: '', duration: '', verified: true, live: true, category: 'news' })}
                                className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2 shadow-lg text-sm"
                              >
                                <Play className="w-4 h-4" />
                                Watch Live
                              </button>
                              <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 text-sm">
                                Set Reminder
                              </button>
                            </div>
                          </div>
                        </section>
                      )}

                      {/* Video Grid */}
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {[...Array(6)].map((_, index) => (
                              <VideoSkeleton key={index} />
                            ))}
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                          >
                            {filteredVideos.slice(0, 6).map((video, index) => (
                              <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleVideoClick(video)}
                                className="cursor-pointer"
                              >
                                <VideoCard video={video} />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            ) : viewMode === 'studio' ? (
              /* Full Studio Mode */
              <div className="h-[calc(100vh-200px)] bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-xl overflow-hidden border border-red-600/30">
                <div className="flex h-full">
                  {/* Video Projects Sidebar */}
                  <div className="w-[280px] flex-shrink-0">
                    <VideoProjectSidebar
                      onProjectSelect={handleProjectSelect}
                      onNewProject={handleNewProject}
                      currentProjectId={selectedProject?.id}
                      refreshTrigger={projectSidebarRefresh}
                      uploadedFile={uploadedFile}
                    />
                  </div>
                  
                  {/* Main Studio Content */}
                  <div className="flex-1 overflow-hidden">
                    {studioView === 'editor' ? (
                      /* Studio Editor View */
                      <div className="h-full">
                        <BitcoinVideoStudio 
                          initialVideoFile={uploadedFile}
                          onSave={(blob) => {
                            console.log('Video saved:', blob)
                            setProjectSidebarRefresh(prev => prev + 1)
                          }}
                          onExport={(blob, format) => {
                            console.log(`Video exported as ${format}:`, blob)
                          }}
                        />
                      </div>
                    ) : (
                      /* Studio Welcome/Dashboard View */
                      <div className="p-8 h-full flex items-center justify-center">
                        <div className="text-center max-w-2xl">
                          <div className="p-8 bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 rounded-3xl border border-red-600/20 backdrop-blur-sm shadow-2xl">
                            <FileVideo className="w-16 h-16 mx-auto mb-6 text-red-400" />
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              Bitcoin Video Studio
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                              Create, edit, and publish professional Bitcoin content - all in your browser
                            </p>
                            <div className="flex gap-4 justify-center">
                              <button
                                onClick={createNewProject}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
                              >
                                <Plus className="w-5 h-5" />
                                Start Creating
                              </button>
                              <label className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={handleFileUpload}
                                />
                                <Upload className="w-5 h-5" />
                                Import Video
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Full Watch Mode */
              <div className="h-[calc(100vh-200px)]">
                {/* Featured Section */}
                {selectedCategory === 'all' && (
                  <section className="mb-8">
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600/20 via-yellow-500/10 to-yellow-500/20 p-10 border border-red-600/20 backdrop-blur-sm shadow-2xl">
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-red-600 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          LIVE
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Bitcoin Halving Countdown</h2>
                      <p className="text-gray-300 mb-6 text-lg">Next halving in 142 days - Watch live analysis and predictions</p>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleVideoClick({ id: 'live', title: 'Bitcoin Halving Countdown', thumbnail: '', channel: 'Live', views: '', timestamp: '', duration: '', verified: true, live: true, category: 'news' })}
                          className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold hover:from-red-700 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-600/25 transform hover:scale-105"
                        >
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
                          onClick={() => handleVideoClick(video)}
                          className="cursor-pointer"
                        >
                          <VideoCard video={video} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>
        </ResponsiveLayout>
        
        <DevSidebar />
        <TickerSidebar userHandle="creator" />
        <Dock />
      </div>
  )
}
