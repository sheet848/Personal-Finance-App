"use client";

import { useState, useEffect, useMemo } from "react";

interface RecurringBillClientProps {
    transactions: any[]; // or the proper Bill type
}

import BillsControls from "./BillsControls";
import BillsTable from "./BillsTable";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 10;

export default function RecurringBillClient({ transactions }: RecurringBillClientProps) {

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [page, setPage] = useState(1);

    /* SEARCH */
    let filteredRecurring = debouncedSearch
        ? transactions.filter((tx) =>
            tx.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        : transactions;

    /* SORTING */
    filteredRecurring = [...filteredRecurring].sort((a, b) => {
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

    /* PAGINATION (AFTER search) */
    const paginatedRecurring = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        return filteredRecurring.slice(start, end)
    }, [filteredRecurring, page]);

    /* Reset page when search changes */
    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500); // debounce delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    //console.log({ filteredRecurring, paginatedRecurring });

    return (
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl p-6">
            <BillsControls searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy} 
            />
            <BillsTable transactions={paginatedRecurring} />
            <Pagination
                page={page}
                total={filteredRecurring.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
            />
        </div>
    )
}