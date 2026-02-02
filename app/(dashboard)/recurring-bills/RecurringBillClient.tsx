"use client";

import { useState, useMemo } from "react";
import { searchItems } from "@/lib/utils/searchItems";

interface RecurringBillClientProps {
    transactions: any[]; // or the proper Bill type
}

import BillsControls from "./BillsControls";
import BillsTable from "./BillsTable";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 10;

export default function RecurringBillClient({ transactions }: RecurringBillClientProps) {

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const filteredBills = useMemo(() => {
        return searchItems({
            items: transactions,
            query: searchQuery,
            keys: ["name", "category", "notes"]
        });
    }, [transactions, searchQuery]);

    /* Reset page when search changes */
    useMemo(() => {
        setPage(1);
    }, [searchQuery]);

    /* PAGINATION (AFTER search) */
    const paginatedBills = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredBills.slice(start, start + PAGE_SIZE);
    }, [filteredBills, page]);

    return (
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl p-6">
            <BillsControls searchQuery={searchQuery}
                onSearchChange={setSearchQuery} />
            <BillsTable transactions={paginatedBills} />
            <Pagination
                page={page}
                total={filteredBills.length}
                pageSize={PAGE_SIZE} />
        </div>
    )
}