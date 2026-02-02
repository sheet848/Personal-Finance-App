interface SearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function BillsControls({ searchQuery, onSearchChange }: SearchProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search bills"
        className="border rounded-lg px-4 py-2 w-64"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select className="border rounded-lg px-3 py-2">
        <option>Latest</option>
        <option>Amount</option>
        <option>Due Date</option>
      </select>
    </div>
  );
}
