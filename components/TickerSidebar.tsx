import React, { useState, useEffect } from 'react';
import { PriceService, TokenPrice as ServiceTokenPrice } from '../services/PriceService';
import './TickerSidebar.css';

interface TokenPrice extends ServiceTokenPrice {
  change24h: number;
  changePercent: number;
  contractId?: string;
  liquidity?: number;
  holders?: number;
  category?: string;
  isSpecial?: boolean;
  isVideo?: boolean;
}

interface TickerSidebarProps {
  userHandle?: string;
  currentVideoToken?: {
    symbol: string;
    name: string;
  };
}

const TickerSidebar: React.FC<TickerSidebarProps> = ({
  userHandle,
  currentVideoToken
}) => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Generate trending video tokens with contract IDs
    const generateTrendingVideos = (): TokenPrice[] => {
      const videos = [
        { base: 'bBitcoin', name: 'Bitcoin Explainers', category: 'Education', basePrice: 0.067, volatility: 0.3 },
        { base: 'bCrypto', name: 'Crypto News', category: 'News', basePrice: 0.045, volatility: 0.4 },
        { base: 'bTech', name: 'Tech Reviews', category: 'Technology', basePrice: 0.052, volatility: 0.25 },
        { base: 'bTutorial', name: 'How-To Videos', category: 'Tutorial', basePrice: 0.038, volatility: 0.2 },
        { base: 'bGaming', name: 'Gaming Content', category: 'Entertainment', basePrice: 0.041, volatility: 0.35 },
        { base: 'bVlog', name: 'Creator Vlogs', category: 'Lifestyle', basePrice: 0.029, volatility: 0.3 },
        { base: 'bFinance', name: 'Finance Tips', category: 'Finance', basePrice: 0.063, volatility: 0.4 },
        { base: 'bMining', name: 'Mining Videos', category: 'Bitcoin', basePrice: 0.055, volatility: 0.25 }
      ];

      // Generate videos with varying liquidity to simulate market dynamics
      const videosWithLiquidity = videos.map((video, index) => {
        const contractNum = Math.floor(Math.random() * 9000) + 1000;
        const contractId = `${Math.random().toString(36).substring(2, 5)}_${contractNum}`;
        
        // Simulate market dynamics with varying liquidity
        const liquidityMultiplier = Math.random() * 2 + 0.5; // 0.5x to 2.5x
        const basePrice = video.basePrice * liquidityMultiplier;
        const change = (Math.random() - 0.5) * basePrice * video.volatility;
        const liquidity = Math.floor(Math.random() * 100000 * liquidityMultiplier) + 8000;
        const holders = Math.floor(liquidity / 200 + Math.random() * 100);
        
        return {
          symbol: `${video.base}_${contractId}`,
          name: video.name,
          category: video.category,
          contractId: contractId,
          price: basePrice,
          price_usd: basePrice,
          change24h: change,
          changePercent: (change / basePrice) * 100,
          change_24h: change,
          change_percent_24h: (change / basePrice) * 100,
          volume_24h: liquidity,
          liquidity: liquidity,
          holders: holders,
          last_updated: new Date(),
          source: 'Video Marketplace',
          isVideo: true,
          isSpecial: false
        };
      });

      // Sort videos by liquidity (most liquid first)
      return videosWithLiquidity.sort((a, b) => (b.liquidity || 0) - (a.liquidity || 0));
    };

    // Subscribe to price updates
    const subscription = PriceService.subscribeAll((updatedPrices) => {
      // Get BSV price first
      const bsvPrice = updatedPrices.find(p => p.symbol === 'BSV');
      const bvideoPrice = updatedPrices.find(p => p.symbol === 'BVIDEO');
      
      const specialTokens: TokenPrice[] = [];
      
      // Add BSV first
      if (bsvPrice) {
        specialTokens.push({
          ...bsvPrice,
          change24h: bsvPrice.change_24h,
          changePercent: bsvPrice.change_percent_24h,
          isSpecial: true,
          isVideo: false
        });
      }
      
      // Add BVIDEO second
      if (bvideoPrice) {
        specialTokens.push({
          ...bvideoPrice,
          change24h: bvideoPrice.change_24h,
          changePercent: bvideoPrice.change_percent_24h,
          isSpecial: true,
          isVideo: false
        });
      }

      // Add user's handle token after BVIDEO if available
      if (userHandle) {
        specialTokens.push({
          symbol: userHandle.toUpperCase(),
          name: `@${userHandle} Videos`,
          price: 0.00187,
          price_usd: 0.00187,
          change24h: 0.00023,
          changePercent: 12.3,
          change_24h: 0.00023,
          change_percent_24h: 12.3,
          volume_24h: 15500,
          liquidity: 15500,
          holders: 42,
          last_updated: new Date(),
          source: 'HandCash',
          isSpecial: true,
          isVideo: false,
          category: 'Creator'
        });
      }

      // Generate trending video tokens
      const videoTokens = generateTrendingVideos();
      
      const allPrices = [...specialTokens, ...videoTokens];
      
      setPrices(allPrices);
      setLastUpdate(new Date());
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [userHandle, currentVideoToken]);

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatVolume = (volume?: number): string => {
    if (!volume) return 'N/A';
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const formatLiquidity = (liquidity?: number): string => {
    if (!liquidity) return 'Low';
    if (liquidity >= 100000) return 'Very High';
    if (liquidity >= 50000) return 'High';
    if (liquidity >= 20000) return 'Medium';
    if (liquidity >= 8000) return 'Fair';
    return 'Low';
  };

  const getLiquidityColor = (liquidity?: number): string => {
    if (!liquidity) return '#666';
    if (liquidity >= 100000) return '#4CAF50';
    if (liquidity >= 50000) return '#8BC34A';
    if (liquidity >= 20000) return '#FFC107';
    if (liquidity >= 8000) return '#FF9800';
    return '#f44336';
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  return (
    <div className={`ticker-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="ticker-header">
        <h3>$bVideo Market</h3>
        <div className="ticker-header-controls">
          <button 
            className="ticker-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand ticker' : 'Collapse ticker'}
          >
            {isCollapsed ? '←' : '→'}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {isLoading ? (
            <div className="ticker-loading">Loading prices...</div>
          ) : (
            <div className="ticker-list">
              {prices.map((token, index) => {
                // Add divider after last special token
                const showDivider = token.isSpecial && 
                  index < prices.length - 1 && 
                  !prices[index + 1].isSpecial;
                
                return (
                  <React.Fragment key={token.symbol}>
                    <div className={`ticker-item ${token.isSpecial ? 'special' : ''} ${token.isVideo ? 'video' : ''}`}>
                  <div className="ticker-symbol-row">
                    <span className="ticker-symbol">${token.symbol}</span>
                    <span className={`ticker-change ${token.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {token.change24h >= 0 ? '↑' : '↓'} {Math.abs(token.changePercent).toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="ticker-name">
                    {token.name}
                    {token.category && (
                      <span className="ticker-category"> • {token.category}</span>
                    )}
                  </div>
                  
                  <div className="ticker-price-row">
                    <span className="ticker-price">{formatPrice(token.price)}</span>
                    {token.contractId && (
                      <span className="ticker-contract-id">#{token.contractId}</span>
                    )}
                  </div>
                  
                  <div className="ticker-stats">
                    {token.volume_24h && (
                      <span className="ticker-volume">
                        Vol: {formatVolume(token.volume_24h)}
                      </span>
                    )}
                    {token.liquidity !== undefined && (
                      <span 
                        className="ticker-liquidity"
                        style={{ color: getLiquidityColor(token.liquidity) }}
                      >
                        {formatLiquidity(token.liquidity)}
                      </span>
                    )}
                    {token.holders !== undefined && (
                      <span className="ticker-holders">
                        {token.holders} holders
                      </span>
                    )}
                  </div>
                </div>
                {showDivider && (
                  <div className="ticker-divider">
                    <span>Trending Videos</span>
                  </div>
                )}
              </React.Fragment>
              );
            })}
            </div>
          )}

          <div className="ticker-footer">
            <div className="ticker-disclaimer">
              Prices update every 30s
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TickerSidebar;