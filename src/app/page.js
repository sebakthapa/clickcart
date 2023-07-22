"use client"

import PageLoader from '@/components/PageLoader'
import { CategoriesContext } from '@/context/categoriesContext'
import { fetchCategories } from '@/lib'
import { useQueries, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BiArrowFromLeft } from 'react-icons/bi'
import { BsArrowRightCircle } from 'react-icons/bs'

export default function Home() {
  const { categories, setCategories } = useContext(CategoriesContext)


  const fetchCategories = async () => {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const res = await response.json();
    setCategories(res)
    return res;
  }

  const { isLoading, isError, error, data: fetchedCategories } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories })

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return "ERROR OCCURED \n" + error.message
  }

  return (
    <div className='home'>

      {/* <HeroImage src="/landingBg.png" /> */}
      <section style={{ background: "url('/landingBG.png')" }} className="w-full Landing-section h-[625px] lg:h-[600px] md:h-[550px] sm:h-[400px] flex items-center lg:items-center justify-center mt-[100px] bg-cover bg-no-repeat">
        <div className='text-area flex flex-col gap-10 lg:gap-5 w-[630px] md:w-[540px] sm:w-full xs:-mt-28'>
          <h2 className="title text-6xl xl:text-5xl lg:text-4xl md:text-6xl sm:text-5xl xs:text-3xl  font-bold text-green-900">Shopping And <br />Department Store.</h2>
          <h5 className="subtitle text-xl xl:text-lg lg-text-sm md:text-xl sm:text-base xs:text-sm font-medium text-green-900">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</h5>
          <div className="buttons flex gap-2">
            <Link className='inline-block px-7 py-3 xs:py-2 xs:px-5 xs:text-sm bg-green-900 rounded-full text-gray-100 font-medium hover:bg-green-700 hover:translate-y-[-7px] transition duration-500' href="#">Learn More</Link>
            <Link className='group flex items-center  gap-1  px-7 py-3 xs:py-2 xs:px-5 xs:text-sm border-solid border-green-900 border-2 hover:bg-green-900 rounded-full text-green-900 hover:text-gray-100 font-medium  transition duration-500' href="/products">Products  <span className='group-hover:translate-x-3 transition-transform duration-700'><BsArrowRightCircle className='w-5 h-5' /></span></Link>
          </div>
        </div>
        <div className="hero-images ml-11 animate_hover md:hidden">
          <Image alt='ClickCart services' className="g-red-500 -mt-7 w-[95%]" src="/landingSVG.svg" width={1000} height={300} />
        </div>

      </section>

      <section className="categories py-20 ">
        <h2 className='text-3xl font-bold capitalize text-center  mb-7'>Shop Our top categories</h2>
        <div className="categories-cards-container flex flex-wrap justify-center gap-10 w-full">
          {categories?.map((cat, idx) => {
            return (
              <Link href={`/products/category/${cat}`} key={idx} className='category-card block  relative group overflow-hidden  min-w-[200px] w-[250px] h-[400px] sm:w-[80%] xs:w-full   rounded-xl cursor-pointer'>
                <Image className='absolute -z-10 top-0 left-0 w-full h-full object-cover group-hover:scale-[1.2] transition duration-500 brightness-50' src={`https://source.unsplash.com/random/180x320/?${cat}`} alt={`${cat} image`} width="200" height="300" />
                <h3 className="absolute top-[50%] translate-y-[-50%] left-0 w-full text-center text-2xl category-title capitalize font-bold text-gray-100 group-hover:op-[20%] transition duration-500">{cat}</h3>
                {/* <p className="browse flex items-center gap-1 justify-center capitalize absolute bottom-[0%] py-5 bg-gray-100 text-green-800 left-0 w-full opacity-0  group-hover:opacity-100  text-center transition duration-300  text-sm">
                  {cat} <span> <AiOutlineArrowRight /> </span>
                </p> */}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
