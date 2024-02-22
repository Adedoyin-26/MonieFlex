import * as React from "react";

function NarrationFormField ({
     placeHolder = 'Add note',
     id = 'note',
     onValueChanged
}) {
    return (
        <textarea
            id= { id }
            className='my-[20px] font-urbanist flex-col top-9 min-w-full left-0
                resize-none border-[#5A5959] bg-[#EDEDED] mt-1 z-10 px-4 py-4 rounded-md'
            style={{ border: "#5a5959 solid 1px", height: "150px", fontSize: "16px", fontWeight: "600"}}
            placeholder= { placeHolder }
        />
    );
}

export default NarrationFormField;