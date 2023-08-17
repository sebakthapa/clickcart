"use client"
import CardsContainer from '@/components/CardsContainer'
import PageLoader from '@/components/PageLoader'
import {  ProductsContext } from '@/context/productsContext'
import {  useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {


    const { products, setProducts } = useContext(ProductsContext);


    const fetchAllProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const res = await response.json();
        setProducts(res)
        return res;
    }


    const { isError, isLoading, data: fetchedProducts } = useQuery({ queryKey: ['products'], queryFn: fetchAllProducts })


    if (isError) {
        return (
            " ERROR OCCURED"
        )
    }
    if (isLoading) {
        return (
            <PageLoader message="Fetching Products for you" />
        )
    }


    return (
        <div className='min-h-screen mt-4'> 
            <h1 className='font-bold text-4xl text-green-800 p-5 sm:text-3xl sm:p-3'>PRODUCTS</h1>
            <div className="products-container  w-full flex flex-col">
                <CardsContainer cardItems={products} />
            </div>
        </div>
    )
}

export default Page
