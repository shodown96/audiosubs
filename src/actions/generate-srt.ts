// "use server"
import { AssemblyAI, FileUploadParams, Transcript } from "assemblyai";

const client = new AssemblyAI({
    apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
});

export const transcribe = async (audio: FileUploadParams) => {
    let transcript = await client.transcripts.transcribe({
        // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
        audio,
        // speaker_labels: true,
        // webhook_url
    });
    // console.log("transcript", transcript)
    if (transcript.status === 'error') {
        console.error(transcript.error)
        return ""
    }
    return transcript
}


export const generateSRT = async (transcript: Transcript) => {
    const charsPerCaption = 32;
    const srt = await client.transcripts.subtitles(transcript.id, "srt", charsPerCaption);
    console.log("srt", srt)
    return srt
}
// TODO: Handle the realtime transcription
// Handle webhooks instead
// add subtitles to videos
// media player, maybe mux