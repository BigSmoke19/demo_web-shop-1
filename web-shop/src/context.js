import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState(null);
    const [items, setItems] = useState(null);

    return (
        <DataContext.Provider value={[{ search, setSearch },{items, setItems}]}>
            {children}
        </DataContext.Provider>
    );
};