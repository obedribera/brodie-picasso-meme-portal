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
    `https://api.dexscreener.com/latest/dex/tokens/6VxQVitDxoQMtmCG4jRCZKxJQBEfvhDEsMFyorQPpump`
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

// Generate hourly price points between two prices
const generateHourlyPrices = (startPrice: number, endPrice: number, hours: number) => {
  const pricePoints = [];
  const priceDiff = endPrice - startPrice;
  const hourlyChange = priceDiff / hours;

  for (let i = 0; i <= hours; i++) {
    const time = new Date();
    time.setHours(time.getHours() - (hours - i));
    pricePoints.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: startPrice + (hourlyChange * i),
    });
  }
  return pricePoints;
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

  // Generate 24 hourly price points
  const pricePoints = generateHourlyPrices(
    priceUsd / (1 + priceChange24h/100), // Calculate price 24h ago
    priceUsd, // Current price
    24 // 24 hours
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
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
    </div>
  );
};