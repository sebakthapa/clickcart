"use client"
import { isClient } from '@/lib';
import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext("");

export const CartContextProvider = (props) => {
  const initialCartData = JSON.parse(isClient && localStorage.getItem('cartData')) || [];

  const [cartData, setCartData] = useState(initialCartData);

  // Save cart data to local storage when the cartData is updated
  useEffect(() => {
    isClient && localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {props.children}
    </CartContext.Provider>
  );
};

