export default function BillsTableHeader() {
  return (
    <div className="grid grid-cols-12 py-3 text-sm text-gray-500">
      <div className="col-span-6">Bill Title</div>
      <div className="col-span-3">Due Date</div>
      <div className="col-span-3 text-right">Amount</div>
    </div>
  );
}
