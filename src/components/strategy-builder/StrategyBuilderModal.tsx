import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Trash2 } from "lucide-react";
import { StrategySelector } from "./StrategySelector";
import { OptionsChainTable } from "./OptionsChainTable";
import { ProfitLossChart } from "./ProfitLossChart";
import { SuggestedStrategies } from "./SuggestedStrategies";
import { api } from "@/lib/api-client";
import { toast } from "sonner";
import { OptionChainItem, OptionLeg, OptionType, StrategyType, Position } from "@shared/types";
import { calculateProfitLoss, ProfitLossPoint, getStrategyLegsTemplate } from "@/lib/strategy-utils";
import { usePortfolioActions, useIsExecutingTrade } from "@/store/portfolio-store";
interface StrategyBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function StrategyBuilderModal({ isOpen, onClose }: StrategyBuilderModalProps) {
  const [underlying, setUnderlying] = useState("AAPL");
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyType>("Custom");
  const [legs, setLegs] = useState<Partial<OptionLeg>[]>([]);
  const [chain, setChain] = useState<OptionChainItem[]>([]);
  const [isLoadingChain, setIsLoadingChain] = useState(false);
  const [pnlData, setPnlData] = useState<ProfitLossPoint[]>([]);
  const { executeTrade } = usePortfolioActions();
  const isExecutingTrade = useIsExecutingTrade();
  useEffect(() => {
    if (isOpen && underlying.trim().length > 0) {
      const fetchChain = async () => {
        setIsLoadingChain(true);
        try {
          const data = await api<OptionChainItem[]>(`/api/options-chain/${underlying}`);
          setChain(data);
        } catch (error) {
          toast.error(`Failed to fetch options chain for ${underlying}.`);
          setChain([]);
        } finally {
          setIsLoadingChain(false);
        }
      };
      fetchChain();
    } else if (isOpen) {
      setChain([]);
    }
  }, [underlying, isOpen]);
  useEffect(() => {
    if (selectedStrategy !== 'Custom') {
      const templateLegs = getStrategyLegsTemplate(selectedStrategy).map(leg => ({
        ...leg,
        id: crypto.randomUUID(),
        expiration: "2024-09-20", // Default expiry
      }));
      setLegs(templateLegs);
    }
  }, [selectedStrategy]);
  const completedLegs = useMemo(() => legs.filter(
    (leg): leg is OptionLeg =>
      !!leg.id &&
      !!leg.type &&
      leg.strike !== undefined && leg.strike > 0 &&
      leg.premium !== undefined && leg.premium > 0 &&
      leg.quantity !== undefined && leg.quantity !== 0 &&
      !!leg.expiration
  ), [legs]);
  useEffect(() => {
    const estimatedUnderlyingPrice = chain.length > 0
      ? chain.reduce((acc, item) => acc + item.strike, 0) / chain.length
      : 175;
    const data = calculateProfitLoss(completedLegs, estimatedUnderlyingPrice);
    setPnlData(data);
  }, [completedLegs, chain]);
  const addLeg = (type: OptionType, strike: number, premium: number) => {
    if (selectedStrategy !== 'Custom') {
        toast.info(`Switch to 'Custom' strategy to add legs manually.`);
        return;
    }
    const newLeg: Partial<OptionLeg> = {
      id: crypto.randomUUID(),
      type,
      strike,
      premium,
      quantity: 1,
      expiration: "2024-09-20",
    };
    setLegs((prev) => [...prev, newLeg]);
  };
  const updateLeg = (index: number, field: keyof OptionLeg, value: any) => {
    if (selectedStrategy !== 'Custom') {
      setSelectedStrategy('Custom');
    }
    const newLegs = [...legs];
    const legToUpdate = { ...newLegs[index] };
    if (field === 'quantity' || field === 'strike' || field === 'premium') {
      (legToUpdate as any)[field] = value === '' ? '' : parseFloat(value);
    } else {
      (legToUpdate as any)[field] = value;
    }
    newLegs[index] = legToUpdate;
    setLegs(newLegs);
  };
  const removeLeg = (index: number) => {
    if (selectedStrategy !== 'Custom') {
        toast.info(`Switch to 'Custom' strategy to remove legs manually.`);
        return;
    }
    setLegs((prev) => prev.filter((_, i) => i !== index));
  };
  const handleExecute = async () => {
    if (completedLegs.length !== legs.length || legs.length === 0) {
      toast.error("Please complete all fields for each leg with valid values.");
      return;
    }
    const newPosition: Position = {
      id: crypto.randomUUID(),
      underlying,
      strategy: selectedStrategy,
      legs: completedLegs,
      entryDate: new Date().toISOString(),
      currentValue: 0, // Calculated on backend
      pnl: 0, // Calculated on backend
    };
    const success = await executeTrade(newPosition);
    if (success) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Strategy Builder</DialogTitle>
          <DialogDescription>
            Design, analyze, and execute multi-leg option strategies.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
          <div className="flex flex-col overflow-y-auto pr-2">
            <StrategySelector
              underlying={underlying}
              setUnderlying={setUnderlying}
              selectedStrategy={selectedStrategy}
              setSelectedStrategy={(strategy) => {
                setSelectedStrategy(strategy);
                if (strategy === 'Custom') {
                  setLegs([]);
                }
              }}
              disabled={isLoadingChain}
            />
            <SuggestedStrategies />
            <OptionsChainTable
              chain={chain}
              isLoading={isLoadingChain}
              onSelectOption={selectedStrategy === 'Custom' ? addLeg : () => {}}
            />
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Strategy Legs</h3>
              {legs.map((leg, index) => (
                <div key={leg.id || index} className="grid grid-cols-12 gap-2 items-center p-2 border rounded-md">
                  <div className="col-span-2">
                    <Select value={leg.type} onValueChange={(v) => updateLeg(index, 'type', v)}>
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent><SelectItem value="Call">Call</SelectItem><SelectItem value="Put">Put</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2"><Input type="number" placeholder="Qty" value={leg.quantity ?? ''} onChange={(e) => updateLeg(index, 'quantity', e.target.value)} /></div>
                  <div className="col-span-3"><Input type="number" placeholder="Strike" value={leg.strike ?? ''} onChange={(e) => updateLeg(index, 'strike', e.target.value)} /></div>
                  <div className="col-span-2"><Input type="text" placeholder="Expiry" value={leg.expiration ?? ''} onChange={(e) => updateLeg(index, 'expiration', e.target.value)} /></div>
                  <div className="col-span-2"><Input type="number" step="0.01" placeholder="Premium" value={leg.premium ?? ''} onChange={(e) => updateLeg(index, 'premium', e.target.value)} /></div>
                  <div className="col-span-1"><Button variant="ghost" size="icon" onClick={() => removeLeg(index)}><Trash2 className="h-4 w-4 text-red-500"/></Button></div>
                </div>
              ))}
              {legs.length === 0 && <p className="text-muted-foreground text-center py-4">Select a strategy or add legs manually in 'Custom' mode.</p>}
            </div>
          </div>
          <div className="flex flex-col bg-muted/20 rounded-lg">
            <ProfitLossChart data={pnlData} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isExecutingTrade}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleExecute} className="bg-blue-600 hover:bg-blue-700" disabled={isExecutingTrade || completedLegs.length === 0}>
            {isExecutingTrade && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Execute Strategy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}