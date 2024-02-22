import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import DashboardHeader from "../../../components/headers/DashboardHeader";
import OurRoutes from "../../../commons/OurRoutes";
import useAxiosWithAuth from "../../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../../commons/SweetAlert";
import { useCallback } from "react";
import ChangePasssword from "../../../components/popups/ChangePassword";
import SweetPopup from "../../../commons/SweetPopup";

const ProfileInput = ({ text = "", title = "" }) => {
  return (
    <div className="">
      <label className="py-1 text-gray-500">{title}</label>
      <input
        type="text"
        value={text}
        className="w-full p-3 border rounded"
        readOnly
      />
    </div>
  );
};

const QuickLink = ({ path = "", title = "" }) => {
  return (
    <li>
      <a href={path} class="block px-4 py-3 hover:bg-gray-100 ">
        {title}
      </a>
    </li>
  );
};

// ViewProfile component
const ViewProfile = () => {

  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "", // 'active' or 'inactive'
  });
  const axios = useAxiosWithAuth();

  const onLoad = useCallback(async () => {
    await axios.get("/user/profile").then((response) => {
      if (response != null) {
        if (response.data["statusCode"] === 200) {
          setProfile({
            firstName: response.data["data"]["first_name"],
            lastName: response.data["data"]["last_name"],
            email: response.data["data"]["email_address"],
            phoneNumber: response.data["data"]["phone_number"],
            status: response.data["data"]["account_status"],
          });
        } else {
          SweetAlert(response.data["message"], "error");
        }
      }
    });
  }, [axios]);

  useEffect(() => {
    onLoad();
  }, [ ]);

  return (    
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        backgroundColor: "#F6F0FF",
      }}
    >
      <SweetPopup
        open={showChangePassword}
        loaderElement={
          <ChangePasssword
            closeChangePassword={() => setShowChangePassword(false)}
          />
        }
        width={550}
      />
      <DashboardHeader />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          height: "100vh",
        }}
      >
        <Sidebar />
        <div className="flex flex-col items-center" style={{padding: "30px 0"}}>
          <div className="mb-10">
            <Avatar sx={{ width: 180, height: 180 }} />
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-20">
              <ProfileInput text={profile.firstName} title="First Name" />
              <ProfileInput text={profile.lastName} title="Last Name" />
            </div>
            <ProfileInput text={profile.email} title="Email Address" />
            <ProfileInput text={profile.phoneNumber} title="PhoneNumber" />
            <div className="relative">
              <label className="py-1 text-gray-500">Account Status</label>
              <div
                className="w-full p-2 border rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <div
                  className="p-2 border rounded w-20 text-center"
                  style={
                    profile.status === "ACTIVE"
                      ? {
                          backgroundColor: "#50C878",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "600",
                        }
                      : {
                          backgroundColor: "#eee",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "600",
                        }
                  }
                >
                  {profile.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{padding: "30px 0"}}>
          <div
            id="doubleDropdown"
            class="z-10 bg-white rounded-lg shadow w-60"
            style={{ margin: "0 20px" }}
          >
            <ul class="py-2 text-sm text-gray-700">
              <p class="px-4 py-2 ">Quick Link</p>
              <div className="h-1 bg-gray-700"></div>
              <QuickLink path={OurRoutes.dashboard} title="Home" />
              <QuickLink
                path={`${OurRoutes.transfer}?mode=flex`}
                title="MonieFlex Transfers"
              />
              <QuickLink
                path={`${OurRoutes.transfer}?mode=others`}
                title="Other Bank Transfers"
              />
              <QuickLink path={OurRoutes.data} title="Data Subscription" />
              <QuickLink
                path={OurRoutes.electricity}
                title="Electricity Subscription"
              />
              <div
                class="block px-4 py-3 hover:bg-gray-100"
                onClick={handleChangePassword}
              >
                <p>Change Password</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
