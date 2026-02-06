"use client"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newTransaction: any) => void; // or the proper Transaction type
}

export default function AddTransactionModal({ isOpen, onClose, onSuccess }: AddTransactionModalProps) {
  const supabase = createClient();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
    recurring: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const payload = {
      user_id: user.id,
      name: form.name,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      recurring: form.recurring,
    };

    const { error } = await supabase
      .from("transactions")
      .insert([payload]);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    onSuccess();
    onClose();

    // reset form
    setForm({
      name: "",
      amount: "",
      category: "",
      date: "",
      recurring: false,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            className="w-full border px-3 py-2 rounded"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            name="date"
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={form.date}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="w-full border px-3 py-2 rounded"
            value={form.category}
            onChange={handleChange}
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
              checked={form.recurring}
              onChange={handleChange}
            />
            Recurring
          </label>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-6">
            <button onClick={onClose}>Cancel</button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
