import { EvmRelayerConfig } from './types';
import { ethers } from 'ethers';
import { config } from '@/constants';
import { TokenType } from '@prisma/client';



/* 
* EvmRelayer class to interact with EVM-based blockchains
* It provides methods to prepare, sign, and send transactions,
* as well as call contract methods.
* It uses ethers.js for blockchain interactions.
* @class EvmRelayer
* @param {keyof typeof JsonRpcProvider} network - The network to connect to (
* e.g., 'ZETA_TESTNET', 'BASE_TESTNET', 'BASE_MAINNET').
* @param {string} privateKey - The private key of the wallet to use for transactions        
* @example
* const relayer = new EvmRelayer('ZETA_TESTNET', 'your-private
*/

export class EvmRelayer {
    provider: ethers.JsonRpcProvider;
    wallet: ethers.Wallet;
    network: keyof typeof JsonRpcProvider;

    constructor(network: keyof typeof JsonRpcProvider) {
        this.provider = new ethers.JsonRpcProvider(JsonRpcProvider[network]);
        this.wallet = new ethers.Wallet(config.RELAYER_PRIVATE_KEY!, this.provider);
        this.network = network;

    }

    getProvider() {

        return this.provider;
    }

    getWallet() {
        return this.wallet;
    }

    /*
    * Prepares a transaction for a specific contract method.
    * @param {string} contractAddress - The address of the contract.
    * @param {any[]} abi - The ABI of the contract.
    * @param {string} methodName - The name of the method to call.
    * @param {any[]} args - The arguments to pass to the method.
    * @returns {Promise<ethers.TransactionRequest>} - A promise that resolves to the transaction
    */
    async prepareTransaction(
        contractAddress: string,
        abi: any[],
        methodName: string,
        args: any[]
    ): Promise<ethers.TransactionRequest> {
        const iface = new ethers.Interface(abi);
        const data = iface.encodeFunctionData(methodName, args);

        return this.provider.getTransactionCount(this.wallet.address).then(nonce => ({
            to: contractAddress,
            data,
            value: 0,
            nonce,
            gasLimit: 300_000,
            maxFeePerGas: ethers.parseUnits("20", "gwei"),
            maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
            chainId: getChainId(this.network),
        }));
    }

    async signTransaction(txData: ethers.TransactionRequest): Promise<string> {
        try {
            return await this.wallet.signTransaction(txData);
        } catch (error) {
            throw new Error(`Failed to sign transaction: ${error}`);
        }

    }

    async sendTransaction(txData: ethers.TransactionRequest) {
        try {
            const txResponse = await this.wallet.sendTransaction(txData);
            return await txResponse.wait();
        } catch (error) {
            throw new Error(`Failed to send transaction: ${error}`);
        }
    }


    async callContractMethod(
        contractAddress: string,
        abi: any[],
        methodName: string,
        args: any[]
    ) {
        const contract = new ethers.Contract(contractAddress, abi, this.wallet);
        const tx = await contract[methodName](...args);
        return await tx.wait();
    }



}



//! Add more providers as needed
export enum JsonRpcProvider {
    ZETA_TESTNET = 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
    ZETA_MAINNET = 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
    BASE_TESTNET = 'https://sepolia.base.org',
    BASE_MAINNET = 'https://base.llamarpc.com',

}


export enum chainId {
    ZETA_TESTNET = 7001,
    ZETA_MAINNET = 7000,
    BASE_TESTNET = 84532,
    BASE_MAINNET = 8453,
}

// Add more contract addresses as needed
export enum TokenAddress {
    ZETA_TESTNET_ADDRESS = '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf',
    ZETA_MAINNET_ADDRESS = '0x5F0b1a82749cb4E2278EC87F8BF6B618dC71a8bf',
    BASE_TESTNET_ADDRESS = '0xf4e63991E7475b659bd97Bba85f32a7259239D5d',
    BASE_MAINNET_ADDRESS = '0x7FB8E2aE4A5923BBd8e1513945914b5AB69cdA2a',
}

// ! Add more token types as needed

export function getTokenAddress(token: TokenType, isTestnet: boolean): string | undefined {
    switch (token) {
        case TokenType.BASE:
            return isTestnet ? TokenAddress.BASE_TESTNET_ADDRESS : TokenAddress.BASE_MAINNET_ADDRESS;
        case TokenType.ZETA:
            return isTestnet ? TokenAddress.ZETA_TESTNET_ADDRESS : TokenAddress.ZETA_MAINNET_ADDRESS;
        // Add more cases as needed
        default:
            return undefined;
    }
}

// TODO : Add more cases as needed
export function getChainId(network: keyof typeof JsonRpcProvider): number {
    switch (network) {
        case 'ZETA_TESTNET':
            return chainId.ZETA_TESTNET;
        case 'ZETA_MAINNET':
            return chainId.ZETA_MAINNET;
        case 'BASE_TESTNET':
            return chainId.BASE_TESTNET;
        case 'BASE_MAINNET':
            return chainId.BASE_MAINNET;
        default:
            throw new Error(`Unsupported network: ${network}`);
    }
}
