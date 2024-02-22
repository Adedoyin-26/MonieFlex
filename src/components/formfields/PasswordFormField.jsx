import {Icon} from "@iconify/react";

function PasswordFormField({title = '', visible = false, id = 'password', onValueChanged, onToggle, value}) {
    return (
        <>
            <p className="text-zinc-800 text-left text-lg font-medium self-stretch w-full mt-6 max-md:max-w-full max-md:mt-6"
               style={{fontFamily: 'Urbanist'}}
            > { title } </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type={visible ? "text" : "password"}
                    id={ id }
                    value={ value }
                    onChange={e => onValueChanged(e.target.value)}
                    style={{ padding: '1rem', flex: '1' }}
                    className="border bg-gray-200 flex shrink-0 max-w-full h-[50px] flex-col mt-1 rounded-md border-solid border-zinc-600"
                />
                <div style={{ marginLeft: '-2rem', cursor: 'pointer' }} onClick={onToggle}>
                    {visible ? <Icon icon="ph:eye" /> : <Icon icon="ph:eye-slash" />}
                </div>
            </div>
        </>
    )
}

export default PasswordFormField;