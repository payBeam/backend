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
    'NODE_ENV'
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




export const config = { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, SESSION_SECRET, GOOGLE_REDIRECT_URL, NODE_ENV }