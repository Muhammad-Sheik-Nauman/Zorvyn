import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceTrend from './components/BalanceTrend';
import SpendingBreakdown from './components/SpendingBreakdown';
import TransactionList from './components/TransactionList';
import Insights from './components/Insights';
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

function AppContent() {
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
      <Sidebar />
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

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
