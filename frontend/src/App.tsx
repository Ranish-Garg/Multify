import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CreateGroup from './components/CreateGroup';
import GroupPage from './components/GroupPage';
import UserProfile from './components/UserProfile';
import { WalletProvider } from './contexts/WalletContext';

export type Page = 'dashboard' | 'create-group' | 'group' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const handleNavigate = (page: Page, groupId?: string) => {
    setCurrentPage(page);
    if (groupId) {
      setSelectedGroupId(groupId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'create-group':
        return <CreateGroup onNavigate={handleNavigate} />;
      case 'group':
        return <GroupPage groupId={selectedGroupId} onNavigate={handleNavigate} />;
      case 'profile':
        return <UserProfile />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-black text-white">
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
        />
        <main className="container mx-auto px-6 py-8">
          {renderCurrentPage()}
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;