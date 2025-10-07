import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StrategyType } from "@shared/types";
const strategies: StrategyType[] = [
  'Bull Call Spread',
  'Bear Put Spread',
  'Long Straddle',
  'Iron Condor',
  'Butterfly Spread',
  'Custom',
];
interface StrategySelectorProps {
  underlying: string;
  setUnderlying: (value: string) => void;
  selectedStrategy: StrategyType;
  setSelectedStrategy: (value: StrategyType) => void;
  disabled?: boolean;
}
export function StrategySelector({
  underlying,
  setUnderlying,
  selectedStrategy,
  setSelectedStrategy,
  disabled,
}: StrategySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b">
      <div className="space-y-2">
        <Label htmlFor="underlying">Underlying Symbol</Label>
        <Input
          id="underlying"
          placeholder="e.g., AAPL"
          value={underlying}
          onChange={(e) => setUnderlying(e.target.value.toUpperCase())}
          className="text-lg"
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="strategy">Strategy Type</Label>
        <Select
          value={selectedStrategy}
          onValueChange={(value) => setSelectedStrategy(value as StrategyType)}
          disabled={disabled}
        >
          <SelectTrigger id="strategy" className="text-lg">
            <SelectValue placeholder="Select a strategy" />
          </SelectTrigger>
          <SelectContent>
            {strategies.map((strategy) => (
              <SelectItem key={strategy} value={strategy}>
                {strategy}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}