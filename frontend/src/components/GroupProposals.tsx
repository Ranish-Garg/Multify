import React, { useState } from 'react';
import { Plus, Send, CheckCircle, XCircle, Clock } from 'lucide-react';
import ProposalCard from './ProposalCard';
import CreateProposalModal from './CreateProposalModal';

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
  members: string[];
}

interface GroupProposalsProps {
  group: Group;
  connectedWallet: string;
}

// Mock proposals data
const mockProposals = [
  {
    id: '1',
    type: 'transfer',
    description: 'Send 2.5 ETH to developer payment',
    recipient: '0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e',
    amount: '2.5 ETH',
    status: 'pending',
    signatures: 1,
    threshold: 2,
    createdAt: '2 hours ago',
    signers: ['0x8ba1f109551bD432803012645Hac136c64d109f0']
  },
  {
    id: '2',
    type: 'transfer',
    description: 'Send 500 USDC for marketing expenses',
    recipient: '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC',
    amount: '500 USDC',
    status: 'ready',
    signatures: 2,
    threshold: 2,
    createdAt: '1 day ago',
    signers: ['0x8ba1f109551bD432803012645Hac136c64d109f0', '0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e']
  },
  {
    id: '3',
    type: 'transfer',
    description: 'Emergency withdrawal for server costs',
    recipient: '0x1234567890abcdef1234567890abcdef12345678',
    amount: '0.8 ETH',
    status: 'rejected',
    signatures: 0,
    threshold: 2,
    createdAt: '3 days ago',
    signers: []
  }
];

function GroupProposals({ group, connectedWallet }: GroupProposalsProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const pendingProposals = mockProposals.filter(p => p.status === 'pending');
  const readyProposals = mockProposals.filter(p => p.status === 'ready');
  const completedProposals = mockProposals.filter(p => ['executed', 'rejected'].includes(p.status));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Proposals</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Proposal</span>
        </button>
      </div>

      {/* Ready to Execute */}
      {readyProposals.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Ready to Execute</h3>
          </div>
          <div className="space-y-4">
            {readyProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                group={group}
                connectedWallet={connectedWallet}
              />
            ))}
          </div>
        </section>
      )}

      {/* Pending Signatures */}
      {pendingProposals.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-yellow-400">Pending Signatures</h3>
          </div>
          <div className="space-y-4">
            {pendingProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                group={group}
                connectedWallet={connectedWallet}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      {completedProposals.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {completedProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                group={group}
                connectedWallet={connectedWallet}
              />
            ))}
          </div>
        </section>
      )}

      {mockProposals.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
          <Send className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No Proposals Yet</h3>
          <p className="text-gray-400 mb-6">Create the first proposal to get started.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors"
          >
            Create Proposal
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateProposalModal
          group={group}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

export default GroupProposals;