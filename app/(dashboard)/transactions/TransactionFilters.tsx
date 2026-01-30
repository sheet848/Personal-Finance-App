interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function TransactionFilters({
  search, onSearchChange,
}: Props) {

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Search */}
      <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search transaction"
            className="border rounded-md px-3 py-2 text-sm w-64"
        />

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sort by</span>
          <select className="border rounded-md px-3 py-2">
            <option>Latest</option>
            <option>Oldest</option>
            <option>Amount</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Filter by Category</span>
          <select className="border rounded-md px-3 py-2">
            <option>All Transactions</option>
            <option>General</option>
            <option>Entertainment</option>
            <option>Bills</option>
          </select>
        </div>
      </div>
    </div>
  );
}
