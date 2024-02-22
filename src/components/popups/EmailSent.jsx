import { Link } from "react-router-dom";
import Assets from "../../assets/Assets";
import SweetAlert from "../../commons/SweetAlert";
import axiosConfig from "../../services/api/axiosConfig";
import OurRoutes from "../../commons/OurRoutes";
 
const EmailSent = ({email = "", type = "SIGNUP"}) =>  {
    const handleResend = async () => {
        await axiosConfig.get(`/auth/resend-link?email=${email}&type=${type}`)
        .then((response) => {
            if(response.data["statusCode"] === 200) {
                SweetAlert(response.data["message"], "success")
                return
            } else {
                SweetAlert(response.data["message"], "error")
            }
        })
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-zinc-800 text-center text-base font-medium tracking-normal">
                <span className="font-medium text-neutral-400">
                    An email has been sent to{" "}
                </span>
                <span className="font-semibold text-zinc-800">
                    { email }
                </span>
                <span className="font-medium text-neutral-400">
                    . Follow the steps in the email for a reset.
                </span>
            </div>
            <img
                loading="lazy"
                srcSet={ Assets.emailSent }
                alt="Email Sent"
                className="object-contain items-center object-center overflow-hidden
                self-center mt-8"
            />
            <div className="text-neutral-400 text-center text-base font-medium tracking-normal mt-6">
                Didn't see the email? Check your spam folder or request a resend.
            </div>
            <button
                onClick={handleResend}
                className="text-zinc-800 text-center text-xl font-bold whitespace-nowrap
                    justify-center items-center bg-purple-300 self-center max-w-full mt-9 px-16
                    py-4 rounded-md max-md:px-5"
            >
                Resend email
            </button>
            <Link
                to={ OurRoutes.login }
                className="text-sky-950 text-center text-base font-medium
                underline self-center whitespace-nowrap mt-4">
                Back to Login
            </Link>
        </div>
    );
}
export default EmailSent
