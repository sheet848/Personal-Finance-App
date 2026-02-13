import { createClient } from "@/lib/supabase/server";
import TotalBillsCard from "./TotalBillsCard";
import SummaryCard from "./SummaryCard";
import { recurringSummary } from "@/lib/utils/recurringSummary";
import RecurringBillClient from "./RecurringBillClient";

export default async function RecurringBills() {

  const supabase = await createClient();

  //const page = Number(searchParams.page ?? 1);

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .eq("recurring", true);

  if (error) {
    console.error(error);
    return <p>Failed to load transactions</p>;
  }

  // console.log(transactions);

  const {
    totalBills,
    paidBills,
    totalUpcoming,
    dueSoon
  } = recurringSummary(transactions);

  return (
    <div className="p-6 bg-[#f8f4ef] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Recurring Bills</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <TotalBillsCard totalBills={totalBills} />
          <SummaryCard paidBills={paidBills} totalUpcoming={totalUpcoming} dueSoon={dueSoon} />
        </div>

        {/* Main content */}
        <RecurringBillClient transactions={transactions ?? []} />
      </div>
    </div>
  );
}
