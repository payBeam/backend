import { AppError } from "@/utils/AppError";
import { PaymentMode, PrismaClient, TokenType } from "@prisma/client"

const prisma = new PrismaClient()

export const createInvoice = async (amount: number, token: TokenType, description: string, merchantId: string) => {
    // find if merchant already exists
    const invoice = await prisma.invoice.create({
        data: {
            amount,
            token,
            description,
            merchantId
        }
    })

    return invoice

}

export const getInvoiceById = async (id: string) => {
    const invoice = await prisma.invoice.findUnique({
        where: {
            id
        }
    })

    return invoice
}

export const getAllMerchantInvoices = async (id: string) => {
    const invoices = await prisma.invoice.findMany({
        where: {
            merchantId: id
        }
    })

    return invoices
}

export const getFilteredInvoiceSum = async (
    merchantId: string
) => {
    console.log("got here")
    const result = await prisma.invoice.aggregate({
        where: {
            merchantId: merchantId,

        },
        _sum: {
            amount: true,
        },
    });
    console.log("balance",result)

    return result._sum.amount || 0;
}