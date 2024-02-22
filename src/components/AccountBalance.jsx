import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Copy from "../commons/Copy";
import useAxiosWithAuth from "../services/hooks/useAxiosWithAuth";

function AccountBalance() {
    const [ accountNumberHidden, setAccountNumberHidden ] = useState(true);
    const [ balanceHidden, setBalanceHidden ] = useState(true);

    const toggleAccountNumber = () => {
        setAccountNumberHidden(!accountNumberHidden);
    }
    const toggleBalance = () => {
        setBalanceHidden(!balanceHidden);
    }
    const axios = useAxiosWithAuth()

    const [accountBalance, setAccountBalance] = useState(0)
    const [accountNumber, setAccountNumber] = useState("")

    useEffect(() => {
        onLoad();
    }, [ ])


    async function onLoad() {
        await axios.get("/wallet/details").then((response) => {
            if(response != null) {
                if(response.data["statusCode"] === 200){
                    setAccountBalance(response.data["data"]["balance"])
                    setAccountNumber(response.data.data.wallet_number)
                }
            }
        }).catch((error) => {})
    }


    return (
        <div
            className="items-stretch border bg-violet-50 flex flex-col px-6 py-8 rounded-xl border-solid border-rose-50"
            style={{ width: "400px" }}
        >
            <div className="justify-between items-center flex gap-5">
                <div className="text-neutral-400 text-left text-xs font-semibold tracking-wider uppercase grow whitespace-nowrap my-auto">
                    Current Account Balance
                </div>
                <Icon icon="solar:settings-bold-duotone" width="20px" height="20px"/>
            </div>
            <div className="items-stretch flex justify-between gap-5 mt-5">
                <div className="flex items-center">
                    <Icon icon="mdi:naira" width="32px" height="32px"/>
                    <div className="text-zinc-800 text-left text-4xl font-bold tracking-[3.6px] whitespace-nowrap">{
                        balanceHidden ? "*************" : new Intl.NumberFormat().format(accountBalance)
                    } </div>
                </div>
                <div
                    onClick={toggleBalance}
                    className="aspect-square object-contain object-center w-5 overflow-balanceHidden
                        self-center shrink-0 max-w-full my-auto cursor-pointer">{
                    balanceHidden ? <Icon icon="heroicons-solid:eye" /> : <Icon icon="mdi:eye-off" />
                }</div>
            </div>
            <div className="items-center flex justify-between gap-5 mt-5">
                <div className="text-zinc-800 text-left text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                    Savings Acc: {
                    accountNumberHidden
                        ? accountNumber.split("").fill("*", 0, 6).join("")
                        : accountNumber
                } </div>
                <div className="flex">
                    <div
                        onClick={() => Copy(accountNumber)}
                        className="aspect-square object-contain object-center w-5
                        self-center shrink-0 max-w-full my-auto mr-4 cursor-pointer">
                        <Icon icon="solar:copy-line-duotone" />
                    </div>
                    <div
                        onClick={() => toggleAccountNumber()}
                        className="aspect-square object-contain object-center w-5
                        self-center shrink-0 max-w-full my-auto cursor-pointer">{
                        accountNumberHidden ? <Icon icon="heroicons-solid:eye" /> : <Icon icon="mdi:eye-off" />
                    }</div>
                </div>
            </div>
        </div>
    );
}

export default AccountBalance;