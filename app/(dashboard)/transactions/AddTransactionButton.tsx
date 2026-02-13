"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AddTransactionModal from "./AddTransactionModal";

export default function AddTransactionButton({ initialTransactions }: { initialTransactions: any[] }) {

    const [transactions, setTransactions] = useState(initialTransactions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const supabase = createClient();

    async function refreshTransactions() {

        const { data } = await supabase
            .from("transactions")
            .select("*")
            .order("date", { ascending: false });

        if (data) setTransactions(data);
    }

    return (
        <>
            <button
                className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                onClick={() => setIsModalOpen(true)}
            >
                + Add New Transaction
            </button>

            {isModalOpen && (
                <AddTransactionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={refreshTransactions}
                />
            )}
        </>
    )
}