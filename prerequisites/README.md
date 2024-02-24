# Getting started
Install dependencies
```
yarn
```
# Required Files
```
dev-wallet.json
wba-wallet.json
```

## How to generate dev-wallet.json
```
# genereate dev-wallet.json file
yarn keygen
```
## How to generate wba-wallet.json
Rename env file
```
mv .env.sample .env
```
Inside your env, enter your secret key
```env
WBA_SECRET_KEY=<solana secret key as base58 (from phantom)>
```
Run wba keygen script
```
# generate wba-wallet-json.file from saved wallet secret key in .env
yarn wba-keygen
```

You are now ready to run scripts

# Running Scripts
```
# request test SOL from devnet
yarn airdrop

# transfer all remaining SOL balance from one address to another
yarn transfer

# execute WBA program to enroll and complete pre-req
yarn enroll
```

# Enrollment Transaction
[Click here to view transaction in solana explorer devnet](https://explorer.solana.com/tx/5xRGZUBRjqVVu3UrCCVPM2jA6PR8d2j8UDQ6sGGzV1kTsBQQm3D28ngs5372j1ZtoQDT2rppfUDKYJQyrduB1f5j?cluster=devnet)
