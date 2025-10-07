import { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_SUGGESTED_STRATEGIES } from "@shared/mock-data";
import { SuggestedStrategy } from "@shared/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
};
export function SuggestedStrategies() {
  const [filter, setFilter] = useState('probability');
  const sortedStrategies = useMemo(() => {
    const strategies = [...MOCK_SUGGESTED_STRATEGIES];
    switch (filter) {
      case 'probability':
        return strategies.sort((a, b) => b.probabilityOfProfit - a.probabilityOfProfit);
      case 'profit':
        return strategies.sort((a, b) => b.maxProfit - a.maxProfit);
      case 'credit':
        return strategies
          .filter(s => s.tradeType === 'Credit')
          .sort((a, b) => b.netPremium - a.netPremium);
      default:
        return strategies;
    }
  }, [filter]);
  const handleRequestPermissions = () => {
    toast.info("Permissions Request", {
      description: "In a real application, this would open a workflow to request access to more advanced strategies.",
    });
  };
  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Suggested Strategies</h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Filter strategies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="probability">Highest Probability</SelectItem>
            <SelectItem value="profit">Highest Max Profit</SelectItem>
            <SelectItem value="credit">Highest Credit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        {sortedStrategies.map((strategy, index) => (
          <Card key={index} className="p-4 hover:bg-muted/50 transition-colors duration-200 cursor-pointer" onClick={() => toast.info(`Selected: ${strategy.name}`)}>
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <p className="font-medium text-sm">{strategy.name}</p>
              </div>
              <div className="col-span-3 text-sm">
                <p className="text-muted-foreground">Max Profit / Loss</p>
                <p><span className="text-green-500">${isFinite(strategy.maxProfit) ? formatCurrency(strategy.maxProfit) : '���'}</span> / <span className="text-red-500">${formatCurrency(strategy.maxLoss)}</span></p>
              </div>
              <div className="col-span-3 text-sm">
                <p className="text-muted-foreground">Prob. of Profit</p>
                <p>{strategy.probabilityOfProfit.toFixed(1)}%</p>
              </div>
              <div className="col-span-2 text-right">
                <Badge variant={strategy.tradeType === 'Credit' ? 'default' : 'secondary'} className={cn(strategy.tradeType === 'Credit' ? 'bg-green-500/20 text-green-700 border-green-500/30' : 'bg-red-500/20 text-red-700 border-red-500/30')}>
                  {strategy.tradeType}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">${strategy.netPremium.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-sm font-medium">More strategies available</p>
        <p className="text-xs text-muted-foreground mb-2">
          Access advanced strategies like Butterflies and Calendars by upgrading your account permissions.
        </p>
        <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={handleRequestPermissions}>
          Request Permissions
        </Button>
      </div>
    </div>
  );
}