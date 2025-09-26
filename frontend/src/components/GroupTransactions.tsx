import React from 'react';
import { ArrowUpRight, ArrowDownLeft, CheckCircle, Calendar, Hash } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
  members: string[];
}

interface GroupTransactionsProps {
  group: Group;
}

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    type: 'outgoing',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    recipient: '0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e',
    amount: '2.5 ETH',
    description: 'Developer payment',
    date: '2024-01-15',
    time: '14:30',
    signers: ['0x8ba1f109551bD432803012645Hac136c64d109f0', '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC'],
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'incoming',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    sender: '0x1111222233334444555566667777888899990000',
    amount: '10.0 ETH',
    description: 'Funding deposit',
    date: '2024-01-14',
    time: '09:15',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'outgoing',
    hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    recipient: '0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC',
    amount: '500 USDC',
    description: 'Marketing expenses',
    date: '2024-01-13',
    time: '16:45',
    signers: ['0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e', '0x8ba1f109551bD432803012645Hac136c64d109f0'],
    status: 'confirmed'
  },
  {
    id: '4',
    type: 'incoming',
    hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    sender: '0x2222333344445555666677778888999900001111',
    amount: '5.0 ETH',
    description: 'Initial funding',
    date: '2024-01-10',
    time: '11:20',
    status: 'confirmed'
  }
];

function GroupTransactions({ group }: GroupTransactionsProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="text-sm text-gray-400">
          {mockTransactions.length} transactions
        </div>
      </div>

      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${
                  transaction.type === 'outgoing' 
                    ? 'bg-red-500/10 text-red-400' 
                    : 'bg-green-500/10 text-green-400'
                }`}>
                  {transaction.type === 'outgoing' ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {transaction.description}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="capitalize">{transaction.type}</span>
                    <span>
                      {transaction.type === 'outgoing' ? 'To' : 'From'}: {
                        transaction.type === 'outgoing' 
                          ? formatAddress(transaction.recipient!)
                          : formatAddress(transaction.sender!)
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className={`text-xl font-bold ${
                  transaction.type === 'outgoing' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {transaction.type === 'outgoing' ? '-' : '+'}
                  {transaction.amount}
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Confirmed</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>Date & Time</span>
                </div>
                <p className="text-white">{transaction.date} at {transaction.time}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Hash className="h-3 w-3" />
                  <span>Transaction Hash</span>
                </div>
                <p className="text-cyan-400 font-mono cursor-pointer hover:text-cyan-300 transition-colors">
                  {formatHash(transaction.hash)}
                </p>
              </div>

              {transaction.type === 'outgoing' && transaction.signers && (
                <div>
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Signers</span>
                  </div>
                  <div className="flex space-x-1">
                    {transaction.signers.map((signer, index) => (
                      <span
                        key={index}
                        className="bg-cyan-400/10 text-cyan-400 text-xs px-2 py-1 rounded-full font-mono"
                      >
                        {formatAddress(signer)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {mockTransactions.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
          <ArrowUpRight className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No Transactions Yet</h3>
          <p className="text-gray-400">Transaction history will appear here once you start using the wallet.</p>
        </div>
      )}
    </div>
  );
}

export default GroupTransactions;