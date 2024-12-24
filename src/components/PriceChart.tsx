import { Card } from "./ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "@/utils/tokenPriceUtils";

interface PriceChartProps {
  pricePoints: Array<{ time: string; price: number }>;
}

export const PriceChart = ({ pricePoints }: PriceChartProps) => {
  return (
    <Card className="p-4">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={pricePoints}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${formatPrice(value)}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [`$${formatPrice(value)}`, "Price"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9b87f5"
              fill="#9b87f5"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};