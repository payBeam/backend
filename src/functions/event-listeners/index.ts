import * as StellarSdk from "@stellar/stellar-sdk";
import { config } from "@/constants/index";

const testServer = "https://soroban-testnet.stellar.org";
const liveServer = "https://horizon.stellar.org";
const server = new StellarSdk.Horizon.Server(testServer); // Use testnet for testing

// PayBeam’s shared deposit address
const PAYBEAM_WALLET_ADDRESS = config.PAYBEAM_CONTRACT;

// Function to listen for payments
export async function listenForPayments() {
    try {
        console.log("🚀 Starting Stellar payment listener...");

        server.payments()
            .forAccount(PAYBEAM_WALLET_ADDRESS!)
            .cursor("now") // Start from the latest transactions
            .stream({
                onmessage: async (payment) => {
                    if (payment.type === "payment" && payment.to === PAYBEAM_WALLET_ADDRESS) {
                        console.log("🔔 Incoming payment detected:", payment);

                        // Fetch the transaction details to access the memo
                        const transaction = await server.transactions().transaction(payment.transaction_hash).call();

                        const invoiceMemo = transaction.memo;
                        
                        if (invoiceMemo) {
                            console.log(`✅ Payment received for Invoice: ${invoiceMemo}`);
                            // Update invoice status in the database (mark as paid)
                        }
                    }
                },
                onerror: (err) => {
                    console.error("❌ Stellar payment listener error:", err);
                    // Restart the listener on error
                    setTimeout(listenForPayments, 5000); // Retry after 5 seconds
                },
            });
    } catch (error) {
        console.error("❌ Unexpected error in listenForPayments:", error);
        setTimeout(listenForPayments, 5000); // Retry after 5 seconds
    }
}

