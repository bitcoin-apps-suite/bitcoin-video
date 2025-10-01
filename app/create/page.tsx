'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Upload,
  Sparkles,
  Video,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Mic,
  Globe,
  Youtube,
  Twitter,
  Bitcoin,
  Zap,
  Play,
  Settings,
  ChevronRight,
  BarChart3,
  Brain,
  Clock,
  DollarSign,
  Hash,
  Link2,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import { DevSidebarProvider } from '@/components/DevSidebarProvider'
import ResponsiveLayout from '@/components/ResponsiveLayout'

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('auto-generate')
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [generatedVideos, setGeneratedVideos] = useState<{
    id: string;
    title: string;
    duration: string;
    quality: string;
    platforms: string[];
  }[]>([])

  const automationWorkflows = [
    {
      id: 'news-to-video',
      title: 'News → Video',
      description: 'Convert latest Bitcoin news into video content',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      estimatedTime: '2 mins',
      apiCost: '$0.05'
    },
    {
      id: 'price-analysis',
      title: 'Price Analysis',
      description: 'Generate technical analysis videos from chart data',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      estimatedTime: '3 mins',
      apiCost: '$0.08'
    },
    {
      id: 'tweet-to-video',
      title: 'Tweet → Video',
      description: 'Transform viral crypto tweets into videos',
      icon: <Twitter className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      estimatedTime: '1 min',
      apiCost: '$0.03'
    },
    {
      id: 'education-series',
      title: 'Education Series',
      description: 'Auto-generate educational Bitcoin content',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      estimatedTime: '5 mins',
      apiCost: '$0.12'
    },
    {
      id: 'trend-hijacker',
      title: 'Trend Hijacker',
      description: 'Create videos based on trending topics',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      estimatedTime: '2 mins',
      apiCost: '$0.06'
    },
    {
      id: 'podcast-clips',
      title: 'Podcast Clipper',
      description: 'Extract and enhance podcast highlights',
      icon: <Mic className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-500',
      estimatedTime: '4 mins',
      apiCost: '$0.10'
    }
  ]

  const handleGenerateVideo = () => {
    setGenerating(true)
    setTimeout(() => {
      setGeneratedVideos([
        {
          id: '1',
          title: 'Bitcoin Breaks $70K - Market Analysis',
          duration: '3:45',
          quality: 'HD',
          platforms: ['youtube', 'twitter', 'tiktok']
        },
        {
          id: '2',
          title: 'Why Bitcoin Will Hit $100K (Technical View)',
          duration: '5:21',
          quality: 'HD',
          platforms: ['youtube', 'twitter']
        },
        {
          id: '3',
          title: 'Bitcoin vs Gold - The Ultimate Comparison',
          duration: '2:18',
          quality: '4K',
          platforms: ['youtube', 'instagram']
        }
      ])
      setGenerating(false)
    }, 3000)
  }

  return (
    <DevSidebarProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white antialiased pb-24">
      <ProofOfConceptBar />
      <TopMenuBar />
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl mt-8">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Create Bitcoin Content</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20 shadow-lg">
              <DollarSign className="w-4 h-4 text-orange-500" />
              <span className="text-sm">Credits: 1,245</span>
            </div>
          </div>
        </div>
      </header>

      <ResponsiveLayout>
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-10 border-b border-white/5">
          <button
            onClick={() => setActiveTab('auto-generate')}
            className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
              activeTab === 'auto-generate' 
                ? 'text-orange-400' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Automation
            </span>
            {activeTab === 'auto-generate' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('manual-upload')}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === 'manual-upload' 
                ? 'text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Manual Upload
            </span>
            {activeTab === 'manual-upload' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            )}
          </button>
        </div>

        {activeTab === 'auto-generate' ? (
          <>
            {/* Automation Workflows */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Choose Automation Workflow</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {automationWorkflows.map((workflow) => (
                  <motion.button
                    key={workflow.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWorkflow(workflow.id)}
                    className={`relative p-6 rounded-2xl border text-left transition-all duration-300 ${
                      selectedWorkflow === workflow.id
                        ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/15 to-orange-600/10 shadow-xl shadow-orange-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-6 right-6 p-2 rounded-lg bg-gradient-to-br ${workflow.color}`}>
                      {workflow.icon}
                    </div>
                    <h3 className="font-bold mb-2">{workflow.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 pr-12">{workflow.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workflow.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {workflow.apiCost}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Configuration Panel */}
            {selectedWorkflow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl"
              >
                <h3 className="text-lg font-bold mb-4">Configure Automation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Source</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500">
                      <option>Latest Bitcoin News</option>
                      <option>Top Reddit Posts</option>
                      <option>Twitter Trending</option>
                      <option>Custom RSS Feed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Style</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500">
                      <option>Educational</option>
                      <option>News Report</option>
                      <option>Technical Analysis</option>
                      <option>Hype/Promotional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500">
                      <option>Short (30s - 1min)</option>
                      <option>Medium (2-5 mins)</option>
                      <option>Long (5-10 mins)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platforms</label>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-orange-500/20 border border-orange-500 rounded-lg">YouTube</button>
                      <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">TikTok</button>
                      <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">Twitter</button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerateVideo}
                    disabled={generating}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate Videos
                      </>
                    )}
                  </motion.button>
                  <span className="text-sm text-gray-400">
                    Will generate 3-5 video variations
                  </span>
                </div>
              </motion.div>
            )}

            {/* Generated Videos */}
            {generatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold mb-4">Generated Videos</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {generatedVideos.map((video) => (
                    <div key={video.id} className="bg-white/5 rounded-xl border border-white/10 p-4">
                      <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg mb-3 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/50" />
                      </div>
                      <h4 className="font-medium mb-2">{video.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.quality}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-orange-500 rounded-lg text-sm font-medium hover:bg-orange-600">
                          Deploy
                        </button>
                        <button className="px-3 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20">
                          Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          /* Manual Upload Section */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 rounded-xl border-2 border-dashed border-white/20 p-12 text-center">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Upload Your Video</h3>
              <p className="text-gray-400 mb-6">
                Drag and drop your Bitcoin content here, or click to browse
              </p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 rounded-lg font-medium cursor-pointer hover:bg-orange-600 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Select Video
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: MP4, MOV, AVI, WebM (max 2GB)
              </p>
            </div>
          </div>
        )}
        </div>
      </ResponsiveLayout>
      
      <DevSidebar />
      <Dock />
    </div>
    </DevSidebarProvider>
  )
}