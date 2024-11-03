import React, { createContext, useState } from 'react';


export const CartContext = createContext();

export const CartDataProvider = ({ children }) => {
    const [items,setItems] = useState((localStorage.getItem('cartItems'))?JSON.parse(localStorage.getItem('cartItems')):[]);

    return (
        <CartContext.Provider value={[
            {items,setItems}
            ]}>
            {children}
        </CartContext.Provider>
    );

};