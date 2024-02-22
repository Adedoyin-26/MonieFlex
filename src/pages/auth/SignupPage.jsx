import * as React from "react";
import { useState } from "react";
import OnboardingHeader from "../../components/headers/OnboardingHeader"
import AuthFormField from "../../components/formfields/AuthFormField"
import PasswordFormField from '../../components/formfields/PasswordFormField'
import { Button, AuthLinkButton } from "../../components/Buttons";
import Assets from "../../assets/Assets";
import OurRoutes from "../../commons/OurRoutes"
import Title from "../../commons/Title"
import axiosConfig from "../../services/api/axiosConfig"
import SweetAlert from "../../commons/SweetAlert"
import SweetPopup from "../../commons/SweetPopup"
import EmailSent from "../../components/popups/EmailSent";


function SignupPage() {
  const [visible, setVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ loader, setLoader ] = useState(true)

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState()
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [bvn, setBvn] = useState()

  const handleSubmit = async () => {
    setLoading(true)
    await axiosConfig.post("/auth/signup", {
      emailAddress: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      bvn: bvn,
      password: password,
      confirmPassword: confirmPassword
    }).then((response) => {
      setLoading(false)
      if (response.data["statusCode"] === 200) {
        setLoader(false)
        setLoading(true)
      } else {
        SweetAlert(response.data["message"], 'error')
      }
    }).catch((error) => {
      setLoading(false)
      if(error?.code === "ERR_NETWORK") {
          SweetAlert("Network error. Please check your internet connection", "error")
      }
  })
  }

  const handleToggle = () => {
    setVisible(!visible)
  }
  const handleConfirmToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  Title("MonieFlex - Create MonieFlex Account")

  return (
    <div className="bg-stone-100 flex flex-col items-stretch">
      <OnboardingHeader />
      <SweetPopup
        open={loading}
        loaderElement={
          loader ? null : <EmailSent email={email}/>
        }
      />
      <div className="w-full max-md:max-w-full">
        <div className="flex max-md:flex-col max-md:items-stretch">
          <div className="flex flex-col items-center justify-center items-stretch w-[49%] max-md:w-full max-md:ml-0">
            <div className="shadow-sm bg-white flex grow flex-col w-full px-20 py-12 max-md:max-w-full max-md:px-5">
                <p
                    className="text-zinc-800 text-3xl font-bold tracking-wide w-[500px] max-w-full mt-24 max-md:mt-10"
                    style={{
                        width: '500px', color: '#2E2E2E',
                        fontFamily: 'Urbanist', fontSize: '28px',
                        fontStyle: 'normal',fontWeight: 700,
                        lineHeight: 'normal',letterSpacing: '0.28px',
                    }}
                >
                    SIGN UP
                </p>
                <p
                    className="text-neutral-400 text-left text-lg font-medium whitespace-nowrap mt-1.5"
                    style={{fontFamily: 'Urbanist', color: '5B5B5B'}}
                >
                    Fill in the below to sign up an account with us.
                </p>
                <AuthFormField
                    id="email"
                    title="Email"
                    type="email"
                    onValueChanged={value => setEmail(value)}
                />
                <AuthFormField
                    id="firstName"
                    title="First Name"
                    onValueChanged={value => setFirstName(value)}
                />
                <AuthFormField
                    id="lastName"
                    title="Last Name"
                    onValueChanged={value => setLastName(value)}
                />
                <AuthFormField
                    id="phone"
                    title="Phone Number"
                    type="tel"
                    onValueChanged={value => setPhoneNumber(value)}
                />
                <AuthFormField
                    id="bvn"
                    title="BVN"
                    type="number"
                    onValueChanged={value => setBvn(value)}
                />
                <PasswordFormField
                    id="password"
                    title="Password"
                    visible={visible}
                    onToggle={handleToggle}
                    onValueChanged={value => setPassword(value)}
                />
                <PasswordFormField
                    id="confirmpassword"
                    title="Confirm Password"
                    visible={confirmPasswordVisible}
                    onToggle={handleConfirmToggle}
                    onValueChanged={value => setConfirmPassword(value)}
                />
                <Button text="Sign Up" onClick={handleSubmit}/>
                <AuthLinkButton
                    isPurple={ true }
                    title="I have a MonieFlex Account."
                    path={ OurRoutes.login }
                />
            </div>
          </div>
          <img src={ Assets.signup } alt="Signup" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;