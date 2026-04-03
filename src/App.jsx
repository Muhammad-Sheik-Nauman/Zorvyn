import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceTrend from './components/BalanceTrend';
import SpendingBreakdown from './components/SpendingBreakdown';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
import LandingPage from './components/LandingPage';
import './App.css';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <SummaryCards />
      <div className="charts-row">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
    </div>
  );
}

function AppContent({ onExit }) {
  const { state } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (state.activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'transactions':
        return <TransactionList />;
      case 'insights':
        return <Insights />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onExit={onExit} />
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function MainRoutes() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return <AppContent onExit={() => setShowLanding(true)} />;
}

function App() {
  return (
    <AppProvider>
      <MainRoutes />
    </AppProvider>
  );
}

export default App;
