'use client';

import { useMemo } from 'react';
import { useChainStore } from '@/stores/chainStore';
import { CHAIN_REGISTRY } from '@/lib/chains/registry';
import { createXplaAdapter } from '@/lib/chains/xpla/adapter';
import { createXplaClient } from '@/lib/chains/xpla/client';
import { createSeiAdapter } from '@/lib/chains/sei/adapter';
import { createCosmosLcdClient } from '@/lib/chains/sei/client';
import { useWalletInfo } from './useWalletInfo';
import type { StakingAdapter } from '@/lib/chains/adapter';
import type { ChainConfig } from '@/lib/chains/types';

const useChain = (): { config: ChainConfig; adapter: StakingAdapter; evmAddress: string | null } => {
  const selectedChainSlug = useChainStore((state) => state.selectedChainSlug);
  const { walletAddress, evmAddress } = useWalletInfo();

  const config = CHAIN_REGISTRY[selectedChainSlug];

  if (!config) {
    throw new Error(`Chain config not found for slug: ${selectedChainSlug}`);
  }

  // Registry id is already the actual chain ID (e.g. dimension_37-1)
  const adapter = useMemo(() => {
    if (config.slug === 'xpla') {
      const client = createXplaClient(config.lcd, config.id);
      return createXplaAdapter(config, client, walletAddress ?? '');
    }

    if (config.slug === 'sei') {
      const client = createCosmosLcdClient(config.lcd);
      return createSeiAdapter(config, client, walletAddress ?? '');
    }

    throw new Error(`Unsupported chain: ${config.slug}`);
  }, [config, walletAddress]);

  return { config, adapter, evmAddress };
};

export { useChain };
