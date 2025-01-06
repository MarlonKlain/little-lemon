import React, { createContext, useState, useReducer} from "react";

export const UserContext = createContext({});

const ACTIONS = {
        UPDATE_LOGIN:'update-login',
        UPDATE_FIRSTNAME:'update-first-name',
        UPDATE_LASTNAME:'update-last-name',
        UPDATE_EMAIL:'update-email',
        UPDATE_PHONENUMBER:'update-phone-number',
}
export function userReducer (oldUserInfo, action){
    switch(action.type){
        case UPDATE_LOGIN:{
            return {...userInfo, login: !oldUserInfo.login}
        }
        case UPDATE_FIRSTNAME:{

        }
        case UPDATE_LASTNAME:{

        }
        case UPDATE_EMAIL:{

        }
        case UPDATE_PHONENUMBER:{

        }
    }
}

function UserProvider({children}){
    const [userInfo, dispatch] = useReducer(userReducer, {
        login: false,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: undefined
    })

    function changeLogin (vale){
        dispatch({
            type: UPDATE_LOGIN,
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
        <UserContext.Provider value={{userInfo, userReducer}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;