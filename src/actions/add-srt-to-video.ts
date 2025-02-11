// import Mux from '@mux/mux-node';

// export const mux = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID,
//   tokenSecret: process.env.MUX_TOKEN_SECRET
// });

// export const addSRTVideo = async ({
//   assetURL,
//   subtitleURL
// }: {
//   assetURL: string,
//   subtitleURL: string
// }) => {
//   const asset = await mux.video.assets.create({
//     input: [
//       { url: assetURL },
//       {
//         url: subtitleURL,
//         type: "text",
//         name: "English",
//         text_type: "subtitles",
//         language_code: "en",
//         closed_captions: false
//       }
//     ],
//     playback_policy: ["public"],
//     video_quality: "basic"

//   })
//   return asset
// }