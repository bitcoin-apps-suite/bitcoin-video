import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export interface VideoProcessingOptions {
  format?: 'mp4' | 'webm' | 'mov' | 'gif'
  quality?: 'low' | 'medium' | 'high' | 'ultra'
  resolution?: '720p' | '1080p' | '4k'
  framerate?: 24 | 30 | 60
  compression?: number // 0-100
}

export interface ExportProgress {
  phase: 'initializing' | 'processing' | 'encoding' | 'complete' | 'error'
  progress: number // 0-100
  message: string
  timeRemaining?: number // seconds
}

export class BitcoinVideoProcessor {
  private ffmpeg: FFmpeg
  private isLoaded = false
  private onProgressCallback?: (progress: ExportProgress) => void

  constructor() {
    this.ffmpeg = new FFmpeg()
  }

  async initialize(): Promise<void> {
    if (this.isLoaded) return

    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.15/dist/umd'
      
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      this.ffmpeg.on('progress', ({ progress, time }) => {
        if (this.onProgressCallback) {
          this.onProgressCallback({
            phase: 'processing',
            progress: Math.round(progress * 100),
            message: `Processing... ${Math.round(progress * 100)}%`,
            timeRemaining: time > 0 ? Math.round((1 - progress) * time / progress) : undefined
          })
        }
      })

      this.ffmpeg.on('log', ({ message }) => {
        console.log('FFmpeg:', message)
      })

      this.isLoaded = true
    } catch (error) {
      throw new Error(`Failed to initialize video processor: ${error}`)
    }
  }

  setProgressCallback(callback: (progress: ExportProgress) => void): void {
    this.onProgressCallback = callback
  }

  async processVideo(
    inputFile: File,
    options: VideoProcessingOptions = {}
  ): Promise<Blob> {
    if (!this.isLoaded) {
      await this.initialize()
    }

    const {
      format = 'mp4',
      quality = 'high',
      resolution = '1080p',
      framerate = 30,
      compression = 85
    } = options

    try {
      this.emitProgress('initializing', 0, 'Preparing video file...')

      // Write input file to FFmpeg filesystem
      const inputName = 'input.' + inputFile.name.split('.').pop()
      const outputName = `output.${format}`
      
      await this.ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      this.emitProgress('processing', 10, 'Starting video processing...')

      // Build FFmpeg command based on options
      const args = this.buildFFmpegArgs(inputName, outputName, {
        format,
        quality,
        resolution,
        framerate,
        compression
      })

      this.emitProgress('encoding', 30, 'Encoding video...')

      // Execute FFmpeg command
      await this.ffmpeg.exec(args)

      this.emitProgress('encoding', 90, 'Finalizing output...')

      // Read the output file
      const data = await this.ffmpeg.readFile(outputName)
      
      // Clean up
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      this.emitProgress('complete', 100, 'Video processing complete!')

      // Return as Blob
      return new Blob([data as unknown as ArrayBuffer], { 
        type: this.getMimeType(format)
      })

    } catch (error) {
      this.emitProgress('error', 0, `Processing failed: ${error}`)
      throw error
    }
  }

  async extractThumbnail(videoFile: File, timeSeconds: number = 1): Promise<Blob> {
    if (!this.isLoaded) {
      await this.initialize()
    }

    try {
      const inputName = 'input.' + videoFile.name.split('.').pop()
      const outputName = 'thumbnail.jpg'

      await this.ffmpeg.writeFile(inputName, await fetchFile(videoFile))

      await this.ffmpeg.exec([
        '-i', inputName,
        '-ss', timeSeconds.toString(),
        '-frames:v', '1',
        '-q:v', '2',
        outputName
      ])

      const data = await this.ffmpeg.readFile(outputName)
      
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      return new Blob([data as unknown as ArrayBuffer], { type: 'image/jpeg' })

    } catch (error) {
      throw new Error(`Thumbnail extraction failed: ${error}`)
    }
  }

  async compressVideo(
    inputFile: File, 
    targetSizeMB: number
  ): Promise<Blob> {
    if (!this.isLoaded) {
      await this.initialize()
    }

    try {
      const inputName = 'input.' + inputFile.name.split('.').pop()
      const outputName = 'compressed.mp4'

      await this.ffmpeg.writeFile(inputName, await fetchFile(inputFile))

      // Calculate target bitrate based on file size and duration
      // This is a simplified approach - in production you'd analyze the video first
      const targetBitrate = Math.round((targetSizeMB * 8 * 1024) / 60) // Assume 60s video

      await this.ffmpeg.exec([
        '-i', inputName,
        '-c:v', 'libx264',
        '-b:v', `${targetBitrate}k`,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-preset', 'medium',
        outputName
      ])

      const data = await this.ffmpeg.readFile(outputName)
      
      await this.ffmpeg.deleteFile(inputName)
      await this.ffmpeg.deleteFile(outputName)

      return new Blob([data as unknown as ArrayBuffer], { type: 'video/mp4' })

    } catch (error) {
      throw new Error(`Video compression failed: ${error}`)
    }
  }

  async convertToFormat(inputFile: File, targetFormat: string): Promise<Blob> {
    return this.processVideo(inputFile, { 
      format: targetFormat as VideoProcessingOptions['format']
    })
  }

  private buildFFmpegArgs(
    inputName: string, 
    outputName: string, 
    options: Required<VideoProcessingOptions>
  ): string[] {
    const args = ['-i', inputName]

    // Video codec and quality settings
    if (options.format === 'webm') {
      args.push('-c:v', 'libvpx-vp9')
    } else if (options.format === 'mov') {
      args.push('-c:v', 'libx264', '-preset', 'slow')
    } else {
      args.push('-c:v', 'libx264')
    }

    // Resolution scaling
    const resolutionMap = {
      '720p': '1280:720',
      '1080p': '1920:1080', 
      '4k': '3840:2160'
    }
    args.push('-vf', `scale=${resolutionMap[options.resolution]}`)

    // Frame rate
    args.push('-r', options.framerate.toString())

    // Quality/Compression
    const crf = this.qualityToCRF(options.quality, options.compression)
    args.push('-crf', crf.toString())

    // Audio settings
    args.push('-c:a', 'aac', '-b:a', '128k')

    // Output settings
    args.push('-preset', 'fast')
    args.push('-movflags', '+faststart') // For web streaming
    
    args.push(outputName)

    return args
  }

  private qualityToCRF(quality: string, compression: number): number {
    const baseMap = {
      'low': 28,
      'medium': 23,
      'high': 18,
      'ultra': 15
    }
    
    const base = baseMap[quality as keyof typeof baseMap] || 23
    // Adjust based on compression setting (lower compression = lower CRF = higher quality)
    return Math.round(base + (100 - compression) / 10)
  }

  private getMimeType(format: string): string {
    const mimeTypes = {
      'mp4': 'video/mp4',
      'webm': 'video/webm', 
      'mov': 'video/quicktime',
      'gif': 'image/gif'
    }
    return mimeTypes[format as keyof typeof mimeTypes] || 'video/mp4'
  }

  private emitProgress(
    phase: ExportProgress['phase'], 
    progress: number, 
    message: string,
    timeRemaining?: number
  ): void {
    if (this.onProgressCallback) {
      this.onProgressCallback({
        phase,
        progress,
        message,
        timeRemaining
      })
    }
  }

  async terminate(): Promise<void> {
    if (this.isLoaded) {
      await this.ffmpeg.terminate()
      this.isLoaded = false
    }
  }
}

// Utility functions for common operations
export const videoUtils = {
  // Format file size for display
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  },

  // Validate video file
  isValidVideoFile(file: File): boolean {
    const validTypes = [
      'video/mp4',
      'video/webm', 
      'video/mov',
      'video/quicktime',
      'video/avi',
      'video/x-msvideo'
    ]
    return validTypes.includes(file.type)
  },

  // Get optimal settings for platform
  getPlatformSettings(platform: 'youtube' | 'tiktok' | 'twitter' | 'instagram'): VideoProcessingOptions {
    const settings = {
      youtube: {
        format: 'mp4' as const,
        quality: 'high' as const,
        resolution: '1080p' as const,
        framerate: 30 as const
      },
      tiktok: {
        format: 'mp4' as const,
        quality: 'medium' as const, 
        resolution: '1080p' as const,
        framerate: 30 as const
      },
      twitter: {
        format: 'mp4' as const,
        quality: 'medium' as const,
        resolution: '720p' as const,
        framerate: 30 as const
      },
      instagram: {
        format: 'mp4' as const,
        quality: 'high' as const,
        resolution: '1080p' as const,
        framerate: 30 as const
      }
    }
    return settings[platform]
  }
}

// Global processor instance
export const videoProcessor = new BitcoinVideoProcessor()