import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OptionChainItem, OptionLeg, OptionType } from "@shared/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
interface OptionsChainTableProps {
  chain: OptionChainItem[];
  isLoading: boolean;
  onSelectOption: (type: OptionType, strike: number, premium: number) => void;
}
export function OptionsChainTable({ chain, isLoading, onSelectOption }: OptionsChainTableProps) {
  return (
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold mb-4">Options Chain</h3>
      <ScrollArea className="h-72 w-full rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="text-center text-red-500">Puts</TableHead>
              <TableHead className="text-center font-bold w-24">Strike</TableHead>
              <TableHead className="text-center text-green-500">Calls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                </TableRow>
              ))
            ) : (
              chain.map(({ strike, call, put }) => (
                <TableRow key={strike}>
                  <TableCell
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      !put && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => put && onSelectOption('Put', strike, put.premium)}
                  >
                    {put ? `$${put.premium.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg bg-muted/20">
                    ${strike.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center cursor-pointer hover:bg-muted/50",
                      !call && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => call && onSelectOption('Call', strike, call.premium)}
                  >
                    {call ? `$${call.premium.toFixed(2)}` : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}