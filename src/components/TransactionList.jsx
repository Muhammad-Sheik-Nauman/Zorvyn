import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import {
  HiOutlineSearch, HiOutlinePlus,
  HiOutlinePencil, HiOutlineTrash,
  HiOutlineFilter, HiOutlineDownload
} from 'react-icons/hi';
import TransactionModal from './TransactionModal';

export default function TransactionList() {
  const { state, dispatch } = useApp();
  const { transactions, filters, role } = state;
  const [showModal, setShowModal] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = [...CATEGORIES.expense, ...CATEGORIES.income];

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    // Sorting
    result.sort((a, b) => {
      let cmp = 0;
      switch (filters.sortBy) {
        case 'date':
          cmp = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'category':
          cmp = a.category.localeCompare(b.category);
          break;
        default:
          cmp = 0;
      }
      return filters.sortOrder === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [transactions, filters]);

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filtered.map(t => [t.date, t.description, t.category, t.type, t.amount]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  return (
    <div className="transactions-section">
      {/* Top bar */}
      <div className="tx-toolbar">
        <div className="search-box">
          <HiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch({ type: 'SET_FILTER', key: 'search', value: e.target.value })}
          />
        </div>

        <div className="tx-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiOutlineFilter /> Filters
          </button>
          <button className="btn btn-ghost" onClick={handleExportCSV}>
            <HiOutlineDownload /> Export
          </button>
          {role === 'admin' && (
            <button
              className="btn btn-primary"
              onClick={() => { setEditingTx(null); setShowModal(true); }}
            >
              <HiOutlinePlus /> Add New
            </button>
          )}
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group">
            <label>Type</label>
            <select
              value={filters.type}
              onChange={e => dispatch({ type: 'SET_FILTER', key: 'type', value: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={e => dispatch({ type: 'SET_FILTER', key: 'category', value: e.target.value })}
            >
              <option value="all">All Categories</option>
              {allCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by</label>
            <select
              value={filters.sortBy}
              onChange={e => dispatch({ type: 'SET_FILTER', key: 'sortBy', value: e.target.value })}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Order</label>
            <select
              value={filters.sortOrder}
              onChange={e => dispatch({ type: 'SET_FILTER', key: 'sortOrder', value: e.target.value })}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <button
            className="btn btn-ghost"
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results info */}
      <div className="tx-info">
        <span>Showing {filtered.length} of {transactions.length} transactions</span>
      </div>

      {/* Transaction list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found.</p>
          <p className="empty-hint">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="tx-list">
          {filtered.map(tx => (
            <div key={tx.id} className="tx-row">
              <div className="tx-left">
                <div
                  className="tx-cat-dot"
                  style={{ background: CATEGORY_COLORS[tx.category] || '#94a3b8' }}
                />
                <div className="tx-details">
                  <span className="tx-desc">{tx.description}</span>
                  <span className="tx-meta">
                    {tx.category} • {formatDate(tx.date)}
                  </span>
                </div>
              </div>
              <div className="tx-right">
                <span className={`tx-amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
                {role === 'admin' && (
                  <div className="tx-row-actions">
                    <button
                      className="icon-btn"
                      onClick={() => handleEdit(tx)}
                      title="Edit"
                    >
                      <HiOutlinePencil />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => handleDelete(tx.id)}
                      title="Delete"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TransactionModal
          transaction={editingTx}
          onClose={() => { setShowModal(false); setEditingTx(null); }}
        />
      )}
    </div>
  );
}
