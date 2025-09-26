import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CreateGroup from './components/CreateGroup';
import GroupPage from './components/GroupPage';
import UserProfile from './components/UserProfile';

export type Page = 'dashboard' | 'create-group' | 'group' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [connectedWallet] = useState('0x742d35Cc82122A4c2A5bEf2E8f7E6a1F3B8c9a2e');

  const handleNavigate = (page: Page, groupId?: string) => {
    setCurrentPage(page);
    if (groupId) {
      setSelectedGroupId(groupId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} connectedWallet={connectedWallet} />;
      case 'create-group':
        return <CreateGroup onNavigate={handleNavigate} />;
      case 'group':
        return <GroupPage groupId={selectedGroupId} onNavigate={handleNavigate} connectedWallet={connectedWallet} />;
      case 'profile':
        return <UserProfile connectedWallet={connectedWallet} />;
      default:
        return <Dashboard onNavigate={handleNavigate} connectedWallet={connectedWallet} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        connectedWallet={connectedWallet}
      />
      <main className="container mx-auto px-6 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;