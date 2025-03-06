import { FilterParams, Pagination } from '@/types/common';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { objectToQueryString } from '../utils';

function useAPIQuery() {
    const router = useRouter()
    const pathname = usePathname()
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

    const setQ = (params: Partial<FilterParams>) => {
        const { pageSize, ...rest } = params
        const queryString = objectToQueryString(rest)
        router.push(`${pathname}?${queryString}`)
        setQuery({ ...query, ...params })
    }

    return {
        query,
        setQuery: setQ,
        pagination,
        setPagination: setP
    }
}

export default useAPIQuery