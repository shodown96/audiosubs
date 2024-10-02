"use server"
import { AssemblyAI, FileUploadParams } from "assemblyai";

export const generateSRT = async (audio: FileUploadParams) => {
    try {
        const client = new AssemblyAI({
            apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
        });
        let transcript = await client.transcripts.transcribe({
            // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
            audio
        });

        const charsPerCaption = 32;
        let srt = await client.transcripts.subtitles(transcript.id, "srt");
        srt = await client.transcripts.subtitles(transcript.id, "srt", charsPerCaption);
        return srt
    } catch (error) {
        console.log(error)
        return ""
    }
}
// TODO: Handle the realtime transcription