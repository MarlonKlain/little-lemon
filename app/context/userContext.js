import React, { createContext, useState, useReducer} from "react";

export const UserContext = createContext({});

const initializeState = {
        login: false,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: undefined
}
export function userReducer (oldUserInfo, action){
    switch(action.type){
        case 'update-login':{
            return console.log(oldUserInfo)
        }
        case 'update-first-name':{

        }
        case 'update-last-name':{

        }
        case 'update-email':{

        }
        case 'update-phone-number':{

        }
    }
}

function UserProvider({children}){
    const [userInfo, dispatch] = useReducer(userReducer, initializeState)

    function changeLogin (){
        dispatch({
            type: 'update-login', 
        });
    }
    
    function changeLogin (){
        dispatch({
            type: 'update-first-name', 
        });
    }
    
    function changeLogin (){
        dispatch({
            type: 'update-last-name', 
        });
    }

    function changeLogin (){
        dispatch({
            type: 'update-email', 
        });
    }

    function changeLogin (){
        dispatch({
            type: 'update-phone-number', 
        });
    }

    return(
        <UserContext.Provider value={{userInfo, dispatch, changeLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;