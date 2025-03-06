import fs from 'fs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getSubtitles = async () => {
    const updated = await prisma.subtitle.updateMany({
        data: { format: "audio" },
    })
    const subs = await prisma.subtitle.findMany({
        include: { file: true }
    })
    writeToFile("subs.json", subs)
}


const writeToFile = (fileName: string, object: any) => {
    fs.writeFile(fileName, JSON.stringify(object), 'utf8', () => { });
}
getSubtitles()