export const fetchTokenPrice = async () => {
  try {
    console.log("Fetching token price data...");
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/solana/5siqqcq4am9jsyfashjv1wqbc7bfodmakucygnnwahbu`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Token price data:", data);
    
    if (!data.pairs || data.pairs.length === 0) {
      throw new Error("No price data available");
    }
    return data;
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw error;
  }
};

export const formatPrice = (price: number) => {
  if (price < 0.00001) {
    return price.toExponential(4);
  }
  return price.toFixed(6);
};

export const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`;
  }
  return `$${marketCap.toLocaleString()}`;
};

export const generateHourlyPrices = (startPrice: number, endPrice: number, hours: number) => {
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