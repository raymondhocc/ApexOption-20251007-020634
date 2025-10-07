import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { usePortfolio, useIsLoadingPortfolio } from "@/store/portfolio-store";
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
export function PositionsPage() {
  const portfolio = usePortfolio();
  const isLoading = useIsLoadingPortfolio();
  const positions = portfolio?.positions ?? [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Positions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : positions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {positions.map((position) => (
                <AccordionItem value={position.id} key={position.id}>
                  <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md transition-colors">
                    <div className="grid grid-cols-5 gap-4 w-full text-left items-center">
                      <span className="font-medium">{position.underlying}</span>
                      <span><Badge variant="secondary">{position.strategy}</Badge></span>
                      <span>{formatDate(position.entryDate)}</span>
                      <span className="text-right font-mono">{formatCurrency(position.currentValue)}</span>
                      <span className={cn("text-right font-mono", position.pnl >= 0 ? "text-green-500" : "text-red-500")}>
                        {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Strike</TableHead>
                          <TableHead>Expiration</TableHead>
                          <TableHead className="text-right">Entry Premium</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {position.legs.map(leg => (
                          <TableRow key={leg.id}>
                            <TableCell className={cn(leg.type === 'Call' ? 'text-green-500' : 'text-red-500')}>{leg.type}</TableCell>
                            <TableCell>{leg.quantity}</TableCell>
                            <TableCell>${leg.strike.toFixed(2)}</TableCell>
                            <TableCell>{formatDate(leg.expiration)}</TableCell>
                            <TableCell className="text-right font-mono">${leg.premium.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center text-gray-500 py-16">
              <h3 className="text-lg font-semibold">No Open Positions</h3>
              <p className="text-sm text-muted-foreground">Create a new strategy to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}