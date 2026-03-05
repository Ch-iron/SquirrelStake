import { create } from 'zustand';

type WalletType = 'cosmos' | 'evm' | null;

type WalletTypeStore = {
  walletType: WalletType;
  setWalletType: (walletType: WalletType) => void;
};

const useWalletTypeStore = create<WalletTypeStore>((set) => ({
  walletType: null,
  setWalletType: (walletType: WalletType) => {
    set({ walletType });
  },
}));

export { useWalletTypeStore };
export type { WalletType };
