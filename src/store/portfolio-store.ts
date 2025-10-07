import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import type { Portfolio, Position } from '@shared/types';
interface PortfolioState {
  portfolio: Portfolio | null;
  isLoading: boolean;
  isExecutingTrade: boolean;
  actions: {
    fetchPortfolio: () => Promise<void>;
    executeTrade: (newPosition: Position) => Promise<boolean>;
    resetPortfolio: () => Promise<void>;
  };
}
export const usePortfolioStore = create<PortfolioState>()(
  immer((set, get) => ({
    portfolio: null,
    isLoading: true,
    isExecutingTrade: false,
    actions: {
      fetchPortfolio: async () => {
        try {
          set({ isLoading: true });
          const portfolioData = await api<Portfolio>('/api/portfolio');
          set({ portfolio: portfolioData, isLoading: false });
        } catch (error) {
          console.error('Failed to fetch portfolio:', error);
          toast.error('Failed to load portfolio data.');
          set({ isLoading: false });
        }
      },
      executeTrade: async (newPosition: Position) => {
        try {
          set({ isExecutingTrade: true });
          const response = await api<{ message: string; portfolio: Portfolio }>('/api/trades/execute', {
            method: 'POST',
            body: JSON.stringify(newPosition),
          });
          set({ portfolio: response.portfolio, isExecutingTrade: false });
          toast.success(response.message || 'Trade executed successfully!');
          return true;
        } catch (error) {
          console.error('Failed to execute trade:', error);
          toast.error('Failed to execute strategy.');
          set({ isExecutingTrade: false });
          return false;
        }
      },
      resetPortfolio: async () => {
        try {
          await api<Portfolio>('/api/portfolio/reset', { method: 'POST' });
          toast.success('Portfolio has been reset successfully.');
          // Refetch the portfolio to update the UI
          await get().actions.fetchPortfolio();
        } catch (error) {
          console.error('Failed to reset portfolio:', error);
          toast.error('Failed to reset portfolio.');
        }
      },
    },
  }))
);
// Selectors for convenience and performance
export const usePortfolio = () => usePortfolioStore((state) => state.portfolio);
export const useIsLoadingPortfolio = () => usePortfolioStore((state) => state.isLoading);
export const usePortfolioActions = () => usePortfolioStore((state) => state.actions);
export const useIsExecutingTrade = () => usePortfolioStore((state) => state.isExecutingTrade);