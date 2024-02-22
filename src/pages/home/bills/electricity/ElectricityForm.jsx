import { Button } from "../../../../components/Buttons";
import { useState } from "react"
import NarrationFormField from "../../../../components/formfields/NarrationFormField";
import DropdownField from "../../../../components/formfields/DropdownField";
import TextFormField from "../../../../components/formfields/TextFormField";
import * as React from "react";
import TransactionSuccess from "../../../../components/popups/TransactionSuccess";
import TransactionPin from "../../../../components/popups/TransactionPin";
import SweetPopup from "../../../../commons/SweetPopup";
import SweetAlert from "../../../../commons/SweetAlert";
import useAxiosWithAuth from "../../../../services/hooks/useAxiosWithAuth";

export function ElectricityForm() {
    const [ disco, setDisco ] = useState("")
    const [ productType, setProductType ] = useState("")
    const [ meterNumber, setMeterNumber ] = useState("")
    const [ amount, setAmount ] = useState(0)
    const [ phone, setPhone] = useState("")
    const [ accountName, setAccountName ] = useState("")
    const [ narration, setNarration ] = useState("")

    const [ loading, setLoading ] = useState(false)
    const [ isSuccess, setSuccess ] = useState(false)
    const [ verifyPin, setVerifyPin ] = useState(false)

    const axios = useAxiosWithAuth()

    const handleMeterVerification = async (value) => {
        setMeterNumber(value)
        if(value.length === 13) {
            setLoading(true)
            await axios.post("/bill/verify-electricity", {
                product: productType,
                meter: value,
                disco: disco
            }).then((response) => {
                setLoading(false)
                if(response != null) {
                    if(response.data["statusCode"] === 200) {
                        SweetAlert(response.data.message, 'success');
                        console.log(response.data.data["Customer_Name"] + " " + response.data.data["Address"])
                        setAccountName(
                            response.data.data.Customer_Name + " " + response.data.data.Address
                        )
                    } else {
                        SweetAlert(response.data["message"], 'error')
                    }
                }
            }).catch(() => setLoading(false))
        }
    }

    const initializePayment = (event) => {
        event.preventDefault()
        setVerifyPin(true)
        setLoading(true)
    }

    const handlePayment = async () => {
        setVerifyPin(false)
        setLoading(true)
        await axios.post("/bill/electricity", {
            product_type: productType,
            meter_number: meterNumber,
            amount: amount,
            narration: narration,
            type: disco,
            phone: phone
        }).then((response) => {
            setLoading(false)
            if(response != null) {
                if(response.data["statusCode"] === 200) {
                    SweetAlert(response.data["message"], 'success')
                    setLoading(true)
                    setSuccess(true)
                    return
                } else {
                    SweetAlert(response.data["message"], 'error')
                    return
                }
            }
        }).catch(() => setLoading(false))
    }

    return (
        <div style={{ padding: "50px 50px" }} >
            <p className="text-2xl font-medium pb-2">Electrical Bill Payment</p>

            <SweetPopup
                open={ loading }
                loaderElement={
                    isSuccess ? <TransactionSuccess /> : verifyPin ? <TransactionPin
                        isVerifyTransaction={true}
                        name={ accountName }
                        amount={ amount }
                        buttonText="Buy Power"
                        handleClose={() => setLoading(false)}
                        callback={() => handlePayment()}
                    />  : null
                }
            />

            <form onSubmit={initializePayment}>
                <DropdownField
                    placeHolder={"Choose Disco"}
                    list={[
                        "EEDC - Enugu Electricity Distribution Company",
                        "ABA - Aba Electrical Company",
                        "IKEDC - Ikeja Electricity Distribution Company",
                        "IBEDC - Ibadan Electricity Distribution Company",
                        "KAEDCO - Kaduna Electricity Distribution Company",
                        "AEDC - Abuja Electricity Distribution Company",
                        "BEDC - Benin Electricity Distribution Company",
                        "EKEDC - Eko Electricity Distribution Company",
                        "KEDCO - Kano Electricity Distribution Company",
                        "PHED - PortHarcourt Electricity Distribution Company",
                        "JED - Jos Electricity Distribution Company"

                    ]}
                    onSelected={item => setDisco(item.substring(0, item.indexOf(" -")))}
                />
                <DropdownField
                    placeHolder={"Select product type"}
                    list={[
                        "Postpaid",
                        "Prepaid",
                    ]}
                    onSelected={item => setProductType(item.replace("paid", "_PAID").toUpperCase())}
                />
                <TextFormField
                    id={'meter_number'}
                    type={"text"}
                    placeHolder={"Meter Number Eg. 23456718934"}
                    onValueChanged={e => handleMeterVerification(e)}
                />
                <TextFormField
                    id={'account_name'}
                    type={"text"}
                    value={ accountName }
                    placeHolder={"Account Name"}
                    isEnabled={false}
                />
                <TextFormField
                    id={'amount'}
                    placeHolder={"Amount"}
                    type="text"
                    onValueChanged={e => setAmount(e)}
                />
                <TextFormField
                    id={'email_address'}
                    type={"tel"}
                    placeHolder={"Phone Number"}
                    onValueChanged={e => setPhone(e)}
                />
                <NarrationFormField
                    onValueChanged={e => setNarration(e)}
                />
                <div className="flex grow flex-col w-full" style={{ width: "100%" }}>
                    <Button
                        text={ "Continue" }
                        isWhite={ false }
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}