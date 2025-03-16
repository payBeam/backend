import { AppError } from "@/utils/AppError";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createMerchant = async (name: string, description: string, id: string) => {
    // find if merchant already exists
    const merchantExist = await getMerchantById(id);
    if (merchantExist) {
        throw new AppError("Merchant already exist", 401);

    }
    // return error if already exists
    // create if doesnt already exists
    const merchant = prisma.merchant.create({
        data: {
            name,
            description,
            id
        }
    })

    return merchant

}

export const getMerchantById = async (id: string) => {
    const merchant = await prisma.merchant.findFirst({
        where: {
            id
        }
    });
    return merchant
}