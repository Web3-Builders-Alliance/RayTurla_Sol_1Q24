import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { ACCOUNTS, CONFIG } from "../config";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey(ACCOUNTS.MINT);

// Recepient Cadet address
const to = new PublicKey("41ywsxNiW27shHcaHJ5fLc2KbMaoqMoSWkDNnzS9Fgzm");

(async () => {
    try {
        const decimals = 10 ** 6;
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        )

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(
            connection,
            keypair,
            fromTokenAccount.address,
            toTokenAccount.address,
            keypair,
            1 * decimals
        )

        console.log(`Transfer Token Success! Check TX here ${CONFIG.EXPLORER_BASE_URL.SOLANA_EXPLORER}/${tx}/?cluster=${CONFIG.CLUSTER}`);

        // TX: vtwDih1fHmuxGZpoUvvy7RGkPYXAVk7jPPz4weg64HbVuy4MDzGEUS8TWgSGiVQoEFDVoHbKvkK7Rk49ASoDPQZ
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();