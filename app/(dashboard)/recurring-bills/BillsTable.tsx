import BillsTableHeader from "./BillsTableHeader";
import BillsTableRow from "./BillsTableRow";

interface BillsTableProps {
    transactions?: any[]; // or the proper Bill type
}

export default function BillsTable({ transactions }: BillsTableProps) {
    return (
        <div className="divide-y">
            <BillsTableHeader />
            {
                transactions?.map((transaction, index) => (
                    <BillsTableRow key={index} transaction={transaction} />
                ))
            }
        </div>
    );
}
