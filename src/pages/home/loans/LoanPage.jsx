import Title from "../../../commons/Title";
import DashboardHeader from "../../../components/headers/DashboardHeader";
import { Sidebar } from "../../../components/sidebar/Sidebar";

function LoanPage() {
    Title("MonieFlex - Pay Bills: Data")

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", backgroundColor: "#F6F0FF" }}>
            <DashboardHeader />
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                <Sidebar />
                <div className="flex flex-col items-center justify-center">
                    <div style={{
                        backgroundColor: "#CFB1FE",
                        borderRadius: "50%",
                        height: "300px",
                        width: "300px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <p style={{
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: "bolder"
                        }}>COMING SOON</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoanPage;