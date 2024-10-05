// "use server"
import { AssemblyAI, FileUploadParams, Transcript } from "assemblyai";

const client = new AssemblyAI({
    apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
});

export const transcribe = async (audio: FileUploadParams) => {
    let transcript = await client.transcripts.transcribe({
        // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
        audio
    });
    if (transcript.status === 'error') {
        console.error(transcript.error)
        return ""
    }
    return transcript
}


export const generateSRT = async (transcript: Transcript) => {
    const charsPerCaption = 32;
    let srt = await client.transcripts.subtitles(transcript.id, "srt");
    srt = await client.transcripts.subtitles(transcript.id, "srt", charsPerCaption);
    return srt
}
// TODO: Handle the realtime transcription
// Handle webhooks instead
// add subtitles to videos
// media player, maybe mux