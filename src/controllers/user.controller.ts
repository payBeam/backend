import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { asyncHandler } from "@/middlewares/asyncHandler";
import { ApiResponse } from '@/utils/ApiResponse';

const prisma = new PrismaClient();

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.create({
        data: { email, password },
    });
    res.status(200).json(new ApiResponse("success", user));
});



export const getUser = asyncHandler(async (req: Request, res: Response) => {

    const user = req.user as User
    const users = await prisma.user.findUnique({ where: { id: user.id }, include: { merchant: true } });

    
    res.status(200).json(new ApiResponse("success", users));
});


export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json(new ApiResponse("success", users));
});