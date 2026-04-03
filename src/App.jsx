import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

function AppContent() {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync state activeTab with URL for sidebar active state
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    if (state.activeTab !== path) {
      dispatch({ type: 'SET_TAB', payload: path });
    }
  }, [location.pathname, state.activeTab, dispatch]);

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onExit={handleExit}
      />
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-content">
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionList />} />
            <Route path="insights" element={<Insights />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LandingPage onEnter={(nav) => nav('/app/dashboard')} />} />
          <Route path="/app/*" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
