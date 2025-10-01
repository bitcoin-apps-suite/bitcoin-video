'use client'

import { AlertTriangle } from 'lucide-react'

export default function ProofOfConceptBar() {
  return (
    <div className="sticky top-0 z-[99999] bg-gradient-to-r from-yellow-600 to-orange-600 text-black py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
      <AlertTriangle className="w-4 h-4" />
      <span>PROOF OF CONCEPT - This is a demonstration of Bitcoin Video Platform</span>
      <AlertTriangle className="w-4 h-4" />
    </div>
  )
}