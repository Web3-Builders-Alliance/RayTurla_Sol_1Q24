import { 
  LAMPORTS_PER_SOL, 
  Keypair, 
  Connection, 
  clusterApiUrl,
  Transaction,
  SystemProgram,
  PublicKey,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import wallet from './dev-wallet.json'

// Get connection
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// import keypair from wallet file
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define my WBA publick key
const to = new PublicKey("FAXDZafhXmNBykiqSQtDmT3ZELDiRifzPtq9Yv4zEuvM");

(async () => {
  try {

    // Get balance from dev wallet
    const balance = await connection.getBalance(from.publicKey);

    // Create a test instruction to calculate fees
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance
      })
    );

    transaction.recentBlockhash = ((await connection.getLatestBlockhash('confirmed')).blockhash);
    transaction.feePayer = from.publicKey;

     // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
    const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

    // Remove our transfer instruction to replace it
    transaction.instructions.pop();

    // Now add the instruction back with correct amount of lamports

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee
      })
    );

    // Sign, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e: any) {
    console.log(`Error on Transfer: ${e}`);
  }
})();