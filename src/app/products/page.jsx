"use client"
import Card from '@/components/Card'
import PageLoader from '@/components/PageLoader'
import { ProductContextProvider, ProductsContext } from '@/context/productsContext'
import { groupObjectsRandomly } from '@/lib'
import { useQueries, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
    const isClient = typeof window !== 'undefined';

    const [width, setWidth] = useState(isClient ? window?.innerWidth : 0);
    const [maxArrayLen, setMaxArrLen] = useState(Math.floor(isClient ? window?.innerWidth / 400 : 0))


    const { products, setProducts } = useContext(ProductsContext);

    const [finalProductsArray, setFinalProductsArray] = useState(products)




    // const categories = useQueries("categories") 

    const fetchAllProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const res = await response.json();
        setProducts(res)
        return res;
    }


    const { isError, isLoading, data: fetchedProducts } = useQuery({ queryKey: ['products'], queryFn: fetchAllProducts })


    useEffect(() => {
            
        function handleResize() {
            setWidth(window.innerWidth);
            if (width < 350) {
                setMaxArrLen(1)
            } else {
                width > 1000 ? setMaxArrLen(Math.floor(window.innerWidth / 400)) : setMaxArrLen(Math.floor(window.innerWidth / 350));
            }
        }
        window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
            
    }, [width]);

    useEffect(() => {
        if (products?.length > 0) {
            setFinalProductsArray(groupObjectsRandomly(products, maxArrayLen < 1 ? 1 : maxArrayLen))

        }
        
    }, [maxArrayLen, products?.length])
    


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
        <div className='min-h-screen mt-[113px]'> 
            <h1 className='font-bold text-4xl text-green-800 p-5 sm:text-3xl sm:p-3'>PRODUCTS</h1>
            <div className="products-container  w-full flex flex-col">
                {/* {
                    fetchedProducts?.map(({ title, id, description, rating, price, image, category }, idx) => {
                        return (
                            idx < 8 && <Card key={id} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                        )
                    })
                } */}

                {
                    finalProductsArray?.map((arr, idx) => {
                        return (
                            <div key={idx} className="products-row flex w-full">
                                {
                                    arr.length > 0 && arr.map(({ title, id, description, rating, price, image, category }, idx) => {
                                        return (
                                            idx < 8 && <Card link={`/products/${id}`} key={id} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page
