export default function Pagination() {
  return (
    <div className="flex items-center justify-between mt-6">
      <button className="text-sm text-gray-400">‹ Prev</button>

      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-black text-white">1</button>
        <button className="px-3 py-1 rounded border">2</button>
      </div>

      <button className="text-sm">Next ›</button>
    </div>
  );
}
