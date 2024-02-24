import { Keypair, Connection, Commitment, clusterApiUrl } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import { ACCOUNTS, CONFIG } from "../config";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));

//Create a Solana devnet connection
const connection = new Connection(clusterApiUrl(CONFIG.CLUSTER), CONFIG.COMMITMENT);

(async () => {
    try {
        // Start here
        const decimals = 6;
        const mint = await createMint(connection, keypair, keypair.publicKey, null, decimals);
        console.log(`Mint account created! Your ${mint}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
