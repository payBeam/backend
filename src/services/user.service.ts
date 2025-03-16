import { AppError } from "@/utils/AppError";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export const createMerchant = async (name: string, description: string, id: string) => {
//     // find if merchant already exists
//     const merchantExist = await getMerchantById(id);
//     if (merchantExist) {
        
//     }
//     // return error if already exists
//     // create if doesnt already exists
// }

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user
}