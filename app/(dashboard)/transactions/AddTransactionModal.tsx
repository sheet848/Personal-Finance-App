"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AddTransactionModalProps {
  onClose: () => void;
  onSuccess: (newTransaction: any) => void; // or the proper Transaction type
}

export default async function AddTransactionModal({ onClose, onSuccess }: AddTransactionModalProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget)

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        name: formData.get("name"),
        amount: Number(formData.get("amount")),
        category: formData.get("category"),
        date: new Date().toISOString(),
        recurring: false
      })
      .select()
      .single();

    setLoading(false);

    if (!error) {
      onSuccess(data);
    }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Add Transaction</h2>

        <input
          name="name"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="date"
          type="date"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          name="category"
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Transportation">Transportation</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="recurring"
          />
          Recurring
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
             {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
