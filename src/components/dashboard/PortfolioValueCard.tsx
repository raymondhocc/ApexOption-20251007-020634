import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { PortfolioHistoryPoint } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
interface PortfolioValueCardProps {
  totalValue: number;
  history: PortfolioHistoryPoint[];
  isLoading: boolean;
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
export function PortfolioValueCard({ totalValue, history, isLoading }: PortfolioValueCardProps) {
  if (isLoading) {
    return <Skeleton className="h-[220px] w-full" />;
  }
  return (
    <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Total Portfolio Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {formatCurrency(totalValue)}
        </div>
        <div className="h-28 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                formatter={(value: number) => [formatCurrency(value), 'Value']}
              />
              <XAxis dataKey="date" hide={true} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}