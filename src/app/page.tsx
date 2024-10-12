"use client";
import { PATHS } from "@/lib/constants";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) redirect(PATHS.SIGN_IN);
    redirect(PATHS.NEW)
  }, [router, user]);

  return (
    <div className="h-screen bg-primary">
    </div>
  );
}
