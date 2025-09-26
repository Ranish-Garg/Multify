import React, { useState } from 'react';
import { Page } from '../App';
import { Plus, Trash2, Loader2 } from 'lucide-react';

interface CreateGroupProps {
  onNavigate: (page: Page) => void;
}

function CreateGroup({ onNavigate }: CreateGroupProps) {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['']);
  const [threshold, setThreshold] = useState(2);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState('');

  const addMember = () => {
    setMembers([...members, '']);
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, address: string) => {
    const newMembers = [...members];
    newMembers[index] = address;
    setMembers(newMembers);
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedAddress('0x1234567890abcdef1234567890abcdef12345678');
    }, 3000);
  };

  const validMembers = members.filter(member => member.trim() !== '');
  const canDeploy = validMembers.length >= 2 && threshold <= validMembers.length && threshold >= 1;

  if (deployedAddress) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Group Deployed Successfully!</h2>
          <p className="text-gray-400 mb-6">Your multisig group has been deployed to the blockchain.</p>
          
          <div className="bg-black border border-gray-700 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-400 mb-1">Group Address:</p>
            <p className="font-mono text-cyan-400">{deployedAddress}</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => onNavigate('group', '1')}
              className="flex-1 bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors"
            >
              View Group
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Group</h1>
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <div className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Group Name (Optional)
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Dev Team Treasury"
              className="w-full bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Member Addresses */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Member Addresses
            </label>
            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder="0x..."
                    className="flex-1 bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(index)}
                      className="p-3 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addMember}
              className="mt-3 flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Member</span>
            </button>
          </div>

          {/* Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Signature Threshold
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                max={validMembers.length}
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value) || 1)}
                className="w-20 bg-black border border-gray-700 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-center"
              />
              <span className="text-gray-400">
                out of {validMembers.length} members
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Number of signatures required to execute transactions
            </p>
          </div>

          {/* Deploy Button */}
          <div className="pt-6">
            <button
              onClick={handleDeploy}
              disabled={!canDeploy || isDeploying}
              className="w-full bg-cyan-400 text-black px-6 py-3 rounded-2xl font-medium hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <span>Deploy Group</span>
              )}
            </button>
            {!canDeploy && (
              <p className="text-sm text-red-400 mt-2 text-center">
                Please add at least 2 valid member addresses and set a valid threshold
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;