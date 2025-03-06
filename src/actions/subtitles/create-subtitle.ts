"use server"
import { deleteMedia } from "@/lib/cloudinary"
import prisma from "@/lib/prisma"
import { DBFile } from "@/types/common"
import { auth } from "@clerk/nextjs/server"

export const createSubtitle = async ({
    title,
    saveFile,
    transcriptionId,
    subtitle,
    file,
}: {
    title: string,
    saveFile?: boolean,
    transcriptionId: string,
    subtitle: string,
    file: DBFile
}) => {
    try {
        const { userId }: { userId: string | null }= await auth()
        if (!userId) {
            console.log("Please sign in")
            return null
        };
        if(!saveFile){
            await deleteMedia(file.url)
        }
        if (saveFile) {
            const created = await prisma.subtitle.create({
                data: {
                    title,
                    userId,
                    file: { connect: { id: file.id } },
                    transcriptionId,
                    content: subtitle,
                }
            })
            return created
        }
    } catch (error) {
        console.log(error)
        return null
    }

}