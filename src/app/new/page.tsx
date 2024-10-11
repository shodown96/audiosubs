"use client"
import { generateSRT, transcribe } from "@/actions/generate-srt";
import { storeSRT } from "@/actions/store-srt";
import Modal from "@/components/custom/Modal";
import { UploadFileInput } from "@/components/custom/UploadFileInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PATHS, STATES } from "@/lib/constants";
import { SubtitleParamsSchema, SubtitleParamsType } from "@/lib/validations";
import { useUser } from "@clerk/nextjs";
import { Transcript } from "assemblyai";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function NewSubtitlePage() {
    const { user } = useUser();
    const [generated, setGenerated] = useState("")
    const [transcripted, setTranscripted] = useState<Transcript | null>(null)
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState("");
    const router = useRouter()
    // const [speakers, setSpeakers] = useState<string[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [subtitles, setSubtiles] = useState<string[]>([]);

    const handleGeneration = async () => {
        // if (!selectedFile) return
        setGenerated("")
        if (!files.length) return
        setLoading(true)
        try {
            setState(STATES.TRANSCRIBING)
            const transcript = await transcribe(files[0], user?.id)
            if (transcript) {
                setTranscripted(transcript)
                setState(STATES.GENERATING)
                const srt = await generateSRT(transcript)
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
            setState("")
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

    const formik = useFormik<SubtitleParamsType>({
        initialValues: { title: "" },
        onSubmit: async ({ title }: SubtitleParamsType) => {
            if (transcripted && generated) {
                setSaving(true)
                const saved = await storeSRT(title, transcripted.id, generated)
                if (saved) {
                    setSaving(false)
                    formik.resetForm()
                    setOpen(false)
                    // router.push(PATHS.SUBTITLES)
                }
            }
        },
        validateOnBlur: true,
        validationSchema: SubtitleParamsSchema,
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
            <div className="flex flex-col justify-between lg:h-screen">
                <div className="flex-1 flex flex-col justify-center items-center p-10 lg:p-10 gap-5 overflow-auto">
                    <h1 className="text-4xl font-bold">AudioSubs</h1>
                    <div className="w-full">
                        <p className="mb-2">Click or drag and drop your MP3, M4A, MOV or MP4 files to upload and generate subtitles.</p>
                        <UploadFileInput
                            files={files}
                            dropzoneOptions={{
                                multiple: false,
                                maxSize: 1024 * 1024 * 1024 * 1,
                                accept: {
                                    'audio/*': [],
                                    'video/*': []
                                },
                            }}
                            setFiles={values => {
                                if (!values) return;
                                setFiles(values)
                            }} />
                    </div>
                    <p className="w-full">Preview:</p>
                    {files.map(file => (
                        <div className="w-full" key={file.name}>
                            {file.type.startsWith('audio/') ? (
                                <audio controls className="w-full">
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : null}

                            {file.type.startsWith('video/') ? (
                                <video controls className="w-full border">
                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                    Your browser does not support the video element.
                                </video>
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

                <div className="w-full p-1 min-h-[32px] bg-[#f0f2f4]">{state}</div>
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
                    <div className="flex justify-end mt-4">
                        <Button disabled={!formik.isValid} loading={saving}>Save</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
