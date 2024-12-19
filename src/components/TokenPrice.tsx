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
  CandlestickChart,
  Candlestick,
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

  // Mock candlestick data (since the API doesn't provide OHLC data)
  const candlestickData = [
    {
      time: "15m ago",
      open: priceUsd * 0.98,
      high: priceUsd * 1.02,
      low: priceUsd * 0.97,
      close: priceUsd,
    },
    {
      time: "now",
      open: priceUsd * 0.99,
      high: priceUsd * 1.01,
      low: priceUsd * 0.98,
      close: priceUsd * (1 + priceChange24h/100),
    },
  ];

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
            <CandlestickChart data={candlestickData}>
              <XAxis dataKey="time" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${formatPrice(value)}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${formatPrice(value)}`, "Price"]}
              />
              <Candlestick
                fill="#ef4444"
                stroke="#ef4444"
                wickStroke="#ef4444"
                yAccessor={(data) => data.low}
                upFill="#22c55e"
                upStroke="#22c55e"
                upWickStroke="#22c55e"
              />
            </CandlestickChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};