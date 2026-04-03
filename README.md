# FinTrack – Modern Finance Dashboard

A clean, premium, and fully interactive personal finance dashboard built as part of the **Zorvyn Frontend Developer Intern** assignment. FinTrack turns raw transaction history into beautiful, actionable insights while maintaining a 100% private, client-side experience.

##  Key Features

### 1. Dashboard Overview
*   **Live Summary Cards**: Real-time tracking of Total Balance, Income, and Expenses.
*   **Balance Trend (Time-based)**: An interactive area chart visualizing the last 6 months of financial history with diagonal plotting animations.
*   **Spending Breakdown (Categorical)**: A categorical donut chart that reveals your top 5 spending areas at a glance.

### 2. Transactions & Data Control
*   **Smart Filter Toolbar**: Instantly search by description, filter by type (Income/Expense), or narrow down by 5 core categories.
*   **Multicolumn Sorting**: Sort transactions by Date, Amount, or Category.
*   **CSV Export**: One-click functionality to download your transaction history as a CSV file for external use.

### 3. Role-Based UI (RBAC)
*   **Admin Mode**: Full CRUD access — add, edit, and delete transactions with instant feedback.
*   **Viewer Mode**: Read-only access — ideal for shared budgeting where only one user manages the data.
*   **Role Toggle**: Seamlessly switch roles via a modern pill-shaped segmented toggle in the header.

### 4. Advanced Insights
*   **Smart Analytics**: Automatic calculation of your highest spending category, monthly comparison, and savings rate percentage.
*   **Key Observations**: Contextual observations like "Biggest single expense" or "Best savings month" generated from your data.

### 5.  Additional Improvements
*   **Dark & Light Mode**: A sleek, dark-blue professional theme with a smooth daylight toggle.
*   **Data Persistence**: Uses `localStorage` to save your transactions, theme choice, and role automatically.
*   **URL-Based Routing**: Transitioned from state-based navigation to professional **React Router** implementation (e.g., `/app/dashboard`, `/app/transactions`) with full browser history support.
*   **Animated "Video-Like" Hero**: A continuous, high-speed drawing animation for the dashboard preview on the landing page.
*   **CSV Export**: Advanced feature to download transaction history instantly for external processing.
*   **Custom Select & UX**: Custom-built dropdown components that override native browser behavior for a pixel-perfect mobile experience.

### 5. Premium UI/UX & Responsive Design
*   **Mobile-First Aesthetic**: Fully responsive layout with custom mobile-friendly select components to prevent native browser overlays.
*   **Dark & Light Mode**: A sleek, dark-blue professional theme with a smooth daylight toggle.
*   **Cinematic Animations**: Staggered fade-ins, drawing graph loops, and micro-interactions that make the app feel like a high-end product demo.
*   **Persistent State**: Your transactions, theme choice, and role are automatically saved to `localStorage`, surviving browser refreshes.

---

## Tech Stack & Architecture

*   **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Blazing fast HMR and builds)
*   **Routing**: [React Router](https://reactrouter.com/) for a multi-page SPA experience.
*   **State Management**: React Context Powerhouse (`AppProvider` + `useReducer`) for global data synchronization.
*   **Charts**: [Recharts](https://recharts.org/) for robust, responsive data visualizations.
*   **Icons**: [Lucide React](https://lucide.dev/) for high-quality, lightweight line icons.
*   **Styling**: Vanilla CSS with a modern Design System (CSS Variables for theming, Flexbox/Grid for layout).

---

##  Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   npm or yarn

### Installation
1.  **Extract/Clone the project**:
    ```bash
    cd Zorvyn
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **View in browser**:
    Open `http://localhost:5173` (or the port shown in your terminal).

---

##  Submission Details
*   **Name**: Muhammad Sheik Nauman
*   **Email**: noumansheik07@gmail.com
*   **Position**: Frontend Developer Intern
*   **Assignment**: Finance Dashboard UI

*Built with passion and attention to detail for the Zorvyn Fintech Assignment.*
