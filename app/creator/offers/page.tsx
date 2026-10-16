'use client'

import React from 'react'
import DevSidebar from '@/components/DevSidebar'
import ResponsiveLayout from '@/components/ResponsiveLayout'
import DockManager from '@/components/DockManager'
import CleanTaskbar from '@/components/CleanTaskbar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import './offers.css'

export default function CreatorOffersPage() {
  return (
    <div className="offers-page">
      <ProofOfConceptBar />
      <CleanTaskbar />
      <ResponsiveLayout>
        <div className="offers-container">
          <section className="offers-hero">
            <h1>
              <span style={{ color: '#ffffff' }}>Creator</span> <span style={{ color: '#dc2626' }}>Service</span>{' '}
              <span style={{ color: '#ffffff' }}>Offers</span>
            </h1>
            <p className="offers-tagline">
              No creator offers yet. When creators list their services they will appear here.
            </p>
          </section>
        </div>
      </ResponsiveLayout>
      <DevSidebar />
      <DockManager currentApp="bitcoin-video" />
    </div>
  )
}
