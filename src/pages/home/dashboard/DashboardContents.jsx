import { Link } from "react-router-dom";
import OurRoutes from "../../../commons/OurRoutes";
import { Icon } from "@iconify/react";

const QuickAction = ({ text = '', color = '', link = '', icon, textColor }) => {
    return (
        <Link
            to={link}
            className={`h-[115px] pl-1.5 pr-[7px] pt-[19px] pb-[18px] ${color}
            rounded-[10px] justify-center items-center flex`}
        >
            <div
                className="grow shrink basis-0 self-stretch flex-col
                justify-start items-center gap-[15px] inline-flex">
                {icon}
                <div
                    className={`self-stretch text-center text-${textColor} text-base
                    font-bold font-['Urbanist'] tracking-wider`}
                >{text}</div>
            </div>
        </Link>
    )
}

export const QuickTransactions = () => {
    const header = [
        {
            name: "Transfer to MonieFlex",
            icon: <Icon icon="solar:card-transfer-bold-duotone" height="24" width="24"/>,
            link:  `${ OurRoutes.transfer }?mode=flex`,
            color: "bg-indigo-50",
            textColor: "#0F2361"
        },
        {
            name: "Transfer to other banks",
            icon: <Icon icon="tabler:transfer-in" height="24" width="24"/>,
            link: `${ OurRoutes.transfer }?mode=other`,
            color: "bg-pink-100",
            textColor: "#63243D"
        },
        {
            name: "Airtime Recharge",
            icon: <Icon icon="bi:phone-fill" width="24" height="24" />,
            link: OurRoutes.airtime,
            color: "bg-rose-50",
            textColor: "#5C1E0F"
        },
    ]

    return (
        <div className="w-[543px] h-[195px] px-4 py-[21px] bg-white rounded-[10px] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-5 inline-flex">
                <div className="text-center text-neutral-400 text-xs font-semibold font-['Poppins'] uppercase tracking-wide">Quick transactions</div>
                <div className="self-stretch h-[115px] flex-col justify-start items-start gap-[30px] flex">
                    <div className="self-stretch justify-start items-start gap-5 inline-flex">{
                        header.map((item, key) => {
                            return <QuickAction
                                key={key}
                                text={item.name}
                                color={item.color}
                                link={item.link}
                                icon={item.icon}
                                textColor={item.textColor}
                            />
                        })
                    }</div>
                </div>
            </div>
        </div>
    );
}