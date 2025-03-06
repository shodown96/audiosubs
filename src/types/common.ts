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

export interface DBFile {
    id: string
    url: string
}

export interface PageProps {
    searchParams: { [key: string]: string | undefined },
    // [rest: string]: any
  }