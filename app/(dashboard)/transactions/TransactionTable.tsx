import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  transactions: any[]; // or the proper Transaction type
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-3">Recipient / Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx, idx) => (
            <TransactionRow key={idx} transaction={tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
