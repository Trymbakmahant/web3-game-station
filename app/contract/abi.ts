export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "score",
        type: "uint256",
      },
    ],
    name: "GameDataSaved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sessionStart",
        type: "uint256",
      },
    ],
    name: "GameSessionCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_orgAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_sessionStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sessionEnd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalReward",
        type: "uint256",
      },
    ],
    name: "createGameSession",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameData",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "score",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameSessions",
    outputs: [
      {
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sessionStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sessionEnd",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalReward",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getGameData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "score",
            type: "uint256",
          },
        ],
        internalType: "struct GameSessionTracker.GameData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
    ],
    name: "getGameSession",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "sessionStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sessionEnd",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalReward",
            type: "uint256",
          },
        ],
        internalType: "struct GameSessionTracker.GameSession",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_score",
        type: "uint256",
      },
    ],
    name: "saveGameData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
