"use client"
import SubtitleMediaForm from "@/components/forms/subtitle-media-form";
import { TransacribeForm } from "@/components/forms/transcribe-form";
import { SubtitleMediaParamsType } from "@/lib/validations";
import { ClientSubtitle } from "@/types/subtitles";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function NewSubtitlePage() {
    const { user } = useUser();
    const [step, setStep] = useState(0);
    const [updatedValues, setUpdatedValues] = useState<SubtitleMediaParamsType | undefined>();

    const onSubmittedMedia = async (values: SubtitleMediaParamsType) => {
        setUpdatedValues(values);
        setStep(1)
    }
    const onSubmittedSubtitle = async (values: ClientSubtitle) => {

    }


    return (
        <>
            {step === 0 ? (
                <SubtitleMediaForm
                    updatedValues={updatedValues}
                    onSubmitted={onSubmittedMedia} />
            ) : null}
            {step === 1 ? (
                <TransacribeForm
                    goBack={() => setStep(0)}
                    updatedValues={updatedValues}
                    onSubmitted={onSubmittedSubtitle} />
            ) : null}
        </>
    );
}
