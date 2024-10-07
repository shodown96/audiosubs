"use client"
import { generateSRT, transcribe } from "@/actions/generate-srt";
import { UploadFileInput } from "@/components/custom/UploadFileInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { STATES } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [generated, setGenerated] = useState("")
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  // const [speakers, setSpeakers] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const txtRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleGeneration = async () => {
    // if (!selectedFile) return
    setGenerated("")
    if (!files.length) return
    setLoading(true)
    try {
      setState(STATES.TRANSCRIBING)
      const transcript = await transcribe(files[0])
      if (transcript) {
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
      element.download = `${selectedFile?.name}.srt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  }

  const handleClear = () => {
    setFiles([]);
    setGenerated("")
  }

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
    <div className="h-screen flex flex-col justify-center items-center p-10 lg:p-20 gap-5">
      <h1 className="text-4xl font-bold">AudioSubs</h1>
      <div className="w-full">
        <p className="mb-2">Click or drag and drop your MP3, M4A or MP4 files to upload and generate subtitles.</p>
        {/* <Input type="file" onChange={handleSelectedFile} className="cursor-pointer" />
        {selectedFile ? <small>{selectedFile.name}</small> : null} */}

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
            <audio controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio element.
            </audio>
          ) : null}

          {file.type.startsWith('video/') ? (
            <video controls width="250">
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the video element.
            </video>
          ) : null}
        </div>
      ))}
      <p className="w-full">Generated subtitles appear here, feel free to edit anything that seems off.</p>
      <Textarea rows={20} ref={txtRef} value={generated} onChange={e => console.log("yay")}></Textarea>
      <p className="w-full">{state}</p>
      <div className="flex gap-2 w-full flex-wrap">
        <Button onClick={handleGeneration} loading={loading} disabled={!files.length}>
          Generate SRT
        </Button>
        <Button onClick={handleDownload} disabled={!generated}>
          Download SRT
        </Button>
        <Button onClick={handleClear} disabled={!generated}>
          Clear SRT
        </Button>
      </div>
    </div>
  );
}
