import { useQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card } from "./ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const fetchTokenPrice = async () => {
  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/22UaSSL6c6TYLexhaxWisq2mDaRTzNDX1X222anPpump`
  );
  const data = await response.json();
  console.log("Token price data:", data);
  return data;
};

const formatPrice = (price: number) => {
  if (price < 0.00001) {
    return price.toExponential(4);
  }
  return price.toFixed(6);
};

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`;
  }
  return `$${marketCap.toLocaleString()}`;
};

export const TokenPrice = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tokenPrice"],
    queryFn: fetchTokenPrice,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const pair = data?.pairs[0];
  if (!pair) return null;

  const priceUsd = parseFloat(pair.priceUsd);
  const priceChange24h = pair.priceChange.h24;
  const isPriceUp = priceChange24h > 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="text-xl font-bold">${formatPrice(priceUsd)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">24h Change</div>
          <div className={`text-xl font-bold flex items-center gap-1 ${
            isPriceUp ? "text-green-500" : "text-red-500"
          }`}>
            {isPriceUp ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
            {Math.abs(priceChange24h).toFixed(2)}%
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Market Cap</div>
          <div className="text-xl font-bold">{formatMarketCap(pair.marketCap)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Symbol</div>
          <div className="text-xl font-bold">{pair.baseToken.symbol}</div>
        </Card>
      </div>
      
      <Card className="p-4">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { time: "24h", price: priceUsd * (1 + priceChange24h/100) },
                { time: "now", price: priceUsd },
              ]}
            >
              <XAxis dataKey="time" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${formatPrice(value)}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${formatPrice(value)}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};