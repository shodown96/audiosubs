import { ERROR_MESSAGES } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { deleteMedia } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        if (!body.url) {
            return NextResponse.json({
                message: ERROR_MESSAGES.BadRequestError
            }, { status: 400 });
        }

        const data = await deleteMedia(body.url)
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json("Error", { status: 500 });
    }
}