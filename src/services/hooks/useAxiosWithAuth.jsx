import axiosConfig from "../api/axiosConfig";
import useAuth from "./useAuth";
import SweetAlert from "../../commons/SweetAlert"
import { useNavigate } from "react-router-dom";
import OurRoutes from "../../commons/OurRoutes"
import { useEffect } from "react";

const useAxiosWithAuth = () => {
    const { token } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const requestIntercept = axiosConfig.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => {
                if(error?.code === "ERR_CONNECTION_REFUSED") {
                    return Promise.reject(error).catch((reason) => {
                        SweetAlert(
                            "Network error. Please check your internet connection", 
                            "error",
                        )
                    });
                }
            }
        );

        const responseIntercept = axiosConfig.interceptors.response.use(
            response => response,
            async (error) => {
                if (error?.response?.status === 403) {
                    return Promise.reject(error).catch((reason) => {
                        SweetAlert("Log in to continue using MonieFlex", "error")
                        navigate(OurRoutes.login)
                    });
                }
                if(error?.code === "ERR_BAD_REQUEST") {
                    if(error?.response.data["data"] != null) {
                        error?.response.data["data"].forEach(value =>
                            SweetAlert(value, "error")
                        )
                    } else {
                        SweetAlert(error?.response.data.title, "error")
                    }
                }
                if(error?.code === "ERR_NETWORK") {
                    SweetAlert("Network error. Please check your internet connection", "error")
                }
                if(error?.response?.status === 400) {
                    SweetAlert(error?.response.data["data"], "error")
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosConfig.interceptors.request.eject(requestIntercept);
            axiosConfig.interceptors.response.eject(responseIntercept);
        }
    }, [ token, navigate ])

    return axiosConfig;
}

export default useAxiosWithAuth;