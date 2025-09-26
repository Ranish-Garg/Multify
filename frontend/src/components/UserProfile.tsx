import React from 'react';
import { User, Wallet, Users, Shield } from 'lucide-react';

interface UserProfileProps {
  connectedWallet: string;
}

// Mock user data
const mockUserData = {
  totalGroups: 3,
  groupsCreated: 2,
  totalBalance: '15.3 ETH',
  memberSince: 'January 2024'
};

const mockUserGroups = [
  {
    id: '1',
    name: 'Dev Team Treasury',
    role: 'Owner',
    members: 3,
    balance: '12.5 ETH'
  },
  {
    id: '2',
    name: 'Investment Pool',
    role: 'Member',
    members: 5,
    balance: '50.2 ETH'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    role: 'Owner',
    members: 4,
    balance: '25.0 ETH'
  }
];

function UserProfile({ connectedWallet }: UserProfileProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center">
          <User className="h-8 w-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">User Profile</h1>
          <p className="text-gray-400">Manage your multisig wallet settings</p>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">Wallet Address</span>
            </div>
            <p className="font-mono text-cyan-400">{formatAddress(connectedWallet)}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Total Groups</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockUserData.totalGroups}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Groups Created</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockUserData.groupsCreated}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">Member Since</span>
            </div>
            <p className="text-white font-medium">{mockUserData.memberSince}</p>
          </div>
        </div>
      </div>

      {/* Groups Overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">My Groups</h2>
        <div className="space-y-4">
          {mockUserGroups.map((group) => (
            <div
              key={group.id}
              className="bg-black border border-gray-700 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{group.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{group.members} members</span>
                    <span>{group.balance}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  group.role === 'Owner' 
                    ? 'bg-cyan-400/10 text-cyan-400' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {group.role}
                </span>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black rounded-2xl">
            <div>
              <h3 className="font-medium text-white">Notifications</h3>
              <p className="text-sm text-gray-400">Receive email notifications for proposals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-black rounded-2xl">
            <div>
              <h3 className="font-medium text-white">Auto-refresh</h3>
              <p className="text-sm text-gray-400">Automatically refresh data every 30 seconds</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;