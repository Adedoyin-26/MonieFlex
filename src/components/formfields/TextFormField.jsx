import * as React from "react";

function TextFormField({
    placeHolder = 'Type a placeholder',
    id = 'PlaceHolder',
    type = 'number',
    isEnabled = true,
    required = true,
    value,
    onValueChanged = (e) => {}
}) {
    return (
        <input
            type={ type }
            id= { id }
            className={
                `appearance-none font-urbanist my-[20px] flex-col top-9 min-w-full left-0
                ${isEnabled ? 'bg-[#EDEDED]' : 'bg-[#B5B5B5]'}
                mt-1 z-10 px-4 py-4 rounded-md focus:outline-none focus:border-blue-500`
            }
            style={{ border: "#5a5959 solid 1px", fontSize: "16px", fontWeight: "600" }}
            placeholder= { placeHolder }
            required={ required }
            disabled={ !isEnabled }
            value={ value }
            onChange={e => {
                onValueChanged(e.target.value)
            }}
        />
    );
}

export default TextFormField;