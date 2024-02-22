import { Icon } from "@iconify/react";
import { useState } from "react";

const Checkbox = ({ label = '', onValueChanged }) => {
    const [ state, setState ] = useState(false)

    const handleSelect = () => {
        setState(!state)
        onValueChanged(state)
    }
    return (
        <div className="flex gap-2.5 mb-2 self-start items-center" style={{ alignItems: "center" }}>
            <div
                onClick={handleSelect}
                style={{
                    width: "16px",
                    height: "16px",
                    border: "#08284E solid 2px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    backgroundColor: state ? "#08284E" : null,
                    color: "#fff"
                }}
            > {
                state ? <Icon icon="iconamoon:check-bold" width="12px" height="12px"/> : <div></div>
            } </div>
            <div
                for="checked-checkbox"
                className="text-sky-950 text-xs font-bold grow whitespace-nowrap"
            > { label } </div>
        </div>
    );
};

export default Checkbox