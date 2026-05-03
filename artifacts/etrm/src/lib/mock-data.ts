export const counterparties = ['EDF Energy', 'Vattenfall', 'Shell Energy', 'Centrica', 'BP Energy', 'RWE', 'E.ON', 'Axpo'];
export const products = ['UK Power Q1-25', 'UK Power Q2-25', 'TTF Gas Apr-25', 'EUA Carbon Dec-25', 'Brent Crude Jun-25'];
export const books = ['Power Book', 'Gas Book', 'Carbon Book', 'Renewables Book'];
export const statuses = ['Pending Validation', 'Approved', 'Confirmed', 'Settled', 'Rejected'];
export const confirmationStatuses = ['Pending', 'Sent', 'Matched', 'Disputed'];

export const mockTrades = Array.from({ length: 100 }).map((_, i) => {
  const isProfit = Math.random() > 0.5;
  const pnl = (Math.random() * 100000) * (isProfit ? 1 : -1);
  return {
    id: `TRD-2025-${(i + 1).toString().padStart(4, '0')}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    deliveryStart: new Date(Date.now() + Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    deliveryEnd: new Date(Date.now() + Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    counterparty: counterparties[Math.floor(Math.random() * counterparties.length)],
    product: products[Math.floor(Math.random() * products.length)],
    volume: Math.floor(Math.random() * (200000 - 5000 + 1)) + 5000,
    price: Math.floor(Math.random() * (120 - 40 + 1)) + 40,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    confStatus: confirmationStatuses[Math.floor(Math.random() * confirmationStatuses.length)],
    pnl,
    buySell: Math.random() > 0.5 ? 'Buy' : 'Sell',
    book: books[Math.floor(Math.random() * books.length)],
    submittedBy: ['A. Morgan', 'J. Smith', 'S. Taylor'][Math.floor(Math.random() * 3)]
  };
});

export const mockChartData = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
  return {
    date: date.toISOString().split('T')[0],
    position: 1000000 + (Math.random() * 500000 - 250000),
    pnl: 5000000 + (Math.random() * 2000000 - 1000000),
    power: Math.random() * 100,
    gas: Math.random() * 50,
    carbon: Math.random() * 80
  };
});

export const mockExposureData = counterparties.map(cp => ({
  counterparty: cp,
  exposure: Math.floor(Math.random() * 5000000) + 1000000
})).sort((a, b) => b.exposure - a.exposure).slice(0, 6);

export const mockAuditTrail = [
  { id: 1, user: "A. Morgan", action: "Trade Captured", timestamp: "2025-01-10 09:14:22", comments: "Initial entry" },
  { id: 2, user: "System", action: "Risk Check", timestamp: "2025-01-10 09:14:25", comments: "Passed" },
  { id: 3, user: "S. Taylor", action: "Validation", timestamp: "2025-01-10 10:05:11", comments: "All details match broker rec" },
];

export const mockInsights = [
  { id: 1, title: "Concentration Risk", description: "Exposure to EDF Energy exceeds 30% of total book.", category: "Risk", severity: "high", timestamp: "2 hours ago" },
  { id: 2, title: "Arbitrage Opportunity", description: "Spread between UK Power Q1-25 and Q2-25 widening beyond historical standard deviation.", category: "Opportunity", severity: "medium", timestamp: "4 hours ago" },
  { id: 3, title: "Market Volatility", description: "TTF Gas volatility spiked 15% in last 24h. Consider hedging open positions.", category: "Market", severity: "high", timestamp: "1 day ago" },
  { id: 4, title: "Settlement Delay", description: "3 counterparties have delayed settlements. Total value £1.2M.", category: "Risk", severity: "medium", timestamp: "2 days ago" },
];
