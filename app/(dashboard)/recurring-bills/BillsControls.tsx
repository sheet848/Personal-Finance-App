interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (query: string) => void;
}

export default function BillsControls({ searchQuery, onSearchChange, sortBy, onSortChange }: SearchProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search bills"
        className="border rounded-lg px-4 py-2 w-64"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select className="border rounded-lg px-3 py-2" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="a-z">A–Z</option>
        <option value="z-a">Z–A</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
    </div>
  );
}
