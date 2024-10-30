import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export const UserContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [cookies,setCookies] = useCookies(['email']);
    const [useremail,setUserEmail] = useState(cookies.email);
    const [isadmin,setIsAdmin] = useState(false);

    return (
        <UserContext.Provider value={[
            {useremail,setUserEmail},{isadmin,setIsAdmin}
            ]}>
            {children}
        </UserContext.Provider>
    );
};