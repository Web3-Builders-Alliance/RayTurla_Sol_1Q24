import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import base58 from "bs58";
import { ACCOUNTS, CONFIG } from "../config";
import { clusterApiUrl } from "@solana/web3.js";

const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi, {
        mint,
        name: "Red Rug",
        symbol: "RDRG",
        uri: "https://arweave.net/ULGcAhyUHHKY0bB8WFH92h4-AP8lsEBsZbYC0n7trTc",
        sellerFeeBasisPoints: percentAmount(5.5, 2)
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    // TX: 2nJbqLacFH372C7HgF7d4e6uoCrGkAfyGRk9fLRxfcNJFrAfrsoiMPjZp9SakVz4T9eAZw6FjuhCbQN3rQezT2JG

    console.log("Mint Address: ", mint.publicKey);
})();