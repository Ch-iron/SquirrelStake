'use client';

import { useQuery } from '@tanstack/react-query';

const COINGECKO_MARKET_CHART_URL = 'https://api.coingecko.com/api/v3/coins';

type PricePoint = {
  date: string;
  price: number;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const fetchPriceHistory = async (
  coingeckoId: string,
  days: number,
): Promise<PricePoint[]> => {
  const url = `${COINGECKO_MARKET_CHART_URL}/${encodeURIComponent(coingeckoId)}/market_chart?vs_currency=usd&days=${days}`;
  const response = await fetch(url).catch((fetchError) => {
    console.error('price history fetch error', fetchError);
    return null;
  });

  if (!response?.ok) {
    throw new Error('Failed to fetch price history');
  }

  const data = await response.json().catch((parseError) => {
    console.error('price history parse error', parseError);
    return null;
  });

  if (!data?.prices || !Array.isArray(data.prices)) {
    throw new Error('Invalid price history data');
  }

  return (data.prices as [number, number][]).map(([timestamp, price]) => ({
    date: formatDate(timestamp),
    price,
  }));
};

const useTokenPriceHistory = (coingeckoId: string | undefined, days: number = 30) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tokenPriceHistory', coingeckoId, days],
    queryFn: () => fetchPriceHistory(coingeckoId!, days),
    enabled: !!coingeckoId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    priceHistory: data ?? [],
    isLoading,
  };
};

export { useTokenPriceHistory };
export type { PricePoint };
