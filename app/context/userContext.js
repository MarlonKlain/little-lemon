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
    function userReducer (user, action){
        switch(action.type){
            case 'update-login':{
                return {
                    ...user,
                    login: action.payload.login
                };
            }
            case 'update-first-name':{
                return {
                    ...user,
                    firstName: action.payload.firstName
                }
            }
            case 'update-last-name':{
                return {
                    ...user,
                    lastName: action.payload.lastName
                }
            }
            case 'update-email':{
                return {
                    ...user,
                    email: action.payload.email
                }
            }
            case 'update-phone-number':{
                return {
                    ...user,
                    phone: action.payload.phone
                }
            }
            case 'update-user': {
                return {
                  ...user,
                  ...action.payload, // Update all provided fields
                };
              }
        }
}

function UserProvider({children}){
    const [user, dispatch] = useReducer(userReducer, initializeState)

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
    function updateUser(newData) {
        dispatch({
          type: 'update-user',
          payload: newData, // Pass the full object with updated values
        });
      }

    return(
        <UserContext.Provider value={{user, changeLogin, changeFirstName, changeEmail, changeLastName, changePhone, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;