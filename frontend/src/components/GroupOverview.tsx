import { Users, Shield, Wallet, Plus } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
  members: string[];
}

interface GroupOverviewProps {
  group: Group;
}

function GroupOverview({ group }: GroupOverviewProps) {
  const { walletAddress } = useWallet();
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isCurrentUser = (address: string) => {
    return address.toLowerCase() === walletAddress.toLowerCase();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Group Info */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Group Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Threshold</span>
              </div>
              <p className="text-2xl font-bold text-white">{group.threshold}/{group.totalMembers}</p>
              <p className="text-sm text-gray-500">Signatures required</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">Members</span>
              </div>
              <p className="text-2xl font-bold text-white">{group.totalMembers}</p>
              <p className="text-sm text-gray-500">Total signers</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Members</h3>
            <span className="text-sm text-gray-400">{group.members.length} members</span>
          </div>
          <div className="space-y-3">
            {group.members.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="font-mono text-white">{formatAddress(member)}</span>
                </div>
                {isCurrentUser(member) && (
                  <span className="bg-cyan-400/10 text-cyan-400 text-xs px-2 py-1 rounded-full">
                    You
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Balance & Actions */}
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center space-x-2 text-gray-400 mb-2">
            <Wallet className="h-4 w-4" />
            <span className="text-sm">Total Balance</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{group.balance}</p>
          <p className="text-sm text-gray-500">≈ $23,456.78</p>
          
          <button className="w-full mt-6 bg-cyan-400 text-black px-4 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors flex items-center justify-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Fund Group</span>
          </button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Token Balances</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <span className="text-white">ETH</span>
              </div>
              <span className="font-mono text-white">12.5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="text-white">USDC</span>
              </div>
              <span className="font-mono text-white">1,250.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                <span className="text-white">DAI</span>
              </div>
              <span className="font-mono text-white">750.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupOverview;