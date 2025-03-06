"use server"

import { assemblyAI } from "@/lib/assemblyai";
import { DBFile } from "@/types/common";

export const generateSpeakers = async (media: DBFile) => {
    let sp = await assemblyAI.transcripts.transcribe({
        audio: media.url,
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

// V1
// export const generateSpeakers = async (transcriptId: string) => {
//     let transcript = await assemblyAI.transcripts.get(transcriptId);
//     let sp = await assemblyAI.transcripts.transcribe({
//         audio: transcript.audio_url,
//         speaker_labels: true,
//     });
//     if (sp.status === 'error') {
//         console.error(sp.error)
//         return ""
//     }
//     let speakerTexts = ""
//     for (const utterance of sp.utterances!) {
//         speakerTexts += `Speaker ${utterance.speaker}: ${utterance.text}\n`
//     }
//     return speakerTexts
// }