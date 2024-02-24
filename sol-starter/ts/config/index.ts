import { Cluster, Commitment } from "@solana/web3.js"
import { devWallet, wbaWallet } from "../wallet"

export const ACCOUNTS = {
  MINT: "2geFSKLqkCyZTPJNP9MVvad2FyeRxuzchafo7Rzp4mLA",
  WBA_TOKEN_ACCOUNT: "Ej9pYtjnUEsZsk8a4t7Vnm7NykghXrif6Ho1Gtg2HWSV",
  DEV_TOKEN_ACCOUNT: "2geFSKLqkCyZTPJNP9MVvad2FyeRxuzchafo7Rzp4mLA",
  TOKEN_METADATA_PROG_ID: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
  WALLET: {
    WBA: wbaWallet,
    DEV: devWallet
  }
}

export const CONFIG = {
  CLUSTER: "devnet" as Cluster,
  COMMITMENT: "confirmed" as Commitment,
  EXPLORER_BASE_URL: {
    SOLANA_EXPLORER: "https://explorer.solana.com/tx",
    SOLSCAN: "https://solscan.io/tx"
  }
}