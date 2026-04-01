import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MONTH_NAMES, CATEGORY_COLORS } from '../data/mockData';
import {
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineExclamationCircle,
  HiOutlineCalendar,
  HiOutlineChartPie
} from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

export default function Insights() {
  const { state } = useApp();

  const insights = useMemo(() => {
    const txs = state.transactions;
    if (txs.length === 0) return null;

    // Highest spending category
    const catSpend = {};
    txs.filter(t => t.type === 'expense').forEach(t => {
      catSpend[t.category] = (catSpend[t.category] || 0) + t.amount;
    });
    const topCategory = Object.entries(catSpend)
      .sort((a, b) => b[1] - a[1])[0];

    // Lowest spending category
    const lowCategory = Object.entries(catSpend)
      .sort((a, b) => a[1] - b[1])[0];

    // Monthly income vs expense comparison
    const monthly = {};
    txs.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
      if (t.type === 'income') monthly[key].income += t.amount;
      else monthly[key].expense += t.amount;
    });

    const sortedMonths = Object.keys(monthly).sort();
    const monthlyData = sortedMonths.map(key => {
      const [y, m] = key.split('-');
      return {
        name: `${MONTH_NAMES[parseInt(m) - 1]} ${y.slice(2)}`,
        income: Math.round(monthly[key].income),
        expense: Math.round(monthly[key].expense),
        savings: Math.round(monthly[key].income - monthly[key].expense)
      };
    });

    // Average daily spending
    const expenses = txs.filter(t => t.type === 'expense');
    const dates = [...new Set(expenses.map(t => t.date))];
    const avgDaily = expenses.reduce((s, t) => s + t.amount, 0) / (dates.length || 1);

    // Most expensive single transaction
    const biggestExpense = expenses.sort((a, b) => b.amount - a.amount)[0];

    // Savings rate
    const totalIncome = txs.filter(t => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0
      ? ((totalIncome - totalExpense) / totalIncome * 100)
      : 0;

    // Best and worst months
    const bestMonth = monthlyData.reduce((best, m) =>
      m.savings > (best?.savings ?? -Infinity) ? m : best, null);
    const worstMonth = monthlyData.reduce((worst, m) =>
      m.savings < (worst?.savings ?? Infinity) ? m : worst, null);

    return {
      topCategory, lowCategory, monthlyData, avgDaily,
      biggestExpense, savingsRate, bestMonth, worstMonth
    };
  }, [state.transactions]);

  if (!insights) {
    return (
      <div className="insights-page">
        <div className="empty-state">
          <HiOutlineChartPie size={48} />
          <p>No data available to generate insights.</p>
          <p className="empty-hint">Start adding transactions to see analytics here.</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="insights-page">
      {/* Insight cards */}
      <div className="insight-cards">
        <div className="insight-card highlight">
          <div className="insight-icon" style={{ color: '#ef4444' }}>
            <HiOutlineTrendingUp />
          </div>
          <div className="insight-text">
            <h4>Highest Spending</h4>
            <p className="insight-value">
              {insights.topCategory?.[0]}
            </p>
            <p className="insight-detail">
              ₹{Math.round(insights.topCategory?.[1] || 0).toLocaleString('en-IN')} spent total
            </p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ color: '#22c55e' }}>
            <HiOutlineTrendingDown />
          </div>
          <div className="insight-text">
            <h4>Lowest Spending</h4>
            <p className="insight-value">
              {insights.lowCategory?.[0]}
            </p>
            <p className="insight-detail">
              ₹{Math.round(insights.lowCategory?.[1] || 0).toLocaleString('en-IN')} spent total
            </p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ color: '#f59e0b' }}>
            <HiOutlineExclamationCircle />
          </div>
          <div className="insight-text">
            <h4>Avg. Daily Spending</h4>
            <p className="insight-value">
              ₹{Math.round(insights.avgDaily).toLocaleString('en-IN')}
            </p>
            <p className="insight-detail">per active day</p>
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ color: '#6366f1' }}>
            <HiOutlineChartPie />
          </div>
          <div className="insight-text">
            <h4>Savings Rate</h4>
            <p className="insight-value">
              {insights.savingsRate.toFixed(1)}%
            </p>
            <p className="insight-detail">
              {insights.savingsRate > 20 ? 'Great job saving!' : 'Room for improvement'}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly comparison chart */}
      <div className="chart-card">
        <h3 className="chart-title">Monthly Comparison</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={insights.monthlyData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                stroke="var(--text-muted)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
                tickLine={false}
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#22c55e' }}></span>
            Income
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#ef4444' }}></span>
            Expenses
          </span>
        </div>
      </div>

      {/* Additional observations */}
      <div className="observations">
        <h3 className="chart-title">Key Observations</h3>
        <div className="observation-list">
          {insights.biggestExpense && (
            <div className="observation">
              <HiOutlineExclamationCircle className="obs-icon" />
              <p>
                Your biggest single expense was <strong>"{insights.biggestExpense.description}"</strong> in{' '}
                {insights.biggestExpense.category} for{' '}
                <strong>₹{insights.biggestExpense.amount.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          )}
          {insights.bestMonth && (
            <div className="observation positive">
              <HiOutlineCalendar className="obs-icon" />
              <p>
                Best month for savings was <strong>{insights.bestMonth.name}</strong> where
                you saved <strong>₹{insights.bestMonth.savings.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          )}
          {insights.worstMonth && (
            <div className="observation warning">
              <HiOutlineCalendar className="obs-icon" />
              <p>
                Tightest month was <strong>{insights.worstMonth.name}</strong> with
                {insights.worstMonth.savings >= 0
                  ? ` only ₹${insights.worstMonth.savings.toLocaleString('en-IN')} saved`
                  : ` a deficit of ₹${Math.abs(insights.worstMonth.savings).toLocaleString('en-IN')}`
                }
              </p>
            </div>
          )}
          <div className="observation">
            <HiOutlineChartPie className="obs-icon" />
            <p>
              You have <strong>{state.transactions.length}</strong> transactions tracked across{' '}
              <strong>{[...new Set(state.transactions.map(t => t.category))].length}</strong> categories
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
