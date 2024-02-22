import Title from "../../../../commons/Title";
import DashboardHeader from "../../../../components/headers/DashboardHeader";
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { ElectricityForm } from "./ElectricityForm";
import AccountBalance from "../../../../components/AccountBalance";
import SideHistory from "../../../../components/SideHistory"
import useAxiosWithAuth from "../../../../services/hooks/useAxiosWithAuth";
import { useEffect, useState } from "react";
import { useCallback } from "react";

function ElectricityPage() {
    Title("MonieFlex - Pay Bills: Electricity")

    const axios = useAxiosWithAuth()
    const [history, setHistory] = useState([
        {
            number: "",
            firstName: ""
        }
    ]);

    const onLoad = useCallback(async () => {
        await axios.get("/wallet/history?page=0&size=10&type=ELECTRICITY").then((response) => {
            if(response != null) {
                if(response.data["statusCode"] === 200) {
                    const mappedHistory = response.data["data"].map(transaction => ({
                        number: transaction.name,
                        firstName: transaction.description || ""
                    }));
                    setHistory(mappedHistory);
                }
            }
        }).catch((error) => {})
    }, [ axios ])

    useEffect(() => {
        onLoad()
    }, [ ])

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", backgroundColor: "#F6F0FF" }}>
            <DashboardHeader />
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                <Sidebar />
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto"}}>
                    <ElectricityForm />
                    <div style={{ padding: '50px 30px' }}>
                        <AccountBalance />
                        <SideHistory
                            title={"Recent Electricity Transactions"}
                            history={ history }
                            isFlexed={ true }
                            needAvatar={ true }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectricityPage;