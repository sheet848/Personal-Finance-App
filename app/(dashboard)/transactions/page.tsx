import { createClient } from "@/lib/supabase/server";
import TransactionClient from "./TransactionClient";
import AddTransactionButton from "./AddTransactionButton";

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
}

export default async function Transactions() {

  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
    return <p>Failed to load transactions</p>;
  }

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <AddTransactionButton initialTransaction={transactions} />
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <TransactionClient transactions={transactions ?? []} />
      </div>
    </div>
  );
}
