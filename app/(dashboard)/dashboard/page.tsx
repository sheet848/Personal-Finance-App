"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { OverviewCard } from "@/components/ui/overview-card";
import { IndianRupee } from "lucide-react";
import { calculateDashboardStats } from "@/lib/utils/calculateDashboardStats";
import LogoutButton from "@/components/ui/logout-button";
import { recurringSummary } from "@/lib/utils/recurringSummary";
import ExpenseByCategoryChart from "@/components/ui/ExpenseByCategoryChart";
import SpendingVelocityChart from "@/components/ui/SpendingVelocityChart";
import { ChevronsRight } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  avatar?: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
}

function buildSpendingVelocity(transactions: Transaction[], year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const daily = Array(daysInMonth).fill(0)

  transactions.forEach(tx => {
    const d = new Date(tx.date)
    if (
      d.getFullYear() === year &&
      d.getMonth() === month
    ) {
      daily[d.getDate() - 1] += tx.amount
    }
  })

  // cumulative sum
  let total = 0
  return daily.map((value, index) => {
    total += value
    return {
      day: index + 1,
      total
    }
  })
}

function TransactionDashboard({ dashboardtransaction }: { dashboardtransaction: Transaction[] }) {
  return (
    <div className="min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">Transactions</h3>
          <a href="/transactions" className="inline-flex items-center text-grey-500 underline">See Details
            <ChevronsRight className="w-4 h-4 text-gray-500" />
          </a>
        </div>
        {dashboardtransaction.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <table className="w-full text-left">
            <tbody>
              {dashboardtransaction.map((tx) => (
                <tr key={tx.id} className="border-b last:border-none">
                  <td className="py-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                      {
                        tx.avatar ? (
                          <img
                            src={tx.avatar}
                            alt={tx.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                            {tx.name[0].toLocaleUpperCase()}
                          </div>
                        )
                      }

                    </div>
                    <span className="font-medium">{tx.name}</span>
                  </td>

                  <td
                    className={`text-right font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {tx.amount > 0 ? "+" : "-"}<IndianRupee className="inline-block w-4 h-4" />
                    {Math.abs(tx.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function RecurringDashboard({ paidBills, totalUpcoming, dueSoon }: { paidBills: number; totalUpcoming: number; dueSoon: number; }) {
  return (
    <div className="min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">Recurring Bills</h3>
          <a href="/recurring-bills" className="inline-flex items-center text-grey-500 underline">See Details
            <ChevronsRight className="w-4 h-4 text-gray-500" />
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative w-full rounded-[8px] bg-[#f8f4ef] px-4 py-5 border-l-4 border-teal-700">
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">Paid Bills</p>
              <p className="text-preset-4 font-bold text-grey-900">
                <IndianRupee className="inline-block w-4 h-4" />
                {Math.abs(paidBills).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative w-full rounded-[8px] bg-[#f8f4ef] px-4 py-5 border-l-4 border-red-300">
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">Total Upcoming</p>
              <p className="text-preset-4 font-bold text-grey-900">
                <IndianRupee className="inline-block w-4 h-4" />
                {Math.abs(totalUpcoming).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative w-full rounded-[8px] bg-[#f8f4ef] px-4 py-5 border-l-4 border-teal-300">
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">Due Soon</p>
              <p className="text-preset-4 font-bold text-grey-900">
                <IndianRupee className="inline-block w-4 h-4" />
                {Math.abs(dueSoon).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {

  const supabase = createClient();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      const { data, error } = await supabase
        .from('transactions')
        .select("*", { count: "exact" });

      if (!error && data) {
        setTransactions(data);
      }

      setLoading(false)
    }

    fetchTransactions()
  }, []);

  if (loading) return <div>Loading...</div>

  const now = new Date();

  // data for velocity map
  const currentMonthData = buildSpendingVelocity(
    transactions,
    now.getFullYear(),
    now.getMonth()
  )

  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const previousMonthData = buildSpendingVelocity(
    transactions,
    previousMonthDate.getFullYear(),
    previousMonthDate.getMonth()
  )

  const { income, expenses, balance } = calculateDashboardStats(transactions); // overview card stats

  const {
    paidBills,
    totalUpcoming,
    dueSoon
  } = recurringSummary(transactions); // recurring bill summary

  const dashboardTransactions = transactions.slice(0, 5); // Show only the latest 5 transactions

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
      <section className="columns-1 gap-4 lg:columns-2">
        {/* Additional dashboard content can go here */}
        <div className="mb-4 break-inside-avoid">
          <SpendingVelocityChart currentMonth={currentMonthData} previousMonth={previousMonthData} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <TransactionDashboard dashboardtransaction={dashboardTransactions} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <ExpenseByCategoryChart transactions={transactions} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <RecurringDashboard paidBills={paidBills} totalUpcoming={totalUpcoming} dueSoon={dueSoon} />
        </div>
      </section>
    </div>
  );
}


