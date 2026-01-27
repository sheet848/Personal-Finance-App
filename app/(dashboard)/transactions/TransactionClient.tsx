"use client";

import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";
import TransactionFilters from "./TransactionFilters";

interface TransactionClientProps {
  transactions: any[]; // or the proper Transaction type
  page: number;
  total: number;
  pageSize: number;
}

export default function TransactionClient({ transactions, page, total, pageSize }: TransactionClientProps) {
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
