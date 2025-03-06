"use server"

import { assemblyAI } from "@/lib/assemblyai";
import { DBFile } from "@/types/common";

export const transcribeMedia = async ({
    file,
    uploadedFile,
}: {
    file: string,
    uploadedFile?: DBFile
}) => {
    let transcript = await assemblyAI.transcripts.transcribe({
        // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
        audio: uploadedFile?.url || file,
        // speaker_labels: true,
        // webhook_url: `${originURL}/api/webhooks/assemblyai?userId=${userId}`,
        // webhook_auth_header_name: process.env.WEBHOOK_HEADER,
        // webhook_auth_header_value: process.env.WEBHOOK_SECRET
    });
    // console.log("transcript", transcript)
    if (transcript.status === 'error') {
        console.error(transcript.error)
        return ""
    }
    return transcript
}
