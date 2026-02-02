"use client";

//import { useSearch } from "@/hooks/useSearch";
import TransactionTable from "./TransactionTable";
import TransactionFilters from "./TransactionFilters";
import Pagination from "@/components/ui/Pagination";
//import { SearchBar } from "@/components/ui/SearchBar";

interface TransactionClientProps {
  transactions: any[]; // or the proper Transaction type
  page: number;
  total: number;
  pageSize: number;
}

export default function TransactionClient({ transactions, page, total, pageSize }: TransactionClientProps) {

  /*const { search, debouncedSearch, setSearch } = useSearch();

  const { data, total, loading } = useTransactions({
    search: debouncedSearch,
    page,
  });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,category.ilike.%${search}%`
    );
  }*/


  return (
    <div className="space-y-6">
      <TransactionFilters />

      <TransactionTable transactions={transactions} />

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
}
