import React, { createContext, useState } from "react";

export const LoginContext = createContext({});

function LoginProvider({children}){
    const [login, setLogin] = useState(null)

    function changeLogin (value){
        setLogin(value);
    }
    return(
        <LoginContext.Provider value={{changeLogin, login}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;