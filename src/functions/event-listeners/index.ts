import * as StellarSdk from "@stellar/stellar-sdk";
import {config} from "@/constants/index"



const testServer = "https://horizon-testnet.stellar.org"
const liveServer = "https://horizon.stellar.org"
const server = new StellarSdk.Horizon.Server(testServer); // Use testnet for testing

// PayBeam’s shared deposit address
const PAYBEAM_WALLET_ADDRESS = config.STELLAR_PUB_KEY; 



async function listenForPayments() {
    server.payments()
        .forAccount(PAYBEAM_WALLET_ADDRESS as string)
        .cursor("now") // Start from the latest transactions
        .stream({
            onmessage: async (payment:any) => {
                if (payment.type === "payment" && payment.to === PAYBEAM_WALLET_ADDRESS) {
                    console.log("🔔 Incoming payment detected:", payment);

                    const invoiceMemo = payment.memo;
                    if (invoiceMemo) {
                        console.log(`✅ Payment received for Invoice: ${invoiceMemo}`);
                        // Update invoice status in the database (mark as paid)
                    }
                }
            },
            onerror: (err) => console.error("Stellar payment listener error:", err),
        });
}

listenForPayments();
