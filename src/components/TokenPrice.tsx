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
  try {
    console.log("Fetching token data from Solscan...");
    const response = await fetch(
      `https://public-api.solscan.io/token/meta?tokenAddress=6VxQVitDxoQMtmCG4jRCZKxJQBEfvhDEsMFyorQPpump`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }
    );
    
    const priceResponse = await fetch(
      `https://public-api.solscan.io/market/token/6VxQVitDxoQMtmCG4jRCZKxJQBEfvhDEsMFyorQPpump`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }
    );

    const [metaData, priceData] = await Promise.all([
      response.json(),
      priceResponse.json()
    ]);

    console.log("Solscan token metadata:", metaData);
    console.log("Solscan price data:", priceData);

    if (!priceData || !metaData) {
      throw new Error("No price data available");
    }

    return {
      meta: metaData,
      price: priceData
    };
  } catch (error) {
    console.error("Error fetching Solscan data:", error);
    throw error;
  }
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokenPrice"],
    queryFn: fetchTokenPrice,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <Card className="p-8">
          <div className="text-center text-xl">Loading price data...</div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <Card className="p-8">
          <div className="text-center text-xl text-red-500">
            Unable to load price data. Please try again later.
          </div>
        </Card>
      </div>
    );
  }

  const priceUsd = data.price.priceUsd || 0;
  const priceChange24h = data.price.priceChange24h || 0;
  const isPriceUp = priceChange24h > 0;
  const marketCap = data.price.marketCap || 0;

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
          <div className="text-xl font-bold">{formatMarketCap(marketCap)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Symbol</div>
          <div className="text-xl font-bold">{data.meta.symbol || "BFRND"}</div>
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