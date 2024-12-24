import { useQuery } from "@tanstack/react-query";
import { fetchTokenPrice, generateHourlyPrices } from "@/utils/tokenPriceUtils";
import { PriceStats } from "./PriceStats";
import { PriceChart } from "./PriceChart";

export const TokenPrice = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tokenPrice"],
    queryFn: fetchTokenPrice,
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center text-xl">Loading price data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="text-center text-xl text-red-500">
          Unable to load price data. Please try again later.
        </div>
      </div>
    );
  }

  const pair = data.pairs[0];
  const priceUsd = parseFloat(pair.priceUsd);
  const priceChange24h = pair.priceChange.h24;

  const pricePoints = generateHourlyPrices(
    priceUsd / (1 + priceChange24h/100),
    priceUsd,
    24
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <PriceStats 
        priceUsd={priceUsd}
        priceChange24h={priceChange24h}
        marketCap={pair.marketCap}
        symbol={pair.baseToken.symbol}
      />
      <PriceChart pricePoints={pricePoints} />
    </div>
  );
};