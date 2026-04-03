import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import {
  HiOutlineSearch, HiOutlinePlus,
  HiOutlinePencil, HiOutlineTrash,
  HiOutlineFilter, HiOutlineDownload,
  HiChevronDown
} from 'react-icons/hi';
import TransactionModal from './TransactionModal';

function CustomSelect({ value, onChange, options, label }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLabel = options.find(o => o.value === value)?.label || value;

  return (
    <div className="custom-select-container">
      <label className="filter-label">{label}</label>
      <div className={`custom-select-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLabel}</span>
        <HiChevronDown className={`select-arrow ${isOpen ? 'up' : ''}`} />
      </div>
      {isOpen && (
        <>
          <div className="select-overlay" onClick={() => setIsOpen(false)} />
          <div className="custom-options-list">
            {options.map(opt => (
              <div 
                key={opt.value} 
                className={`custom-option ${value === opt.value ? 'active' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

      {showFilters && (
        <div className="filter-panel">
          <CustomSelect 
            label="Type"
            value={filters.type}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' }
            ]}
            onChange={(val) => dispatch({ type: 'SET_FILTER', key: 'type', value: val })}
          />

          <CustomSelect 
            label="Category"
            value={filters.category}
            options={[
              { value: 'all', label: 'All Categories' },
              ...allCategories.map(c => ({ value: c, label: c }))
            ]}
            onChange={(val) => dispatch({ type: 'SET_FILTER', key: 'category', value: val })}
          />

          <CustomSelect 
            label="Sort by"
            value={filters.sortBy}
            options={[
              { value: 'date', label: 'Date' },
              { value: 'amount', label: 'Amount' },
              { value: 'category', label: 'Category' }
            ]}
            onChange={(val) => dispatch({ type: 'SET_FILTER', key: 'sortBy', value: val })}
          />

          <CustomSelect 
            label="Order"
            value={filters.sortOrder}
            options={[
              { value: 'desc', label: 'Newest First' },
              { value: 'asc', label: 'Oldest First' }
            ]}
            onChange={(val) => dispatch({ type: 'SET_FILTER', key: 'sortOrder', value: val })}
          />

          <button
            className="btn btn-ghost clear-btn"
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
