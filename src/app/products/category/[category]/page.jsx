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

  return (
    <div className='mt-[113px]'>
      <CardsContainer arrayOfObjects={fetchedProducts} />
    </div>
  )
}

export default Page
