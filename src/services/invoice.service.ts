import { AppError } from "@/utils/AppError";
import { PaymentMode, PrismaClient, TokenType } from "@prisma/client"

const prisma = new PrismaClient()

export const createInvoice = async (amount: number, token: TokenType, title: string, description: string, paymentMode:PaymentMode, merchantId: string) => {
    // find if merchant already exists
    const invoice = await prisma.invoice.create({
        data: {
            amount,
            token,
            title,
            description,
            paymentMode,
            merchantId
        }
    })

    return invoice

}

export const getInvoiceById = async(id:string) => {
    const invoice = await prisma.invoice.findUnique({
        where: {
            id
        }
    })

    return invoice
}

export const getMerchantById = async (id: string) => {
    const merchant = await prisma.merchant.findFirst({
        where: {
            id
        }
    });
    return merchant
}