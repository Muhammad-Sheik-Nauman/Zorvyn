import { useApp } from '../context/AppContext';
import {
  HiOutlineViewGrid,
  HiOutlineSwitchHorizontal,
  HiOutlineLightBulb,
  HiOutlineMoon,
  HiOutlineSun
} from 'react-icons/hi';

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab, role, darkMode } = state;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiOutlineViewGrid /> },
    { id: 'transactions', label: 'Transactions', icon: <HiOutlineSwitchHorizontal /> },
    { id: 'insights', label: 'Insights', icon: <HiOutlineLightBulb /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">₹</div>
        <span className="brand-name">FinTrack</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_TAB', payload: item.id })}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-switcher">
          <label className="role-label">Role</label>
          <select
            value={role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
            className="role-select"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
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
