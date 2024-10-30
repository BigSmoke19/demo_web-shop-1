import React, { createContext, useState } from 'react';

export const VerifyContext = createContext();

export const VerifyDataProvider = ({ children }) => {
    const [name,setName]= useState(null);
    const [email,setEmail]= useState(null);
    const [password,setPassword]= useState(null);
    const [code,setCode]= useState(null);

    return (
        <VerifyContext.Provider value={[
            {name,setName},{email,setEmail},{password,setPassword},{code,setCode}
            ]}>
            {children}
        </VerifyContext.Provider>
    );
};