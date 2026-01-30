"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
}

export default function Pagination({ page, total, pageSize }: PaginationProps) {

  //console.log({ page, total, pageSize });

  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);

  
  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <button className="px-3 py-2 border rounded-md"
        disabled={page === 1} 
        onClick={() => goToPage(page - 1)}>
         Prev
      </button>

      <div className="flex items-center gap-2">
        Page {page} of {totalPages}
      </div>

      
      <button className="px-3 py-2 border rounded-md"
       disabled={page === totalPages} 
        onClick={() => goToPage(page + 1)}>
        Next
      </button>
    </div>
  )
}