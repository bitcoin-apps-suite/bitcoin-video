import { useState, useCallback, useRef } from 'react'
import { videoProcessor, VideoProcessingOptions, ExportProgress } from '@/utils/videoProcessor'

export interface ProcessingState {
  isProcessing: boolean
  progress: ExportProgress | null
  error: string | null
  result: Blob | null
}

export interface UseVideoProcessingReturn {
  // State
  processing: ProcessingState
  
  // Actions
  processVideo: (file: File, options?: VideoProcessingOptions) => Promise<Blob | null>
  extractThumbnail: (file: File, timeSeconds?: number) => Promise<Blob | null>
  compressVideo: (file: File, targetSizeMB: number) => Promise<Blob | null>
  convertFormat: (file: File, format: string) => Promise<Blob | null>
  
  // Utilities
  reset: () => void
  cancel: () => void
}

export function useVideoProcessing(): UseVideoProcessingReturn {
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: null,
    error: null,
    result: null
  })

  const abortController = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    setProcessing({
      isProcessing: false,
      progress: null,
      error: null,
      result: null
    })
  }, [])

  const cancel = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort()
      abortController.current = null
    }
    setProcessing(prev => ({
      ...prev,
      isProcessing: false,
      progress: {
        phase: 'error',
        progress: 0,
        message: 'Processing cancelled'
      }
    }))
  }, [])

  const processVideo = useCallback(async (
    file: File, 
    options?: VideoProcessingOptions
  ): Promise<Blob | null> => {
    try {
      // Reset state
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'initializing',
          progress: 0,
          message: 'Initializing video processor...'
        },
        error: null,
        result: null
      })

      // Create abort controller for cancellation
      abortController.current = new AbortController()

      // Set up progress callback
      videoProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress
        }))
      })

      // Process the video
      const result = await videoProcessor.processVideo(file, options)

      // Update state with result
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Video processing completed successfully!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    } finally {
      abortController.current = null
    }
  }, [])

  const extractThumbnail = useCallback(async (
    file: File,
    timeSeconds: number = 1
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 50,
          message: 'Extracting thumbnail...'
        },
        error: null,
        result: null
      })

      const result = await videoProcessor.extractThumbnail(file, timeSeconds)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Thumbnail extracted successfully!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Thumbnail extraction failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  const compressVideo = useCallback(async (
    file: File,
    targetSizeMB: number
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 0,
          message: `Compressing video to ${targetSizeMB}MB...`
        },
        error: null,
        result: null
      })

      videoProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress: {
            ...progress,
            message: `Compressing video to ${targetSizeMB}MB... ${progress.progress}%`
          }
        }))
      })

      const result = await videoProcessor.compressVideo(file, targetSizeMB)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: 'Video compression completed!'
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Video compression failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  const convertFormat = useCallback(async (
    file: File,
    format: string
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          phase: 'processing',
          progress: 0,
          message: `Converting to ${format.toUpperCase()}...`
        },
        error: null,
        result: null
      })

      videoProcessor.setProgressCallback((progress) => {
        setProcessing(prev => ({
          ...prev,
          progress: {
            ...progress,
            message: `Converting to ${format.toUpperCase()}... ${progress.progress}%`
          }
        }))
      })

      const result = await videoProcessor.convertToFormat(file, format)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        result,
        progress: {
          phase: 'complete',
          progress: 100,
          message: `Conversion to ${format.toUpperCase()} completed!`
        }
      }))

      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Format conversion failed'
      
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: {
          phase: 'error',
          progress: 0,
          message: errorMessage
        }
      }))

      return null
    }
  }, [])

  return {
    processing,
    processVideo,
    extractThumbnail,
    compressVideo,
    convertFormat,
    reset,
    cancel
  }
}

// Utility hook for batch processing multiple videos
export function useBatchVideoProcessing() {
  const [batchState, setBatchState] = useState<{
    isProcessing: boolean
    currentIndex: number
    totalFiles: number
    results: (Blob | null)[]
    errors: string[]
  }>({
    isProcessing: false,
    currentIndex: 0,
    totalFiles: 0,
    results: [],
    errors: []
  })

  const processBatch = useCallback(async (
    files: File[],
    options?: VideoProcessingOptions
  ) => {
    setBatchState({
      isProcessing: true,
      currentIndex: 0,
      totalFiles: files.length,
      results: [],
      errors: []
    })

    const results: (Blob | null)[] = []
    const errors: string[] = []

    for (let i = 0; i < files.length; i++) {
      setBatchState(prev => ({ ...prev, currentIndex: i }))

      try {
        const result = await videoProcessor.processVideo(files[i], options)
        results.push(result)
        errors.push('')
      } catch (error) {
        results.push(null)
        errors.push(error instanceof Error ? error.message : 'Processing failed')
      }
    }

    setBatchState({
      isProcessing: false,
      currentIndex: files.length,
      totalFiles: files.length,
      results,
      errors
    })

    return { results, errors }
  }, [])

  return {
    batchState,
    processBatch
  }
}