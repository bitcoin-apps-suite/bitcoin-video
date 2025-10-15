import React from 'react';
import Link from 'next/link';
import { Video, Youtube, Twitter, Github, MessageCircle, Bitcoin } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <img 
                src="/bitcoin-video.jpg" 
                alt="Bitcoin Video"
                className="footer-logo-image"
              />
            </div>
            <span className="app-name">Bitcoin Video</span>
          </div>
          <p className="footer-tagline">
            Decentralized video creation and monetization on Bitcoin
          </p>
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Creators</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₿2.5M</span>
              <span className="stat-label">Earned</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Create</h4>
          <ul>
            <li><Link href="/create">Upload Video</Link></li>
            <li><Link href="/studio">Video Studio</Link></li>
            <li><Link href="/docs/creator-guide">Creator Guide</Link></li>
            <li><Link href="/features">Features</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Marketplace</h4>
          <ul>
            <li><Link href="/exchange">Video Exchange</Link></li>
            <li><Link href="/commissions">Commissions</Link></li>
            <li><Link href="/grants">Creator Grants</Link></li>
            <li><Link href="/token">$BVIDEO Token</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="https://github.com/bitcoin-apps-suite/bitcoin-video" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 inline mr-1" />
              GitHub
            </a></li>
            <li><a href="https://twitter.com/bitcoin_video" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-4 h-4 inline mr-1" />
              Twitter
            </a></li>
            <li><a href="https://discord.gg/bitcoinvideo" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 inline mr-1" />
              Discord
            </a></li>
            <li><a href="https://youtube.com/@bitcoinvideo" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-4 h-4 inline mr-1" />
              YouTube
            </a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Developers</h4>
          <ul>
            <li><a href="http://localhost:2010/contributions#tasks">Jobs</a></li>
            <li><Link href="/contracts">Contracts</Link></li>
            <li><a href="https://github.com/bitcoin-apps-suite/bitcoin-video/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
            <li><Link href="/publisher/requests">Publisher API</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2025 The Bitcoin Corporation LTD</p>
          <p>Registered in England and Wales • Company No. 16735102</p>
          <p>Licensed under <a href="/LICENSE" target="_blank" rel="noopener noreferrer">Open BSV License v5</a></p>
          <p>Built on Bitcoin SV blockchain for creators worldwide</p>
          <p className="footer-links">
            <Link href="/terms">Terms of Service</Link>
            <span className="separator">•</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link href="/compliance">Compliance</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;