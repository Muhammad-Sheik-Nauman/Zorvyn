// Mock data for the finance dashboard
// Generates realistic transactions across different categories and months

const categories = {
  expense: [
    'Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Bills & Utilities'
  ],
  income: [
    'Salary', 'Freelance', 'Investment Returns', 'Side Project', 'Refund'
  ]
};

const descriptions = {
  'Food & Dining': ['Grocery Store', 'Restaurant Dinner', 'Coffee Shop', 'Food Delivery', 'Lunch at Cafe'],
  'Transport': ['Uber Ride', 'Gas Station', 'Metro Card Recharge', 'Parking Fee', 'Car Maintenance'],
  'Shopping': ['Amazon Purchase', 'Clothing Store', 'Electronics', 'Home Supplies', 'Book Store'],
  'Entertainment': ['Movie Tickets', 'Concert', 'Streaming Service', 'Gaming', 'Amusement Park'],
  'Bills & Utilities': ['Electricity Bill', 'Internet Bill', 'Water Bill', 'Phone Bill', 'Rent Payment'],
  'Healthcare': ['Doctor Visit', 'Pharmacy', 'Lab Test', 'Dental Checkup', 'Eye Exam'],
  'Education': ['Online Course', 'Book Purchase', 'Workshop Fee', 'Certification Exam', 'Tutoring'],
  'Subscriptions': ['Spotify Premium', 'Netflix', 'Gym Membership', 'Cloud Storage', 'News Subscription'],
  'Salary': ['Monthly Salary', 'Salary Bonus', 'Performance Bonus'],
  'Freelance': ['Web Dev Project', 'Design Work', 'Consulting Fee', 'Content Writing'],
  'Investment Returns': ['Stock Dividend', 'Mutual Fund Returns', 'Crypto Gains'],
  'Side Project': ['App Revenue', 'Etsy Sales', 'Tutoring Income'],
  'Refund': ['Product Return', 'Insurance Refund', 'Tax Refund']
};

function randomBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTransactions() {
  const transactions = [];
  let id = 1;

  // Generate transactions for the last 6 months
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const now = new Date();
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    let daysInMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
    

    if (monthOffset === 0) {
      daysInMonth = 3;
    }

    // Add 1-2 income transactions per month
    const incomeCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < incomeCount; i++) {
      const cat = pickRandom(categories.income);
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day);

      transactions.push({
        id: id++,
        date: date.toISOString().split('T')[0],
        description: pickRandom(descriptions[cat]),
        category: cat,
        type: 'income',
        amount: cat === 'Salary' ? randomBetween(3500, 5500) : randomBetween(200, 1500)
      });
    }

    // Add 8-15 expense transactions per month
    const expenseCount = Math.floor(Math.random() * 8) + 8;
    for (let i = 0; i < expenseCount; i++) {
      const cat = pickRandom(categories.expense);
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const date = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day);

      let amount;
      switch (cat) {
        case 'Bills & Utilities':
          amount = randomBetween(50, 800);
          break;
        case 'Food & Dining':
          amount = randomBetween(8, 120);
          break;
        case 'Transport':
          amount = randomBetween(5, 80);
          break;
        case 'Shopping':
          amount = randomBetween(15, 350);
          break;
        case 'Entertainment':
          amount = randomBetween(10, 100);
          break;
        case 'Healthcare':
          amount = randomBetween(25, 300);
          break;
        case 'Education':
          amount = randomBetween(30, 200);
          break;
        case 'Subscriptions':
          amount = randomBetween(5, 30);
          break;
        default:
          amount = randomBetween(10, 200);
      }

      transactions.push({
        id: id++,
        date: date.toISOString().split('T')[0],
        description: pickRandom(descriptions[cat]),
        category: cat,
        type: 'expense',
        amount: amount
      });
    }
  }

  // Sort by date descending
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return transactions;
}

export const initialTransactions = generateTransactions();

export const CATEGORIES = categories;

export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Color palette for categories
export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  'Transport': '#3b82f6',
  'Shopping': '#8b5cf6',
  'Entertainment': '#ec4899',
  'Bills & Utilities': '#ef4444',
  'Healthcare': '#10b981',
  'Education': '#06b6d4',
  'Subscriptions': '#f59e0b',
  'Salary': '#22c55e',
  'Freelance': '#14b8a6',
  'Investment Returns': '#6366f1',
  'Side Project': '#a855f7',
  'Refund': '#84cc16'
};
