import { createClient } from "@/lib/supabase/server";
import TotalBillsCard from "./TotalBillsCard";
import SummaryCard from "./SummaryCard";
import BillsControls from "./BillsControls";
import BillsTable from "./BillsTable";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 3;

export default async function RecurringBills({ searchParams }: { searchParams: { page?: string }; }) {

  const supabase = await createClient();

  const page = Number(searchParams.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: transactions, count, error } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .range(from, to)
    .eq("recurring", true);

  if (error) {
    console.error(error);
    return <p>Failed to load transactions</p>;
  }

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Recurring Bills</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <TotalBillsCard />
          <SummaryCard />
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl p-6">
          <BillsControls />
          <BillsTable transactions={transactions} />
          <Pagination
            page={page}
            total={count}
            pageSize={PAGE_SIZE} />
        </div>
      </div>
    </div>
  );
}
