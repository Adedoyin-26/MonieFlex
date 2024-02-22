import { Icon } from "@iconify/react";
import Assets from "../../assets/Assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import FundWallet from "../popups/FundWallet";
import SweetPopup from "../../commons/SweetPopup";
import TransactionPin from "../popups/TransactionPin";
import OTPFundWallet from "../popups/OTPFundWallet"
import { AccountCircleRounded } from "@mui/icons-material";
import OurRoutes from "../../commons/OurRoutes";
import useAuth from "../../services/hooks/useAuth";
import useAxiosWithAuth from "../../services/hooks/useAxiosWithAuth";
import SweetAlert from "../../commons/SweetAlert";


function DashboardHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [showFundWallet, setShowFundWallet] = useState(false);
    const [ showPin, setShowPin ] = useState(false)
    const [ showOTP, setShowOTP ] = useState(false)
    const { logout } = useAuth()
    const axios = useAxiosWithAuth();
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setShowPin(false)
    };

    const handleFundWallet = () => {
        handleClose()
        setShowFundWallet(true)
    }
    const handlePinClick = () => {
        handleClose()
        setShowPin(true)
    };

    const handleViewProfileClick = () => {
        navigate (OurRoutes.profile);
        handleClose();
    };

    async function handleLogout() {
        handleClose()
        await axios.get("/auth/logout").then((response) => {
            if(response != null) {
                if(response.status === 200) {
                    logout()
                    navigate(OurRoutes.login)
                } else {
                    SweetAlert("Error while loggin you out", 'error')
                }
            }
        })
    }


    return (
        <header className="justify-between items-stretch bg-sky-950 flex gap-5 px-20 py-2.5 max-md:flex-wrap max-md:px-5" style={{
            position: "sticky",
            top: "0",
            zIndex: "99",
        }}>
            <SweetPopup
                open={showFundWallet}
                loaderElement={<FundWallet
                    closeFundWallet={() => setShowFundWallet(false)}
                    openOTP={() => setShowOTP(true)}
                /> }
                width={550}
            />
            <SweetPopup open={ showPin } loaderElement={ <TransactionPin handleClose={handleClose}/> }/>
            <SweetPopup
                open={ showOTP }
                loaderElement={ <OTPFundWallet
                handleClose={() => setShowOTP(false)}
            />}
            />
            <SweetPopup open={ showPin } loaderElement={ <TransactionPin
                    handleClose={handleClose}
                    callback={handleClose}
                />
            }/>
            <img
                loading="lazy"
                src={ Assets.logo }
                className="object-contain object-center w-min"
                alt="Logo"
            />
            <div className="justify-end items-stretch self-center flex gap-5 my-auto max-md:justify-center">
                <div className="justify-end self-center flex gap-1.5 my-auto items-start">
                    <div className="text-white text-base font-semibold grow whitespace-nowrap">
                        EN
                    </div>
                    <Icon icon="lucide:chevron-down" width="24" height="24" color="#FFF"/>
                </div>
                <div className="text-white text-center text-base font-semibold tracking-wide self-center my-auto">
                    Help
                </div>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 50, height: 50 }} />
                    </IconButton>
                </Tooltip>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleViewProfileClick}>
                    <ListItemIcon>
                        <AccountCircleRounded fontSize="small" />
                    </ListItemIcon>
                    View Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleFundWallet}>
                    <ListItemIcon>
                        <WalletIcon fontSize="small" />
                    </ListItemIcon>
                    Fund Wallet
                </MenuItem>
                <MenuItem onClick={handlePinClick}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Create Pin
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </header>
    );
}

export default DashboardHeader;