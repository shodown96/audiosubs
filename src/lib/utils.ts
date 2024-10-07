import { TranscriptUtterance } from "assemblyai";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToBase64 = async (file: File) => {
  /*
      Coverts file to base64
      params description :
          file : a file to be uploaded      
  */
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
export const msToTime = (ms: number): string => {
  // Convert milliseconds to hh:mm:ss,ms format
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const pad = (num: number, size: number) => ('000' + num).slice(size * -1);
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)},${pad(milliseconds, 3)}`;
}


export const generateSRTFromUtterances = (uterances: TranscriptUtterance[]): string => {
  return uterances.map((subtitle, index) => {
    const startTime = msToTime(subtitle.start);
    const endTime = msToTime(subtitle.end);
    const text = `${subtitle.speaker}: ${subtitle.text}`;

    return `${index + 1}\n${startTime} --> ${endTime}\n${text}\n`;
  }).join('\n');
}

export const getUniqueSpeakers = (utterances: TranscriptUtterance[]) => {
  const speakersSet = new Set<string>();
  utterances.forEach(utterance => {
    speakersSet.add(utterance.speaker);
  });
  
  return Array.from(speakersSet);
}