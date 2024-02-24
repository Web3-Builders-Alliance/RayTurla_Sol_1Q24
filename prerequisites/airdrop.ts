import { LAMPORTS_PER_SOL, Keypair, Connection, clusterApiUrl} from "@solana/web3.js";
import wallet from './dev-wallet.json'

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

(async () => {
  try {
    const txHash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`)
  } catch (e: any) {
    console.log(`Error on Airdrop request: ${e}`);
  }
})();