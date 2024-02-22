import { useEffect, useState } from "react";
import { TransactionTable } from "./TransactionContents";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../../commons/SweetAlert";
import { useCallback } from "react";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([{
        name: "",
        decription: "",
        isCredit: false,
        amount: "",
        status: "",
        date: "",
        time: ""
    }]);
    const [ active, setActive ] = useState(0)
    const [creditTransactions, setCreditTransactions] = useState([]);
    const [debitTransactions, setDebitTransactions] = useState([]);
    const axios = useAxiosWithAuth()

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            fetchHistory(currentPage)
        }
    }

    const handlePreviousPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            fetchHistory(currentPage - 2)
        }
    }


    const fetchHistory = useCallback(async (page) => {
        await axios.get(`/wallet/view-transactions?page=${ page }&size=10`).then((response) => {
            if(response != null) {
                if(response.data["statusCode"] === 200){
                    setTotalPages(response.data["data"]["pages"])
                    const history = response.data["data"]["data"].map(transaction => ({
                        name: transaction.name,
                        description: transaction.description,
                        isCredit: transaction.isCredit,
                        amount: transaction.amount,
                        status: transaction.status,
                        date: transaction.date,
                        time: transaction.time
                    }));
                    setTransactions(history)
                    setCreditTransactions(history.filter((transaction) => transaction.isCredit));
                    setDebitTransactions(history.filter((transaction) => !transaction.isCredit));
                } else {
                    SweetAlert(response.data["message"])
                }
            }
        }).catch((error) => {})
    }, [ axios ])

    useEffect(() => {
        fetchHistory(0);
    }, [ fetchHistory ]);

    const handleClick = (key) => {
        setActive(key)
    }
    const activeStyle = {
        borderBottom: "#4A88DA solid 2px",
        cursor: "pointer"
    }
    const header = ["All Transactions", "Credits", "Debits"]
    const tabHeader = [transactions, creditTransactions, debitTransactions]

    return (
        <>
            <Tabs>
                <div className="border-bottom: none border-gray-200">
                    <TabList className="flex" style={{
                        background: "#FFFFFF",
                        padding: "20px 20px 0 20px",
                        borderRadius: "24px 24px 0 0",
                        gap: "40px",
                        borderBottom: "#BDBDBD solid 2px"
                    }}> {
                        header.map((item, key) => {
                            return <Tab
                                key={ key }
                                onClick={() => handleClick(key)}
                                style={active === key ? activeStyle : {cursor: "pointer"}}
                                selectedClassName="text-blue-500 text-base font-bold whitespace-nowrap"
                            >{ item }</Tab>
                        })
                    }
                    </TabList>
                </div>
                {
                    tabHeader.map((item, key) => {
                        return <TabPanel key={ key }>
                            <TransactionTable transactions={ item } />
                        </TabPanel>
                    })
                }
            </Tabs>
            {
                active === 0 && totalPages > 1 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                        <button
                            className="text-center text-purple-300 font-bold whitespace-nowrap bg-white mt-7 px-5 py-2"
                            onClick={handlePreviousPage}
                            style={{ fontSize: "14px", borderRadius: "16px" }}
                        >Prev</button>
                        <p className="mt-7">Page { currentPage }</p>
                        <button
                            className="text-center text-purple-300 font-bold whitespace-nowrap bg-white mt-7 px-5 py-2"
                            onClick={handleNextPage}
                            style={{ fontSize: "14px", borderRadius: "16px" }}
                        >Next</button>
                    </div>
                )
            }
        </>
    );
};

export default TransactionHistory;