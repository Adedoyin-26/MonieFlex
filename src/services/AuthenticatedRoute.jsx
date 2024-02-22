import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth"
import OurRoutes from "../commons/OurRoutes";
import SweetAlert from "../commons/SweetAlert";

const AuthenticatedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if(token === null || (typeof token === 'string' && token === '')) {
        SweetAlert("You need to login or signup", 'error')
        return <Navigate
            to={ OurRoutes.login }
            state={{ from: location }}
            replace
        />
    }
    return children
}

export default AuthenticatedRoute