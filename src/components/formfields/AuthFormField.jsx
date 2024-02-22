function AuthFormField({title = '', id = '', onValueChanged, type = 'text'}) {
    return (
        <>
            <p 
                className="text-zinc-800 text-left text-lg font-medium self-stretch w-full mt-6 max-md:max-w-full max-md:mt-6"
                style={{fontFamily: 'Urbanist'}}
            > { title } </p>
            <input 
                id={ id }
                type={ type }
                style={{ padding: '1rem' }} 
                className="border bg-gray-200 flex shrink-0 max-w-full h-[50px] flex-col mt-1 
                rounded-md border-solid border-zinc-600"
                onChange={e => onValueChanged(e.target.value)}
            />
        </>
    );
}

export default AuthFormField;