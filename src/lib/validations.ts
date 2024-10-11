import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const SubtitleParams = z.object({
    title: z.string({ required_error: "Please enter a title." })
});

export const SubtitleParamsSchema = toFormikValidationSchema(SubtitleParams);
export type SubtitleParamsType = z.infer<typeof SubtitleParams>;
