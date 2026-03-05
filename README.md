<p align="center">
  <img src="public/logo.png" alt="Orbis logo" width="300" style="margin-bottom: -40px" />
</p>

<h1 align="center">Orbis</h1>

<p align="center">
  Multi-chain crypto neobank
</p>

## Overview

Orbis는 여러 블록체인 네트워크의 스테이킹 보상을 한 곳에서 관리할 수 있는 크립토 네오뱅크입니다. 현재 XPLA 메인넷을 지원하며, 체인 어댑터 아키텍처를 통해 새로운 체인을 쉽게 추가할 수 있도록 설계되었습니다.

## Features

- **Portfolio** — 전체 스테이킹 자산, 보상, 잔액을 한눈에 확인. 체인별 자산 분포 차트 제공.
- **Staking** — 밸리데이터 목록 조회, 위임(delegate), 위임 해제(undelegate), 재위임(redelegate) 지원.
- **Rewards** — 보상 수확(harvest), 복리 재위임(restake), 거래소 전송과 재위임 분할(split rewards) 지원.
- **History** — 스테이킹 관련 트랜잭션 내역 조회.
- **Multi-chain** — 체인 선택기를 통해 네트워크를 전환하며, `StakingAdapter` 인터페이스로 체인별 구현을 추상화.
- **Multi-wallet** — Keplr, Leap, Cosmostation 등 Cosmos 지갑과 EVM 지갑(RainbowKit) 연결 지원.

## Tech Stack

| Category        | Technologies                                    |
| --------------- | ----------------------------------------------- |
| Framework       | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling         | Tailwind CSS v4, shadcn/ui, Lucide Icons        |
| Data Fetching   | TanStack Query v5                               |
| State           | Zustand                                         |
| Wallet (Cosmos) | cosmos-kit (Keplr, Leap, Cosmostation)          |
| Wallet (EVM)    | RainbowKit, wagmi v2, viem                      |
| Signing         | @cosmjs/stargate 0.36                           |
| Chain Client    | @xpla/xpla.js (LCD)                             |
| Charts          | Recharts 2                                      |
| Validation      | Zod                                             |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

| Variable                               | Description                    |
| -------------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID |

### Development

```bash
pnpm dev
```

http://localhost:3000 에서 앱이 실행됩니다.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (dashboard)/
│   │   ├── portfolio/          # Portfolio overview
│   │   ├── stake/[chainId]/    # Staking management
│   │   └── history/            # Transaction history
│   └── providers.tsx           # Query, Theme, Wallet providers
│
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── common/                 # ChainSelector, TokenAmount, TxStatusToast
│   ├── layout/                 # Sidebar, Header, WalletButton
│   ├── portfolio/              # PortfolioSummaryCards, StakingChart, DelegationList
│   ├── staking/                # ValidatorTable, StakeDialog, HarvestDialog, ...
│   └── history/                # HistoryView
│
├── hooks/                      # Data fetching & wallet hooks
│   ├── useStaking.ts           # Validators, delegations, rewards, unbonding
│   ├── useStakingActions.ts    # TX signing & broadcasting
│   ├── useChain.ts             # Chain config + adapter
│   └── useUnifiedWallet.ts     # Cosmos/EVM wallet abstraction
│
├── lib/
│   ├── chains/
│   │   ├── adapter.ts          # StakingAdapter type (chain-agnostic interface)
│   │   ├── registry.ts         # Chain registry (XPLA mainnet/testnet)
│   │   └── xpla/               # XPLA adapter implementation
│   ├── wallet/                 # Wallet provider configurations
│   └── utils/                  # Formatting utilities
│
└── stores/                     # Zustand stores (chain, exchange)
```

## Architecture

### Chain Abstraction

`StakingAdapter` 타입이 체인별 구현을 추상화합니다. 새 체인을 추가하려면 해당 체인의 어댑터를 구현하고 `CHAIN_REGISTRY`에 등록하면 됩니다.

```
StakingAdapter
├── getValidators()
├── getDelegations()
├── getRewards()
├── getUnbonding()
├── getBalance()
├── getTransactionHistory()
├── buildDelegateMsg()
├── buildUndelegateMsg()
├── buildRedelegateMsg()
├── buildWithdrawRewardsMsg()
├── buildSendMsg()
├── buildCompoundMsg()
└── buildSplitRewardsMsg()
```

### Supported Chains

| Chain | Network | Chain ID         |
| ----- | ------- | ---------------- |
| XPLA  | Mainnet | `dimension_37-1` |
| Sei   | Mainnet | `pacific-1`      |

## License

Private
