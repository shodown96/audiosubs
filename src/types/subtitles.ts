import { Subtitle } from "@prisma/client";
import { DBFile, Pagination } from "./common";

export interface GetSubtitlesResponse {
    data: PaginatedData<Subtitle> | null;
    error?: string
}

export interface PaginatedData<T = any> extends Pagination {
    items: T[];
    pageSize: number;
}

export type ClientSubtitle = Subtitle & {
    file: DBFile | null
}