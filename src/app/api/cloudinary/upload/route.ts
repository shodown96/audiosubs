import { ERROR_MESSAGES } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { uploadMedia } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (!body.file) {
            return NextResponse.json({
                message: ERROR_MESSAGES.BadRequestError
            }, { status: 400 });
        }

        // const id = req.params.id
        // const data = await CloudinaryService.deleteMedia(id)
        const data = await uploadMedia(body.file, body.folder)
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json("Error", { status: 500 });
    }
}