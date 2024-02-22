import { Button } from "../../../../components/Buttons";
import NarrationFormField from "../../../../components/formfields/NarrationFormField";
import DropdownField from "../../../../components/formfields/DropdownField";
import TextFormField from "../../../../components/formfields/TextFormField";
import * as React from "react";
import { useState } from "react";
import useAxiosWithAuth from "../../../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../../../commons/SweetAlert";
import SweetPopup from "../../../../commons/SweetPopup";
import TransactionSuccess from "../../../../components/popups/TransactionSuccess";
import TransactionPin from "../../../../components/popups/TransactionPin";

export function TVForm() {
    const [ code, setCode ] = useState("")
    const [ type, setType ] = useState("")
    const [ card, setCard ] = useState("")
    const [ amount, setAmount ] = useState(0)
    const [ phone, setPhone] = useState("")
    const [ accountName, setAccountName ] = useState("")
    const [ narration, setNarration ] = useState("")
    const [ subType, setSubType ] = useState("CHANGE")

    const [ allDatas, setAllDatas ] = useState([{
        code: "",
        name: "",
        amount: ""
    }])

    const axios = useAxiosWithAuth()

    const [ loading, setLoading ] = useState(false)
    const [ isSuccess, setSuccess ] = useState(false)
    const [ verifyPin, setVerifyPin ] = useState(false)

    const handleMeterVerification = async (value) => {
        setCard(value)
        if(value.length === 10) {
            setLoading(true)
            await axios.post("/bill/verify-smart-card", {
                type: type,
                card: value
            }).then((response) => {
                setLoading(false)
                if(response != null) {
                    if(response.data["statusCode"] === 200) {
                        SweetAlert(response.data.message, 'success');
                        console.log(response.data.data)
                        setAccountName(
                            response.data.data.Customer_Name + " - " + response.data.data.Customer_Number
                        )
                    } else {
                        SweetAlert(response.data["message"], 'error')
                    }
                }
            }).catch(() => setLoading(false))
        }
    }

    async function handleVariations(type = "") {
        setType(type)
        await axios.get(`/bill/tv-variations?code=${ type }`).then((response) => {
            if(response != null) {
                if(response.data["statusCode"] === 200) {
                    const allDataList = response.data["data"].map(allData => ({
                        code: allData.variation_code,
                        name: allData.name,
                        amount: allData.variation_amount
                    }))
                    setAllDatas(allDataList)
                } else {
                    SweetAlert(response.data["message"], 'error')
                }
            }
        })
    }

    const initializePayment = (event) => {
        event.preventDefault()
        setVerifyPin(true)
        setLoading(true)
    }

    const handlePayment = async () => {
        setVerifyPin(false)
        setLoading(true)
        await axios.post("/bill/tv-subscription", {
            type: type,
            card: card,
            amount: amount.substring(0, amount.indexOf(".")),
            narration: narration,
            code: code,
            phone: phone,
            sub_type: subType
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
            <p className="text-2xl font-medium pb-2">TV Subscription</p>
            <SweetPopup
                open={ loading }
                loaderElement={
                    isSuccess ? <TransactionSuccess /> : verifyPin ? <TransactionPin
                        isVerifyTransaction={true}
                        name={ accountName }
                        amount={ amount }
                        buttonText="Subscribe TV"
                        handleClose={() => setLoading(false)}
                        callback={() => handlePayment()}
                    />  : null
                }
            />
            <form onSubmit={initializePayment}>
                <DropdownField
                    placeHolder={"Choose Cable TV Type"}
                    list={[
                        "DSTV",
                        "GOTV",
                        "StarTimes",
                        "ShowMax"
                    ]}
                    onSelected={item => handleVariations(item.toUpperCase())}
                />
                <DropdownField
                    placeHolder={"Select product type"}
                    list={ allDatas }
                    isCustom={ true }
                    onSelected={item => {
                        setCode(item.code)
                        setAmount(item.amount)
                    }}
                />
                <TextFormField
                    id={'car_number'}
                    type={"text"}
                    placeHolder={"Card Number Eg. 23456718934"}
                    onValueChanged={e => handleMeterVerification(e)}
                />
                <TextFormField
                    id={'account_name'}
                    type={"text"}
                    value={ accountName }
                    placeHolder={"Account Name"}
                    isEnabled={false}
                />
                <DropdownField
                    placeHolder={"Choose Subscription Type"}
                    list={[
                        "RENEWAL",
                        "CHANGE"
                    ]}
                    onSelected={item => setSubType(item)}
                />
                <TextFormField
                    id={'amount'}
                    placeHolder={"Amount"}
                    value={ amount }
                    isEnabled={ false }
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