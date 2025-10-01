import { useState } from 'react';
import { Page } from '../App';
import GroupOverview from './GroupOverview';
import GroupProposals from './GroupProposals';
import GroupTransactions from './GroupTransactions';
import { ArrowLeft } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface GroupPageProps {
  groupId: string | null;
  onNavigate: (page: Page) => void;
}

type GroupTab = 'overview' | 'proposals' | 'transactions';

// Mock group data
const mockGroup = {
  id: '1',
  name: 'Dev Team Treasury',
  address: '0x1234567890abcdef1234567890abcdef12345678',
  threshold: 2,
  totalMembers: 3,
  balance: '12.5 ETH',
  members: [
    '0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e',
    '0x8ba1f109551bD432803012645Hac136c64d109f0',
    '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC'
  ]
};

function GroupPage({ groupId, onNavigate }: GroupPageProps) {
  // const { walletAddress } = useWallet(); // Available for future use
  const [activeTab, setActiveTab] = useState<GroupTab>('overview');

  if (!groupId) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Group not found</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const tabs: { id: GroupTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'proposals', label: 'Proposals' },
    { id: 'transactions', label: 'Transactions' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <GroupOverview group={mockGroup} />;
      case 'proposals':
        return <GroupProposals group={mockGroup} />;
      case 'transactions':
        return <GroupTransactions group={mockGroup} />;
      default:
        return <GroupOverview group={mockGroup} />;
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">{mockGroup.name}</h1>
          <p className="text-gray-400 font-mono">{mockGroup.address}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default GroupPage;