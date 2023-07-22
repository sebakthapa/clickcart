"use client"
import { isClient } from '@/lib';
import React, { createContext, useState, useEffect } from 'react';


export const CartContext = createContext("");

export const CartContextProvider = (props) => {
  const initialCartData = JSON.parse(isClient && localStorage.getItem('cartData')) || [];

  const [cartData, setCartData] = useState(initialCartData);
  const [cartCount, setCartCount] = useState(0);


  const updateCartCount = () => {
    let count = 0;

    if (cartData.length > 0) {
      cartData.forEach((product) => {
        console.log("x:", product.quantity)
        count += product.quantity;
      })
    }
    console.log("count", count)
    setCartCount(count)
  }

  // Save cart data to local storage when the cartData is updated
  useEffect(() => {
    isClient && localStorage.setItem('cartData', JSON.stringify(cartData));
    setTimeout(() => {
      console.log(cartCount, cartData)
    }, 3000)


    updateCartCount();

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
    // const updatedProductArr = [];
    // let updatedProduct;

    // cartData.forEach((itm, idx) => {
    //   if (itm.id == id) {
    //     const prevQty = itm.quantity;

    //     if (prevQty == 0) {
    //       cartData.forEach((itm, idx) => {
    //         if (itm.id == id) {
              
    //         }
    //       })
    //     } else {
    //       const newQty = prevQty - 1;
    //       const updatedProduct = { ...itm, quantity: newQty }

          

    //     }

    //   } else {
    //     updatedProduct = itm;
    //   }
      
    // })
  }

  const increaseCart = (id) => {
    
  }

  const removeCart = (id) => {
    
  }


  return (
    <CartContext.Provider value={{ cartData, setCartData, addCart, cartCount, increaseCart, decreaseCart, removeCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

