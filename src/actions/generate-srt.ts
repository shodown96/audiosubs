// "use server"
import { AssemblyAI, FileUploadParams, Transcript } from "assemblyai";

const client = new AssemblyAI({
    apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
});

export const transcribe = async (audio: FileUploadParams) => {
    try {
        let transcript = await client.transcripts.transcribe({
            // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
            audio
        });
        if (transcript.status === 'error') {
            console.error(transcript.error)
            return ""
          }
        return transcript
    } catch (error) {
        console.log(error)
        return ""
    }
}


export const generateSRT = async (transcript: Transcript) => {
    try {
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
// Handle webhooks instead
// add subtitles to videos
// media player, maybe mux