import { motion } from "framer-motion";
import { PortfolioValueCard } from "@/components/dashboard/PortfolioValueCard";
import { PnLCard } from "@/components/dashboard/PnLCard";
import { TopPositionsCard } from "@/components/dashboard/TopPositionsCard";
import { StrategyAllocationCard } from "@/components/dashboard/StrategyAllocationCard";
import { usePortfolio, useIsLoadingPortfolio } from "@/store/portfolio-store";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
export function HomePage() {
  const portfolio = usePortfolio();
  const isLoading = useIsLoadingPortfolio();
  return (
    <motion.div
      className="space-y-6 md:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <PortfolioValueCard
            isLoading={isLoading}
            totalValue={portfolio?.totalValue ?? 0}
            history={portfolio?.history ?? []}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PnLCard
            isLoading={isLoading}
            dayPnl={portfolio?.dayPnl ?? 0}
            totalPnl={portfolio?.totalPnl ?? 0}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <TopPositionsCard
            isLoading={isLoading}
            positions={portfolio?.positions ?? []}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-3">
          {/* This would be a new component, e.g., a positions table summary */}
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
           <StrategyAllocationCard
            isLoading={isLoading}
            positions={portfolio?.positions ?? []}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}