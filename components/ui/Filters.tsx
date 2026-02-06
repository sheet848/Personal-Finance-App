export default function Filters() {
    return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search transaction"
        className="border rounded-md px-3 py-2 text-sm w-64"
      />
      </div>    
    )
}