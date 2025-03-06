import { TranscriptUtterance } from "assemblyai";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as formatFNS } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatString = (...args: any) => {
  let i = 1;
  const str = args[0];
  return str.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
}

export const formatDate = (date: string | Date) => {
  if (!date) return ""
  return formatFNS(date, "do MMM, yyyy");
};

export const objectToQueryString = (obj: Record<string, any>) => {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]),
      );
    }
  }

  return keyValuePairs.join("&");
};


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

export const getBreadcrumbs = (pathname: string) => {
  // Split the pathname into segments
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Create breadcrumbs based on the segments
  const breadcrumbs = segments
    // .filter((x) => x !== "dashboard")
    .map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        text: segment,
        path: path === "" ? "/" : path,
      };
    });

  return breadcrumbs;
};

export const getLimitedText = (text = "", limit = 50) => {
  if (text.length > 0) {
    if (text.length > limit) {
      return `${text.split("").slice(0, limit).join("")}...`;
    }
    return text
  }
  return ""
};

export const paginateItems = ({
  page,
  pageSize,
  items,
  total,
}: {
  page: number;
  pageSize: number;
  items: any;
  total: number;
}) => {
  const totalPages = total ? Math.ceil(total / pageSize) : 0;
  const data: any = {
    items,
    pageSize,
    totalPages,
    currentPage: page,
    total: total,
  };
  return data;
};

export const delayDebounceFn = (callBack: () => void) =>
  setTimeout(callBack, 300);