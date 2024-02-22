import * as React from "react";
import { useState } from "react";
import OnboardingHeader from "../../components/headers/OnboardingHeader"
import AuthFormField from "../../components/formfields/AuthFormField"
import PasswordFormField from '../../components/formfields/PasswordFormField'
import { Button, AuthLinkButton } from "../../components/Buttons";
import { Link, useNavigate } from "react-router-dom";
import Assets from "../../assets/Assets";
import OurRoutes from "../../commons/OurRoutes";
import Title from "../../commons/Title"
import SweetAlert from "../../commons/SweetAlert";
import SweetPopup from "../../commons/SweetPopup";
import axiosConfig from "../../services/api/axiosConfig"
import useAuth from "../../services/hooks/useAuth"
import { wait } from "@testing-library/user-event/dist/utils";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { setToken, setEmailAddress, setFirstName, setLastName } = useAuth()

    const handleToggle = () => {
        setVisible(!visible)
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axiosConfig.post("/auth/login", {
                emailAddress: email,
                password: password,
            });
            setIsLoading(false);
            if (response.data["statusCode"] === 200) {
                SweetAlert(response.data["message"], "success")
                setEmailAddress(response.data["data"]["emailAddress"])
                setFirstName(response.data["data"]["firstName"])
                setLastName(response.data["data"]["lastName"])
                setToken(response.data["data"]["token"])
                await wait(1000)
                navigate(OurRoutes.dashboard)
            } else {
                SweetAlert(response.data["message"], 'error')
            }
        } catch(error) {
            setIsLoading(false)
            if(error?.code === "ERR_NETWORK") {
                SweetAlert("Network error. Please check your internet connection", "error")
            }
        }
    };

    Title("MonieFlex - Login to your account")

    return (
        <div className="bg-stone-100 flex flex-col items-stretch">
            <OnboardingHeader />
            <SweetPopup open={ isLoading } />
            <div className="w-full max-md:max-w-full">
                <div className="flex max-md:flex-col max-md:items-stretch">
                    <div className="flex flex-col items-center justify-center items-stretch w-[49%] max-md:w-full max-md:ml-0">
                        <div className="shadow-sm bg-white flex grow flex-col w-full px-20 py-12 max-md:max-w-full max-md:px-5">
                            <p className="text-zinc-800 text-3xl font-bold tracking-wide text-left w-[500px] max-w-full mt-32 max-md:mt-10"
                                style={{
                                    width: '500px', color: '#2E2E2E',
                                    fontFamily: 'Urbanist', fontSize: '28px',
                                    fontStyle: 'normal', fontWeight: 700,
                                    lineHeight: 'normal', letterSpacing: '0.28px',
                                }}
                            >
                                LOGIN
                            </p>
                            <p
                                className="text-neutral-400 text-left font-medium tracking-normal mt-1.5
                                    max-md:max-w-full"
                                style={{
                                    color: '#5B5B5B', fontFamily: 'Urbanist',
                                    fontSize: '16px', fontStyle: 'normal',
                                    fontWeight: 500, lineHeight: 'normal',
                                    letterSpacing: '0.16px'
                                }} >
                                Input your details below to login
                            </p>
                            <AuthFormField
                                id="email"
                                title="Email Address"
                                type="email"
                                onValueChanged={e => setEmail(e)}
                            />
                            <PasswordFormField
                                id="password"
                                title="Password"
                                visible={visible}
                                onToggle={handleToggle}
                                onValueChanged={e => setPassword(e)}
                            />
                            <Link
                                to={ OurRoutes.forgotPassword }
                                className="text-zinc-800 text-center text-xls whitespace-nowrap mt-2
                                self-end max-md:mr-2.5"
                                style={{ fontFamily: 'Urbanist' }}
                            >
                                Forgot Password?
                            </Link>
                            <p className="text-sky-950 text-sm font-medium mt-7 max-md:max-w-full">
                                <span className="text-neutral-400" style={{ fontFamily: 'Urbanist' }}>
                                    By Logging in, I Acknowledge that I have read and agree to the{" "}
                                </span>
                                <span className="text-sky-950">Terms and Conditions</span>
                                <span className="text-neutral-400"> and </span>
                                <span className="text-sky-950">Privacy Policy</span>
                            </p>
                            <Button text="Login" onClick={handleLogin} />
                            <AuthLinkButton
                                isPurple={ false }
                                title="Open a MonieFlex Bank Account"
                                path={OurRoutes.signup}
                            />
                        </div>
                    </div>
                    <img src={ Assets.login } alt="Login" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;