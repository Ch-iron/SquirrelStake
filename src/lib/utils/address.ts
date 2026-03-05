// 0x (EVM) -> bech32 address conversion utility
// Cosmos chains with ethsecp256k1 use the same 20-byte pubkey hash, different encoding

import { bech32 } from 'bech32';

const evmToBech32 = (evmAddress: string, prefix: string): string => {
  const hexBytes = evmAddress.slice(2);
  const bytes = Uint8Array.from(
    hexBytes.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [],
  );
  const words = bech32.toWords(bytes);
  return bech32.encode(prefix, words);
};

// Backward-compatible wrapper for XPLA
const evmToXpla = (evmAddress: string): string => {
  return evmToBech32(evmAddress, 'xpla');
};

export { evmToBech32, evmToXpla };
