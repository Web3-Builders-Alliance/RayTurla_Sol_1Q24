import { Connection, Keypair, SystemProgram, PublicKey, clusterApiUrl } from
"@solana/web3.js"
import { Program, Wallet, AnchorProvider, Address } from
"@project-serum/anchor"
import { WbaPrereq, IDL } from "./programs/wba_prereq";
import wallet from "./wba-wallet.json"

// github account

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const github = Buffer.from("ray-turla", "utf-8");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed"
});
const program = new Program<WbaPrereq>(IDL, "HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1" as Address, provider);

const enrollmentSeeds = [
  Buffer.from("prereq"),
  keypair.publicKey.toBuffer()
];

const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollmentSeeds, program.programId
);

(async () => {
  try {
    const txhash = await program.methods.complete(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key,
        systemProgram: SystemProgram.programId
      })
      .signers([keypair])
      .rpc();
      console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e: any) {
    console.error(`Error on enrollment: ${e}`)
  }
})();