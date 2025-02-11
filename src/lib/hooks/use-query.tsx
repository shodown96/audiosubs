import { FilterParams, Pagination } from '@/types/common';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';

function useAPIQuery() {
    const [query, setQuery] = useState<FilterParams>({
        pageSize: DEFAULT_PAGE_SIZE,
        page: 1,
        search: "",
    })
    const [pagination, setPagination] = useState<Pagination>({
        totalPages: 0,
        currentPage: 1,
        total: 0,
    })

    const setP = (values: Partial<Pagination>) => {
        const { totalPages = 0, currentPage = 1, total = 0, } = values
        setPagination({ ...pagination, totalPages, currentPage, total })
    }

    const setQ = (values: Partial<FilterParams>) => {
        setQuery({ ...query, ...values })
    }

    return {
        query,
        setQuery: setQ,
        pagination,
        setPagination: setP
    }
}

export default useAPIQuery