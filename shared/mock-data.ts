import type { Portfolio, Position, OptionChainItem, SuggestedStrategy } from './types';
const MOCK_POSITIONS: Position[] = [
  {
    id: 'pos_1',
    underlying: 'AAPL',
    strategy: 'Iron Condor',
    legs: [
      { id: 'leg_1a', type: 'Put', strike: 160, expiration: '2024-09-20', quantity: -10, premium: 1.50 },
      { id: 'leg_1b', type: 'Put', strike: 155, expiration: '2024-09-20', quantity: 10, premium: 1.00 },
      { id: 'leg_1c', type: 'Call', strike: 180, expiration: '2024-09-20', quantity: -10, premium: 2.00 },
      { id: 'leg_1d', type: 'Call', strike: 185, expiration: '2024-09-20', quantity: 10, premium: 1.60 },
    ],
    entryDate: '2024-07-15T14:30:00Z',
    currentValue: 500,
    pnl: 120.50,
  },
  {
    id: 'pos_2',
    underlying: 'NVDA',
    strategy: 'Long Straddle',
    legs: [
      { id: 'leg_2a', type: 'Call', strike: 125, expiration: '2024-08-16', quantity: 5, premium: 5.50 },
      { id: 'leg_2b', type: 'Put', strike: 125, expiration: '2024-08-16', quantity: 5, premium: 4.80 },
    ],
    entryDate: '2024-07-20T10:00:00Z',
    currentValue: 5150,
    pnl: -350.00,
  },
  {
    id: 'pos_3',
    underlying: 'TSLA',
    strategy: 'Bull Call Spread',
    legs: [
      { id: 'leg_3a', type: 'Call', strike: 250, expiration: '2024-09-20', quantity: 20, premium: 10.20 },
      { id: 'leg_3b', type: 'Call', strike: 260, expiration: '2024-09-20', quantity: -20, premium: 6.50 },
    ],
    entryDate: '2024-07-22T11:45:00Z',
    currentValue: 7400,
    pnl: 800.00,
  },
  {
    id: 'pos_4',
    underlying: 'GOOGL',
    strategy: 'Bear Put Spread',
    legs: [
        { id: 'leg_4a', type: 'Put', strike: 180, expiration: '2024-08-16', quantity: 15, premium: 4.20 },
        { id: 'leg_4b', type: 'Put', strike: 175, expiration: '2024-08-16', quantity: -15, premium: 2.80 },
    ],
    entryDate: '2024-07-18T09:35:00Z',
    currentValue: 2100,
    pnl: 450.75,
  },
];
const generateHistory = (days: number, initialValue: number): { date: string; value: number }[] => {
  const history = [];
  let currentValue = initialValue;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    currentValue += (Math.random() - 0.48) * (initialValue / 50);
    history.push({ date: date.toISOString().split('T')[0], value: parseFloat(currentValue.toFixed(2)) });
  }
  return history;
};
const totalValue = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.currentValue, 0);
const totalPnl = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.pnl, 0);
export const MOCK_PORTFOLIO: Portfolio = {
  totalValue: totalValue,
  dayPnl: 325.25,
  totalPnl: totalPnl,
  history: generateHistory(30, totalValue - totalPnl),
  positions: MOCK_POSITIONS,
};
export const MOCK_OPTIONS_CHAIN: OptionChainItem[] = [
  { strike: 160, call: { premium: 15.50, volume: 1200, openInterest: 15000 }, put: { premium: 1.50, volume: 1800, openInterest: 22000 } },
  { strike: 165, call: { premium: 12.30, volume: 950, openInterest: 18000 }, put: { premium: 2.80, volume: 2200, openInterest: 25000 } },
  { strike: 170, call: { premium: 9.80, volume: 2500, openInterest: 35000 }, put: { premium: 4.50, volume: 1500, openInterest: 19000 } },
  { strike: 175, call: { premium: 7.20, volume: 3100, openInterest: 42000 }, put: { premium: 6.90, volume: 1100, openInterest: 16000 } },
  { strike: 180, call: { premium: 5.10, volume: 2800, openInterest: 38000 }, put: { premium: 9.80, volume: 800, openInterest: 12000 } },
  { strike: 185, call: { premium: 3.50, volume: 1900, openInterest: 28000 }, put: { premium: 13.20, volume: 600, openInterest: 9000 } },
  { strike: 190, call: { premium: 2.20, volume: 1500, openInterest: 21000 }, put: { premium: 17.50, volume: 400, openInterest: 7000 } },
];
export const MOCK_SUGGESTED_STRATEGIES: SuggestedStrategy[] = [
  { name: 'Sep 20 180/185 Bear Call Spread', maxProfit: 850, maxLoss: 4150, probabilityOfProfit: 68.5, tradeType: 'Credit', netPremium: 85 },
  { name: 'Sep 20 165/160 Bull Put Spread', maxProfit: 1200, maxLoss: 3800, probabilityOfProfit: 65.2, tradeType: 'Credit', netPremium: 120 },
  { name: 'Aug 16 175 Long Straddle', maxProfit: Infinity, maxLoss: 14100, probabilityOfProfit: 42.1, tradeType: 'Debit', netPremium: 1410 },
  { name: 'Sep 20 155/160/180/185 Iron Condor', maxProfit: 1000, maxLoss: 4000, probabilityOfProfit: 75.8, tradeType: 'Credit', netPremium: 100 },
];