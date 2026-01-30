import { createClient } from "@/lib/supabase/server";
import TransactionClient from "./TransactionClient";

const PAGE_SIZE = 10;

export default async function Transactions({ searchParams }: { searchParams: { page?: string }; }) {

  const supabase = await createClient();

  const page = Number(searchParams.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: transactions, count, error } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error);
    return <p>Failed to load transactions</p>;
  }

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          + Add New Transaction
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <TransactionClient transactions={transactions ?? []} page={page}
          total={count ?? 0}
          pageSize={PAGE_SIZE} />
      </div>
    </div>
  );
}
