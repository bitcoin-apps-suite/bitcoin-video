import { useState, useCallback, useRef } from 'react'
import { VideoProcessor, VideoProcessingOptions } from '@/utils/videoProcessor'

// Stub for ExportProgress
export interface ExportProgress {
  progress: number;
  stage: string;
}

export interface ProcessingState {
  isProcessing: boolean
  progress: ExportProgress | null
  error: string | null
  result: Blob | null
}

export function useVideoProcessing() {
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
        stage: 'error',
        progress: 0
      }
    }))
  }, [])

  const processVideo = useCallback(async (
    file: File, 
    options?: VideoProcessingOptions
  ): Promise<Blob | null> => {
    try {
      setProcessing({
        isProcessing: true,
        progress: {
          stage: 'initializing',
          progress: 0
        },
        error: null,
        result: null
      })

      const result = await VideoProcessor.processVideo(file, options)

      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        progress: {
          stage: 'complete',
          progress: 100
        },
        result
      }))

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Processing failed'
      setProcessing(prev => ({
        ...prev,
        isProcessing: false,
        progress: {
          stage: 'error',
          progress: 0
        },
        error: errorMessage
      }))

      return null
    }
  }, [])

  const extractThumbnail = useCallback(async (
    file: File,
    timeSeconds: number = 1
  ): Promise<Blob | null> => {
    try {
      const result = await VideoProcessor.extractThumbnail(file, timeSeconds)
      return result
    } catch (error) {
      return null
    }
  }, [])

  const compressVideo = useCallback(async (
    file: File,
    targetSizeMB: number
  ): Promise<Blob | null> => {
    try {
      const result = await VideoProcessor.compressVideo(file, targetSizeMB)
      return result
    } catch (error) {
      return null
    }
  }, [])

  const convertFormat = useCallback(async (
    file: File,
    format: string
  ): Promise<Blob | null> => {
    try {
      const result = await VideoProcessor.convertVideo(file, format)
      return result
    } catch (error) {
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
      setBatchState(prev => ({ ...prev, currentIndex: i + 1 }))
      
      try {
        const result = await VideoProcessor.processVideo(files[i], options)
        results.push(result)
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