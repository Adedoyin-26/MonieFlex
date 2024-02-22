import { Link, useNavigate } from "react-router-dom";
import Assets from "../../assets/Assets";
import SweetAlert from "../../commons/SweetAlert";
import axiosConfig from "../../services/api/axiosConfig";
import OurRoutes from "../../commons/OurRoutes";
import Title from "../../commons/Title"
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { wait } from "@testing-library/user-event/dist/utils";
import { CircularProgress } from "@mui/material";

const ConfirmEmailPage = () =>  {
    const [ loading, setLoading ] = useState(true)
    const [ emailSent, setEmailSent ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ verified, setVerified ] = useState(false)
    const [ searchParams ] = useSearchParams()
    const [ email, setEmail ] = useState("")

    const isMounted = useRef(false);

    const navigate = useNavigate()

    useEffect(() => {
        loadPage()
    })

    const loadPage = () => {
        var token = searchParams.get("token");
        console.log(token)
        console.log(isMounted)

        if(!isMounted.current) {
            if(token != null) {
                verifyEmailAddress(token)
                decodeJWT(token)
            } else {
                SweetAlert("Invalid request. You will be redirected to signup", 'info')
                handleRedirect(OurRoutes.signup)
            }
            isMounted.current = true;
        }
    }

    const handleRedirect = async (route) => {
        await wait(1000)
        navigate(route)
    }

    const decodeJWT  = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var json = JSON.parse(jsonPayload)
        setEmail(json["sub"])
    }

    async function verifyEmailAddress(token) {
        setLoading(true)
        console.log(isMounted)
        await axiosConfig.get(`/auth/confirm-email-address?token=${token}&type=SIGNUP`)
        .then((response) => {
            setLoading(false)
            if(response.data["statusCode"] === 200) {
                SweetAlert(response.data["message"], "success")
                setVerified(true)
                setMessage(response.data["message"])
                handleRedirect(OurRoutes.login)
            } else {
                setVerified(false)
                setMessage(response.data["message"])
                SweetAlert(response.data["message"], "error")
            }
        }).catch((error) => {
            setLoading(false)
            if(error?.code === "ERR_NETWORK") {
                SweetAlert("Network error. Please check your internet connection", "error")
            }
        })
    }

    const handleResend = async () => {
        setLoading(true)
        await axiosConfig.get(`/auth/resend-link?email=${email}&type=SIGNUP`)
        .then((response) => {
            setLoading(false)
            if(response.data["statusCode"] === 200) {
                SweetAlert(response.data["message"], "success")
                setEmailSent(true)
                return
            } else {
                SweetAlert(response.data["message"], "error")
            }
        })
    }

    Title("MonieFlex - Confirm Your Email")

    return (
        <div style={{ margin: 0, padding: 0, backgroundColor: "#FFF", position: "relative", height: "100vh"}}>
            {
                loading ? <div style={{ position: "absolute", top: "45%", right: "45%"}}>
                    <CircularProgress size="70px" style={{ color: '#082567' }} />
                </div>
                : <div style={{ position: "absolute", top: "20%", right: "30%"}}>
                    <div className="flex flex-col justify-center items-center" style={{
                        backgroundColor: "#CFB1FE",
                        padding: "20px 80px",
                        borderRadius: "24px",
                        width: "500px"
                    }}>
                        <div className="text-zinc-800 text-center text-base font-medium tracking-normal"
                            style={{marginBottom: "15px"}}
                        >
                            {
                                emailSent ? <>
                                    <span className="font-medium text-neutral-400">
                                        An email has been sent to{" "}
                                    </span>
                                    <span className="font-semibold text-zinc-800">
                                        { email }
                                    </span>
                                    <span className="font-medium text-neutral-400">
                                        . Follow the steps in the email for a reset.
                                    </span>
                                </>
                                : verified ? <span className="font-semibold text-white" style={{fontSize: "16px"}}>
                                    Hello { email + ", " } { message.toLowerCase() + " " }
                                </span>
                                : <p className="font-semibold text-white" style={{fontSize: "18px"}}>
                                    Hello { email + ", " } { message.toLowerCase() }
                                </p>
                            }
                        </div>
                        <img
                            loading="lazy"
                            alt="loading"
                            srcSet={ verified ? Assets.success : emailSent ? Assets.emailSent : Assets.error }
                            className="object-contain items-center object-center overflow-hidden
                            self-center mt-8"
                        />
                        <div className="text-neutral-400 text-center text-base font-medium tracking-normal mt-11" style={{
                            color: "#08284E"
                        }}>
                            {
                                verified
                                    ? "Welcome to MonieFlex. You will be redirected shortly to login."
                                    : "Couldn’t confirm your email?"
                            }
                        </div>
                        {
                            verified ? <div></div> : <button
                                onClick={handleResend}
                                className="text-zinc-800 text-center text-xl font-bold whitespace-nowrap
                                    justify-center items-center self-center max-w-full mt-4 px-16
                                    py-4 rounded-md max-md:px-5"
                                style={{ backgroundColor: "#F8F5FC" }}
                            >
                                Resend email
                            </button>
                        }
                        <Link
                            to={ OurRoutes.login }
                            className="text-sky-950 text-center text-base font-medium
                            underline self-center whitespace-nowrap mt-4">
                            Back to Login
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}
export default ConfirmEmailPage