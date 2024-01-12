"use client"
import React, { Fragment, useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import CardsContainer from '../CardsContainer'
import { ProductsContext } from '@/context/productsContext'
import { useContext } from 'react'
import { filterString, sortProductsByPriceHighToLow, sortProductsByPriceLowToHigh, sortProductsByTopRating } from '@/lib'
import { Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { GiTick } from 'react-icons/gi'
import { FaCheck } from 'react-icons/fa'

const AllProducts = ({ products: customProducts }) => {
    console.log(customProducts)

    const { products: allProducts } = useContext(ProductsContext);

    const products = customProducts?.length > 0 ? customProducts : allProducts;
    const [selectedSortOption, setSelectedSortOption] = useState("Top Rated");
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        console.log(selectedSortOption)
        if (selectedSortOption == "Price high to low") {
            setFilteredProducts(sortProductsByPriceHighToLow(products))
        } else if (selectedSortOption == "Price low to high") {
            setFilteredProducts(sortProductsByPriceLowToHigh(products))
        } else if (selectedSortOption == "Top Rated") {
            setFilteredProducts(sortProductsByTopRating(products))
        } else {
            setFilteredProducts(sortProductsByTopRating(products))
        }


    }, [selectedSortOption])

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    const options = ["Best Match", "Price low to high", "Price high to low", "Top Rated"]

    return (
        <div className='min-h-screen mt-4'>
            <div className="top flex justify-between items-center px-2 sm:flex-col sm:items-start">
                <h1 className='font-bold text-4xl text-green-800 p-5 sm:text-3xl sm:p-3 capitalize  shrink-0'>{customProducts?.length > 0 ? customProducts[0].category : "All Products"}</h1>
                <div className="options  flex item-center w-full gap-10 justify-end px-3">
                    {/* <div className="filter">
                        I am filter and this long
                    </div> */}
                    <div className="sort">
                        <Menu as="div" className="relative inline-block text-left ">
                            <div >
                                <Menu.Button id='menu_button' className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-stone-100 px-4 py-[0.65rem] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {selectedSortOption}
                                    <BiChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {
                                            options.map((opt, idx) => (
                                                <Menu.Item key={idx}>

                                                    <span
                                                        onClick={() => { setSelectedSortOption(opt) }}
                                                        className={classNames(
                                                            selectedSortOption == opt ? ' text-gray-900 font-semibold' : 'text-gray-700',
                                                            'flex gap-2 items-center  px-4 py-2 text-sm cursor-pointer ',
                                                            'hover:bg-gray-100'
                                                        )}
                                                    >
                                                        {opt}
                                                        {
                                                            selectedSortOption == opt && (
                                                                <FaCheck />
                                                            )
                                                        }
                                                    </span>
                                                </Menu.Item>
                                            ))
                                        }

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

            </div>
            <div className="products-container  w-full flex flex-col">
                <CardsContainer cardItems={filteredProducts} />
            </div>
        </div>
    )
}

export default AllProducts
