import { IndianRupee } from "lucide-react";

export default function TotalBillsCard({ totalBills }: { totalBills: number }) {
    return (
        <div className="bg-gray-900 text-white rounded-xl p-5">
            <p className="text-sm text-gray-400">Total bills</p>
            <p className="text-2xl font-bold mt-2">
                <IndianRupee className="inline-block w-4 h-4" />
                {Math.abs(totalBills).toFixed(2)}
            </p>
        </div>
    );
}   