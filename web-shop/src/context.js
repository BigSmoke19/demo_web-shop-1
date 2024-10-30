import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState(null);
    const [items, setItems] = useState(null);
    const [recomendations,setRecomendations]= useState(null);
    const [useremail,setUserEmail] = useState(null);
    const [isadmin,setIsAdmin] = useState(false);
    const [tokens, setTokens] = useState(null);

    return (
        <DataContext.Provider value={[
            { search, setSearch },{items, setItems},
            {recomendations,setRecomendations}, {useremail,setUserEmail},{isadmin,setIsAdmin}
            ,{tokens,setTokens}
            ]}>
            {children}
        </DataContext.Provider>
    );
};