import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/file-uploader";
import { cn, getLimitedText } from "@/lib/utils";

import { Paperclip } from "lucide-react";
import { DropzoneOptions } from "react-dropzone";

const FileSvgDraw = ({
    label = "Click to upload or drag and drop",
    acceptedText = ""
}) => {
    return (
        <>
            <svg
                className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {/* <span className="font-semibold">Click to upload</span>
                &nbsp; or drag and drop */}
                {label}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {acceptedText}
            </p>
        </>
    );
};

export const UploadFileInput = ({
    files,
    setFiles,
    dropzoneOptions,
    label,
    acceptedText,
    labelStyle,
}: {
    files: File[],
    setFiles: (value: File[] | null) => void,
    dropzoneOptions: DropzoneOptions,
    acceptedText?: string,
    label?: string,
    labelStyle?: string
}) => {
    return (
        <div className="w-full cursor-pointer">
            {label && (
                <p className={cn("text-sm font-medium w-full text-left mb-1", labelStyle)}>
                    {label}
                </p>
            )}
            <FileUploader
                value={files}
                onValueChange={setFiles}
                dropzoneOptions={dropzoneOptions}
                className=""
            >
                <FileInput className="border border-primary border-dashed">
                    {/* <Button variant={"outline"}>Upload a file</Button> */}
                    {/* <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                    <p className="text-gray-400">Drop files here</p>
                </div> */}
                    <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                        <FileSvgDraw
                            label={label}
                            acceptedText={acceptedText} />
                    </div>
                </FileInput>
                <FileUploaderContent className="min-h-5 overflow-y-auto">
                    {files.length ? files.map((file: File, i: number) => (
                        <div key={i} className="mb-1 flex gap-2">
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{getLimitedText(file.name, 50)}</span>
                        </div>
                    )) : null}
                </FileUploaderContent>
            </FileUploader>
        </div>
    )
}