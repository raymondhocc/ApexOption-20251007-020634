import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
interface PnLCardProps {
  dayPnl: number;
  totalPnl: number;
  isLoading: boolean;
}
const formatCurrency = (value: number) => {
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(value))}`;
};
export function PnLCard({ dayPnl, totalPnl, isLoading }: PnLCardProps) {
  if (isLoading) {
    return <Skeleton className="h-[220px] w-full" />;
  }
  const isDayPositive = dayPnl >= 0;
  const isTotalPositive = totalPnl >= 0;
  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Profit & Loss
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">Today's P&L</p>
          <div className={cn("flex items-center text-2xl font-bold", isDayPositive ? "text-green-500" : "text-red-500")}>
            {isDayPositive ? <ArrowUpRight className="h-6 w-6 mr-2" /> : <ArrowDownRight className="h-6 w-6 mr-2" />}
            <span>{formatCurrency(dayPnl)}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">Total P&L</p>
          <div className={cn("flex items-center text-2xl font-bold", isTotalPositive ? "text-green-500" : "text-red-500")}>
            {isTotalPositive ? <ArrowUpRight className="h-6 w-6 mr-2" /> : <ArrowDownRight className="h-6 w-6 mr-2" />}
            <span>{formatCurrency(totalPnl)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}