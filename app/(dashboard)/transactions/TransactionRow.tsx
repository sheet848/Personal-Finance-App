import { IndianRupee } from "lucide-react";

interface Props {
    transaction: {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
    };
};

export default function TransactionRow({ transaction }: Props) {
    const isPositive = transaction.amount > 0;

    return (
        <tr className="border-b last:border-none">
            <td className="py-4 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                    {
                        transaction.avatar ? (
                            <img
                                src={transaction.avatar}
                                alt={transaction.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                                {transaction.name[0].toLocaleUpperCase()}
                            </div>
                        )
                    }

                </div>
                <span className="font-medium">{transaction.name}</span>
            </td>

            <td>{transaction.category}</td>

            <td className="text-gray-500">
                {new Date(transaction.date).toLocaleDateString("en-CA")}
            </td>

            <td
                className={`text-right font-semibold ${isPositive ? "text-green-600" : "text-red-600"
                    }`}
            >
                {isPositive ? "+" : "-"}<IndianRupee className="inline-block w-4 h-4" />
                {Math.abs(transaction.amount).toFixed(2)}
            </td>
        </tr>
    );
}
