import { VALIDATION_MESSAGES } from "@/lib/constants";
import { formatString } from "@/lib/utils";
import { DBFile } from "@/types/common";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const fileObject = z
    .any()
    // .refine((file) => file.size <= 1024 * 1024 * 10, 'File size should be less than 1MB')
    // .refine((file) => ['audio/*', 'video/*'].includes(file.type), 'Only audio and video files are allowed')
    .optional()

const SubtitleParams = z.object({
    title: z.string({ required_error: "Please enter a title." }).optional(),
});

export const SubtitleParamsSchema = toFormikValidationSchema(SubtitleParams);
export type SubtitleParamsType = z.infer<typeof SubtitleParams>;

const OldSubtitleParams = z.object({
    title: z.string({ required_error: "Please enter a title." }),
    saveFile: z.boolean().optional(),
});

export const OldSubtitleParamsSchema = toFormikValidationSchema(OldSubtitleParams);
export type OldSubtitleParamsType = z.infer<typeof OldSubtitleParams>;

const SubtitleMediaParams = z
    .object({
        saveFile: z.boolean().optional(),
        file: fileObject,
        uploadedFile: z.object({ id: z.string().optional(), url: z.string().optional() }).optional(),
    })

export const SubtitleMediaParamsSchema =
    toFormikValidationSchema(SubtitleMediaParams);
export type SubtitleMediaParamsType = z.infer<typeof SubtitleMediaParams> & {
    uploadedFile?: DBFile | null
};

const ChangePasswordParams = z
    .object({
        currentPassword: z.string({
            required_error: VALIDATION_MESSAGES.PasswordRequired,
        }),
        confirmPassword: z.string({
            required_error: VALIDATION_MESSAGES.PasswordRequired,
        }),
        newPassword: z.string({
            required_error: VALIDATION_MESSAGES.PasswordRequired,
        }),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: VALIDATION_MESSAGES.PasswordMismatch,
        path: ["confirmPassword"],
    });

export const ChangePasswordParamsSchema =
    toFormikValidationSchema(ChangePasswordParams);
export type ChangePasswordParamsType = z.infer<typeof ChangePasswordParams>;


const UpdateAccountParams = z
    .object({
        firstName: z.string({
            required_error: formatString(VALIDATION_MESSAGES.Required, "Name"),
        }),
        lastName: z.string({
            required_error: formatString(VALIDATION_MESSAGES.Required, "Name"),
        }),
    })

export const UpdateAccountParamsSchema =
    toFormikValidationSchema(UpdateAccountParams);
export type UpdateAccountParamsType = z.infer<typeof UpdateAccountParams>;

