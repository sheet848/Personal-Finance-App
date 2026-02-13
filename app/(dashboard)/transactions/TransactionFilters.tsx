interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  category: string;
  onCategoryChange: (query: string) => void;
  sortBy: string;
  onSortChange: (query: string) => void;
}

export default function TransactionFilters({ searchQuery, onSearchChange, category, onCategoryChange, sortBy, onSortChange }: SearchProps) {

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search transaction"
        className="border rounded-md px-3 py-2 text-sm w-64"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Right controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border rounded-md px-3 py-2 pr-10">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A–Z</option>
            <option value="z-a">Z–A</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Filter by Category</span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="border rounded-md px-3 py-2">
            <option value="all">All Transactions</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Groceries">Groceries</option>
            <option value="Dining Out">Dining Out</option>
            <option value="Transportation">Transportation</option>
          </select>
        </div>
      </div>
    </div>
  );
}
