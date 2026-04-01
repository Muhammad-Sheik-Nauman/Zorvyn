import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  HiOutlineCurrencyRupee,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineChartBar
} from 'react-icons/hi';

export default function SummaryCards() {
  const { state } = useApp();

  const summary = useMemo(() => {
    const income = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;
    const txCount = state.transactions.length;

    return { income, expenses, balance, txCount };
  }, [state.transactions]);

  const formatCurrency = (val) => {
    return '₹' + val.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary.balance),
      icon: <HiOutlineCurrencyRupee />,
      color: 'blue',
      change: summary.balance >= 0 ? '+' : '',
      subtitle: 'Net across all time'
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary.income),
      icon: <HiOutlineTrendingUp />,
      color: 'green',
      subtitle: `From ${state.transactions.filter(t => t.type === 'income').length} deposits`
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summary.expenses),
      icon: <HiOutlineTrendingDown />,
      color: 'red',
      subtitle: `Across ${state.transactions.filter(t => t.type === 'expense').length} transactions`
    },
    {
      title: 'Transactions',
      value: summary.txCount,
      icon: <HiOutlineChartBar />,
      color: 'purple',
      subtitle: 'Total activity'
    }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <div key={i} className={`summary-card card-${card.color}`}>
          <div className="card-header-row">
            <span className="card-title">{card.title}</span>
            <span className={`card-icon icon-${card.color}`}>{card.icon}</span>
          </div>
          <div className="card-value">{card.value}</div>
          <p className="card-subtitle">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
