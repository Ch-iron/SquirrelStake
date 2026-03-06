// Chain registry with supported chain configurations

import type { ChainConfig } from './types';
import { XPLA_CONFIG } from './xpla';
import { SEI_CONFIG } from './sei';

const CHAIN_REGISTRY: Record<string, ChainConfig> = {
  xpla: XPLA_CONFIG,
  sei: SEI_CONFIG,
};

const SORTED_CHAIN_CONFIGS = Object.values(CHAIN_REGISTRY).sort(
  (chainA, chainB) => chainA.name.localeCompare(chainB.name),
);

const SORTED_CHAIN_SLUGS = SORTED_CHAIN_CONFIGS.map((config) => config.slug);

const DEFAULT_CHAIN_SLUG = 'xpla';

export { CHAIN_REGISTRY, SORTED_CHAIN_CONFIGS, SORTED_CHAIN_SLUGS, DEFAULT_CHAIN_SLUG };
