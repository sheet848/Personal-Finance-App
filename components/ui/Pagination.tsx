"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void
}

export default function Pagination({ page, total, pageSize, onPageChange }: PaginationProps) {

  //console.log({ page, total, pageSize });

  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <button className="px-3 py-2 border rounded-md disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}>
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2">
        Page {page} of {totalPages}
      </div>


      <button className="px-3 py-2 border rounded-md disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}