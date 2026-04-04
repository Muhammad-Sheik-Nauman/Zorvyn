import { useApp } from '../context/AppContext';
import { HiOutlineMenu } from 'react-icons/hi';

export default function Header({ onMenuToggle }) {
  const { state } = useApp();
  const { activeTab, role } = state;

  const titles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights'
  };



  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuToggle}>
          <HiOutlineMenu />
        </button>
        <div>
          <h1 className="page-title">{titles[activeTab]}</h1>
          <p className="page-greeting">Welcome back</p>
        </div>
      </div>
      <div className="header-right">
        <span className={`role-badge ${role}`}>
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>
      </div>
    </header>
  );
}
