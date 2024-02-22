import Cookies from 'js-cookie';
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ token, setToken ] = useState(null);
    const [ emailAddress, setEmailAddress ] = useState(null);
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);

    const saveToken = (token) => {
        setToken(token)
        Cookies.set("token", token, {
            secure: true
        })
    }

    const saveEmailAddress = (emailAddress) => {
        setEmailAddress(emailAddress)
        Cookies.set("emailAddress", emailAddress, {
            secure: true
        })
    }

    const saveFirstName = (firstName) => {
        setFirstName(firstName)
        Cookies.set("firstName", firstName, {
            secure: true
        })
    }

    const saveLastName = (lastName) => {
        setLastName(lastName)
        Cookies.set("lastName", lastName, {
            secure: true
        })
    }

    const logout = () => {
        setToken(null)
        Cookies.remove("token")

        setEmailAddress(null)
        Cookies.remove("emailAddress")

        setFirstName(null)
        Cookies.remove("firstName")

        setLastName(null)
        Cookies.remove("lastName")
    }

    const contextValues = {
        token: token ?? Cookies.get("token"),
        firstName: firstName ?? Cookies.get("firstName"),
        lastName: lastName ?? Cookies.get("lastName"),
        emailAddress: emailAddress ?? Cookies.get("emailAddress"),
        setToken: saveToken,
        setEmailAddress: saveEmailAddress,
        setLastName: saveLastName,
        setFirstName: saveFirstName,
        logout,
    };

    return (
        <AuthContext.Provider value={ contextValues }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext