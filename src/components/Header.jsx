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

  const greetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuToggle}>
          <HiOutlineMenu />
        </button>
        <div>
          <h1 className="page-title">{titles[activeTab]}</h1>
          <p className="page-greeting">{greetings()}, welcome back 👋</p>
        </div>
      </div>
      <div className="header-right">
        <span className={`role-badge ${role}`}>
          {role === 'admin' ? '🔑 Admin' : '👁️ Viewer'}
        </span>
      </div>
    </header>
  );
}
