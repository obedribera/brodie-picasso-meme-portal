import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

const fetchTokenPrice = async () => {
  try {
    console.log("Fetching token data from Solscan...");
    
    // Fetch metadata
    const metaResponse = await fetch(
      `https://public-api.solscan.io/token/meta?tokenAddress=6VxQVitDxoQMtmCG4jRCZKxJQBEfvhDEsMFyorQPpump`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }
    );
    
    // Fetch price data
    const priceResponse = await fetch(
      `https://public-api.solscan.io/market/token/6VxQVitDxoQMtmCG4jRCZKxJQBEfvhDEsMFyorQPpump`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }
    );

    // Clone the response streams before reading them
    const metaDataPromise = metaResponse.clone().json();
    const priceDataPromise = priceResponse.clone().json();

    const [metaData, priceData] = await Promise.all([
      metaDataPromise,
      priceDataPromise
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
  if (price < 0.01) {
    return price.toExponential(2);
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  });
};

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  }
  if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  }
  return `$${marketCap.toFixed(2)}`;
};

const generateHourlyPrices = (currentPrice: number, priceChange24h: number) => {
  const points = [];
  const startPrice = currentPrice / (1 + priceChange24h / 100);
  
  for (let i = 0; i < 24; i++) {
    const progress = i / 23;
    const price = startPrice + (currentPrice - startPrice) * progress;
    points.push({
      hour: `${i}h`,
      price
    });
  }
  
  return points;
};

export const TokenPrice = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tokenPrice'],
    queryFn: fetchTokenPrice,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading price data. Please try again later.
      </div>
    );
  }

  const priceUsd = data.price.priceUsd || 0;
  const priceChange24h = data.price.priceChange24h || 0;
  const isPriceUp = priceChange24h > 0;
  const marketCap = data.price.marketCap || 0;

  // Generate 24 hourly price points
  const pricePoints = generateHourlyPrices(priceUsd, priceChange24h);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Price</div>
          <div className="text-xl font-bold">{formatPrice(priceUsd)}</div>
          <div className={`text-sm ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
            {isPriceUp ? '↑' : '↓'} {Math.abs(priceChange24h).toFixed(2)}%
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
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pricePoints}>
              <XAxis dataKey="hour" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => formatPrice(value)}
              />
              <Tooltip 
                formatter={(value: number) => [formatPrice(value), 'Price']}
                labelFormatter={(label) => `${label} ago`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#E3442D"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};