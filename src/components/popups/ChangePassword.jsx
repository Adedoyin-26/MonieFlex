import * as React from "react";
import { Button } from "../Buttons";
import PasswordFormField from '../../components/formfields/PasswordFormField'
import { useState } from "react";
import { Icon } from "@iconify/react";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../commons/SweetAlert";
import SweetPopup from "../../commons/SweetPopup";

const ChangePasssword = ({ closeChangePassword = () => {} }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ oldPassword, setOldPassword ] = useState("")
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState("");

  const handleToggle = () => {
    setVisible(!visible)
};

  const axios = useAxiosWithAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await axios.patch("/user/change_password", {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        setLoading(false);
        if (response != null) {
          if (response.data.statusCode === 200) {
            SweetAlert(response.data.message, "success");
            closeChangePassword();
          } else {
            SweetAlert(response.data.message, "error");
          }
        }
      });
  };

  return (
    <div className="items-stretch bg-white flex flex-col px-5 py-4 rounded-lg">
      <SweetPopup open={loading} />
      <div className="flex justify-between gap-5 items-start">
        <div className="text-zinc-600 text-base font-semibold">
          {" "}
          Change Password
        </div>
        <div
          onClick={() => closeChangePassword()}
          className="cursor-pointer"
          style={{
            backgroundColor: "#e3e3e3",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        >
          <Icon
            icon="system-uicons:close"
            color="#08284e"
            height={25}
            width={25}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <PasswordFormField
          id="old-password"
          title="Current Password"
          visible={visible}
          onToggle={handleToggle}
          onValueChanged={(e) => setOldPassword(e)}
        />
        
        <PasswordFormField
          id="password"
          title="New Password"
          visible={visible}
          onToggle={handleToggle}
          onValueChanged={(e) => setNewPassword(e)}
        />

        <PasswordFormField
          id="password"
          title="Confirm Password"
          visible={visible}
          onToggle={handleToggle}
          onValueChanged={(e) => setConfirmPassword(e)}
        />
        
        <Button text="Change Password" type="submit" />
      </form>
    </div>
  );
};

export default ChangePasssword;
