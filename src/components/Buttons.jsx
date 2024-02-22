import { Link } from "react-router-dom"

export function Button({text = '', onClick, isWhite = true, type = ''}) {
    const style = {
        color: isWhite ? "#fff" : "#2e2e2e",
        fontFamily: 'Urbanist',
        fontSize: !isWhite ? "16px" : null
    }
    return (
        <>
            <button
                type={ type }
                className="text-center text-xl font-bold whitespace-nowrap 
                    justify-center items-center bg-purple-300 max-w-full mt-7 px-16 py-4 rounded-md max-md:px-5"
                style={style}
                onClick={onClick}
            >{ text } </button>
        </>
    )
}

export function AuthLinkButton({title = '', path = '', isPurple = false}) {
    return (
        <>
            <Link
                to={path}
                className={`
                    text-black text-center text-lg font-medium whitespace-nowrap
                    justify-center items-center max-w-full mt-20 mb-16 px-16 py-3.5
                    rounded-md border-2 border-solid ${isPurple ? "border-purple-300" : "border-sky-950"}
                    max-md:my-10 max-md:px-5
                `}
                style={{fontFamily: 'Urbanist'}}
            > { title } </Link>
        </>
    )
}