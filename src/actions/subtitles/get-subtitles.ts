"use server"

import { DEFAULT_PAGE_SIZE } from "@/lib/constants"
import prisma from "@/lib/prisma"
import { paginateItems } from "@/lib/utils"
import { FilterParams } from "@/types/common"
import { GetSubtitlesResponse } from "@/types/subtitles"
import { auth } from "@clerk/nextjs/server"
import { Prisma } from "@prisma/client"

export const getSRTs = async ({ query }: { query: FilterParams }): Promise<GetSubtitlesResponse | null> => {
    try {
        const { userId }: { userId: string | null }= await auth()
        if (!userId) throw new Error("No user found")

        const {
            pageSize = DEFAULT_PAGE_SIZE,
            page = 1,
            search = "",
        } = query
        
        const WHERE_QUERY: Prisma.SubtitleWhereInput = {
            userId,
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ],
        }
        const subtitles = await prisma.subtitle.findMany({
            where: WHERE_QUERY,
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
        const total = await prisma.subtitle.count({
            where: WHERE_QUERY,
        });

        const paginated = paginateItems({
            page,
            pageSize,
            total,
            items: subtitles,
        });
        return { data: paginated };
    } catch (error) {
        console.log(error)
        return null
    }

}