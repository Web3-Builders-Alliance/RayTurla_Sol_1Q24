import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import { ACCOUNTS, CONFIG } from "../config";
import { clusterApiUrl } from "@solana/web3.js";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const metadata = {
            name: "Red Rug",
            symbol: "RDRG",
            description: "A Red Rug",
            image: "https://arweave.net/vDirjuLDdfnkEAC9qXb3CLfJLBW_dlkxvgXFcc0hs5w",
            attributes: [
                {trait_type: 'background', value: '#FAE7ED'},
                {trait_type: 'color', value: '#C80D46'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/vDirjuLDdfnkEAC9qXb3CLfJLBW_dlkxvgXFcc0hs5w"
                    },
                ]
            },
            creators: [keypair.publicKey]
        };
        const uri = await bundlrUploader.uploadJson(metadata)
        console.log("Your image URI: ", uri);

        // uri: https://arweave.net/ULGcAhyUHHKY0bB8WFH92h4-AP8lsEBsZbYC0n7trTc
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();