import { User, Wallet, Users, Shield } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface UserProfileProps {}

// Mock user data
const mockUserData = {
  totalGroups: 3,
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

function UserProfile({}: UserProfileProps) {
  const { walletAddress, formatAddress } = useWallet();

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
            <p className="font-mono text-cyan-400">{formatAddress(walletAddress)}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Total Groups</span>
            </div>
            <p className="text-2xl font-bold text-white">{mockUserData.totalGroups}</p>
          </div>
          
          
      
        </div>
      </div>


      
    </div>
  );
}

export default UserProfile;