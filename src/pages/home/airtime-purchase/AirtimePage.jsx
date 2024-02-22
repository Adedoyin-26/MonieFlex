import DashboardHeader from "../../../components/headers/DashboardHeader"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import AccountBalance from "../../../components/AccountBalance"
import Title from "../../../commons/Title"
import SideHistory from "../../../components/SideHistory"
import { AirtimeForm } from "./AirtimeForm"
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth"
import { useCallback, useEffect, useState } from "react"

function AirtimePage() {
    Title("MonieFlex - Purchase Airtime")

    const axios = useAxiosWithAuth()
    const [history, setHistory] = useState([
      {
        number: "",
        firstName: ""
      }
    ]);

    const onLoad = useCallback(async () => {
      await axios.get("/wallet/history?page=0&size=10&type=AIRTIME").then((response) => {
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
        <div style={{
          display: "grid",
          gridTemplateRows: "auto 1fr"
        }}>
          <DashboardHeader />
          <div style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            backgroundColor: "#F6F0FF"
          }}>
            <Sidebar />
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              padding: "50px"
            }}>
              <AirtimeForm />
              <div style={{ marginRight: "30px", marginLeft: "40px" }}>
                <AccountBalance />
                <SideHistory
                  title={ "Frequent Beneficiaries" }
                  history={ history }
                  isFlexed={ true }
                />
            </div>
          </div>
        </div>
      </div>
    )
}

export default AirtimePage
