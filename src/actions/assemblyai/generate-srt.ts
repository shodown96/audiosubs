"use server"

import { assemblyAI } from "@/lib/assemblyai";
import { Transcript } from "assemblyai";

export const generateSRT = async (transcript: Transcript) => {
    const charsPerCaption = 32;
    const srt = await assemblyAI.transcripts.subtitles(transcript.id, "srt", charsPerCaption);
    console.log("srt", srt)
    return srt
}

// const client = new AssemblyAI({
//     apiKey: `${process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY}`,
// });

// TODO: Handle the realtime transcription
// Handle webhooks instead
// add subtitles to videos using mux
