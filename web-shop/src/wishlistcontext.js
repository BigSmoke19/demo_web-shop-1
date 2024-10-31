import React, { createContext, useState } from 'react';


export const WishListContext = createContext();

export const WishListDataProvider = ({ children }) => {
    const [items,setItems] = useState((localStorage.getItem('likes'))?JSON.parse(localStorage.getItem('likes')):[]);

    return (
        <WishListContext.Provider value={[
            {items,setItems}
            ]}>
            {children}
        </WishListContext.Provider>
    );
};