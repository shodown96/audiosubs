import { Subtitle } from "@prisma/client";
import { Pagination } from "./common";

export interface GetSubtitlesResponse {
    data: PaginatedData<Subtitle> | null;
    error?: string
}

export interface PaginatedData<T = any> extends Pagination {
    items: T[];
    pageSize: number;
}