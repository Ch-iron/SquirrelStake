// XPLA ethermint precompile contract addresses and ABIs

// Precompile contract addresses
const STAKING_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000800";
const DISTRIBUTION_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000801";

// Staking precompile ABI for delegate, undelegate, redelegate
const STAKING_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "delegate",
    inputs: [
      { name: "delegatorAddress", type: "address" },
      { name: "validatorAddress", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "undelegate",
    inputs: [
      { name: "delegatorAddress", type: "address" },
      { name: "validatorAddress", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redelegate",
    inputs: [
      { name: "delegatorAddress", type: "address" },
      { name: "srcValidatorAddress", type: "string" },
      { name: "dstValidatorAddress", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

// Distribution precompile ABI for claimRewards, withdrawDelegatorRewards
const DISTRIBUTION_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "claimRewards",
    inputs: [
      { name: "delegatorAddress", type: "address" },
      { name: "maxRetrieve", type: "uint32" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawDelegatorRewards",
    inputs: [
      { name: "delegatorAddress", type: "address" },
      { name: "validatorAddress", type: "string" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "denom", type: "string" },
          { name: "amount", type: "uint256" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;

export {
  STAKING_PRECOMPILE_ADDRESS,
  DISTRIBUTION_PRECOMPILE_ADDRESS,
  STAKING_PRECOMPILE_ABI,
  DISTRIBUTION_PRECOMPILE_ABI,
};
