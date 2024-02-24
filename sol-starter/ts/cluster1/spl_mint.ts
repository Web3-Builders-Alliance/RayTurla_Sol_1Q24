import { Keypair, PublicKey, Connection, Commitment, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { ACCOUNTS, CONFIG } from "../config";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));

//Create a Solana devnet connection
const connection = new Connection(clusterApiUrl(CONFIG.CLUSTER), CONFIG.COMMITMENT);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey(ACCOUNTS.MINT);

(async () => {
    try {
        // Create an ATA
        const decimals = 10 ** 6;
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, 1 * decimals);
        console.log(`Mint Success! Check your mint TX here ${CONFIG.EXPLORER_BASE_URL.SOLANA_EXPLORER}/${mintTx}?cluster=${CONFIG.CLUSTER}`);
        // TX HASH: 2cXaaDWorvUTAPD9mQMMfu3VEDVsshgDmqbvPF1zeb3nqAFxENK5V9ApcUUotmuPNzTFTvuhWsCuewbeYM6RhWep
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
