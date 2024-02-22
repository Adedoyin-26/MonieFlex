import { Icon } from "@iconify/react"
import SweetPopup from "../../commons/SweetPopup"
import { useState } from "react"
import TextFormField from "../formfields/TextFormField"
import { Button } from "../Buttons"
import SweetAlert from "../../commons/SweetAlert"
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth"

export default function OTPFundWallet({handleClose}) {
    const [ pin, setPin ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const axios = useAxiosWithAuth();

    const handleVerify = async (event) => {
        event.preventDefault()
        setLoading(true)
        await axios.get(`/wallet/verify-otp?otp=${ pin }`).then((response) => {
            setLoading(false)
            if(response != null) {
                if(response.data.statusCode === 200) {
                    SweetAlert(response.data.message, 'success')
                    handleClose()
                    window.location.reload()
                } else {
                    SweetAlert(response.data.message, 'error')
                }
            }
        })
    }

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
                        Type the OTP sent to your email to fund your wallet
                    </p>
                </div>
                <form onSubmit={handleVerify}>
                    <div style={{ padding: "20px" }}>
                        <TextFormField
                            placeHolder="One-Time Password"
                            type="number"
                            onValueChanged={e => setPin(e)}
                        />
                    </div>
                    <Button
                        text = {"Fund Wallet"}
                        type="submit"
                    />
                </form>
            </div>
        </>
    )
}