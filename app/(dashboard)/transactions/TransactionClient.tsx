"use client";

import { useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionFilters from "./TransactionFilters";
import Pagination from "@/components/ui/Pagination";
import { useTransactions } from "@/hooks/useTransactions";


interface TransactionClientProps {
  transactions: any[]; // or the proper Transaction type
  page: number;
  total: number;
  pageSize: number;
}

export default function TransactionClient({ transactions, page, total, pageSize }: TransactionClientProps) {
  
  const [search, setSearch] = useState('');

  //const { data: transactions, loading } = useTransactions({ search });

  return (
    <div className="space-y-6">
      <TransactionFilters 
        search={search} 
        onSearchChange={(value) => setSearch(value)}
      />

      <TransactionTable transactions={transactions} />

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize} 
      />
    </div>
  );
}
