import { Icon } from '@iconify/react';
import OurRoutes from "../../commons/OurRoutes";

export const SideNavItems = [
    {
        title: "Dashboard",
        path: OurRoutes.dashboard,
        icon: <Icon icon="ic:round-dashboard" width="24" height="24"/>
    },
    {
        title: "Transfers",
        path: OurRoutes.transfer,
        icon: <Icon icon="solar:card-transfer-bold-duotone" width="24" height="24"/>
    },
    {
        title: "Airtime Recharge",
        path: OurRoutes.airtime,
        icon: <Icon icon="bi:phone-fill" width="24" height="24"/>
    },
    {
        title: "Pay Bills",
        path: OurRoutes.bill,
        icon: <Icon icon="fluent:receipt-sparkles-20-filled" width="24" height="24"/>,
        subMenu: true,
        subMenuItems: [
            {
                index: 0,
                title: "Electricity Bill",
                path: OurRoutes.electricity
            },
            {
                index: 1,
                title: "Data Subscription",
                path: OurRoutes.data
            },
            {
                index: 2,
                title: "TV Subscription",
                path: OurRoutes.tv
            }
        ]
    },
    {
        title: "Loans",
        path: OurRoutes.loan,
        icon: <Icon icon="healthicons:money-bag" width="24" height="24"/>
    },
    {
        title: "Card",
        path: OurRoutes.card,
        icon: <Icon icon="majesticons:creditcard" width="24" height="24"/>
    },
]