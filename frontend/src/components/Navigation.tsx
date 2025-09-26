import React from 'react';
import { Wallet, Users, Plus, User } from 'lucide-react';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  connectedWallet: string;
}

function Navigation({ currentPage, onNavigate, connectedWallet }: NavigationProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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

          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-mono">{formatAddress(connectedWallet)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;