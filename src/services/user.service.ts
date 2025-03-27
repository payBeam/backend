import { AppError } from "@/utils/AppError";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user
}

export const getUserByProviderId = async (providerId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            authProviders: {
                some: {
                    providerId
                }
            }
        }
    });
    return user
}

export const createUser = async (email: string, provider: string, providerId: string) => {
    const user = await prisma.user.create({
        data: {
            email,
            authProviders: {
                create: {
                    provider,
                    providerId
                }
            }
        }
    });
    return user
}
