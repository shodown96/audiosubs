
"use client"
import { getSpeakers } from '@/actions/generate-srt'
import { getSRTs } from '@/actions/get-subtitles'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { PATHS } from '@/lib/constants'
import { Subtitle } from '@prisma/client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Subtitles() {
    const [selected, setSelected] = useState<Subtitle | null>(null)
    const [subtitles, setSubtitles] = useState<Subtitle[]>([])
    const [loading, setLoading] = useState(false);
    const [speakerText, setSpeakerText] = useState("");
    const router = useRouter()

    const handleGeneration = async () => {
        if (selected) {
            setLoading(true)
            const speakerText = await getSpeakers(selected?.id);
            setSpeakerText(speakerText)
            setLoading(false)
        }
    }
    useEffect(() => {
        const getSubtitles = async () => {
            const subtitles = await getSRTs()
            setSubtitles(subtitles)
        }
        getSubtitles()
    }, [])
    return (
        <div className="h-screen grid grid-cols-12">
            <div className="bg-primary col-span-7 max-lg:hidden">
                <div className='p-5 text-white'>
                    <h4 className='text-3xl font-semibold mb-4 flex gap-2 items-center'>
                        <ChevronLeft onClick={() => router.replace(PATHS.NEW)} className='cursor-pointer' />
                        Your subtitles

                    </h4>
                    {subtitles?.length ? (
                        <>
                            {subtitles.map(v => (
                                <div className='border p-4 cursor-pointer border-white' onClick={() => setSelected(v)}>
                                    {v.title}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>No subtitles yet</div>
                    )}
                </div>
            </div>
            <div className="col-span-5 max-lg:col-span-12 p-5">
                <div className="flex flex-col gap-2">
                    <h4 className='text-3xl font-semibold mb-5'>{selected?.title}</h4>
                    <Textarea
                        rows={20}
                        value={selected?.content}
                        className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[400px"
                        placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                        onChange={e => console.log("yay")}
                    />
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