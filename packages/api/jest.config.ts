import type { Config } from "jest";

const config: Config = {
  displayName: "api",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@nuquiz/shared$": "<rootDir>/../shared/src/index.ts",
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
};

export default config;
