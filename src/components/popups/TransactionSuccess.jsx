import { Link } from "react-router-dom";
import Assets from "../../assets/Assets";
 
import React from "react";
import OurRoutes from "../../commons/OurRoutes";
 
function TransactionSuccess() {
    return (
        <div className="items-center pb-2">
            <img
                loading="lazy"
                srcSet={ Assets.successfulTransaction }
                alt="success"
                className="object-contain object-center"
            />
            <header className="text-zinc-800 text-center text-lg font-semibold tracking-wide self-stretch w-full mb-9">
                Your Transaction is successful. Thank you for using MonieFlex Bank services
            </header>
            <Link
                className="text-zinc-600 text-center text-base font-medium px-9 py-4 border w-full max-w-[302px] mt-9 rounded-md border-dashed border-zinc-600"
                aria-label="Back to Homepage"
                role="button"
                to={OurRoutes.dashboard}
            >
                Back to Homepage
            </Link>
        </div>
    );
}
 
export default TransactionSuccess;