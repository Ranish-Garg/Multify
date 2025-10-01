import { Wallet, Users, Plus, User, LogOut } from 'lucide-react';
import { Page } from '../App';
import { useWallet } from '../contexts/WalletContext';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { 
    isConnected, 
    walletAddress, 
    isLoading, 
    connectWallet, 
    disconnectWallet, 
    formatAddress 
  } = useWallet();

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Users },
    { id: 'create-group' as Page, label: 'Create Group', icon: Plus },
    { id: 'profile' as Page, label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold">MultiSig</span>
            </div>
            
            <div className="flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-2xl transition-colors ${
                      currentPage === item.id
                        ? 'bg-cyan-400 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            {isConnected && walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-2xl">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-gray-300">{formatAddress(walletAddress)}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl transition-colors duration-200"
                  title="Disconnect Wallet"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-6 py-2 rounded-2xl font-medium transition-all duration-200 transform shadow-lg ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-105 hover:shadow-cyan-500/25'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;