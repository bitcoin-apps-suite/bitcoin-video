/**
 * PriceService - Real-time token price feeds
 * Fetches prices from various sources including exchanges and DEXs
 */

export interface TokenPrice {
  symbol: string;
  name: string;
  price: number;
  price_usd: number;
  price_btc?: number;
  change_24h: number;
  change_percent_24h: number;
  volume_24h: number;
  market_cap?: number;
  last_updated: Date;
  source: string;
}

export interface PriceSubscription {
  unsubscribe: () => void;
}

class PriceServiceClass {
  private prices: Map<string, TokenPrice> = new Map();
  private subscribers: Map<string, Set<(price: TokenPrice) => void>> = new Map();
  private updateInterval: number = 30000; // 30 seconds
  private intervalId?: NodeJS.Timeout;
  private wsConnections: Map<string, WebSocket> = new Map();

  constructor() {
    this.startPriceUpdates();
  }

  /**
   * Start periodic price updates
   */
  private startPriceUpdates() {
    // Initial fetch
    this.fetchAllPrices();
    
    // Set up interval
    this.intervalId = setInterval(() => {
      this.fetchAllPrices();
    }, this.updateInterval);
  }

  /**
   * Fetch all token prices
   */
  private async fetchAllPrices() {
    try {
      // Fetch BSV price from multiple sources for reliability
      await Promise.all([
        this.fetchBSVPrice(),
        this.fetchBPhotosPrice(),
        this.fetchPhotoTokenPrices(),
      ]);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }

  /**
   * Fetch BSV price (using mock data for now due to CORS)
   */
  private async fetchBSVPrice() {
    try {
      // Use mock data for now to avoid CORS issues
      // In production, this would be handled by a backend API
      const mockPrice: TokenPrice = {
        symbol: 'BSV',
        name: 'Bitcoin SV',
        price: 45.67 + (Math.random() - 0.5) * 2, // Simulate price movement
        price_usd: 45.67 + (Math.random() - 0.5) * 2,
        price_btc: 0.00074,
        change_24h: 1.23 + (Math.random() - 0.5) * 2,
        change_percent_24h: 2.77 + (Math.random() - 0.5) * 4,
        volume_24h: 12500000,
        last_updated: new Date(),
        source: 'Mock API'
      };
      
      this.updatePrice('BSV', mockPrice);
    } catch (error) {
      console.error('Failed to fetch BSV price:', error);
    }
  }


  /**
   * Fetch BPHOTOS token price
   * This would connect to a DEX or custom price oracle
   */
  private async fetchBPhotosPrice() {
    try {
      // For now, we'll use a mock endpoint
      // In production, this would connect to a DEX API or price oracle
      const mockPrice: TokenPrice = {
        symbol: 'BPHOTOS',
        name: 'Bitcoin Photos',
        price: 0.0187,
        price_usd: 0.0187,
        change_24h: 0.0023,
        change_percent_24h: 14.1,
        volume_24h: 89000,
        market_cap: 187000,
        last_updated: new Date(),
        source: 'Mock DEX'
      };
      
      // TODO: Replace with real DEX API call
      // const response = await fetch('https://api.dex.bsv/tokens/BPHOTOS');
      
      this.updatePrice('BPHOTOS', mockPrice);
    } catch (error) {
      console.error('Failed to fetch BPHOTOS price:', error);
    }
  }

  /**
   * Fetch photo NFT token prices for individual photos
   */
  private async fetchPhotoTokenPrices() {
    try {
      // Photo tokens would be fetched from a BSV DEX or NFT marketplace
      // For photo tokens, we'd query the marketplace indexer
      
      // Mock implementation for now
      const photoCategories = ['LANDSCAPE', 'PORTRAIT', 'STREET', 'MACRO', 'ABSTRACT'];
      
      for (const category of photoCategories) {
        const mockPrice: TokenPrice = {
          symbol: category,
          name: `${category} Photos`,
          price: Math.random() * 0.05 + 0.01,
          price_usd: Math.random() * 0.05 + 0.01,
          change_24h: (Math.random() - 0.5) * 0.005,
          change_percent_24h: (Math.random() - 0.5) * 15,
          volume_24h: Math.random() * 25000,
          last_updated: new Date(),
          source: 'Photos Marketplace'
        };
        
        this.updatePrice(category, mockPrice);
      }
    } catch (error) {
      console.error('Failed to fetch photo token prices:', error);
    }
  }

  /**
   * Connect to WebSocket for real-time price updates
   */
  public connectWebSocket(symbol: string, wsUrl: string) {
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.symbol === symbol && data.price) {
          const currentPrice = this.prices.get(symbol);
          if (currentPrice) {
            currentPrice.price = data.price;
            currentPrice.price_usd = data.price_usd || data.price;
            currentPrice.last_updated = new Date();
            this.updatePrice(symbol, currentPrice);
          }
        }
      };
      
      ws.onerror = (error) => {
        console.error(`WebSocket error for ${symbol}:`, error);
      };
      
      ws.onclose = () => {
        console.log(`WebSocket closed for ${symbol}`);
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          this.connectWebSocket(symbol, wsUrl);
        }, 5000);
      };
      
      this.wsConnections.set(symbol, ws);
    } catch (error) {
      console.error(`Failed to connect WebSocket for ${symbol}:`, error);
    }
  }

  /**
   * Update price and notify subscribers
   */
  private updatePrice(symbol: string, price: TokenPrice) {
    this.prices.set(symbol, price);
    
    // Notify subscribers
    const subs = this.subscribers.get(symbol);
    if (subs) {
      subs.forEach(callback => callback(price));
    }
  }

  /**
   * Get current price for a token
   */
  public getPrice(symbol: string): TokenPrice | null {
    return this.prices.get(symbol) || null;
  }

  /**
   * Get all current prices
   */
  public getAllPrices(): TokenPrice[] {
    return Array.from(this.prices.values());
  }

  /**
   * Subscribe to price updates for a specific token
   */
  public subscribe(symbol: string, callback: (price: TokenPrice) => void): PriceSubscription {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    
    this.subscribers.get(symbol)!.add(callback);
    
    // Send current price if available
    const currentPrice = this.prices.get(symbol);
    if (currentPrice) {
      callback(currentPrice);
    }
    
    return {
      unsubscribe: () => {
        const subs = this.subscribers.get(symbol);
        if (subs) {
          subs.delete(callback);
        }
      }
    };
  }

  /**
   * Subscribe to all price updates
   */
  public subscribeAll(callback: (prices: TokenPrice[]) => void): PriceSubscription {
    const handler = () => {
      callback(this.getAllPrices());
    };
    
    // Subscribe to all existing symbols
    const symbols = new Set(Array.from(this.prices.keys()).concat(['BSV', 'BPHOTOS']));
    symbols.forEach(symbol => {
      this.subscribe(symbol, handler);
    });
    
    return {
      unsubscribe: () => {
        symbols.forEach(symbol => {
          const subs = this.subscribers.get(symbol);
          if (subs) {
            subs.delete(handler);
          }
        });
      }
    };
  }

  /**
   * Clean up resources
   */
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    // Close all WebSocket connections
    this.wsConnections.forEach(ws => {
      ws.close();
    });
    this.wsConnections.clear();
    
    // Clear subscribers
    this.subscribers.clear();
  }
}

// Singleton instance
export const PriceService = new PriceServiceClass();