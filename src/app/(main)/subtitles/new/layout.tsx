"use client"
import { ReactNode } from "react";

export default function SubtitleLayout({ children }: { children: ReactNode }) {
    return children
    // return (
    //     <div className="min-h-screen grid grid-cols-12">
    //         <div className="bg-primary col-span-7 max-lg:hidden">
    //         </div>
    //         <div className="col-span-5 max-lg:col-span-12">
    //             {children}
    //         </div>
    //     </div>
    // );
}
