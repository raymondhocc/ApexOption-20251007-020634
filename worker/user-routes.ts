import { Hono } from "hono";
import type { Env } from './core-utils';
import { PortfolioEntity } from "./entities";
import { ok, bad } from './core-utils';
import { MOCK_OPTIONS_CHAIN } from "@shared/mock-data";
import type { Position } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/portfolio', async (c) => {
    const portfolioEntity = new PortfolioEntity(c.env);
    const portfolio = await portfolioEntity.ensureSeedData();
    return ok(c, portfolio);
  });
  app.get('/api/positions', async (c) => {
    const portfolioEntity = new PortfolioEntity(c.env);
    const portfolio = await portfolioEntity.ensureSeedData();
    return ok(c, portfolio.positions);
  });
  app.get('/api/options-chain/:symbol', (c) => {
    const { symbol } = c.req.param();
    // In a real app, you'd fetch this based on the symbol.
    // For this demo, we return the same mock data regardless of the symbol.
    console.log(`Fetching options chain for ${symbol}`);
    return ok(c, MOCK_OPTIONS_CHAIN);
  });
  app.post('/api/trades/execute', async (c) => {
    try {
      const newPosition = await c.req.json<Position>();
      if (!newPosition || !newPosition.underlying || !newPosition.legs?.length) {
        return bad(c, 'Invalid position data');
      }
      const initialValue = newPosition.legs.reduce((acc, leg) => {
        return acc - (leg.premium * leg.quantity * 100);
      }, 0);
      newPosition.currentValue = initialValue;
      newPosition.pnl = 0; // PNL at inception is always 0
      const portfolioEntity = new PortfolioEntity(c.env);
      await portfolioEntity.ensureSeedData(); // Ensure portfolio exists
      const updatedPortfolio = await portfolioEntity.addPosition(newPosition);
      return ok(c, { message: 'Trade executed successfully', portfolio: updatedPortfolio });
    } catch (error) {
      console.error('Failed to execute trade:', error);
      return bad(c, 'Failed to execute trade');
    }
  });
  app.post('/api/portfolio/reset', async (c) => {
    try {
      const portfolioEntity = new PortfolioEntity(c.env);
      const resetPortfolio = await portfolioEntity.resetData();
      return ok(c, resetPortfolio);
    } catch (error) {
      console.error('Failed to reset portfolio:', error);
      return bad(c, 'Failed to reset portfolio');
    }
  });
}