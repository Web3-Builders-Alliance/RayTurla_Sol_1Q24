import { Keypair } from "@solana/web3.js";
import { saveWalletToFile } from "./utils";

// Generate keypair
let kp = Keypair.generate();
console.log(`You've generated a new wallet: ${kp.publicKey.toBase58()} [${kp.secretKey}]`);

// Save generated wallet secret key to file
saveWalletToFile("dev-wallet.json", `[${kp.secretKey}]`);