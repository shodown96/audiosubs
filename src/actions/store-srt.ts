"use server"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export const storeSRT = async (title: string, transcriptionId: string, subtitle: string) => {
    try {
        const { userId }: { userId: string | null } = auth()
        if (!userId) {
            console.log("Please sign in")
            return null
        };
        const created = await prisma.subtitle.create({
            data: {
                title,
                userId,
                mediaUrl: "",
                transcriptionId,
                content: subtitle,
            }
        })
        return created
    } catch (error) {
        console.log(error)
        return null
    }

}