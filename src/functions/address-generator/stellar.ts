import * as StellarSdk from '@stellar/stellar-sdk';
import {  TransactionBuilder, Networks, Keypair, Operation, Asset } from "@stellar/stellar-sdk";

// Generate a new keypair (only run once)
// const keypair = StellarSdk.Keypair.random();
// console.log("Public Key:", keypair.publicKey());  // Use this for receiving payments
// console.log("Secret Key:", keypair.secret()); 


const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org")
const receivingSecret = process.env.STELLAR_SECRET_KEY;
const receivingKeypair = Keypair.fromSecret(receivingSecret as string);

// ! MAINNET
// const USDC_ISSUER = "GA5ZSEVDOTGNFVU3GJUP4NXZG36UAKMWP3QNAV5X3X4M6LBPLN5ALXJU"; // Circle's USDC issuer

// ! TESTNET
const USDC_ISSUER = "GATALTGTWIOT6BUDBCZM3Q4OQ4BO2COLOAZ7IYSKPLC2PMSOPPGF5V56"

async function setTrustlines() {
    const account = await server.loadAccount(receivingKeypair.publicKey());

    const transaction = new TransactionBuilder(account, {
        fee: "100",
        networkPassphrase: Networks.TESTNET, // Change to Networks.TESTNET for testnet
    })
        .addOperation(
            Operation.changeTrust({
                asset: new Asset( "USDC",USDC_ISSUER ),
            })
        )
        .setTimeout(30)
        .build();

    transaction.sign(receivingKeypair);
    const response = await server.submitTransaction(transaction);
    console.log("Trustlines set:", response);
}


setTrustlines().catch(console.error);