// SEI EVM precompile contract addresses and ABIs

// Precompile contract addresses
const SEI_STAKING_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000001005";
const SEI_DISTRIBUTION_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000001007";

// Staking precompile ABI for delegate, undelegate, redelegate
const SEI_STAKING_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "delegate",
    inputs: [
      { name: "validatorAddress", type: "string" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "undelegate",
    inputs: [
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
      { name: "srcValidator", type: "string" },
      { name: "dstValidator", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

// Distribution precompile ABI for withdrawDelegationRewards, withdrawMultipleDelegationRewards
const SEI_DISTRIBUTION_PRECOMPILE_ABI = [
  {
    type: "function",
    name: "withdrawDelegationRewards",
    inputs: [
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
  {
    type: "function",
    name: "withdrawMultipleDelegationRewards",
    inputs: [
      { name: "validatorAddresses", type: "string[]" },
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
  SEI_STAKING_PRECOMPILE_ADDRESS,
  SEI_DISTRIBUTION_PRECOMPILE_ADDRESS,
  SEI_STAKING_PRECOMPILE_ABI,
  SEI_DISTRIBUTION_PRECOMPILE_ABI,
};
