import {
    Contract,
    rpc,
    TransactionBuilder,
    Networks,
    nativeToScVal,
    Address,
    Asset,
    Operation,
    BASE_FEE,
    Horizon,
    xdr,
} from '@stellar/stellar-sdk'
import { config } from "@/constants/index";
import { AppError } from '@/utils/AppError';


const provider = new rpc.Server('https://soroban-testnet.stellar.org', { allowHttp: true });
const PAYBEAM_CONTRACT = config.PAYBEAM_CONTRACT;
// xdr.ScVal.scvVec([
//     nativeToScVal(BigInt(0), { type: 'i128' })
// ]),


// TODO proper error handling
export async function prepareTx(publicKey: string, funcName: string, values: any) {


    const account = await provider.getAccount(publicKey);
    const contract = new Contract(PAYBEAM_CONTRACT!);

    let tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            contract.call(funcName, ...values)
        )
        .setTimeout(300)
        .build();

    tx = await provider.prepareTransaction(tx);
    console.log("tx", tx.toXDR())

    const decoded = xdr.TransactionResult.fromXDR("AAAAAAAChnL////7AAAAAA==", 'base64');
    console.log(decoded.result().switch().name);

    return ({ xdr: tx.toXDR() });

}

export async function approveContract(publicKey: string, amount: number) {
    const account = await provider.getAccount(publicKey);
    const usdcTokenContract = new Contract("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA");
    const appContract = new Contract(PAYBEAM_CONTRACT!);

    // Convert amount to stroops (1 USDC = 10,000,000 stroops)
    const amountStroops = BigInt(Math.floor(amount * 10_000_000));
    // Get current ledger sequence
    const latestLedger = await provider.getLatestLedger();

    // Set expiration to 100,000 ledgers from now (~30 days)
    const expirationLedger = latestLedger.sequence + 100000;

    // 2. Build transaction
    const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    }).addOperation(
        usdcTokenContract.call(
            "approve",
            ...[
                // from: Address (payer)
                new Address(publicKey).toScVal(),
                // spender: Address (your contract)
                new Address(PAYBEAM_CONTRACT!).toScVal(),
                // amount: i128
                nativeToScVal(amountStroops.toString(), { type: 'i128' }),
                // expiration_ledger: u32 (optional, can be 0 for no expiration)
                nativeToScVal(expirationLedger, { type: 'u32' })
            ]
        )
    )
        .setTimeout(300)
        .build();

    const preparedTx = await provider.prepareTransaction(tx);
    return { xdr: preparedTx.toXDR() };
}


export async function initializeContract(publicKey: string) {
    const init = await prepareTx(publicKey, 'initialize', []);
    console.log(init.xdr)
    return init.xdr;
}

// TODO proper error handling
export async function prepCreateInvoice(publicKey: string, invoiceId: string, amount: number, dueDate: number) {

    const data = [stringToSymbol(invoiceId), numberToi128(amount), numberTou64(dueDate), accountToScVal(publicKey), stringToSymbol(invoiceId)]
    return await prepareTx(publicKey, 'create_invoice', data)
}

// TODO proper error handling
export async function prepPayInvoice(publicKey: string, invoiceId: string, amount: number) {
    const account = await provider.getAccount(publicKey);
    const usdcTokenContract = new Contract("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA");
    const appContract = new Contract(PAYBEAM_CONTRACT!);

    // Convert amount to stroops (1 USDC = 10,000,000 stroops)
    const amountStroops = BigInt(Math.floor(amount * 10_000_000));
    // Get current ledger sequence
    const latestLedger = await provider.getLatestLedger();

    // Set expiration to 100,000 ledgers from now (~30 days)
    const expirationLedger = latestLedger.sequence + 100000;

    // 2. Build transaction
    const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            appContract.call(
                "pay_invoice",
                ...[
                    // 1. invoice_id: Symbol (ensure this matches contract expectations)
                    xdr.ScVal.scvSymbol(invoiceId),
                    // 2. payer: Address
                    new Address(publicKey).toScVal(),
                    // 3. token: Address (USDC contract)
                    new Address("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA").toScVal(),
                    // 4. amount: i128
                    nativeToScVal(amountStroops.toString(), { type: 'i128' })

                    // stringToSymbol(invoiceId),
                    // accountToScVal(publicKey),
                    // accountToScVal("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA"),
                    // numberToi128(amount)
                    // nativeToScVal(amountStroops.toString(), { type: 'i128' })
                ]
            )
        )
        .setTimeout(300)
        .build();

    const preparedTx = await provider.prepareTransaction(tx);
    return { xdr: preparedTx.toXDR() };
}

export async function prepPayInvoice_(publicKey: string, invoiceId: string, amount: number) {
    const account = await provider.getAccount(publicKey);
    const usdcTokenContract = new Contract("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA");
    const appContract = new Contract(PAYBEAM_CONTRACT!);

    // Convert amount to stroops (1 USDC = 10,000,000 stroops)
    const amountStroops = BigInt(Math.floor(9 * 10_000_000));
    // Get current ledger sequence
    const latestLedger = await provider.getLatestLedger();

    // Set expiration to 100,000 ledgers from now (~30 days)
    const expirationLedger = latestLedger.sequence + 100000;

    // 2. Build transaction
    const tx = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            appContract.call(
                "transfer_funds",
                ...[
                    // 1. invoice_id: Symbol (ensure this matches contract expectations)
                    // xdr.ScVal.scvSymbol(invoiceId),
                    // 2. payer: Address
                    // new Address(publicKey).toScVal(),
                    // 3. token: Address (USDC contract)
                    new Address("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA").toScVal(),
                    new Address("GCCGVBUG33D6P5MF2NJIVOH4G35R52UKMQUJZLGFOBEVYAFUWUUPVQJF").toScVal(),
                    // 4. amount: i128
                    nativeToScVal(amountStroops.toString(), { type: 'i128' })

                    // stringToSymbol(invoiceId),
                    // accountToScVal(publicKey),
                    // accountToScVal("CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA"),
                    // numberToi128(amount)
                    // nativeToScVal(amountStroops.toString(), { type: 'i128' })
                ]
            )
        )
        .setTimeout(300)
        .build();

    const preparedTx = await provider.prepareTransaction(tx);
    return { xdr: preparedTx.toXDR() };
}

const checkTrustline = async (publicKey: string) => {
    const server = new Horizon.Server("https://horizon-testnet.stellar.org")

    const account = await server.loadAccount(publicKey);

    const usdcTrustline = account.balances.find(
        (bal) => bal.asset_type === "credit_alphanum12" && bal.asset_issuer === config.USDC_ISSUER
    );

    return usdcTrustline;

}
// helper funcs
const numberToi128 = (num: number) => {
    return nativeToScVal(num, { type: 'i128' });
}

const stringToSymbol = (str: string) => {
    return nativeToScVal(str, { type: 'symbol' });
}

const accountToScVal = (account: string) => {
    return new Address(account).toScVal();
}

const numberTou64 = (num: number) => {
    return nativeToScVal(num, { type: 'u64' });
}


const stringToBool = (str: string) => {
    return nativeToScVal(str, { type: 'bool' });
}
