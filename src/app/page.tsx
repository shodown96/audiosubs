"use client"
import { generateSRT } from "@/actions/generate-srt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertToBase64 } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [generated, setGenerated] = useState("")
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const txtRef = useRef<HTMLTextAreaElement>(null);

  const handleGeneration = async () => {
    if (!selectedFile) return
    setLoading(true)
    const srt = await generateSRT(selectedFile)
    setGenerated(srt)
    setLoading(false)
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
  const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      setSelectedFile(files[0])
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center p-20 gap-5">
      <h1 className="text-4xl font-bold">AudioSubs</h1>
      <div className="w-full">
        <label htmlFor="">Upload Audio File</label>
        <Input type="file" onChange={handleSelectedFile} className="cursor-pointer" />
        {selectedFile ? <small>{selectedFile.name}</small> : null}
      </div>
      <Textarea rows={20} ref={txtRef} value={generated} onChange={e => console.log("yay")}></Textarea>
      <div className="flex gap-2 w-full">
        <Button onClick={handleGeneration} loading={loading} disabled={!selectedFile}>
          Generate SRT
        </Button>
        <Button onClick={handleDownload} disabled={!generated}>
          Download SRT
        </Button>
      </div>
    </div>
  );
}
