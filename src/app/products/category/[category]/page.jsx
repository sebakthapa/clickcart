"use client"
import CardsContainer from '@/components/CardsContainer';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const Page = ({ params }) => {
    const category = params.category.replaceAll("%20", " ")

    const fetchByCategory = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const res = await response.json();
        return res;
    }


    const { isError, isLoading, data: fetchedProducts } = useQuery({ queryKey: ['products', "category", category], queryFn: fetchByCategory })

  console.log("fetched priducts",  fetchedProducts)
  if (isError) {
    return "ERROR"
  }
  return (
    <div className='mt-5'>
      <h1 className='capitalize font-bold text-4xl mx-10 my-5'>{category}</h1>
      <CardsContainer cardItems={fetchedProducts} />
    </div>
  )
}

export default Page
