import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from 'recharts';
import { ProfitLossPoint } from "@/lib/strategy-utils";
interface ProfitLossChartProps {
  data: ProfitLossPoint[];
}
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
export function ProfitLossChart({ data }: ProfitLossChartProps) {
  return (
    <div className="p-6 h-80">
      <h3 className="text-lg font-semibold mb-4">Profit/Loss at Expiration</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
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
              labelFormatter={(label) => `Price: ${formatCurrency(label)}`}
              formatter={(value: number) => [formatCurrency(value), 'P&L']}
            />
            <XAxis dataKey="price" tickFormatter={(value) => `$${value.toFixed(0)}`} />
            <YAxis tickFormatter={(value) => `${value}`} />
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="pnl" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorPnl)" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Configure strategy legs to see the P/L chart.
        </div>
      )}
    </div>
  );
}