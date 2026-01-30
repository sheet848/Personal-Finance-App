"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { OverviewCard } from "@/components/ui/overview-card";
import { calculateDashboardStats } from "@/lib/utils/calculateDashboardStats";
import LogoutButton from "@/components/ui/logout-button";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export default function Dashboard() {

  const supabase = createClient()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTransactions() {
      const { data, error } = await supabase
        .from('transactions')
        .select('id, amount, category, date')

      if (!error && data) {
        setTransactions(data)
      }

      setLoading(false)
    }

    fetchTransactions()
  }, []);

  if (loading) return <div>Loading...</div>

  const { income, expenses, balance } = calculateDashboardStats(transactions);

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OverviewCard
            title="Current Balance"
            value={balance}
            variant="dark"
          />
          <OverviewCard
            title="Income"
            value={income}
          />
          <OverviewCard
            title="Expenses"
            value={expenses}
          />
        </section>
    </div>
  );
}
