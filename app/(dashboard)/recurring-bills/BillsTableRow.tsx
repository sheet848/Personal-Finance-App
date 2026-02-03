"use client";

interface BillsTableRowProps {
    transaction: {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
    };
};

export default function BillsTableRow({ transaction }: BillsTableRowProps) {
    return (
        <div className="grid grid-cols-12 items-center py-4">
            <div className="col-span-6 flex items-center gap-3">
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
                                {transaction.name[0]}
                            </div>
                        )
                    }

                </div>
                <span className="font-medium">{transaction.name}</span>
            </div>

            <div className="col-span-3 text-sm text-gray-500 flex items-center gap-2">
                {new Date(transaction.date).toLocaleDateString()}
                <span className="w-2 h-2 rounded-full bg-green-600" />
            </div>

            <div className="col-span-3 text-right font-semibold">
                {transaction.amount}
            </div>
        </div>
    );
}
