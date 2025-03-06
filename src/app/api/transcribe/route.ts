import { ERROR_MESSAGES } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { uploadMedia } from "@/lib/cloudinary";
import { transcribeMedia } from "@/actions/assemblyai/transcribe-media";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { file, uploadedFile } = body
        if (!file || !uploadedFile) {
            return NextResponse.json({
                message: ERROR_MESSAGES.BadRequestError
            }, { status: 400 });
        }

        // const id = req.params.id
        // const data = await CloudinaryService.deleteMedia(id)
        const data = await transcribeMedia({ file, uploadedFile })
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}