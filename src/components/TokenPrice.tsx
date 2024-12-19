import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const TOKEN_ADDRESS = "22UaSSL6c6TYLexhaxWisq2mDaRTzNDX1X222anPpump";

const fetchTokenPrice = async () => {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`);
    const data = await response.json();
    console.log("Token price data:", data);
    
    if (data.pairs && data.pairs[0]) {
      return {
        priceUsd: data.pairs[0].priceUsd,
        priceChange24h: data.pairs[0].priceChange.h24,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
};

export const TokenPrice = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tokenPrice"],
    queryFn: fetchTokenPrice,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading price...</div>;
  }

  if (!data) {
    return null;
  }

  const priceColor = data.priceChange24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col items-center gap-1 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
      <div className="text-sm font-semibold">$BRODIE Price</div>
      <div className="text-lg font-bold">${Number(data.priceUsd).toFixed(6)}</div>
      <div className={`text-xs ${priceColor}`}>
        {data.priceChange24h >= 0 ? "+" : ""}{data.priceChange24h.toFixed(2)}% (24h)
      </div>
    </div>
  );
};