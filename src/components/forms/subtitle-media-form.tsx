"use client"
import { SubtitleMediaParamsSchema, SubtitleMediaParamsType } from '@/lib/validations';
import { useFormik } from 'formik';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { convertToBase64 } from '@/lib/utils';
import { STATES } from '@/lib/constants';
import axios from 'axios';
import { DBFile } from '@/types/common';
import { Trash2 } from 'lucide-react';
import { UploadFileInput } from '../custom/upload-file-input';

export default function SubtitleMediaForm({
    updatedValues,
    onSubmitted,
}: {
    updatedValues?: SubtitleMediaParamsType,
    onSubmitted: (values: SubtitleMediaParamsType) => void
}) {
    const [file, setFile] = useState<File | null>(null)
    const handleRemove = async () => {
        const toastId = toast.loading("Deleting file...");
        if (!values.uploadedFile?.url) {
            setFieldValue('file', null)
            toast.dismiss(toastId)
            return
        }
        const result = await axios.post("/api/cloudinary/delete", { url: values.uploadedFile.url })
        if (result.status === 200) {
            console.log(result)
            setFieldValue("uploadedFile", null)
        }
        toast.dismiss(toastId)
    }

    const uploadFile = async (file: File) => {
        toast.success("Upload file")
        console.log("Upload file")
        return
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

    // const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
    //     // if (!!e.target.files?.length) {
    //     const file = e.target.files?.[0]
    //     if (!file?.type.includes("video") && !file?.type.includes("audio")) {
    //         toast.error("Please only upload audio and video files.")
    //         return
    //     }
    //     if (values.saveFile) {
    //         if (file?.size > 10 * 1024 * 1024) { //10mb
    //             toast.error(`Files larger than 10MB cannot be be stored for future purposed, 
    //                     please switch off the option if you still intend to follow through.`)
    //         }
    //         return
    //     }
    //     console.log(file, e.target.files)
    //     uploadFile(file)
    //     setFieldValue("file", file)
    //     // setFile(file)
    //     // }
    // }

    const handleCheckedChange = async (value: boolean) => {
        setFieldValue('saveFile', value)
        if (value) {
            if ((values.file && !values.uploadedFile)) {
                setSubmitting(true)
                await uploadFile(values.file)
                setSubmitting(false)
            }
        } else {
            if ((values.file && values.uploadedFile)) {
                setSubmitting(true)
                await handleRemove()
                setSubmitting(false)
            }

        }
    }

    const formik = useFormik<SubtitleMediaParamsType>({
        initialValues: {
            saveFile: true,
            file: null,
            uploadedFile: { id: '', url: '' }
        },
        onSubmit: async (values) => {
            onSubmitted(values)
        },
        validateOnBlur: true,
        validationSchema: SubtitleMediaParamsSchema,
    });


    const {
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue,
        isSubmitting,
        setSubmitting,
        values,
        errors,
        touched
    } = formik;

    useEffect(() => {
        if (updatedValues) {
            setValues(updatedValues)
        }
    }, [])

    return (
        <div className='flex justify-center px-32 py-10'>
            <div className='flex-1'>
                <h4 className='text-lg mb-4'>Select a media file to transcribe</h4>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        {/* <Input
                            id='file'
                            type='file'
                            containerClassName='w-full'
                            className='cursor-pointer'
                            multiple={false}
                            error={errors.file}
                            touched={!!touched.file}
                            onBlur={handleBlur}
                            onChange={handleSelectedFile}
                            accept='video/*,audio/*'
                            placeholder={'Enter a movie file you want to transcibe'}
                            label="Media file you want to generate subtitles or transcriptions for"
                        /> */}
                        <UploadFileInput
                            files={values.file ? [values.file] : []}
                            dropzoneOptions={{
                                multiple: false,
                                maxSize: values.saveFile ? 1024 * 1024 * 10 : undefined,
                                accept: {
                                    'audio/*': [],
                                    'video/*': []
                                },
                            }}
                            setFiles={files => {
                                if (!files) return;
                                setFieldValue('file', files[0])
                                if (values.saveFile) {
                                    uploadFile(files[0])
                                }
                            }} />
                        {values.file || values.uploadedFile?.id ? (
                            <Trash2
                                onClick={handleRemove}
                                className='bg-red-600 p-2 cursor-pointer rounded-full absolute text-white h-8 w-8 -mt-3 -ml-3 z-40' />
                        ) : null}

                    </div>
                    <div className="flex gap-2 mt-2">
                        <Switch
                            id="saveFile"
                            checked={values.saveFile}
                            onCheckedChange={handleCheckedChange} />
                        <span>Save for future reference? If you choose not to save file, you can upload larger media</span>
                    </div>
                    {values.file?.type.startsWith('audio/') ? (
                        <audio controls className="w-full">
                            <source src={URL.createObjectURL(values.file)} type={values.file.type} />
                            Your browser does not support the audio element.
                        </audio>
                    ) : null}

                    {values.file?.type.startsWith('video/') ? (
                        <video controls className="w-full border">
                            <source src={URL.createObjectURL(values.file)} type={values.file.type} />
                            Your browser does not support the video element.
                        </video>
                    ) : null}
                    <Button type="submit" loading={isSubmitting}>
                        Next
                    </Button>

                </form>
            </div>
        </div>
    )
}
