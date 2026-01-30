export default function SummaryCard() {
    return (
        <div className="bg-white rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Summary</h2>

            <div className="flex justify-between text-sm">
                <span>Paid bills</span>
                <span>$1000001000011404.00</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Total Upcoming</span>
                <span>$0.00</span>
            </div>

            <div className="flex justify-between text-sm text-red-500">
                <span>Due Soon</span>
                <span>$0.00</span>
            </div>
        </div>
    );
}   