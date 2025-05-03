import * as StellarSdk from "@stellar/stellar-sdk";
import { config } from "@/constants";
// Set up the testnet server
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

// Replace these with your testnet account's secret key and the destination address
const SOURCE_SECRET_KEY = config.STELLAR_SENDER_SECRET_KEY; // Secret key of the sender
const DESTINATION_ADDRESS = config.PAYBEAM_CONTRACT; // Your PayBeam wallet address

// Load the source account
const sourceKeypair = StellarSdk.Keypair.fromSecret(SOURCE_SECRET_KEY!);
const sourcePublicKey = sourceKeypair.publicKey();

export async function testPayment (memo:string)  {
    try {
        // Load the source account to get the current sequence number
        const sourceAccount = await server.loadAccount(sourcePublicKey);

        // Build the transaction
        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(
                StellarSdk.Operation.payment({
                    destination: DESTINATION_ADDRESS!,
                    asset: StellarSdk.Asset.native(),
                    amount: "100", // Amount of XLM to send
                }),
            )
            .addMemo(StellarSdk.Memo.text(memo)) // Add a memo
            .setTimeout(30) // Wait 30 seconds before timing out
            .build();

        // Sign the transaction
        transaction.sign(sourceKeypair);

        // Submit the transaction to the network
        const result = await server.submitTransaction(transaction);
        console.log("🚀 Transaction submitted successfully:", result);
    } catch (error) {
        console.error("❌ Error submitting transaction:", error);
    }
};