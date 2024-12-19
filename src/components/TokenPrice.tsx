import { useQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect } from "react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "RAYDIUMV3:BRODIE/SOL",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "calendar": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com"
      }`;
    
    const container = document.getElementById("tradingview-widget");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && script) {
        container.removeChild(script);
      }
    };
  }, []);

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
        <div className="h-[400px] w-full" id="tradingview-widget">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};