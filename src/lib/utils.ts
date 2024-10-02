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