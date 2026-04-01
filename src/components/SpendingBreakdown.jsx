import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function SpendingBreakdown() {
  const { state } = useApp();

  const data = useMemo(() => {
    const catTotals = {};

    state.transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(catTotals)
      .map(([name, value]) => ({
        name,
        value: Math.round(value),
        color: CATEGORY_COLORS[name] || '#94a3b8'
      }))
      .sort((a, b) => b.value - a.value);
  }, [state.transactions]);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    const pct = ((item.value / total) * 100).toFixed(1);
    return (
      <div className="chart-tooltip">
        <p style={{ color: item.payload.color, fontWeight: 600 }}>{item.name}</p>
        <p>₹{item.value.toLocaleString('en-IN')} ({pct}%)</p>
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-title">Spending Breakdown</h3>
        <div className="empty-state">No expenses recorded yet</div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">Spending Breakdown</h3>
      <div className="breakdown-content">
        <div className="pie-wrapper">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">
            <span className="pie-total">₹{(total / 1000).toFixed(1)}k</span>
            <span className="pie-label">Total</span>
          </div>
        </div>
        <div className="breakdown-legend">
          {data.slice(0, 6).map((item, i) => (
            <div key={i} className="breakdown-item">
              <div className="breakdown-item-left">
                <span className="legend-dot" style={{ background: item.color }}></span>
                <span className="breakdown-name">{item.name}</span>
              </div>
              <span className="breakdown-value">
                ₹{item.value.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
