"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { Subtitle } from "@prisma/client"

export const getSRTs = async (page = 1, pageSize = 5): Promise<Subtitle[]> => {
    try {
        const { userId }: { userId: string | null } = auth()
        if (!userId) {
            console.log("Auth Error")
            return []
        };
        const subtitles = await prisma.subtitle.findMany({
            where: { userId },
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
        return subtitles
    } catch (error) {
        console.log(error)
        return []
    }

}