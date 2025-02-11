"use client";

import { getMetrics } from "@/actions/get-metrics";
import { DashboardCard } from "@/components/custom/dashboard-card";
import {
  File,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    users: 0,
    subtitles: 0,
    ownedSubtitles: 0
    // revenue: 0,
    // sales: 0,
    // posts: 0,
    // businesses: 0,
    // transactions: 0,
    // usersActiveToday: 0,
    // adminsActiveToday: 0,
  });

  const getDashboardMetrics = async () => {
    try {
      const result = await getMetrics()
      setMetrics(result)
    } catch (error) {

    }
  };

  useEffect(() => {
    getDashboardMetrics()
  }, [])
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <DashboardCard
          title="Users"
          content={metrics.users}
          icon={() => <Users className="h-4 w-4 text-muted-foreground" />}
          description="" />
        <DashboardCard
          title="Subtitles"
          content={metrics.subtitles}
          icon={() => <File className="h-4 w-4 text-muted-foreground" />}
          description="" />
        <DashboardCard
          title="Your Subtitles"
          content={metrics.ownedSubtitles}
          icon={() => <File className="h-4 w-4 text-muted-foreground" />}
          description="" />
      </div>
    </div>
  );
}
