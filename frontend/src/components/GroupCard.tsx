import React from 'react';
import { Users, Shield, ExternalLink } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
}

interface GroupCardProps {
  group: Group;
  onView: () => void;
}

function GroupCard({ group, onView }: GroupCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{group.name}</h3>
          <p className="text-sm text-gray-400 font-mono">{group.address}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="h-4 w-4" />
            <span className="text-sm">Members</span>
          </div>
          <span className="text-white font-medium">{group.totalMembers}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Threshold</span>
          </div>
          <span className="text-white font-medium">{group.threshold}/{group.totalMembers}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-white">{group.balance}</p>
          <p className="text-sm text-gray-400">Total Balance</p>
        </div>
        <button
          onClick={onView}
          className="flex items-center space-x-1 bg-cyan-400 text-black px-4 py-2 rounded-xl font-medium hover:bg-cyan-300 transition-colors"
        >
          <span>View</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default GroupCard;