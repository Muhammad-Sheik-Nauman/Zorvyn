import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MONTH_NAMES } from '../data/mockData';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

export default function BalanceTrend() {
  const { state } = useApp();

  const chartData = useMemo(() => {
    const monthlyData = {};

    state.transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        monthlyData[key].income += t.amount;
      } else {
        monthlyData[key].expense += t.amount;
      }
    });

    return Object.keys(monthlyData)
      .sort()
      .map(key => {
        const [year, month] = key.split('-');
        return {
          name: `${MONTH_NAMES[parseInt(month) - 1]} ${year.slice(2)}`,
          income: Math.round(monthlyData[key].income),
          expense: Math.round(monthlyData[key].expense),
          net: Math.round(monthlyData[key].income - monthlyData[key].expense)
        };
      });
  }, [state.transactions]);

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

  if (chartData.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-title">Balance Trend</h3>
        <div className="empty-state">No data available yet</div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">Balance Trend</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#incomeGrad)"
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#expenseGrad)"
              name="Expense"
            />
          </AreaChart>
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
  );
}
