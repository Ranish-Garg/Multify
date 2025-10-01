import { Page } from '../App';
import GroupCard from './GroupCard';
import { Plus } from 'lucide-react';
// import { useWallet } from '../contexts/WalletContext';

interface DashboardProps {
  onNavigate: (page: Page, groupId?: string) => void;
}

// Mock data for demonstration
const mockGroups = [
  {
    id: '1',
    name: 'Dev Team Treasury',
    address: '0x1234...abcd',
    threshold: 2,
    totalMembers: 3,
    balance: '12.5 ETH'
  },
  {
    id: '2',
    name: 'Investment Pool',
    address: '0x5678...efgh',
    threshold: 3,
    totalMembers: 5,
    balance: '50.2 ETH'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    address: '0x9abc...ijkl',
    threshold: 2,
    totalMembers: 4,
    balance: '25.0 ETH'
  }
];

function Dashboard({ onNavigate }: DashboardProps) {
  // const { walletAddress } = useWallet(); // Available for future use

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => onNavigate('create-group')}
          className="flex items-center space-x-2 bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Group</span>
        </button>
      </div>

    

      {/* My Groups */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-300">My Groups</h2>
        {mockGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onView={() => onNavigate('group', group.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <p className="text-gray-400">You're not a member of any groups yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;