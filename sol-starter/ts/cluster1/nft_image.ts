import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"
import { bundlrUploader, createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import { ACCOUNTS, CONFIG } from "../config"
import { clusterApiUrl } from "@solana/web3.js"

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");
const bundlr = createBundlrUploader(umi);
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(ACCOUNTS.WALLET.WBA));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        // const imageFile = await readFile();
        //2. Convert image to generic file.
        //3. Upload image

        let file = await readFile("images/rug1.png");
        const image = createGenericFile(file, "Generug", {
            contentType: "image/png",
        });
        const [uri] = await bundlr.upload([image]);
        console.log("Your image URI: ", uri);

        //uri:  https://arweave.net/vDirjuLDdfnkEAC9qXb3CLfJLBW_dlkxvgXFcc0hs5w
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
