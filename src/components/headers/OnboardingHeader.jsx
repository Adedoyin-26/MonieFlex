import {Icon} from "@iconify/react";
import Assets from "../../assets/Assets";

function OnboardingHeader() {
    return (
        <header 
            className="justify-between items-stretch bg-sky-950 flex gap-5 px-20 py-2.5 max-md:flex-wrap max-md:px-5"
            style={{position: "sticky", top: "0"}}
        >
            <img
                loading="lazy"
                src={ Assets.logo }
                className="object-contain object-center w-min"
                alt="Logo"
            />
            <div className="justify-end items-stretch self-center flex gap-5 my-auto max-md:justify-center">
                <div className="justify-end self-center flex gap-1.5 my-auto items-start">
                    <div className="text-white text-base font-semibold grow whitespace-nowrap">
                        EN
                    </div>
                    <Icon icon="lucide:chevron-down" width="24" height="24" color="#FFF"/>
                </div>
                <div className="text-white text-center text-base font-semibold tracking-wide self-center my-auto">
                    Help
                </div>
            </div>
        </header>
    );
}

export default OnboardingHeader;