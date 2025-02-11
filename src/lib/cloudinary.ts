// "server only"

// import { v2 as cloudinary } from 'cloudinary';
// import prisma from "@/lib/prisma"

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true
// });

// export const deleteMedia = async (url?: string | null) => {
//     try {
//         if (!url) {
//             return false
//         }
//         const id = extractPublicId(url)
//         await cloudinary.uploader.destroy(id);
//         const dbFile = await prisma.file.findFirst({
//             where: { url }
//         })
//         if (dbFile) {
//             await prisma.file.delete({
//                 where: { id: dbFile.id }
//             })
//         }
//         return true
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }

// export const uploadMedia = async (file: string, folder = "") => {
//     try {
//         const environment = process.env.NODE_ENV || "development"
//         const uploaded = await cloudinary.uploader.upload(file, {
//             folder: `/sensenstyleapp/${environment}/${folder}`
//         });
//         const dbFile = await prisma.file.create({
//             data: { url: uploaded.secure_url }
//         })
//         return dbFile
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }

// export const extractPublicId = (secureUrl: string): string => {
//     // Split the URL by '/' and remove the parts up to the version number
//     const urlParts = secureUrl.split('/');

//     // Find the index of the version part, assuming it starts with 'v' followed by digits
//     const versionIndex = urlParts.findIndex(part => /^v\d+$/.test(part));

//     // Join the parts after the version number
//     const pathAfterVersion = urlParts.slice(versionIndex + 1).join('/');

//     // Remove the file extension from the public_id
//     const publicId = pathAfterVersion.replace(/\.[^/.]+$/, '');

//     return publicId;
// };