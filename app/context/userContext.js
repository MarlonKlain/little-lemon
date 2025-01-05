import React, { createContext, useState } from "react";

export const UserContext = createContext({});

function UserProvider({children}){
    const [user, setUser] = useState({
        login: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: undefined
    })

    function changeLogin (value){
        setUser({
            login: value,
        });
    }
    
    function changeFirstName (value){
        setUser({
            firstName: value,
        });
    }

    function changeLastName (value){
        setUser({
            lastName: value,
        });
    }

    function changeEmail (value){
        setUser({
            email: value,
        });
    }

    function changePhoneNumber (value){
        setUser({
            phoneNumber: value,
        });
    }

    return(
        <UserContext.Provider value={{user, changeLogin, changeFirstName, changeLastName, changeEmail, changePhoneNumber}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;