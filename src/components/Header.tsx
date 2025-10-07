import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PlusCircle } from "lucide-react";
import { StrategyBuilderModal } from "./strategy-builder/StrategyBuilderModal";
const pageTitles: { [key: string]: string } = {
  "/": "Dashboard Overview",
  "/positions": "Current Positions",
  "/settings": "Application Settings",
};
export function Header() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const title = pageTitles[location.pathname] || "Apex Options";
  return (
    <>
      <header className="h-16 flex-shrink-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-95">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Strategy
          </Button>
          <ThemeToggle className="relative top-0 right-0" />
        </div>
      </header>
      <StrategyBuilderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}