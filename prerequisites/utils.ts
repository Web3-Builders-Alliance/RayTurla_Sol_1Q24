import fs from 'fs';

export function saveWalletToFile(file: string, content: string) {
  try {
    console.log("Saving generated wallet to file...")
    const fileExists = fs.existsSync(file)
    if (fileExists) {
      throw Error(`${file} already exists. If planning to save a new wallet, consider deleting the file first.`);
    }
    fs.writeFileSync(file, content);
    console.log(`${file} saved!`);
  } catch(e: any) {
    console.error(`Error on saving wallet: ${e.message}`);
  }
}