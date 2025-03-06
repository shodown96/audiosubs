"use client"
import { generateSRT } from '@/actions/assemblyai/generate-srt'
import { transcribeMedia } from '@/actions/assemblyai/transcribe-media'
import { createSubtitle } from '@/actions/subtitles/create-subtitle'
import { ERROR_MESSAGES, STATES } from '@/lib/constants'
import { SubtitleMediaParamsType, SubtitleParamsSchema, SubtitleParamsType } from '@/lib/validations'
import { ClientSubtitle } from '@/types/subtitles'
import { useUser } from '@clerk/nextjs'
import { Transcript } from 'assemblyai'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../custom/custom-modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'
import { ChevronLeft } from 'lucide-react'
import { convertToBase64 } from '@/lib/utils'
import axios from 'axios'

export function TransacribeForm({
    updatedValues,
    onSubmitted,
    goBack
}: {
    updatedValues?: SubtitleMediaParamsType,
    onSubmitted: (subtitle: ClientSubtitle) => void
    goBack: () => void
}) {
    const { user } = useUser()
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const [generated, setGenerated] = useState("")
    const [transcripted, setTranscripted] = useState<Transcript | null>(null)
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);

    const handleRestart = () => {
        window.location.reload()
    }

    const handleGeneration = async () => {
        if (!updatedValues?.uploadedFile && !updatedValues?.file) return
        setGenerated("")
        setLoading(true)
        try {
            const toastId = toast.loading(STATES.TRANSCRIBING)
            const converted = await convertToBase64(updatedValues.file)
            const result = await axios.post("/api/transcribe", {
                file: converted,
                uploadedFile: updatedValues?.uploadedFile
            })
            console.log(result.data)
            if (result.status === 200) {
                const transcript = result.data
                setTranscripted(transcript)
                const toastId = toast.loading(STATES.GENERATING)
                const srt = await generateSRT(transcript)
                toast.dismiss(toastId)
                setGenerated(srt)
            } else {
                throw new Error(result.data)
            }
            toast.dismiss(toastId)
        } catch (error) {
            console.log(error)
            toast.error(ERROR_MESSAGES.UnexpectedError)
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (txtRef.current?.value) {
            const element = document.createElement("a");
            const file = new Blob([txtRef.current?.value], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${updatedValues?.file?.name}.srt`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }


    const formik = useFormik<SubtitleParamsType>({
        initialValues: { title: "" },
        onSubmit: async ({ title }: SubtitleParamsType) => {
            if (!title) {
                formik.setFieldError("title", "Please enter a title")
            }
            if (transcripted && title && generated && updatedValues?.uploadedFile) {
                setSaving(true)
                const saved = await createSubtitle({
                    title,
                    subtitle: generated,
                    saveFile: updatedValues.saveFile,
                    file: updatedValues.uploadedFile,
                    transcriptionId: transcripted.id,
                })
                if (saved) {
                    setSaving(false)
                    formik.resetForm()
                    handleRestart()
                    // router.push(PATHS.SUBTITLES)
                }
            }
        },
        validateOnBlur: true,
        validationSchema: SubtitleParamsSchema,
    });

    useEffect(() => {
        if ((updatedValues?.file || updatedValues?.uploadedFile) && !loading) {
            handleGeneration()
        }
    }, [updatedValues])

    return (
        <div>
            <Button onClick={goBack} variant={"ghost"} className='mb-4'>
                <ChevronLeft />  Back
            </Button>
            <h4 className='text-lg'>Generated Subtitle</h4>

            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
                <Input
                    id="title"
                    label="Enter a title to save the subtitle as"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                    touched={formik.touched.title}
                    placeholder={'Enter a title'}
                    disabled={!updatedValues?.saveFile}
                />

                <Textarea
                    rows={20}
                    ref={txtRef}
                    value={generated}
                    className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[300px]"
                    placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                    onChange={e => console.log("yay")}
                />

                <div className="flex gap-2 w-full flex-wrap">
                    <Button type='button' className="bg-blue-600" onClick={handleGeneration} loading={loading} disabled={!updatedValues?.file}>
                        Re-generate SRT
                    </Button>
                    <Button type='button' onClick={handleDownload} disabled={!generated}>
                        Download SRT
                    </Button>
                    <Button type='button' onClick={handleRestart} disabled={!generated}>
                        Restart
                    </Button>
                    {updatedValues?.saveFile ?
                        <Button type='submit' disabled={!generated}>
                            Save SRT
                        </Button> : null
                    }
                </div>
            </form>
        </div>
    )
}