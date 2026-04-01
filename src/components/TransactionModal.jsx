import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { HiOutlineX } from 'react-icons/hi';

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const isEditing = !!transaction;

  const [form, setForm] = useState({
    description: transaction?.description || '',
    amount: transaction?.amount || '',
    type: transaction?.type || 'expense',
    category: transaction?.category || CATEGORIES.expense[0],
    date: transaction?.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const categoryList = form.type === 'income' ? CATEGORIES.income : CATEGORIES.expense;

  const handleTypeChange = (type) => {
    const cats = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
    setForm(f => ({
      ...f,
      type,
      category: cats.includes(f.category) ? f.category : cats[0]
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      ...(isEditing ? { id: transaction.id } : {})
    };

    dispatch({
      type: isEditing ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION',
      payload
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="icon-btn" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Type Toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={`toggle-btn ${form.type === 'expense' ? 'active expense' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`toggle-btn ${form.type === 'income' ? 'active income' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
          </div>

          {/* Description */}
          <div className="form-field">
            <label>Description</label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="e.g., Grocery shopping"
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Amount */}
          <div className="form-field">
            <label>Amount (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              placeholder="0.00"
            />
            {errors.amount && <span className="field-error">{errors.amount}</span>}
          </div>

          {/* Category */}
          <div className="form-field">
            <label>Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {categoryList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-field">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
