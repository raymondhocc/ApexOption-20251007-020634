export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type OptionType = 'Call' | 'Put';
export type StrategyType = 'Bull Call Spread' | 'Bear Put Spread' | 'Long Straddle' | 'Short Straddle' | 'Iron Condor' | 'Butterfly Spread' | 'Custom';
export interface OptionLeg {
  id: string;
  type: OptionType;
  strike: number;
  expiration: string; // ISO 8601 date string
  quantity: number; // Positive for long, negative for short
  premium: number;
}
export interface Position {
  id: string;
  underlying: string;
  strategy: StrategyType;
  legs: OptionLeg[];
  entryDate: string; // ISO 8601 date string
  currentValue: number;
  pnl: number;
}
export interface PortfolioHistoryPoint {
  date: string;
  value: number;
}
export interface Portfolio {
  totalValue: number;
  dayPnl: number;
  totalPnl: number;
  history: PortfolioHistoryPoint[];
  positions: Position[];
}
export interface OptionChainItem {
  strike: number;
  call: {
    premium: number;
    volume: number;
    openInterest: number;
  } | null;
  put: {
    premium: number;
    volume: number;
    openInterest: number;
  } | null;
}
export interface SuggestedStrategy {
  name: string;
  maxProfit: number;
  maxLoss: number;
  probabilityOfProfit: number;
  tradeType: 'Debit' | 'Credit';
  netPremium: number;
}