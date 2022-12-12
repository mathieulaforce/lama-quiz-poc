import { PrismaClient, Language } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export const fetchLanguages = async () => {
    const prisma = new PrismaClient()
    const languages = await prisma.language.findMany({
        where: {
            isSoftDelete: false
        }
    });
    prisma.$disconnect();
    return languages;
}

export const fetchQuizesByCulture = async (culture: string) => {
    const prisma = new PrismaClient()
    const languages = await prisma.quiz.findMany({
        where: {
            isSoftDelete: false,
            language: {
                culture: culture
            }
        }
    });
    prisma.$disconnect();
    return languages;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Language[]>
) {
    res.status(200).json(await fetchLanguages());
}
