const TableCell = ({ text, isCredit = false, isAmount = false, isStatus = false }) => {
    return (
        <td className="px-6 py-4 whitespace-nowrap" style={{
            color: (isCredit && isAmount) || (text === "SUCCESSFUL" && isStatus)
                ? "#00FA9A"
                : (!isCredit && isAmount) || (text === "FAILED" && isStatus)
                ? "#DC143C"
                : text === "PENDING" && isStatus
                ? "#C39A13"
                : null
        }}>
            {text}
        </td>
    );
};

const TableRow = ({ children, isCredit = false }) => {
    return (
        <tr
            className={`self-stretch w-full items-stretch justify-between gap-5 pl-7 pr-4 py-3.5 rounded-md`}
            style={{
                backgroundColor: `${isCredit ? "#FFFFFF" : "#FFF7F9"}`
            }}
        >
            {children}
        </tr>
    );
};

const TableHeader = ({text = ""}) => {
    return (
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">{ text }</th>
    )
}


export const TransactionTable = ({ transactions = [{
    name: '', description: '', isCredit: false,
    amount: 0, status: "", date: "", time: ""
}] }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
                <tr>
                    <TableHeader text="Name" />
                    <TableHeader text="Description" />
                    <TableHeader text="Amount" />
                    <TableHeader text="Status" />
                    <TableHeader text="Date" />
                    <TableHeader text="Time" />
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{
                transactions.map((transaction, key) => {
                    return <TableRow key={ key } isCredit={ transaction.isCredit }>
                        <TableCell
                            text={transaction.name}
                        />
                        <TableCell
                            text={transaction.description}
                        />
                        <TableCell
                            text={ transaction.amount }
                            isAmount={ true }
                            isCredit={ transaction.isCredit }
                        />
                        <TableCell
                            isStatus={ true }
                            text={ transaction.status }
                        />
                        <TableCell
                            text={ transaction.date }
                        />
                        <TableCell
                            text={ transaction.time }
                        />
                    </TableRow>
                })
            }
            </tbody>
        </table>
    );
};