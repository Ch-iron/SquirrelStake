'use client';

import { useQuery } from '@tanstack/react-query';
import { useChainStore } from '@/stores/chainStore';
import { CHAIN_REGISTRY } from '@/lib/chains/registry';
import { queryKeys } from '@/lib/queryKeys';

// XPLA FCD response format: { apr: "0.2202..." }
type XplaAprResponse = {
  apr: string;
};

// Fetch APR from XPLA FCD endpoint
const fetchXplaApy = async (endpoint: string): Promise<number> => {
  const response = await fetch(endpoint).catch(() => null);

  if (!response?.ok) {
    throw new Error('Failed to fetch staking APY');
  }

  const data: XplaAprResponse | null = await response.json().catch(() => null);

  if (!data?.apr) {
    throw new Error('Failed to parse staking APY response');
  }

  return parseFloat(data.apr);
};

// SEI mint params response with token release schedule
type TokenReleaseEntry = {
  start_date: string;
  end_date: string;
  token_release_amount: string;
};

type SeiMintParamsResponse = {
  params: {
    token_release_schedule: TokenReleaseEntry[];
  };
};

// Cosmos staking pool response
type StakingPoolResponse = {
  pool: {
    bonded_tokens: string;
  };
};

// Count inclusive days between two dates
const calculateDaysInclusive = (start: Date, end: Date): number => {
  const msPerDay = 86400000;
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
};

// Calculate upcoming mint tokens for the next N days from the release schedule
// Mirrors SEI official app logic: pro-rata calculation across overlapping schedule periods
const getUpcomingMintTokens = (
  fromDate: Date,
  days: number,
  schedule: TokenReleaseEntry[],
): number => {
  const toDate = new Date(fromDate.getTime() + days * 86400000);

  const sortedSchedule = [...schedule].sort(
    (entryA, entryB) => new Date(entryA.start_date).getTime() - new Date(entryB.start_date).getTime(),
  );

  const totalMint = sortedSchedule.reduce((sum, entry) => {
    const entryStart = new Date(entry.start_date);
    const entryEnd = new Date(entry.end_date);

    // Skip entries that end before our window
    if (entryEnd < fromDate) {
      return sum;
    }

    // Stop once entries start after our window
    if (entryStart > toDate) {
      return sum;
    }

    const overlapStart = entryStart < fromDate ? fromDate : entryStart;
    const overlapEnd = entryEnd < toDate ? entryEnd : toDate;
    const overlapDays = calculateDaysInclusive(overlapStart, overlapEnd);
    const totalEntryDays = calculateDaysInclusive(entryStart, entryEnd);
    const releaseAmount = parseFloat(entry.token_release_amount);

    return sum + (overlapDays / totalEntryDays) * releaseAmount;
  }, 0);

  return totalMint;
};

// Calculate APR from SEI LCD endpoints using the official app's method:
// APR = getUpcomingMintTokens(now, 365, schedule) / bonded_tokens
const fetchLcdApy = async (lcdUrl: string): Promise<number> => {
  const [mintParamsResponse, poolResponse] = await Promise.all([
    fetch(`${lcdUrl}/seichain/mint/v1beta1/params`).catch(() => null),
    fetch(`${lcdUrl}/cosmos/staking/v1beta1/pool`).catch(() => null),
  ]);

  if (!mintParamsResponse?.ok || !poolResponse?.ok) {
    throw new Error('Failed to fetch LCD data for APR calculation');
  }

  const [mintParamsData, poolData] = await Promise.all([
    mintParamsResponse.json().catch(() => null) as Promise<SeiMintParamsResponse | null>,
    poolResponse.json().catch(() => null) as Promise<StakingPoolResponse | null>,
  ]);

  if (!mintParamsData?.params?.token_release_schedule || !poolData?.pool?.bonded_tokens) {
    throw new Error('Failed to parse LCD data for APR calculation');
  }

  const bondedTokens = parseFloat(poolData.pool.bonded_tokens);

  if (bondedTokens === 0) {
    return 0;
  }

  const annualMint = getUpcomingMintTokens(
    new Date(),
    365,
    mintParamsData.params.token_release_schedule,
  );

  return annualMint / bondedTokens;
};

const useStakingApy = () => {
  const selectedChainSlug = useChainStore((state) => state.selectedChainSlug);
  const chainConfig = CHAIN_REGISTRY[selectedChainSlug];
  const apyEndpoint = chainConfig?.stakingApyEndpoint;
  const lcdUrl = chainConfig?.lcd;

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.stakingApy(selectedChainSlug),
    queryFn: () => {
      if (apyEndpoint) {
        return fetchXplaApy(apyEndpoint);
      }

      return fetchLcdApy(lcdUrl!);
    },
    enabled: !!apyEndpoint || !!lcdUrl,
    staleTime: 5 * 60 * 1000,
  });

  return {
    apy: data ?? null,
    isLoading,
  };
};

export { useStakingApy };
