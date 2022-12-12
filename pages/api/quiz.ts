import { PrismaClient, Quiz } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Quiz[]>
) {
    const quizes = await prisma.quiz.findMany();
    res.status(200).json(quizes);
}
