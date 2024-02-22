import DashboardHeader from "../../../components/headers/DashboardHeader"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { QuickTransactions } from "./DashboardContents"
import AccountBalance from "../../../components/AccountBalance"
import TransactionHistory from "./TransactionHistory"
import DashboardChart from "./DashboardChart"
import Title from '../../../commons/Title'

function DashboardPage() {
    Title("MonieFlex - Dashboard")

    return (
        <div style={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
        }}>
            <DashboardHeader />
            <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                backgroundColor: "#F6F0FF"
            }}>
                <Sidebar />
                <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
                    <div className="flex justify-between" style={{ padding: "30px" }}>
                        <QuickTransactions />
                        <AccountBalance />
                    </div>
                    <div style={{ padding: "0 30px 30px 30px" }}>
                        <DashboardChart />
                        <TransactionHistory />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage