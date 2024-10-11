import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function validateRequest(request: Request) {
    const payloadString = await request.text();
    const headerPayload = headers();
    console.log(headerPayload)
    return null
    // const svixHeaders = {
    //   "svix-id": headerPayload.get("svix-id") || "",
    //   "svix-signature": headerPayload.get("svix-signature") || "",
    //   "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    // };
    // const wh = new Webhook(secret);
    // return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(req: NextRequest) {
    const rest = await validateRequest(req);
    console.log(req)

    return new NextResponse(JSON.stringify({ error: "Invalid event type" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
    });
}
