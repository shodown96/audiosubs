// "use server"
// import { AssemblyAI } from "assemblyai";

// export const apiKey = assertValue(
//   process.env.ASSEMBLYAI_API_KEY,
//   "Missing environment variable: ASSEMBLYAI_API_KEY",
// );

// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }

//   return v;
// }

// export const client = new AssemblyAI({
//   apiKey,
// });