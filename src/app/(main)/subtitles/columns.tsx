"use client";

import { PATHS } from "@/lib/constants";
import { getLimitedText } from "@/lib/utils";
import { Subtitle } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Subtitle>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: (props) => (<div>{getLimitedText(props.row.original.content)}</div>)
    },
    {
        id: 'view',
        accessorKey: 'id',
        header: "",
        cell: (props) => {
            return (
                <Link className="hover:text-tertiary transition-all" href={`${PATHS.SUBTITLES}/${props.row.original.id}`}>
                    View More
                </Link>
            )
        }
    },
];
