'use client';

import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@xpla/wallet-provider';
import { useAccount, useDisconnect as useEvmDisconnect } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { useWalletTypeStore } from '@/stores/walletTypeStore';
import { useChainStore } from '@/stores/chainStore';
import { CHAIN_REGISTRY } from '@/lib/chains/registry';
import { evmToBech32 } from '@/lib/utils/address';
import type { WalletType } from '@/stores/walletTypeStore';

type SeiAssociationResponse = {
  sei_address: string;
  associated: boolean;
};

// Fetch the on-chain associated sei1... address for an EVM address.
// SEI uses different HD paths for Cosmos (m/44'/118') and EVM (m/44'/60'),
// so the native Cosmos address cannot be derived from EVM bytes alone.
const fetchSeiAssociatedAddress = async (
  lcdUrl: string,
  evmAddress: string,
): Promise<string | null> => {
  const response = await fetch(
    `${lcdUrl}/sei-protocol/seichain/evm/sei_address?evm_address=${evmAddress}`,
  ).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  const data: SeiAssociationResponse | null = await response.json().catch(() => null);

  if (!data?.associated || !data.sei_address) {
    return null;
  }

  return data.sei_address;
};

const useWalletInfo = () => {
  const { status, connect, disconnect: cosmosDisconnect, availableConnections, availableInstallations } = useWallet();
  const connectedWallet = useConnectedWallet();

  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { disconnect: wagmiDisconnect } = useEvmDisconnect();

  const walletType = useWalletTypeStore((state) => state.walletType);
  const setWalletType = useWalletTypeStore((state) => state.setWalletType);

  const selectedChainSlug = useChainStore((state) => state.selectedChainSlug);
  const chainConfig = CHAIN_REGISTRY[selectedChainSlug];
  const bech32Prefix = chainConfig?.bech32Prefix ?? 'xpla';

  // SEI on-chain address association query (must be called before any return)
  const isSeiEvm = selectedChainSlug === 'sei' && walletType === 'evm' && isEvmConnected && !!evmAddress;
  const seiLcdUrl = CHAIN_REGISTRY['sei']?.lcd ?? '';

  const { data: seiAssociatedAddress, isLoading: isSeiAddressLoading } = useQuery({
    queryKey: ['seiAddressAssociation', evmAddress],
    queryFn: () => fetchSeiAssociatedAddress(seiLcdUrl, evmAddress!),
    enabled: isSeiEvm,
    staleTime: Infinity,
  });

  if (walletType === 'evm' && isEvmConnected && evmAddress) {
    // For SEI: use on-chain associated address, fallback to bech32(evm_bytes) for unassociated accounts
    // While the association query is loading, return null to prevent querying with wrong address
    const bech32Address = (() => {
      if (selectedChainSlug === 'sei') {
        if (isSeiAddressLoading) {
          return null;
        }
        return seiAssociatedAddress ?? evmToBech32(evmAddress, bech32Prefix);
      }
      return evmToBech32(evmAddress, bech32Prefix);
    })();

    return {
      status: WalletStatus.WALLET_CONNECTED,
      isConnected: true,
      walletAddress: bech32Address,
      evmAddress,
      walletType: 'evm' as WalletType,
      connect,
      disconnect: () => {
        wagmiDisconnect();
        setWalletType(null);
      },
      availableConnections,
      availableInstallations,
      connectedWallet: null,
    };
  }

  const isCosmosConnected = status === WalletStatus.WALLET_CONNECTED;
  const walletAddress = connectedWallet?.xplaAddress ?? null;

  return {
    status,
    isConnected: isCosmosConnected,
    walletAddress,
    evmAddress: null as string | null,
    walletType: isCosmosConnected ? ('cosmos' as WalletType) : walletType,
    connect,
    disconnect: () => {
      cosmosDisconnect();
      setWalletType(null);
    },
    availableConnections,
    availableInstallations,
    connectedWallet,
  };
};

export { useWalletInfo };
