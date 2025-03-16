// import { AppError } from "@/utils/AppError";
import { PrismaClient, TokenType } from "@prisma/client"

const prisma = new PrismaClient()

export const createInvoicePayment = async (address: string, tokenType: TokenType, invoiceId: string) => {
    const merchantExist = await prisma.invoicePayment.create({
        data: {
            address,
            token: tokenType,
            invoiceId
        }
    })

    return merchantExist

}

export const getAnInvoicePayment = async (id: string) => {
    const invoicePayment = await prisma.invoicePayment.findUnique({
        where: {
            memo: id
        }
    });
    return invoicePayment
}