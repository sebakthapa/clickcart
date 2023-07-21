"use client"

import { createContext, useState } from "react";

export const ProductsContext = createContext("");

export const ProductContexProvider = ({children}) => {
    const [products, setProducts] = useState(null);

    return (
        <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>
    )
}