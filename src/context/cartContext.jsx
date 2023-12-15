"use client"
import { isClient } from '@/lib';
import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext("");

export const CartContextProvider = (props) => {
  const initialCartData = JSON.parse(isClient && localStorage.getItem('cartData')) || [];

  const [cartData, setCartData] = useState(initialCartData);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);



  const updateCartCount = () => {
    let count = 0;

    if (cartData.length > 0) {
      cartData.forEach((product) => {
        count += product.quantity;
      })
    }
    setCartCount(count)
  }

  const calculateSubtotal = () => {
    // Calculate subtotal
    let subtotal = 0;
    cartData.forEach((product) => {
      subtotal += product.price * product.quantity;
    });
    setSubtotal(subtotal.toFixed(2));
  };

  // Save cart data to local storage when the cartData is updated
  useEffect(() => {
    isClient && localStorage.setItem('cartData', JSON.stringify(cartData));
    setTimeout(() => {
    }, 3000)


    updateCartCount();
    calculateSubtotal();

  }, [cartData]);



  const addCart = (product) => {
    const addedQty = product.quantity || 1;

    if (cartData.length > 0) {
      cartData.map((itm, idx) => {
        // itm => existing product

        if (itm.id == product.id) {
          const updatedProduct = { ...itm, quantity: itm.quantity + addedQty }

          setCartData([...cartData.slice(0, idx),
            updatedProduct,
          ...cartData.slice(idx + 1)])
        } else {
          setCartData([...cartData, { ...product, quantity: addedQty }])
        }
      })
    } else {
      setCartData([...cartData, { ...product, quantity: addedQty }])

    }


  }

  const decreaseCart = (id) => {
    const updatedCartData = cartData.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(item.quantity - 1, 0); 
        return { ...item, quantity: newQty };
      }
      return item;
    });
  
    const filteredCartData = updatedCartData.filter((item) => item.quantity > 0);
  
    setCartData(filteredCartData);
  };
  

  const increaseCart = (id) => {
    const updatedCartData = cartData.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartData(updatedCartData);
  }

  const removeCart = (id) => {
    const updatedCartData = cartData.filter((item) => item.id !== id);
    setCartData(updatedCartData);
  };

  const clearCart = () => {
    setCartData([])
  }
  


  return (
    <CartContext.Provider value={{ cartData, setCartData, addCart, cartCount, increaseCart, decreaseCart, removeCart, subtotal, clearCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

