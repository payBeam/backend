import dotenv from 'dotenv';
import { CipherKey } from 'crypto';
dotenv.config();


// * MAKES SURE THAT ALL VARIABLES ARE IN ENV BEFPRE APP STARTS
const requiredEnvVars = [
    'DATABASE_URL',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REDIRECT_URL',
    'PORT',
    'SESSION_SECRET',
    'NODE_ENV',
    'PAYBEAM_CONTRACT',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'STELLAR_SENDER_SECRET_KEY',
    'STELLAR_SENDER_PUB_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

// ! GOOGLE CREDENTIALS
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL || "";


// ! SYSTEM CREDENTIALS
const PORT = process.env.PORT || 5000;
const key = process.env.SESSION_SECRET || "random-key-sceret";
const SESSION_SECRET: CipherKey = Buffer.from(key, 'utf-8');
const NODE_ENV = process.env.NODE_ENV
const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

// ! PAYMENT CREDENTIALS
const PAYBEAM_CONTRACT = process.env.PAYBEAM_CONTRACT;
const STELLAR_SENDER_SECRET_KEY = process.env.STELLAR_SENDER_SECRET_KEY;
const STELLAR_SENDER_PUB_KEY = process.env.STELLAR_SENDER_PUB_KEY;


// ! TRUSTLINE CREDENTIALS
// const USDC_TRUSTLINE_CONTRACT =  "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA";
const USDC_ISSUER = "GATALTGTWIOT6BUDBCZM3Q4OQ4BO2COLOAZ7IYSKPLC2PMSOPPGF5V56"

export const config = {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    PORT, SESSION_SECRET,
    GOOGLE_REDIRECT_URL,
    NODE_ENV,
    PAYBEAM_CONTRACT,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    STELLAR_SENDER_PUB_KEY,
    STELLAR_SENDER_SECRET_KEY,
    USDC_ISSUER
    // USDC_TRUSTLINE_CONTRACT
}