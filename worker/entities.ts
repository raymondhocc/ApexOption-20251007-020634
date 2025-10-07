import { Entity, Env } from "./core-utils";
import type { Portfolio, Position } from "@shared/types";
import { MOCK_PORTFOLIO } from "@shared/mock-data";
export class PortfolioEntity extends Entity<Portfolio> {
  static readonly entityName = "portfolio";
  static readonly initialState: Portfolio = {
    totalValue: 0,
    dayPnl: 0,
    totalPnl: 0,
    history: [],
    positions: []
  };
  constructor(env: Env, id: string = "singleton") {
    super(env, id);
  }
  async ensureSeedData(): Promise<Portfolio> {
    const state = await this.getState();
    if (state.positions.length === 0 && state.totalValue === 0) {
      await this.save(MOCK_PORTFOLIO);
      return MOCK_PORTFOLIO;
    }
    return state;
  }
  async addPosition(newPosition: Position): Promise<Portfolio> {
    return this.mutate(currentPortfolio => {
      const updatedPositions = [...currentPortfolio.positions, newPosition];
      const newTotalValue = updatedPositions.reduce((sum, pos) => sum + pos.currentValue, 0);
      const newTotalPnl = updatedPositions.reduce((sum, pos) => sum + pos.pnl, 0);
      // A simple way to update history without complex logic for a demo
      const newHistory = [...currentPortfolio.history];
      if (newHistory.length > 0) {
        const lastPoint = newHistory[newHistory.length - 1];
        lastPoint.value = newTotalValue;
      }
      return {
        ...currentPortfolio,
        positions: updatedPositions,
        totalValue: newTotalValue,
        totalPnl: newTotalPnl,
        history: newHistory,
      };
    });
  }
  async resetData(): Promise<Portfolio> {
    await this.save(MOCK_PORTFOLIO);
    return MOCK_PORTFOLIO;
  }
}