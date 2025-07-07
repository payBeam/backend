import { Invoice, Merchant } from '@prisma/client';
import abi from "./abi.json"
import { ethers } from 'ethers';
import { EvmRelayer, getTokenAddress } from '../config';
import { config } from "@/constants";



// TODO - payout tokken should be the token addresses, finda way to ink that in the database
const relayer = new EvmRelayer("ZETA_TESTNET");
export async function createZetaInvoice(invoice: Invoice, merchant: Merchant) {
    try {
        // *-------------
        // * PREPARE TRANSACTION
        // *-------------
        // uses paybeam wallet address if the merchant hasn't set a wallet address yet
        // TODO: make surre you can only withdraw if the wallet address isn't for paybeam and
        // TODO: make sure we valiadte th wallat address and chain well before withdraw;ing it for them
        // ! zeta equivalent of amount is what should be ent to the smart contract not raw amount
        const prepTx = await relayer.prepareTransaction(config.ZETA_CONTRACT, abi, "createInvoice", [ethers.id(invoice.id), getTokenAddress(/* merchant.payoutToken */ "ZETA", true), ethers.parseUnits(invoice.amount.toString(), 18), invoice.description, config.ZERO_ADDRESS, config.ZERO_ADDRESS]);

        // *-------------
        // * SIGN TRANSACTION
        // *-------------

        await relayer.signTransaction(prepTx);

        // *-------------
        // * SIGN TRANSACTION
        // *-------------

        return await relayer.sendTransaction(prepTx);

    }

    catch (error) {
        console.error("Error creating Zeta invoice:", error);
    }
}

