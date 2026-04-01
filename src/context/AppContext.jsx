import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

// Try to load from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem('finance-dashboard-state');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load saved state:', e);
  }
  return null;
}

const savedState = loadState();

const defaultState = {
  transactions: savedState?.transactions || initialTransactions,
  role: savedState?.role || 'admin',
  activeTab: 'dashboard',
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  },
  darkMode: savedState?.darkMode ?? true
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'SET_TAB':
      return { ...state, activeTab: action.payload };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value }
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          search: '',
          type: 'all',
          category: 'all',
          sortBy: 'date',
          sortOrder: 'desc'
        }
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: Date.now() },
          ...state.transactions
        ]
      };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finance-dashboard-state', JSON.stringify({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode
      }));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state.transactions, state.role, state.darkMode]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
