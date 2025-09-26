import React from 'react';
import { CheckCircle, XCircle, Clock, Send, Users } from 'lucide-react';

interface Proposal {
  id: string;
  type: string;
  description: string;
  recipient: string;
  amount: string;
  status: string;
  signatures: number;
  threshold: number;
  createdAt: string;
  signers: string[];
}

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
  members: string[];
}

interface ProposalCardProps {
  proposal: Proposal;
  group: Group;
  connectedWallet: string;
}

function ProposalCard({ proposal, group, connectedWallet }: ProposalCardProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const hasUserSigned = proposal.signers.some(
    signer => signer.toLowerCase() === connectedWallet.toLowerCase()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5';
      case 'ready':
        return 'text-green-400 border-green-400/20 bg-green-400/5';
      case 'rejected':
        return 'text-red-400 border-red-400/20 bg-red-400/5';
      case 'executed':
        return 'text-blue-400 border-blue-400/20 bg-blue-400/5';
      default:
        return 'text-gray-400 border-gray-400/20 bg-gray-400/5';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'executed':
        return <Send className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Send className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-gray-400 uppercase font-medium">Transfer</span>
            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(proposal.status)}`}>
              <div className="flex items-center space-x-1">
                {getStatusIcon(proposal.status)}
                <span className="capitalize">{proposal.status}</span>
              </div>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{proposal.description}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>To: {formatAddress(proposal.recipient)}</span>
            <span>Amount: {proposal.amount}</span>
            <span>{proposal.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-white font-medium">
              {proposal.signatures}/{proposal.threshold}
            </span>
            <span className="text-gray-400 text-sm">signatures</span>
          </div>
          {hasUserSigned && (
            <span className="bg-green-400/10 text-green-400 text-xs px-2 py-1 rounded-full">
              You signed
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          {proposal.status === 'ready' && (
            <button className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-medium hover:bg-cyan-300 transition-colors">
              Execute
            </button>
          )}
          {proposal.status === 'pending' && !hasUserSigned && (
            <>
              <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-500 transition-colors">
                Approve
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-500 transition-colors">
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;