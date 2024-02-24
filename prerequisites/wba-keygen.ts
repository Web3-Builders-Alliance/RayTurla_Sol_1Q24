import {config} from 'dotenv';
import base58 from 'bs58';
import fs, { existsSync } from 'fs';
import { saveWalletToFile } from './utils';
import { Keypair } from '@solana/web3.js';
config();

try {
  // Decode a base 58 secret key value to Uint8Array array
  const decoded = base58.decode(process.env.WBA_SECRET_KEY ?? "");

  // Generate wallet from decoded base58 secret key.
  const kp = Keypair.fromSecretKey(new Uint8Array(decoded))

  // Save generated secret key to file.
  saveWalletToFile("wba-wallet.json", `[${kp.secretKey}]`);
} catch(e: any) {
  console.log(`Error on generating wba wallet: ${e.message}. Check WBA_SECRET_KEY in your .env`);
}