"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { Subtitle } from "@prisma/client"

export const getSubtitle = async ({ id }: { id: string }): Promise<Subtitle | null> => {
    try {
        const { userId }: { userId: string | null } = auth()
        if (!userId) throw new Error("No user found")

        const subtitle = await prisma.subtitle.findUnique({
            where: { id },
        })
        return subtitle;
    } catch (error) {
        console.log(error)
        return null
    }
}