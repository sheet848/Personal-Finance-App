import BillsTableRow from "./BillsTableRow";

interface BillsTableProps {
    transactions?: any[]; // or the proper Bill type
}

export default function BillsTable({ transactions }: BillsTableProps) {

    return (
        <div className="divide-y">
            <div className="grid grid-cols-12 py-3 text-sm text-gray-500">
                <div className="col-span-6">Bill Title</div>
                <div className="col-span-3">Due Date</div>
                <div className="col-span-3 text-right">Amount</div>
            </div>
            {
                transactions?.map((transaction, index) => (
                    <BillsTableRow key={index} transaction={transaction} />
                ))
            }
        </div>
    );
}
