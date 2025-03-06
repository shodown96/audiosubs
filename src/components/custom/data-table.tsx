"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  loading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowSelection?: any,
  pagination?: {
    currentPage: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  setRowSelection?: OnChangeFn<RowSelectionState>
}

export function DataTable<TData, TValue>({
  loading,
  columns,
  data,
  pagination,
  rowSelection = {},
  setRowSelection = () => { }
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const previous = (Number(pagination?.currentPage) || 0) - 1 > 0;
  const next = (pagination?.total || 0) - (Number(pagination?.currentPage) || 0) > 0;

  const handleChangePage = (mode: "next" | "previous") => {
    if (mode == "next" && next) {
      pagination?.onPageChange(Number(pagination.currentPage) + 1);
    }
    if (mode == "previous" && previous) {
      pagination?.onPageChange(Number(pagination.currentPage) - 1);
    }
  };

  return (
    <>
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>)}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {pagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem
              onClick={() => handleChangePage("previous")}
              className={cn(previous ?? "opacity-50 hover:bg-transparent")}
            >
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">{pagination.currentPage}</PaginationLink>
            </PaginationItem>

            <PaginationItem
              onClick={() => handleChangePage("next")}
              className={cn(next ?? "opacity-50 hover:bg-transparent")}
            >
              <PaginationNext href="#" />
            </PaginationItem>

            <div className="text-sm">
              {pagination.total} {pagination.total === 1 ? "page" : "pages"}
            </div>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
