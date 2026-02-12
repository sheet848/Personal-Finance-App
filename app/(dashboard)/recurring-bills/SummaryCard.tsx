export default function SummaryCard({ paidBills, totalUpcoming, dueSoon }: { paidBills: number; totalUpcoming: number; dueSoon: number }) {
    return (
        <div className="bg-white rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Summary</h2>

            <div className="flex justify-between text-sm">
                <span>Paid bills</span>
                <span>{Math.abs(paidBills).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Total Upcoming</span>
                <span>{Math.abs(totalUpcoming).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-red-500">
                <span>Due Soon</span>
                <span>{Math.abs(dueSoon).toFixed(2)}</span>
            </div>
        </div>
    );
}   