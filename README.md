# FinTrack — Finance Dashboard UI

A clean, interactive finance dashboard built with **React + Vite** for tracking personal financial activity. Includes real-time visualizations, transaction management, role-based UI, and data-driven insights.

---

## 🔗 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173` by default.

---

## ✨ Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses, and Transaction count at a glance
- **Balance Trend Chart** — Area chart showing monthly income vs. expenses over the past 6 months
- **Spending Breakdown** — Interactive donut chart with per-category expense distribution

### Transactions
- Searchable, sortable transaction list with category color indicators
- **Filtering** by type (income/expense), category, and sort order
- **Add / Edit / Delete** transactions (Admin only)
- **CSV Export** — Download filtered transactions as a `.csv` file

### Role-Based UI (RBAC)
- Toggle between **Admin** and **Viewer** roles via the sidebar dropdown
- **Admin**: Full access — can add, edit, and delete transactions
- **Viewer**: Read-only — action buttons are hidden, data is view-only
- Role indicator badge shown in the header

### Insights
- **Highest & Lowest Spending** categories identified automatically
- **Average Daily Spending** calculated from active transaction days
- **Savings Rate** percentage with contextual feedback
- **Monthly Comparison** bar chart (income vs. expense per month)
- **Key Observations** — largest expense, best/worst savings months, and category diversity

### Additional Features
- 🌓 **Dark / Light Mode** toggle with system-level theming
- 💾 **Local Storage Persistence** — transactions, role, and theme preference are saved
- 📱 **Fully Responsive** — adapts from desktop to mobile with collapsible sidebar
- ⚡ **Smooth Animations** — fade-ins, scale transitions, and hover micro-interactions
- 📤 **CSV Export** — export filtered transaction data

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BalanceTrend.jsx        # Monthly income/expense area chart
│   ├── Header.jsx              # Top bar with greeting and role badge
│   ├── Insights.jsx            # Analytics page with charts & observations
│   ├── Sidebar.jsx             # Navigation, role switcher, theme toggle
│   ├── SpendingBreakdown.jsx   # Donut chart for expense categories
│   ├── SummaryCards.jsx        # Overview metric cards
│   ├── TransactionList.jsx     # Filterable transaction table
│   └── TransactionModal.jsx    # Add/Edit transaction form modal
├── context/
│   └── AppContext.jsx          # Global state management (useReducer + Context)
├── data/
│   └── mockData.js             # Transaction generator and constants
├── App.jsx                     # Main layout and page routing
├── App.css                     # Component styles
├── index.css                   # Design tokens and CSS reset
└── main.jsx                    # Entry point
```

---

## 🧠 Approach & Design Decisions

### State Management
Used React's built-in `useReducer` + `Context API` instead of external libraries, keeping the bundle small while still having a centralized, predictable state flow. Actions like `ADD_TRANSACTION`, `SET_FILTER`, and `TOGGLE_DARK_MODE` follow a clean dispatch pattern.

### Styling
Vanilla CSS with CSS custom properties (variables) for theming. The design system uses a `[data-theme]` attribute on `<html>` to switch between light and dark color palettes without any runtime class toggling overhead.

### Data
Mock data is generated programmatically to simulate 6 months of realistic transactions across 13 categories. This avoids hardcoded JSON files and produces varied data on each fresh load (persisted via localStorage afterwards).

### RBAC
Frontend-only role simulation. The `role` state controls conditional rendering of admin actions (add/edit/delete buttons). No backend auth — just a demo toggle to show how UI adapts based on user permissions.

### Charts
Built with [Recharts](https://recharts.org/) — a composable React charting library. Used `AreaChart` for trends and `PieChart` (donut) for category breakdowns, with custom tooltips styled to match the theme.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19   | UI library |
| Vite 8     | Build tool & dev server |
| Recharts   | Data visualization |
| React Icons | Icon library |
| CSS Variables | Theming (dark/light) |
| localStorage | Data persistence |
| Context + useReducer | State management |

---

## 📋 Evaluation Coverage

| Criteria | Implementation |
|----------|---------------|
| Design & Creativity | Premium dark theme, gradient accents, micro-animations, donut chart with center label |
| Responsiveness | Mobile-first breakpoints at 480px, 768px, 1024px with collapsible sidebar |
| Functionality | Dashboard, transactions (CRUD), filtering, sorting, search, CSV export, insights |
| User Experience | Contextual greeting, smooth transitions, empty states, role badges |
| Technical Quality | Modular components, memoized computations, clean reducer pattern |
| State Management | Centralized Context + useReducer with localStorage persistence |
| Documentation | This README with setup, architecture, and design rationale |
| Attention to Detail | Edge cases (empty data), hover reveals for actions, form validation |
