import React, { createContext, useState, useReducer} from "react";

export const UserContext = createContext({});

const initializeState = {
    // Temporaly false while I dont declare the database
        login: null,
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
                    login: action.payload.login
                };
            }
            case 'update-first-name':{
                return {
                    ...oldState,
                    firstName: action.payload.firstName
                }
            }
            case 'update-last-name':{
                return {
                    ...oldState,
                    lastName: action.payload.lastName
                }
            }
            case 'update-email':{
                return {
                    ...oldState,
                    email: action.payload.email
                }
            }
            case 'update-phone-number':{
                return {
                    ...oldState,
                    phone: action.payload.phone
                }
            }
        }
}

function UserProvider({children}){
    const [oldState, dispatch] = useReducer(userReducer, initializeState)

    function changeLogin (login){
        dispatch({
            type: 'update-login', payload: {login}
        });
    }
    
    function changeFirstName (firstName){
        dispatch({
            type: 'update-first-name', payload: {firstName}
        });
    }
    
    function changeLastName (lastName){
        dispatch({
            type: 'update-last-name', payload: {lastName}
        });
    }

    function changeEmail (email){
        dispatch({
            type: 'update-email', payload: {email}
        });
    }

    function changePhone (phone){
        dispatch({
            type: 'update-phone-number', payload: {phone}
        });
    }

    return(
        <UserContext.Provider value={{oldState, changeLogin, changeFirstName, changeEmail, changeLastName, changePhone}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;