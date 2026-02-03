"use client";

import { useState, useEffect, useMemo } from "react";
import TransactionTable from "./TransactionTable";
import TransactionFilters from "./TransactionFilters";
import Pagination from "@/components/ui/Pagination";

interface TransactionClientProps {
  transactions: any[]; // or the proper Transaction type
}

const PAGE_SIZE = 10;

export default function TransactionClient({ transactions }: TransactionClientProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);

  /* SEARCH */
  let filteredTransactions = debouncedSearch
    ? transactions.filter((tx) =>
      tx.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    : transactions;
  
  /* CATEGORY */
  if(category !== "all") {
    filteredTransactions = filteredTransactions.filter(tx => tx.category === category);
  }

  /* SORTING */
  filteredTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (sortBy === "latest") {
      return dateB - dateA;
    } else if (sortBy === "oldest") {
      return dateA - dateB;
    } else if (sortBy === "a-z") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "z-a") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "highest") {
      return b.amount - a.amount;
    } else if (sortBy === "lowest") {
      return a.amount - b.amount;
    }
    return 0;
  });

  /* PAGINATION */
  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredTransactions.slice(start, end)
  }, [filteredTransactions, page]);

  /* Reset page when search changes */
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  //console.log({ filteredTransactions, paginatedTransactions });

  return (
    <div className="space-y-6">
      <TransactionFilters searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <TransactionTable transactions={paginatedTransactions} />

      <Pagination
        page={page}
        total={filteredTransactions.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
}
