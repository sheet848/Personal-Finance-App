export default function BillsControls() {
  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search bills"
        className="border rounded-lg px-4 py-2 w-64"
      />

      <select className="border rounded-lg px-3 py-2">
        <option>Latest</option>
        <option>Amount</option>
        <option>Due Date</option>
      </select>
    </div>
  );
}
