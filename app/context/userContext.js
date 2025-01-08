import React, { createContext, useState, useReducer} from "react";

export const UserContext = createContext({});

const initializeState = {
    // Temporaly false while I dont declare the database
        login: false,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null
}
    function userReducer (oldState, action){
        switch(action.type){
            case 'update-login':{
                return {
                    ...oldState,
                    login: !oldState.login
                };
            }
            case 'update-first-name':{
                return {
                    ...oldState,
                    firstName: action.payload.firstName
                }
            }
            case 'update-last-name':{
                return
            }
            case 'update-email':{
                return {
                    ...oldState,
                    email: action.payload.email
                }
            }
            case 'update-phone-number':{

            }
        }
}

function UserProvider({children}){
    const [oldState, dispatch] = useReducer(userReducer, initializeState)

    function changeLogin (){
        dispatch({
            type: 'update-login',
        });
    }
    
    function changeFirstName (firstName){
        dispatch({
            type: 'update-first-name', payload: {firstName}
        });
    }
    
    function changeLastName (){
        dispatch({
            type: 'update-last-name', 
        });
    }

    function changeEmail (email){
        dispatch({
            type: 'update-email', payload: {email}
        });
    }

    function changePhone (){
        dispatch({
            type: 'update-phone-number', 
        });
    }

    return(
        <UserContext.Provider value={{oldState, changeLogin, changeFirstName, changeEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;