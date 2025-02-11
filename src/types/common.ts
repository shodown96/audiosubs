export interface FilterParams {
    page?: number;
    pageSize?: number;
    search: string;
}

export interface Pagination {
    totalPages: number;
    currentPage: number;
    total: number;
}

export interface PageIDParams {
    params: {
        id: string
    },
}