"use client"

import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";

interface AddTransactionButtonProps {
    initialTransaction: (newTransaction: any) => void; // or the proper Transaction type
}

interface Transaction {
    id: number;
    name: string;
    category: string;
    amount: number;
    date: string;
    recurring: boolean;
}

export default function AddTransactionButton({ initialTransaction }: AddTransactionButtonProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [transactions, setTransactions] = useState(initialTransaction); // or the proper Transaction type

    const handleAdd = (newTransaction: Transaction) => {
        initialTransaction(newTransaction);
        setIsModalOpen(false);
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
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleAdd}
                />
            )}

        </>
    )
}