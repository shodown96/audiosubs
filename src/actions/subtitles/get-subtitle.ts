"use server"

import prisma from "@/lib/prisma"
import { ClientSubtitle } from "@/types/subtitles"
import { auth } from "@clerk/nextjs/server"

export const getSubtitle = async ({ id }: { id: string }): Promise<ClientSubtitle | null> => {
    try {
        const { userId }: { userId: string | null } = await auth()
        if (!userId) throw new Error("No user found")

        const subtitle = await prisma.subtitle.findUnique({
            where: { id },
            include: { file: true }
        })
        return subtitle;
    } catch (error) {
        console.log(error)
        return null
    }
}