import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Disclaimer } from "@/components/Disclaimer";
import { Toaster } from "@/components/ui/sonner";
import { usePortfolioActions } from "@/store/portfolio-store";
export function AppLayout() {
  const { fetchPortfolio } = usePortfolioActions();
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <Disclaimer />
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}