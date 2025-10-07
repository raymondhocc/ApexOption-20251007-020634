import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Position } from "@shared/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
interface TopPositionsCardProps {
  positions: Position[];
  isLoading: boolean;
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
export function TopPositionsCard({ positions, isLoading }: TopPositionsCardProps) {
  if (isLoading) {
    return <Skeleton className="h-[220px] w-full" />;
  }
  const topPositions = [...positions]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 4);
  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Top Positions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topPositions.map((pos) => (
            <li key={pos.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{pos.underlying}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pos.strategy}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(pos.currentValue)}</p>
                <p className={cn("text-sm", pos.pnl >= 0 ? "text-green-500" : "text-red-500")}>
                  {pos.pnl >= 0 ? '+' : ''}{formatCurrency(pos.pnl)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}