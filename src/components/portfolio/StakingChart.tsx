'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useDelegations } from '@/hooks/useStaking';
import { useChain } from '@/hooks/useChain';
import { useTokenPrice } from '@/hooks/useTokenPrice';
import { formatTokenAmount } from '@/lib/utils/format';
import { Skeleton } from '@/components/ui/skeleton';
import type { ChartConfig } from '@/components/ui/chart';

const DAILY_DATA_POINTS = 30;

// Generate mock daily data based on current USD value for visualization
const generateMockData = (currentUsdValue: number) => {
  const today = new Date();

  return Array.from({ length: DAILY_DATA_POINTS }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (DAILY_DATA_POINTS - 1 - index));

    const progress = index / (DAILY_DATA_POINTS - 1);
    const noise = Math.sin(index * 0.7) * 0.03;

    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      value: Math.max(0, currentUsdValue * (0.85 + progress * 0.15 + noise)),
    };
  });
};

const CHART_CONFIG: ChartConfig = {
  value: {
    label: 'Value (USD)',
    color: 'var(--chart-1)',
  },
};

const formatUsd = (value: number): string => {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const StakingChart = () => {
  const { config } = useChain();
  const { data: delegations, isLoading: delegationsLoading } = useDelegations();
  const { price, isLoading: priceLoading } = useTokenPrice(config.stakingToken.coingeckoId);

  const totalStaked = delegations
    ? delegations
        .reduce(
          (accumulator, delegation) => accumulator + BigInt(delegation.amount ?? '0'),
          BigInt(0),
        )
        .toString()
    : '0';

  const stakedTokens = Number(
    formatTokenAmount(totalStaked, config.stakingToken.decimals, 6).replace(/,/g, ''),
  );
  const totalUsdValue = price !== null ? stakedTokens * price : 0;
  const chartData = generateMockData(totalUsdValue);
  const isLoading = delegationsLoading || priceLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking Overview</CardTitle>
        <CardDescription>
          {price !== null
            ? `Total staked value: ${formatUsd(totalUsdValue)}`
            : 'Your staking value trend'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : (
          <ChartContainer config={CHART_CONFIG} className="h-[250px] w-full">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" interval={4} />
              <YAxis tickFormatter={(tick: number) => `$${tick.toFixed(0)}`} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatUsd(Number(value))}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                fill="var(--color-value)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export { StakingChart };
