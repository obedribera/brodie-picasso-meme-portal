import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatPrice, formatMarketCap } from "@/utils/tokenPriceUtils";

interface PriceStatsProps {
  priceUsd: number;
  priceChange24h: number;
  marketCap: number;
  symbol: string;
}

export const PriceStats = ({ priceUsd, priceChange24h, marketCap, symbol }: PriceStatsProps) => {
  const isPriceUp = priceChange24h > 0;

  return (
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
        <div className="text-xl font-bold">{symbol}</div>
      </Card>
    </div>
  );
};