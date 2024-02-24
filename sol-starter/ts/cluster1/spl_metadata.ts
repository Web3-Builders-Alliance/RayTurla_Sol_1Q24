import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { ACCOUNTS, CONFIG } from "../config";

// Solana web3 js addresses
// Define our Mint address
const mint = new PublicKey(ACCOUNTS.MINT)

// Create a UMI connection
const umi = createUmi(clusterApiUrl(CONFIG.CLUSTER));
const umiKeypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));
const signer = createSignerFromKeypair(umi, umiKeypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, umiKeypair)));

(async () => {
    try {
        
        const tokenMetadataProgramId = new PublicKey(ACCOUNTS.TOKEN_METADATA_PROG_ID)
        const seed = [
            Buffer.from("metadata"), // metadata string as buffer
            tokenMetadataProgramId.toBuffer(), // metadata program id
            mint.toBuffer(), // mint web3js.address as buffer
        ];

        const [pda, bump]  = umi.eddsa.findPda(publicKey(tokenMetadataProgramId.toString()), seed);
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            metadata: publicKey(pda), // umi address
            mint: publicKey(mint.toString()),
            mintAuthority: signer, // umi signer
            payer: signer, // umi signer
            updateAuthority: signer, // umi signer
        }

        let data: DataV2Args = {
            name: "WBA Cohort Collection",
            symbol: "WCC",
            uri: "ipfs://bafkreidyp7c76np4yclr7fbef4ypadjvuibgsdj75r63ljoayffja6qwha",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        /*  result logs
            236,150,100,173,111,254,11,126,138,98,87,57,232,140,34,221,151,186,193,240,178,12,14,59,20,155,195,151,189,156,234,41,191,203,176,204,19,29,186,188,199,16,20,123,180,213,5,7,104,155,185,40,187,57,157,233,2,46,184,134,181,110,202,9 
        */
        let result = await tx.sendAndConfirm(umi).then(r => r.signature.toString());

        // parse result as tx hash
        const resultTx = base58.encode(JSON.parse(`[${result}]`))

        console.log(`Metadata Account Created! Check TX here ${CONFIG.EXPLORER_BASE_URL.SOLSCAN}/${resultTx}?cluster=${CONFIG.CLUSTER}`);

        // TX: 5jMCLzpHPvKT4rrVJ5j3AMMeuf3iDMYzMjxceAy1VbFmudU8BVQNyqhSJ8i8JrWYUzeXycjVsfqmJJcwj98TEV1J
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();