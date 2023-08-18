"use client"
import React, { useEffect, useState } from 'react'
import Dropdown from '../Dropdown'
import CardsContainer from '../CardsContainer'
import { ProductsContext } from '@/context/productsContext'
import { useContext } from 'react'
import { filterString, sortProductsByPriceHighToLow, sortProductsByPriceLowToHigh, sortProductsByTopRating } from '@/lib'

const AllProducts = ({ products: customProducts }) => {
    console.log(customProducts)

    const { products: allProducts } = useContext(ProductsContext);
    
    const products = customProducts?.length > 0 ? customProducts : allProducts;
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        const option = filterString(selectedSortOption ? selectedSortOption :"")
        console.log(option)
        if (option == "pricehightolow") {
            setFilteredProducts(sortProductsByPriceHighToLow(products))
        } else if (option == "pricelowtohigh") {
            setFilteredProducts(sortProductsByPriceLowToHigh(products))
        } else if (option == "toprated") {
            setFilteredProducts(sortProductsByTopRating(products))
        } else {
            setFilteredProducts(products)
        }
        

    },[selectedSortOption])


    return (
        <div className='min-h-screen mt-4'>
            <div className="top flex justify-between items-center px-2 sm:flex-col sm:items-start">
                <h1 className='font-bold text-4xl text-green-800 p-5 sm:text-3xl sm:p-3 capitalize  shrink-0'>{ customProducts?.length > 0 ? customProducts[0].category : "All Products" }</h1>
                <div className="options  flex item-center w-full gap-10 justify-end px-3">
                    {/* <div className="filter">
                        I am filter and this long
                    </div> */}
                    <div className="sort">
                        <Dropdown options={["Best Match", "Price low to high", "Price high to low", "Top Rated"]} onChange={setSelectedSortOption} />
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
