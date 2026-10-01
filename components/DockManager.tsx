'use client';

import React, { useSyncExternalStore } from 'react';
import Dock from './Dock';
import MinimalDock from './MinimalDock';

interface DockManagerProps {
  currentApp?: string; // ID of the current app (e.g., 'bitcoin-identity', 'bitcoin-writer')
}

// Dock style lives in localStorage and changes are broadcast via a
// 'dockStyleChanged' window event (see Dock / MinimalDock).
const subscribeToDockStyle = (onChange: () => void) => {
  window.addEventListener('dockStyleChanged', onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener('dockStyleChanged', onChange);
    window.removeEventListener('storage', onChange);
  };
};

const getDockStyle = () => localStorage.getItem('dockStyle') || 'large';
const getServerDockStyle = () => 'large';

const DockManager: React.FC<DockManagerProps> = ({ currentApp = 'bitcoin-video' }) => {
  const dockStyle = useSyncExternalStore(subscribeToDockStyle, getDockStyle, getServerDockStyle);

  return (
    <>
      {dockStyle === 'minimal' ? <MinimalDock currentApp={currentApp} /> : <Dock currentApp={currentApp} />}
    </>
  );
};

export default DockManager;
