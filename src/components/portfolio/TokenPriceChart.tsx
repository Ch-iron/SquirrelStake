'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useChain } from '@/hooks/useChain';
import { useTokenPriceHistory } from '@/hooks/useTokenPriceHistory';
import { useTokenPrice } from '@/hooks/useTokenPrice';
import type { ChartConfig } from '@/components/ui/chart';

const CHART_CONFIG: ChartConfig = {
  price: {
    label: 'Price (USD)',
    color: 'var(--chart-1)',
  },
};

const formatUsd = (value: number): string => {
  if (value >= 1) {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
};

const TokenPriceChart = () => {
  const { config } = useChain();
  const { symbol, coingeckoId } = config.stakingToken;
  const { priceHistory, isLoading: historyLoading } = useTokenPriceHistory(coingeckoId, 30);
  const { price, change24h, isLoading: priceLoading } = useTokenPrice(coingeckoId);

  const isLoading = historyLoading || priceLoading;

  const changeColor = (() => {
    if (change24h === null) {
      return 'text-muted-foreground';
    }
    if (change24h >= 0) {
      return 'text-green-500';
    }
    return 'text-red-500';
  })();

  const changeSign = change24h !== null && change24h >= 0 ? '+' : '';

  // Determine tick interval based on data length
  const tickInterval = (() => {
    if (priceHistory.length <= 7) {
      return 0;
    }
    if (priceHistory.length <= 30) {
      return 4;
    }
    return Math.floor(priceHistory.length / 7);
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{symbol} Price</span>
          {!isLoading && price !== null && (
            <div className="flex items-center gap-2">
              <span className="text-lg">{formatUsd(price)}</span>
              {change24h !== null && (
                <span className={`text-sm font-medium ${changeColor}`}>
                  {changeSign}{change24h.toFixed(2)}%
                </span>
              )}
            </div>
          )}
        </CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        {(() => {
          if (isLoading) {
            return <Skeleton className="h-[200px] w-full" />;
          }

          if (priceHistory.length === 0) {
            return (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
                Price data unavailable
              </div>
            );
          }

          return (
            <ChartContainer config={CHART_CONFIG} className="h-[200px] w-full">
              <AreaChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" interval={tickInterval} />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(tick: number) => formatUsd(tick)}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatUsd(Number(value))}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  fill="var(--color-price)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          );
        })()}
      </CardContent>
    </Card>
  );
};

export { TokenPriceChart };
