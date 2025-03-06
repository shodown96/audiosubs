"use client"


import { getSRTs } from '@/actions/subtitles/get-subtitles'
import { DataTable } from '@/components/custom/data-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PATHS } from '@/lib/constants'
import useAPIQuery from '@/lib/hooks/use-query'
import { delayDebounceFn } from '@/lib/utils'
import { PageProps } from '@/types/common'
import { Subtitle } from '@prisma/client'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { columns } from './columns'

export default function SubtitlesPage({
    searchParams,
}: PageProps) {
    const { query, setQuery, pagination, setPagination } = useAPIQuery()
    const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchSubtitles = async () => {
        try {
            const result = await getSRTs({ query })
            console.log("result", result?.data?.items)
            if (result?.data) {
                setSubtitles(result.data.items);
                setPagination({
                    total: result.data.totalPages,
                    currentPage: result.data.currentPage,
                });
            }
        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            if (loading) {
                setLoading(false)
            }
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true)
        setQuery({
            page: 1,
            search: "",
        });
        await fetchSubtitles()
        setRefreshing(false)
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery({
            [e.target.id]: e.target.value,
        });
    };

    const handlePageChange = (page: number) => {
        setQuery({ page });
    };


    useEffect(() => {
        if (searchParams?.search?.length) {
            const delayDebounce = delayDebounceFn(fetchSubtitles);
            return () => clearTimeout(delayDebounce);
        } else if (searchParams.page || query.page) {
            fetchSubtitles()
        }
    }, [searchParams]);

    return (
        <div>
            <div>
                <div className="flex justify-between max-md:flex-col gap-2">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Filter by movie names, descriptions"
                            id={"search"}
                            value={query.search}
                            onChange={handleChange}
                            className="min-w-96 mb-4 flex-1"
                        />
                    </div>
                    <div className="flex justify-end mb-4 gap-2">
                        <Button onClick={handleRefresh} loading={refreshing}>Refresh Subtitles</Button>
                        <Link href={PATHS.NEW_SUBTITLE}>
                            <Button>New Subtitle</Button>
                        </Link>
                    </div>
                </div>
                <DataTable
                    loading={loading}
                    columns={columns}
                    data={subtitles}
                    pagination={{
                        ...pagination,
                        onPageChange: handlePageChange,
                    }}
                />
            </div>
        </div>
    )
}
