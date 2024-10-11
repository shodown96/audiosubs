// "use server"
import { AssemblyAI, FileUploadParams, Transcript } from "assemblyai";

const client = new AssemblyAI({
    apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
});

export const transcribe = async (audio: FileUploadParams, userId = "") => {
    let transcript = await client.transcripts.transcribe({
        // audio: "https://storage.googleapis.com/aai-web-samples/espn-bears.m4a",
        audio,
        // speaker_labels: true,
        // webhook_url: `${window.location.origin}/api/webhooks/assemblyai?userId=${userId}`,
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


export const getSpeakers = async (transcriptId: string) => {
    let transcript = await client.transcripts.get(transcriptId);
    let sp = await client.transcripts.transcribe({
        audio: transcript.audio_url,
        speaker_labels: true,
    });
    if (sp.status === 'error') {
        console.error(sp.error)
        return ""
    }
    let speakerTexts = ""
    for (const utterance of sp.utterances!) {
        speakerTexts += `Speaker ${utterance.speaker}: ${utterance.text}\n`
    }
    return speakerTexts
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
