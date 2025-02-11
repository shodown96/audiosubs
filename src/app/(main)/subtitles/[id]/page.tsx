"use client"
import { getSpeakers } from '@/actions/generate-srt';
import { getSubtitle } from '@/actions/get-subtitle';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PageIDParams } from '@/types/common'
import { Subtitle } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

function SubtitlePage({ params }: PageIDParams) {
    const [loading, setLoading] = useState(false);
    const [speakerText, setSpeakerText] = useState("");
    const [subtitle, setSubtitle] = useState<Subtitle | null>(null)
    const router = useRouter()
    const txtRef = useRef<HTMLTextAreaElement>(null);
    const handleGeneration = async () => {
        if (subtitle) {
            setLoading(true)
            const speakerText = await getSpeakers(subtitle?.id);
            setSpeakerText(speakerText)
            setLoading(false)
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
    const fetchSubtitle = async () => {
        const subtitle = await getSubtitle({ id: params.id })
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
                <Textarea
                    ref={txtRef}
                    rows={20}
                    value={loading ? 'Loading...' : subtitle?.content}
                    className="bg-[#f0f2f4] placeholder:text-[#637588] text-[#111418] rounded min-h-[300px]"
                    placeholder="Generated subtitles appear here, feel free to edit anything that seems off."
                    onChange={e => console.log("yay")}
                />
                <Button onClick={handleDownload} disabled={!subtitle?.content}>
                    Download SRT
                </Button>
                {/* <Button className="bg-blue-600" onClick={handleGeneration} loading={loading} disabled={!subtitle}>
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
    )
}

export default SubtitlePage