import { BrowserRouter, Route, Routes } from "react-router-dom";
import {SnackbarProvider} from "notistack";
import AirtimePurchasePage from "./pages/home/airtime-purchase/AirtimePage";
import TransferPage from  "./pages/home/transfer/TransferPage"
import DashboardPage from "./pages/home/dashboard/DashboardPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import DataPage from "./pages/home/bills/data/DataPage"
import ElectricityPage from "./pages/home/bills/electricity/ElectricityPage"
import TVPage from "./pages/home/bills/tv/TVPage"
import ViewProfile from "./pages/home/profile/ViewProfile";
import OurRoutes from "./commons/OurRoutes"
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import LoanPage from "./pages/home/loans/LoanPage";
import CardPage from "./pages/home/cards/CardPage";
import AuthenticatedRoute from "./services/AuthenticatedRoute";
import FundWallet from "./components/popups/FundWallet";
import TransactionPin from "./components/popups/TransactionPin";
import ConfirmEmailPage from "./pages/auth/ConfirmEmailPage"

function App() {
    return (
        <>
            <SnackbarProvider 
                maxSnack={2} 
                iconVariant={{
                    success: '✅ ',
                    error: '✖️ ',
                    warning: '⚠️ ',
                    info: 'ℹ️ ',
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path={ OurRoutes.confirmEmail } element={ <ConfirmEmailPage /> } />
                    <Route path={ OurRoutes.login } element={ <LoginPage /> } />
                    <Route path={ OurRoutes.signup } element={ <SignupPage /> } />
                    <Route path={ OurRoutes.forgotPassword } element={ <ForgotPasswordPage /> } />
                    <Route path={ OurRoutes.resetPassword } element={ <ResetPasswordPage /> } />
                    <Route path={ OurRoutes.wallet } element={ <FundWallet /> } />
                    <Route path="/pin" element={<TransactionPin/> }/>
                    <Route path={ OurRoutes.airtime } element={
                        <AuthenticatedRoute>
                            <AirtimePurchasePage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.transfer } element={
                        <AuthenticatedRoute>
                            <TransferPage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.dashboard } element={
                        <AuthenticatedRoute>
                            <DashboardPage />
                        </AuthenticatedRoute>
                    } />

                    <Route path={ OurRoutes.data } element={
                        <AuthenticatedRoute>
                            <DataPage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.electricity } element={
                        <AuthenticatedRoute>
                            <ElectricityPage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.tv } element={
                        <AuthenticatedRoute>
                            <TVPage />
                        </AuthenticatedRoute>
                    } />

                    <Route path={ OurRoutes.loan } element={
                        <AuthenticatedRoute>
                            <LoanPage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.card } element={
                        <AuthenticatedRoute>
                            <CardPage />
                        </AuthenticatedRoute>
                    } />
                    <Route path={ OurRoutes.profile } element={
                        <AuthenticatedRoute>
                            <ViewProfile />
                        </AuthenticatedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
