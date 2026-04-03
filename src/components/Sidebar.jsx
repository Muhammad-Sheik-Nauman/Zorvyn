import { useApp } from '../context/AppContext';
import {
  HiOutlineViewGrid,
  HiOutlineSwitchHorizontal,
  HiOutlineLightBulb,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineX
} from 'react-icons/hi';

export default function Sidebar({ isOpen, onClose, onExit }) {
  const { state, dispatch } = useApp();
  const { activeTab, role, darkMode } = state;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiOutlineViewGrid /> },
    { id: 'transactions', label: 'Transactions', icon: <HiOutlineSwitchHorizontal /> },
    { id: 'insights', label: 'Insights', icon: <HiOutlineLightBulb /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" onClick={onExit} style={{ cursor: 'pointer' }} title="Go to Landing Page">
        <div className="brand-group">
          <img src="/FinTrack.png" alt="FinTrack Logo" className="brand-icon" />
          <span className="brand-name">FinTrack</span>
        </div>
        <button className="sidebar-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <HiOutlineX />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              dispatch({ type: 'SET_TAB', payload: item.id });
              if (onClose) onClose();
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <label className="role-label">Current Role</label>
          <div className="segmented-toggle">
            <button 
              className={`toggle-option ${role === 'admin' ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: 'admin' })}
            >
              Admin
            </button>
            <button 
              className={`toggle-option ${role === 'viewer' ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: 'viewer' })}
            >
              Viewer
            </button>
          </div>
        </div>

        <button
          className="theme-toggle"
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
