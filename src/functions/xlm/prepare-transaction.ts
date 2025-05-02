import {
    Contract,
    rpc,
    TransactionBuilder,
    Networks,
    nativeToScVal,
    Address,
    BASE_FEE,
    xdr,
} from '@stellar/stellar-sdk'

const provider = new rpc.Server('https://soroban-testnet.stellar.org', { allowHttp: true });
const contractId = 'CA3NNOJXSRN7RMD67XDOCQAW3P6FATY53Z3VDLEUPXBILQSJBIJEYEAR';

// xdr.ScVal.scvVec([
//     nativeToScVal(BigInt(0), { type: 'i128' })
// ]), 


export async function prepareTx(publicKey: string, funcName: string, values: any) {


    const account = await provider.getAccount(publicKey);
    const contract = new Contract(contractId);

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

    // const decoded = xdr.TransactionResult.fromXDR("AAAAAABA89H////9AAAAAA==", 'base64');
    // console.log(decoded.result().switch().name);

    return ({ xdr: tx.toXDR() });

}


export async function initializeContract(publicKey: string) {
    const init = await prepareTx(publicKey, 'initialize', []);
    console.log(init.xdr)
    return init.xdr;
}


export async function prepCreateInvoice(publicKey: string, invoiceId: string, amount: number, dueDate: number) {

    const data = [stringToSymbol(invoiceId), numberToi128(amount), numberTou64(dueDate), accountToScVal(publicKey), stringToSymbol(invoiceId)]
    return await prepareTx(publicKey, 'create_invoice', data)
}

// TODO prepPayInvoice

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
