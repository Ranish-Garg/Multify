import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  formatAddress: (address: string) => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          console.log('Wallet connected:', accounts[0]);
        }
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      
      // Handle specific MetaMask errors
      if (error.code === 4001) {
        // User rejected the request
        alert('Please approve the connection request to continue');
      } else if (error.code === -32002) {
        // Request already pending
        alert('Connection request is already pending. Please check MetaMask');
      } else {
        alert('Failed to connect wallet. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    // Note: This doesn't actually disconnect from MetaMask, 
    // it just clears the local state
  };

  // Check for existing connection and handle account changes
  useEffect(() => {
    // Commented out auto-connection check to force manual connection
    // const checkConnection = async () => {
    //   if (typeof window.ethereum !== 'undefined') {
    //     try {
    //       // Check if already connected
    //       const accounts = await window.ethereum.request({
    //         method: 'eth_accounts',
    //       });
    //       
    //       if (accounts.length > 0) {
    //         setWalletAddress(accounts[0]);
    //         setIsConnected(true);
    //       }
    //     } catch (error) {
    //       console.error('Error checking wallet connection:', error);
    //     }
    //   }
    // };

    // Handle account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setIsConnected(false);
        setWalletAddress('');
      } else {
        // User switched to a different account
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      }
    };

    // Handle chain changes
    const handleChainChanged = (chainId: string) => {
      console.log('Chain changed to:', chainId);
      // Reload the page when chain changes (recommended by MetaMask)
      window.location.reload();
    };

    // Handle wallet disconnect
    const handleDisconnect = () => {
      setIsConnected(false);
      setWalletAddress('');
    };

    // Check initial connection (commented out to force manual connection)
    // checkConnection();

    // Set up event listeners
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    isLoading,
    connectWallet,
    disconnectWallet,
    formatAddress,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
