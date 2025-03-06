"use server"

import prisma from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"

export const getMetrics = async () => {
    try {
        const { userId }: { userId: string | null }= await auth()
        if (!userId) throw new Error("No user found")

        const ownedSubtitles = await prisma.subtitle.count({
            where: { userId },
        })
        const subtitles = await prisma.subtitle.count({
            where: { userId },
        })
        const client = await clerkClient()
        const users = (await client.users.getUserList()).totalCount
        return {
            users,
            subtitles,
            ownedSubtitles
        };
    } catch (error) {
        console.log(error)
        return {
            users: 0,
            subtitles: 0,
            ownedSubtitles: 0
        };
    }
}