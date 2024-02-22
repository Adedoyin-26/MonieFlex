import { Button } from "../../../../components/Buttons";
import NarrationFormField from "../../../../components/formfields/NarrationFormField";
import DropdownField from "../../../../components/formfields/DropdownField";
import TextFormField from "../../../../components/formfields/TextFormField";
import * as React from "react";
import useAxiosWithAuth from "../../../../services/hooks/useAxiosWithAuth"
import { useState } from "react";
import SweetAlert from "../../../../commons/SweetAlert";
import SweetPopup from "../../../../commons/SweetPopup";
import TransactionSuccess from "../../../../components/popups/TransactionSuccess";
import TransactionPin from "../../../../components/popups/TransactionPin";

export const DataForm = () => {
    const axios = useAxiosWithAuth()
    const [ loading, setLoading ] = useState(false)
    const [ isSuccessElement, setSuccessElement ] = useState(false)
    const [ variationCode, setVariationCode ] = useState("")
    const [ serviceId, setServiceId ] = useState("")
    const [ phoneNumber, setPhoneNumber ] = useState("")
    const [ narration, setNarration ] = useState("")
    const [ amount, setAmount ] = useState("")
    const [ verifyPin, setVerifyPin ] = useState(false)

    const [ allDatas, setAllDatas ] = useState([{
        code: "",
        name: "",
        amount: ""
    }])

    async function handleVariations(code = "") {
        await axios.get(`/bill/data-variations?code=${ code }`).then((response) => {
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

    const handleDataSubSubmit = (event) => {
        event.preventDefault()
        setVerifyPin(true)
        setLoading(true)
    }

    async function handleDataSub() {
        setVerifyPin(false)
        setLoading(true)
        await axios.post("/bill/data-purchase", {
            data: variationCode,
            type: serviceId,
            narration: narration,
            amount: amount.substring(0, amount.indexOf(".")),
            phone: `${ phoneNumber }`
        }).then((response) => {
            setLoading(false)
            if(response != null) {
                if(response.data["statusCode"] === 200) {
                    SweetAlert(response.data["message"], 'success')
                    setLoading(true)
                    setSuccessElement(true)
                } else {
                    SweetAlert(response.data["message"], 'error')
                }
            }
        }).catch(() => setLoading(false))
    }

    return (
        <div style={{ padding: "50px 50px" }} >
            <p className="text-2xl font-medium pb-2">Data Subscription Purchase</p>
            <SweetPopup
                open={ loading }
                loaderElement={
                    isSuccessElement ? <TransactionSuccess /> : verifyPin ? <TransactionPin
                        isVerifyTransaction = {true}
                        name={ phoneNumber }
                        amount={ amount }
                        extra={ serviceId.replace("_", " ") }
                        buttonText="Buy Data"
                        handleClose={() => setLoading(false)}
                        callback={() => handleDataSub()}
                    /> : null
                }
            />
            <form onSubmit={handleDataSubSubmit}>
                <DropdownField
                    placeHolder={"Choose Network"}
                    list={[
                        "MTN",
                        "GLO",
                        "AIRTEL",
                        "9MOBILE"
                    ]}
                    onSelected={item => {
                        setServiceId(
                            item.toLowerCase() === "9mobile"
                                ? "NINE_MOBILE_DATA"
                                : item.toUpperCase() + "_DATA"
                        )
                        handleVariations(
                            item.toLowerCase() === "9mobile"
                                ? "NINE_MOBILE_DATA"
                                : item.toUpperCase() + "_DATA"
                        )
                    }}
                />
                <DropdownField
                    placeHolder={"Select Product type"}
                    list={ allDatas }
                    isCustom={ true }
                    onSelected={item => {
                        setVariationCode(item.code)
                        setAmount(item.amount)
                    }}
                />
                <TextFormField
                    id={'phone_number'}
                    type={"text"}
                    placeHolder={"Phone Number Eg. 08000000000"}
                    onValueChanged={e => setPhoneNumber(e)}
                />
                <TextFormField
                    id={'amount'}
                    value={ amount }
                    isEnabled={ false }
                    placeHolder={"Amount"}
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