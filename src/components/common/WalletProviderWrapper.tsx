'use client';

import { ReactNode } from 'react';
import { WalletProvider, NetworkInfo } from '@xpla/wallet-provider';

// XPLA mainnet network configuration
const MAINNET: NetworkInfo = {
  name: 'mainnet',
  chainID: 'dimension_37-1',
  lcd: 'https://dimension-lcd.xpla.dev',
  ecd: 'https://dimension-evm-rpc.xpla.dev',
  walletconnectID: 0,
};

type WalletProviderWrapperProps = {
  children: ReactNode;
};

const WalletProviderWrapper = ({ children }: WalletProviderWrapperProps) => {
  return (
    <WalletProvider
      defaultNetwork={MAINNET}
      walletConnectChainIds={{
        0: MAINNET,
      }}
    >
      {children}
    </WalletProvider>
  );
};

export { WalletProviderWrapper };
