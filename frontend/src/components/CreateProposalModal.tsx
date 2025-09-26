import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  address: string;
  threshold: number;
  totalMembers: number;
  balance: string;
  members: string[];
}

interface CreateProposalModalProps {
  group: Group;
  onClose: () => void;
}

function CreateProposalModal({ group, onClose }: CreateProposalModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [description, setDescription] = useState('');

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '12.5' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00' },
    { symbol: 'DAI', name: 'Dai Stablecoin', balance: '750.50' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal creation
    console.log({ recipient, amount, token, description });
    onClose();
  };

  const canSubmit = recipient && amount && description;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create Proposal</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Payment for development work"
              className="w-full bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Token
              </label>
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {tokens.map((t) => (
                  <option key={t.symbol} value={t.symbol}>
                    {t.symbol} ({t.balance})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-black border border-gray-700 rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Signatures Required:</span>
              <span className="text-white">{group.threshold}/{group.totalMembers}</span>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-2xl font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 bg-cyan-400 text-black px-4 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Create</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProposalModal;