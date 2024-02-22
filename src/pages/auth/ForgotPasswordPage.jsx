import AuthFormField from "../../components/formfields/AuthFormField";
import { AuthLinkButton, Button } from "../../components/Buttons";
import OurRoutes from "../../commons/OurRoutes";
import Assets from "../../assets/Assets";
import OnboardingHeader from "../../components/headers/OnboardingHeader";
import Title from "../../commons/Title"
import { useState } from "react";
import axiosConfig from "../../services/api/axiosConfig";
import SweetAlert from "../../commons/SweetAlert";
import SweetPopup from "../../commons/SweetPopup";
import EmailSent from "../../components/popups/EmailSent";

function ForgotPasswordPage() {
    Title("MonieFlex - Forgot Password?")

    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ isLoadingElement, setLoadingElement ] = useState(true)

    const handleSubmit = async () => {
        setLoading(true)
        await axiosConfig.get(`/auth/check-email-for-password-reset?emailAddress=${email}`)
        .then((response) => {
            setLoading(false)
            if (response.data["statusCode"] === 200) {
                setLoading(true)
                setLoadingElement(false)
            } else {
                SweetAlert(response.data["message"], 'error')
            }
        }).catch((error) => {
            setLoading(false)
            if(error?.code === "ERR_NETWORK") {
                SweetAlert("Network error. Please check your internet connection", "error")
            }
        })
    }

    return (
        <div className="flex flex-col items-stretch h-screen">
            <OnboardingHeader />
            <SweetPopup
                open={loading}
                loaderElement={
                    isLoadingElement ? null : <EmailSent email={email} type="RESET_PASSWORD"/>
                }
            />
            <div className="flex max-md:flex-col max-md:items-stretch h-screen">
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
                            FORGOT PASSWORD?
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
                            Enter your registered Email below and follow the link that will be sent to reset your password
                        </p>
                        <AuthFormField
                            id={"email"}
                            type={"email"}
                            title={"Registered Email Address"}
                            onValueChanged={value => setEmail(value)}
                        />
                        <Button text={"Send"} onClick={handleSubmit}/>
                        <AuthLinkButton title={"Back to Login"} path={OurRoutes.login}/>
                    </div>
                </div>
                <img src={ Assets.forgotPassword } alt="Forgot Password" />
            </div>
        </div>
    );
}

export default ForgotPasswordPage