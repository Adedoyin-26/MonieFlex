import * as React from "react";
import { Button } from "../Buttons";
import TextFormField from "../formfields/TextFormField";
import { useState } from "react";
import { Icon } from "@iconify/react";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../commons/SweetAlert";
import SweetPopup from "../../commons/SweetPopup";

const FundWallet = ({ closeFundWallet = () => {}, openOTP = () => {}}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ amount, setAmount ] = useState(false);
  const [ loading, setLoading ] = useState("");

  const axios = useAxiosWithAuth();

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    await axios.post("/wallet/fund-wallet", {
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      amount: amount,
      cvv: cvv,
      cardName: cardName
    }).then((response) => {
      setLoading(false)
      if(response != null) {
        if(response.data.statusCode === 200) {
          SweetAlert(response.data.message, 'success')
          closeFundWallet()
          openOTP()
        } else {
          SweetAlert(response.data.message, 'error')
        }
      }
    })
  }

  const handleExpiryDate = (value) => {
    if (value.length === 2 && expiryDate.length === 1) {
      setExpiryDate(value + '/');
    } else if (value.length === 2 && value.charAt(1) !== '/') {
      setExpiryDate(value + '/');
    } else if (value.length <= 5) {
      setExpiryDate(value);
    }
  }

  return (
    <div className="items-stretch bg-white flex flex-col px-5 py-4 rounded-lg">
      <SweetPopup open={loading}/>
      <div className="flex justify-between gap-5 items-start">
        <div className="text-zinc-600 text-base font-semibold"> Fund Account</div>
        <div onClick={() => closeFundWallet()} className="cursor-pointer" style={{
          backgroundColor: "#e3e3e3",
          borderRadius: "50%",
          marginBottom: "10px"
        }}>
          <Icon icon="system-uicons:close" color="#08284e" height={25} width={25}/>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <TextFormField
          id={"number"}
          type={"number"}
          placeHolder={"Card Number"}
          onValueChanged={(e) => setCardNumber(e)}
        />

        <TextFormField
          id={"name"}
          type={"text"}
          placeHolder={"Card Name"}
          onValueChanged={(e) => setCardName(e)}
        />

        <div className="justify-between items-stretch flex gap-5 items-stretch w-auto">
          <div style={{ width: "50%" }}>
            <TextFormField
              id={"cvv"}
              type={"number"}
              placeHolder={"CVV"}
              onValueChanged={(e) => setCvv(e)}
            />
          </div>
          <div style={{ width: "50%" }}>
            <TextFormField
              id={"date"}
              type={"text"}
              value={expiryDate}
              placeHolder={"MM/YY"}
              onValueChanged={value => handleExpiryDate(value)}
            />
          </div>
        </div>
        <TextFormField
          id={"number"}
          type={"number"}
          placeHolder={"Amount"}
          onValueChanged={(e) => setAmount(e)}
        />
        <Button
          text="Continue"
          type="submit"
        />
      </form>
    </div>
  );
}

export default FundWallet;