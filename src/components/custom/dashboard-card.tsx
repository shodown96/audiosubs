

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { ReactNode } from "react";

export const DashboardCard = ({
    title,
    icon,
    description,
    content,
}: {
    title: string,
    icon: () => ReactNode,
    description: string,
    content: string | number,
}) => {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon()}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{content}</div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
