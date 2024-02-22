import * as React from "react";
import { useState } from "react"
import PasswordFormField from '../../components/formfields/PasswordFormField'
import TextFormField from '../../components/formfields/PasswordFormField'
import { Button } from "../Buttons";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../commons/SweetAlert";
import { Icon } from "@iconify/react";
import SweetPopup from "../../commons/SweetPopup";

function TransactionPin({
    name = "", amount = "", isVerifyTransaction = false,
    callback = () => {}, handleClose, buttonText = "", extra = ""
}) {
    const [ pin, setPin ] = useState("")
    const [ loading, setLoading ] = useState(false);
    const [ isCreatePin, setIsCreatePin ] = useState(false)
    const axios = useAxiosWithAuth()
    const [visible, setVisible] = useState(false);

    const handleToggle = () => {
        setVisible(!visible)
    };

    const handleCreatePin = async () => {
        setLoading(true)
        await axios.post(`/wallet/transaction-pin?pin=${ pin }`).then((response) => {
            setLoading(false)
            if(response != null) {
                if (response.data["statusCode"] === 200) {
                    SweetAlert(response.data["message"], 'success')
                    if(isCreatePin) {
                        setIsCreatePin(false)
                    }
                } else {
                    SweetAlert(response.data["message"], 'error')
                }
            }
        })
    }

    const handleVerifyPin = async () => {
        setLoading(true)
        await axios.post(`/wallet/verify-pin?pin=${ pin }`).then((response) => {
            setLoading(false)
            if(response != null) {
                if(response.data["statusCode"] === 200) {
                    callback()
                } else {
                    SweetAlert(response.data["message"], 'error')
                    if(response.data["message"] === "You have not created a pin yet") {
                        setIsCreatePin(true)
                        setPin("")
                    }
                }
            }
        })
    }

    if(isCreatePin) {
        return (
            <>
                <SweetPopup open={ loading }/>
                <div className="items-center flex max-w flex-col">
                    <div onClick={handleClose} className="cursor-pointer" style={{
                        backgroundColor: "#e3e3e3",
                        borderRadius: "50%",
                        marginBottom: "30px"
                    }}>
                        <Icon icon="system-uicons:close" color="#08284e" height={50} width={50}/>
                    </div>
                    <div className="text-sky-950 text-center text-base self-stretch w-full">
                        <p style={{padding: "0 25px"}}>
                            Create Transaction PIN. This PIN will be used for all transactions.
                        </p>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <PasswordFormField
                        placeHolder="Input Pin"
                        type="text"
                        visible={visible}
                        value={pin}
                        onToggle={handleToggle}
                        onValueChanged={e => setPin(e)}
                       />
                    </div>
                    <Button
                        text = "Create Pin"
                        type="submit"
                        onClick={handleCreatePin}
                    />
                </div>
            </>
        )
    } else {
        return (
            <>
                <SweetPopup open={ loading }/>
                <div className="items-center flex max-w flex-col">
                    <div onClick={handleClose} className="cursor-pointer" style={{
                        backgroundColor: "#e3e3e3",
                        borderRadius: "50%",
                        marginBottom: "30px"
                    }}>
                        <Icon icon="system-uicons:close" color="#08284e" height={50} width={50}/>
                    </div>
                    <div className="text-sky-950 text-center text-base self-stretch w-full">{

                        isVerifyTransaction
                            ? <>
                                <span className="">You are about to send </span>
                                <span className="font-bold text-xl text-sky-950">
                                    &#8358;{new Intl.NumberFormat().format(amount)}
                                </span>
                                <span className="">{
                                    extra !== "" ? ` ${extra}` : extra
                                } to </span>
                                <span className="font-bold text-xl text-sky-950">
                                    {name}.
                                </span>
                            </>
                            : <p style={{padding: "0 25px"}}>
                                Create Transaction PIN. This PIN will be used for all transactions.
                            </p>

                    }</div>
                    <div style={{ padding: "20px" }}>
                        <TextFormField
                            placeHolder="Input Pin"
                            type="text"
                            onValueChanged={e => setPin(e)}
                        />
                    </div>
                    <Button
                        text = {
                            buttonText === ""
                                ? isVerifyTransaction
                                    ? "Send Money"
                                    : "Create Pin"
                                : buttonText
                        }
                        type="submit"
                        onClick={isVerifyTransaction ? handleVerifyPin : handleCreatePin}
                    />
                </div>
            </>
        )
    }
}
export default TransactionPin;
