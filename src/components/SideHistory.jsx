import { Icon } from "@iconify/react"
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react"

const HistoryItem = ({
    firstName = '', lastName = '',
    number = '', needAvatar = true,
    isFlexed = false
}) => {
    const flexedName = firstName.charAt(0) + firstName.charAt(0);
    const name = firstName.charAt(0) + lastName.charAt(0);

    return (
        <div className="items-center flex justify-between gap-2.5 mt-5">
            {
                needAvatar ? 
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        { isFlexed ? flexedName : name }
                    </Avatar>
                : null
            }
            {
                isFlexed ? <div className="justify-between items-center self-stretch flex grow">
                    <div className="text-zinc-800 text-base font-semibold whitespace-nowrap">
                        { number }
                    </div>
                    <div className="text-neutral-400 text-sm font-medium whitespace-nowrap" style={{color: "#08284E"}}>
                        { firstName }
                    </div>
                </div> : <div className="justify-center items-stretch self-stretch flex grow basis-[0%] flex-col">
                    <div className="text-zinc-800 text-base font-semibold whitespace-nowrap">
                        {firstName} {lastName}
                    </div>
                    <div className="text-neutral-400 text-sm font-medium whitespace-nowrap">{number}</div>
                </div>
            }
        </div>
    )
}

function SideHistory({
    title = '', needAvatar = true, isFlexed = false,
    history = [{firstName: '', lastName: '', number: ''}]
}) {
    const [ open, setOpen ] = useState(true)
    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className="justify-center items-stretch bg-white flex flex-col pl-6 pr-4 py-6 rounded-xl mt-8">
            <div className="justify-between flex w-full gap-5 items-center">
                <div className="text-neutral-400 text-start text-xs font-semibold tracking-wider uppercase grow whitespace-nowrap">
                    { title.toUpperCase() }
                </div>
                <div className="flex gap-5 items-center">
                    <div className={`${open ? "rotate-180" : ""}`} onClick={handleClick}>
                        <Icon icon="iconamoon:arrow-up-2-light" height={"20px"} width={'20px'}/>
                    </div>
                    <Icon icon="solar:settings-bold-duotone" height={"20px"} width={'20px'}/>
                </div>
            </div>
            {
                open ? history.map((item, key) => {
                    return <HistoryItem
                        key={ key }
                        needAvatar={ needAvatar }
                        isFlexed={ isFlexed }
                        firstName={ item.firstName }
                        lastName={ item.lastName }
                        number={ item.number }
                    />
                }) : null
            }
        </div>
    )
}

export default SideHistory;