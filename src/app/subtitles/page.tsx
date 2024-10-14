
"use client"
import { getSpeakers } from '@/actions/generate-srt'
import { getSRTs } from '@/actions/get-subtitles'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PATHS } from '@/lib/constants'
import { Subtitle } from '@prisma/client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

function Subtitles() {
    const [selected, setSelected] = useState<Subtitle | null>(null)
    const [subtitles, setSubtitles] = useState<Subtitle[]>([])
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [speakerText, setSpeakerText] = useState("");
    const router = useRouter()
    const txtRef = useRef<HTMLTextAreaElement>(null);

    const handleGeneration = async () => {
        if (selected) {
            setLoading(true)
            const speakerText = await getSpeakers(selected?.id);
            setSpeakerText(speakerText)
            setLoading(false)
        }
    }

    const handleDownload = () => {
        if (txtRef.current?.value) {
            const element = document.createElement("a");
            const file = new Blob([txtRef.current?.value], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${selected?.title}.srt`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }
    }
    useEffect(() => {
        const getSubtitles = async () => {
            setFetching(true)
            const subtitles = await getSRTs()
            setSubtitles(subtitles)
            setFetching(false)
        }
        getSubtitles()
    }, [])
    return (
        <div className="h-screen grid grid-cols-12">
            <div className="bg-primary col-span-7 max-lg:col-span-12">
                <div className='p-5 text-white max-lg:h-[300px] overflow-auto'>
                    <h4 className='mb-4 flex gap-2 items-center'>
                        <ChevronLeft onClick={() => router.replace(PATHS.NEW)} className='cursor-pointer' />
                        Back
                    </h4>
                    <h4 className='text-3xl font-semibold mb-4 flex gap-2 items-center'>
                        Your subtitles
                    </h4>
                    {fetching ? (
                        <div>Loading....</div>
                    ) : (
                        <>
                            {subtitles?.length ? (
                                <>
                                    {subtitles.map(v => (
                                        <div className='border p-4 mb-4 cursor-pointer border-white rounded-lg' onClick={() => setSelected(v)}>
                                            {v.title}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div>No subtitles yet</div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="col-span-5 max-lg:col-span-12 p-5">
                <div className="flex flex-col gap-2">
                    <h4 className='text-3xl font-semibold mb-5'>{selected?.title}</h4>
                    <Textarea
                        ref={txtRef}
                        rows={20}
                        value={selected?.content}
                        className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[300px]"
                        placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                        onChange={e => console.log("yay")}
                    />
                    <Button onClick={handleDownload} disabled={!selected?.content}>
                        Download SRT
                    </Button>
                    {/* <Button className="bg-blue-600" onClick={handleGeneration} loading={loading} disabled={!selected}>
                        Generate Speaker Text
                    </Button>

                    <Textarea
                        rows={20}
                        value={speakerText}
                        className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[400px"
                        placeholder="Generated speaker text appear here, feel free to edit anything that seems off."
                        onChange={e => console.log("yay")}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default Subtitles