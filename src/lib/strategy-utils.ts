import { OptionLeg, StrategyType } from "@shared/types";
export interface ProfitLossPoint {
  price: number;
  pnl: number;
}
export const calculateProfitLoss = (
  legs: OptionLeg[],
  underlyingPrice: number,
  priceRange: number = 0.2 // e.g., 20% range
): ProfitLossPoint[] => {
  if (legs.length === 0) return [];
  const minStrike = Math.min(...legs.map(leg => leg.strike));
  const maxStrike = Math.max(...legs.map(leg => leg.strike));
  const centerPrice = isFinite(minStrike) ? (minStrike + maxStrike) / 2 : underlyingPrice;
  const range = centerPrice * priceRange;
  const lowerBound = Math.max(0, centerPrice - range);
  const upperBound = centerPrice + range;
  const points: ProfitLossPoint[] = [];
  const steps = 100;
  const stepSize = (upperBound - lowerBound) / steps;
  for (let i = 0; i <= steps; i++) {
    const price = lowerBound + i * stepSize;
    let pnl = 0;
    for (const leg of legs) {
      let legValue = 0;
      if (leg.type === 'Call') {
        legValue = Math.max(0, price - leg.strike);
      } else { // Put
        legValue = Math.max(0, leg.strike - price);
      }
      // P/L = (value at expiry - premium paid) * quantity
      // quantity is positive for long, negative for short
      pnl += (legValue - leg.premium) * leg.quantity;
    }
    points.push({ price, pnl });
  }
  return points;
};
export const getStrategyLegsTemplate = (strategy: StrategyType): Partial<OptionLeg>[] => {
    switch (strategy) {
        case 'Bull Call Spread':
            return [
                { type: 'Call', quantity: 1, strike: 0, premium: 0 },
                { type: 'Call', quantity: -1, strike: 0, premium: 0 },
            ];
        case 'Bear Put Spread':
            return [
                { type: 'Put', quantity: 1, strike: 0, premium: 0 },
                { type: 'Put', quantity: -1, strike: 0, premium: 0 },
            ];
        case 'Long Straddle':
            return [
                { type: 'Call', quantity: 1, strike: 0, premium: 0 },
                { type: 'Put', quantity: 1, strike: 0, premium: 0 },
            ];
        case 'Iron Condor':
            return [
                { type: 'Put', quantity: 1, strike: 0, premium: 0 },
                { type: 'Put', quantity: -1, strike: 0, premium: 0 },
                { type: 'Call', quantity: -1, strike: 0, premium: 0 },
                { type: 'Call', quantity: 1, strike: 0, premium: 0 },
            ];
        case 'Butterfly Spread':
            return [
                { type: 'Call', quantity: 1, strike: 0, premium: 0 },
                { type: 'Call', quantity: -2, strike: 0, premium: 0 },
                { type: 'Call', quantity: 1, strike: 0, premium: 0 },
            ];
        default:
            return [{ type: 'Call', quantity: 1, strike: 0, premium: 0 }];
    }
};