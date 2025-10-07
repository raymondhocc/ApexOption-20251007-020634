import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Position } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
interface StrategyAllocationCardProps {
  positions: Position[];
  isLoading: boolean;
}
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
export function StrategyAllocationCard({ positions, isLoading }: StrategyAllocationCardProps) {
  const allocationData = useMemo(() => {
    if (!positions || positions.length === 0) return [];
    const counts = positions.reduce((acc, pos) => {
      acc[pos.strategy] = (acc[pos.strategy] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [positions]);
  if (isLoading) {
    return <Skeleton className="h-[220px] w-full" />;
  }
  return (
    <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Strategy Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[140px]">
        {allocationData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No positions to analyze.
          </div>
        )}
      </CardContent>
    </Card>
  );
}