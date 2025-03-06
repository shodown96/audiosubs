"use client"
import { generateSpeakers } from '@/actions/assemblyai/generate-speakers';
import { getSubtitle } from '@/actions/subtitles/get-subtitle';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PageIDParams } from '@/types/common';
import { ClientSubtitle } from '@/types/subtitles';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function SubtitlePage({ params }: PageIDParams) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [loadingSpeakers, setLoadingSpeakers] = useState(false);
    const [speakerText, setSpeakerText] = useState("");
    const [subtitle, setSubtitle] = useState<ClientSubtitle | null>(null)
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const txtSpeakerRef = useRef<HTMLTextAreaElement>(null);
    const handleGeneration = async () => {
        if (subtitle?.file) {
            setLoadingSpeakers(true)
            const speakerText = await generateSpeakers(subtitle.file);
            setSpeakerText(speakerText)
            setLoadingSpeakers(false)
        }
    }

    const handleDownload = () => {
        if (txtRef.current?.value) {
            const element = document.createElement("a");
            const file = new Blob([txtRef.current?.value], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${subtitle?.title}.srt`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const handleDownloadSpeakers = () => {
        if (txtSpeakerRef.current?.value) {
            const element = document.createElement("a");
            const file = new Blob([txtSpeakerRef.current?.value], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${subtitle?.title} speakers.txt`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    const fetchSubtitle = async () => {
        const subtitle = await getSubtitle({ id: params.id })
        console.log(subtitle?.file || subtitle?.mediaURL, subtitle?.format)
        setSubtitle(subtitle)
    }
    useEffect(() => {
        if (params.id) {
            fetchSubtitle()
        }
    }, [params.id])
    return (
        <div className="col-span-5 max-lg:col-span-12 p-5">
            <div className="flex flex-col gap-2">
                <h4 className='text-3xl font-semibold mb-5'>{subtitle?.title}</h4>
                {subtitle?.file?.url || subtitle?.mediaURL ? (
                    <div className="w-full">
                        {subtitle.format === 'audio' ? (
                            <audio controls className="w-full">
                                <source src={String(subtitle.file?.url || subtitle?.mediaURL)} />
                                Your browser does not support the audio element.
                            </audio>
                        ) : null}

                        {subtitle.format === 'video' ? (
                            <video controls className="w-full border">
                                <source src={String(subtitle.file?.url || subtitle?.mediaURL)} />
                                Your browser does not support the video element.
                            </video>
                        ) : null}
                        {!subtitle.format ? (
                            <audio controls className="w-full">
                                <source src={String(subtitle.file?.url || subtitle?.mediaURL)} />
                                Your browser does not support the audio element.
                            </audio>
                        ) : null}
                    </div>
                ) : null}
                <div className='flex gap-4 lg:flex-row flex-col'>
                    <div className='w-full flex flex-col gap-2'>
                        <Textarea
                            ref={txtRef}
                            rows={20}
                            value={loading ? 'Loading...' : subtitle?.content}
                            className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[300px]"
                            placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                            onChange={e => console.log("yay")}
                        />
                        <Button
                            onClick={handleDownload}
                            disabled={!subtitle?.content}
                        >
                            Download SRT
                        </Button>
                    </div>
                    {subtitle?.file ? (
                        <div className='w-full flex flex-col gap-2'>
                            <Textarea
                                rows={20}
                                ref={txtSpeakerRef}
                                value={speakerText}
                                className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[400px"
                                placeholder="Generated speaker text appear here, feel free to edit anything that seems off."
                                onChange={e => console.log("yay")}
                            />
                            <div className="flex gap-2">
                                <Button
                                    className="bg-blue-900 w-full"
                                    loading={loadingSpeakers}
                                    onClick={handleGeneration}
                                    disabled={!subtitle || loading}
                                >
                                    Generate Speaker Text
                                </Button>
                                <Button
                                    className="bg-blue-900 w-full"
                                    onClick={handleDownloadSpeakers}
                                    disabled={!subtitle || loading || loadingSpeakers}
                                >
                                    Download Speaker Text
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default SubtitlePage