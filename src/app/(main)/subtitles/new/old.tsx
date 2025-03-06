"use client"
import { generateSRT } from "@/actions/assemblyai/generate-srt";
import { transcribeMedia } from "@/actions/assemblyai/transcribe-media";
import { createSubtitle } from "@/actions/subtitles/create-subtitle";
import { Modal } from "@/components/custom/custom-modal";
import { UploadFileInput } from "@/components/custom/upload-file-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { STATES } from "@/lib/constants";
import { convertToBase64 } from "@/lib/utils";
import { OldSubtitleParamsSchema, OldSubtitleParamsType } from "@/lib/validations";
import { DBFile } from "@/types/common";
import { useUser } from "@clerk/nextjs";
import { Transcript } from "assemblyai";
import axios from "axios";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NewSubtitlePage() {
    const { user } = useUser();
    const [generated, setGenerated] = useState("")
    const [transcripted, setTranscripted] = useState<Transcript | null>(null)
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter()
    // const [speakers, setSpeakers] = useState<string[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [file, setFile] = useState<DBFile | null>(null);
    const [previews, setPreviews] = useState<string[]>([]);
    const [subtitles, setSubtiles] = useState<string[]>([]);


    // TODO: SAVE FILES TO SWITCH BETWEEN NOT STORING IT AT LL IN CLOUDINARY
    const handleRemove = async () => {
        const toastId = toast.loading("Deleting file...");
        if (!file?.url) {
            setFiles([])
            toast.dismiss(toastId)
            return
        }
        const result = await axios.post("/api/cloudinary/delete", { url: file.url })
        if (result.status === 200) {
            console.log(result)
            setFile(null)
            setFiles([])
        }
        toast.dismiss(toastId)
    }

    const uploadFile = async () => {
        const file = files[0]
        if (!file) {
            toast.error('Please select an image to upload')
            return null
        }
        const toastId = toast.loading(STATES.UPLOADING);
        try {
            const converted = await convertToBase64(file)
            const result = await axios.post("/api/cloudinary/upload", {
                file: converted,
                folder: "media"
            })
            if (result.status === 200) {
                console.log(result)
                setFile(result.data)
                toast.success('Uploaded file successfully!')
            } else {
                console.log(result.data)
                throw new Error(result.data)
            }
            return result.data as DBFile

        } catch (error) {
            toast.error('Failed to uploaded file.')
        } finally {
            toast.dismiss(toastId)
        }
        return null
    }

    const handleGeneration = async () => {
        // if (!selectedFile) return
        setGenerated("")
        if (!files.length) return
        setLoading(true)
        let media: DBFile | null = file
        if (!file) {
            media = await uploadFile()
        }
        if (!media) {
            return
        }
        try {
            const toastId = toast.loading(STATES.TRANSCRIBING)
            const transcript = await transcribeMedia({ file: "", uploadedFile: media })
            toast.dismiss(toastId)
            if (transcript) {
                setTranscripted(transcript)
                const toastId = toast.loading(STATES.GENERATING)
                const srt = await generateSRT(transcript)
                toast.dismiss(toastId)
                // const srt = generateSRTFromUtterances(transcript.utterances)
                // const speakers = getUniqueSpeakers(transcript.utterances)
                // if (speakers.length) {
                //   setSpeakers(speakers)
                // }
                setGenerated(srt)
            }
        } catch (error) {
            console.log(error)
            toast.error("Unable to process request, please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (txtRef.current?.value) {
            const element = document.createElement("a");
            const file = new Blob([txtRef.current?.value], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${files[0]?.name}.srt`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }

    const handleClear = () => {
        setFiles([]);
        setGenerated("")
    }

    const formik = useFormik<OldSubtitleParamsType>({
        initialValues: { title: "", saveFile: true },
        onSubmit: async ({ title, saveFile }: OldSubtitleParamsType) => {
            if (transcripted && generated && file) {
                setSaving(true)
                const saved = await createSubtitle({
                    title,
                    file,
                    saveFile,
                    subtitle: generated,
                    transcriptionId: transcripted.id,
                })
                if (saved) {
                    setSaving(false)
                    formik.resetForm()
                    setOpen(false)
                    setFile(null);
                    setFiles([])
                    // router.push(PATHS.SUBTITLES)
                }
            }
        },
        validateOnBlur: true,
        validationSchema: OldSubtitleParamsSchema,
    });

    // const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
    //   const files = e.target.files
    //   if (files?.length) {
    //     setSelectedFile(files[0])
    //   }
    // }
    useEffect(() => {
        if (files.length) {
            for (const file of files) {
                const preview = URL.createObjectURL(file)
                setPreviews([...previews, preview])
            }
        }
        return () => {
            for (const preview of previews) {
                URL.revokeObjectURL(preview)
                setPreviews([])
                setFiles([])
            }
        }
    }, [files])

    return (

        <>
            <div className="flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-center items-center p-10 lg:p-10 gap-5 overflow-auto">
                    <div className="w-full">
                        <p className="mb-2">Click or drag and drop your MP3, M4A, MOV or MP4 files to upload and generate subtitles.</p>
                        <UploadFileInput
                            files={files}
                            dropzoneOptions={{
                                multiple: false,
                                maxSize: 1024 * 1024 * 10,
                                accept: {
                                    'audio/*': [],
                                    'video/*': []
                                },
                            }}
                            setFiles={values => {
                                if (!values || !values.length) {
                                    setFiles([])
                                    return
                                };
                                setFiles(values)
                            }} />
                    </div>
                    <p className="w-full">Preview:</p>
                    {files.map(file => (
                        <div className="w-full" key={file.name}>
                            {file.type.startsWith('audio/') ? (
                                <div className="flex gap-2">
                                    <audio controls className="w-full">
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <Trash2
                                        onClick={handleRemove}
                                        className='bg-red-600 p-2 cursor-pointer rounded-full absolute text-white h-8 w-8 -mt-3 -ml-3 z-40' />
                                </div>
                            ) : null}

                            {file.type.startsWith('video/') ? (
                                <div className="flex gap-2">
                                    <video controls className="w-full border">
                                        <source src={URL.createObjectURL(file)} type={file.type} />
                                        Your browser does not support the video element.
                                    </video>
                                    <Trash2
                                        onClick={handleRemove}
                                        className='bg-red-600 p-2 cursor-pointer rounded-full absolute text-white h-8 w-8 -mt-3 -ml-3 z-40' />ƒ
                                </div>
                            ) : null}
                        </div>
                    ))}
                    <Textarea
                        rows={20}
                        ref={txtRef}
                        value={generated}
                        className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[300px]"
                        placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                        onChange={e => console.log("yay")}
                    />
                    <div className="flex gap-2 w-full flex-wrap">
                        <Button className="bg-blue-600" onClick={handleGeneration} loading={loading} disabled={!files.length}>
                            Generate SRT
                        </Button>
                        <Button onClick={handleDownload} disabled={!generated}>
                            Download SRT
                        </Button>
                        <Button onClick={handleClear} disabled={!generated}>
                            Clear
                        </Button>
                        <Button onClick={() => setOpen(true)} disabled={!generated}>
                            Save SRT
                        </Button>
                        {/* open modalol */}
                    </div>

                </div>
            </div>
            <Modal open={open} setOpen={setOpen} title="Save Subtitle">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        id="title"
                        label="Title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title}
                        touched={formik.touched.title}
                        placeholder={'Enter a title'}
                    />

                    <div className="flex gap-2 mt-2">
                        <Switch
                            id="taken"
                            checked={formik.values.saveFile}
                            onCheckedChange={value => formik.setFieldValue("saveFile", value)} />
                        <span>Save file?</span>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button disabled={!formik.isValid} loading={saving}>Save</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
