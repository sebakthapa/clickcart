"use client"

import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai"
import Image from "next/image"
import { getSomeWords } from "@/lib"
import Link from "next/link";


const Search = ({ categories, products }) => {
    const [searchText, setSearchText] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchedData, setSearchedData] = useState(null);
    const [selectedSearchCategory, setSelectedSearchCategory] = useState("all")




    const handleSearch = (e) => {
        e.preventDefault();
    }

    const handleSearchInput = (e) => {
        const query = e ? e.target.value : searchText;
        setSearchText(query);
        const searchResult = handleSearchData(query)

        setSearchedData(searchResult)
    }

    const handleSearchCategoriesChange = (e) => {

        const selectedOption = e.target.selectedOptions[0];
        setSelectedSearchCategory(selectedOption.value);
        const width = (selectedOption.value.length) * 1 + 3;
        e.target.style.width = `${width}ch`;

    }

    const handleSearchData = (query) => {
        query = query.toLowerCase()
        const searchResult = [];
        products?.forEach((item) => {
            const { title, description, category } = item;
            if (title.toLowerCase().indexOf(query) > 0 || category.toLowerCase().indexOf(query) > 0 || description.toLowerCase().indexOf(query) > 0) {
                searchResult.push(item)
            }

        });

        if (selectedSearchCategory == "all") return searchResult;

        return searchResult.filter((product) => product.category.toLowerCase().replace(/['\s]/g, "") == selectedSearchCategory)
    }

    useEffect(() => {
        handleSearchInput()

    }, [selectedSearchCategory])



    return (
        <div className={` search-container w-full max-w-[1500px] h-[45px]  cursor-pointer  relative `} >

            <form onSubmit={handleSearch} style={{ transition: "width .5s linear" }} className="searchInputContainer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-20  focus-within:ring-[3px]  ring-green-500   flex items-center w-full h-full rounded-lg">
                <select onChange={handleSearchCategoriesChange} defaultValue="all" title="Search in" className={`categoriesSearchDropdown xs:hidden h-full outline-none capitalize cursor-pointer w-[6ch] pl-3     bg-gray-200  rounded-l-lg`}>
                    <option className="capitalize " value="all">All</option>

                    {
                        categories?.map((cat, idx) => {
                            return (
                                <option key={idx} className="capitalize p-5 w-fit" value={cat.toLowerCase().replaceAll(" ", "").replaceAll("'", "")}>{cat}</option>
                            )
                        })
                    }

                </select>
                <input autoComplete="off" id="searchInput" className={`SearchInput xs:rounded-l-lg h-full  bg-gray-100 border-solid border-gray-200 border-2 border-r-0  w-full px-4  text-base outline-none focus:px-4 py-[0.5rem] `} value={searchText} onChange={handleSearchInput} onFocus={() => setSearchFocused(true)} type="text" placeholder="Search Product" />
                <button type="submit" className="searchButton bg-green-300 border-solid h-full border-green-300 border-2 border-l-0 rounded-r-lg cursor-pointer flex items-center justify-center px-4 xs:px-2">
                    <AiOutlineSearch className="w-6 h-6 text-gray-700" />
                </button>
            </form>
            <div onClick={() => setSearchFocused(false)} className={`searchOverlay fixed top-0 left-0 z-10  w-screen  h-screen cursor-default bg-[rgba(0,0,0,.3)] ${searchFocused ? "block" : "hidden"}`}></div>
            <div className={`search-content ${!searchFocused ? "hidden" : "block"} absolute z-20 top-full left-[60px]  w-[calc(100%-60px)] sm:w-[90vw] bg-gray-50 rounded-b-lg p-5 sm:p-2 max-h-[80vh] overflow-auto`}>
                {
                    searchText ? (
                        <>
                            {
                                searchedData?.length > 0 ? (
                                    <div className="flex flex-col gap-5">
                                        {
                                            searchedData?.map(({ title, image, id, price, rating }, idx) => {
                                                return (
                                                    <Link onClick={() => setSearchFocused(false)} href={`/products/${id}`} className="search-card py-5 px-7 sm:py-3 sm:px-4 flex items-center gap-3 hover:bg-gray-200" key={idx}>
                                                        <div className="image w-[80px] h-[80px] overflow-hidden">
                                                            <Image className="w-full h-full object-contain" alt={title} src={image} height={100} width={50} />
                                                        </div>
                                                        <div className="details w-[80%] flex flex-col gap-1">
                                                            <h2 className="title font-bold">{getSomeWords(title, 5)}</h2>
                                                            <div className="others flex justify-between items-center">
                                                                <div className="ratings flex gap-1 items-center">
                                                                    <span className="stars flex">
                                                                        {
                                                                            Array(Math.floor(rating?.rate ? rating.rate : 0))
                                                                                .fill()
                                                                                .map((_, i) => (
                                                                                    <AiFillStar key={i} className='text-yellow-500 w-5 h-5' />
                                                                                ))}
                                                                    </span>
                                                                    <span className="number text-sm">({rating?.count})</span>
                                                                </div>
                                                                <p className="price font-semibold">${price}</p>

                                                            </div>

                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <p className="text-center p-4">Oops! product not found...</p>
                                )

                            }
                        </>
                    ) : (
                        <p className="text-center p-4">Start typing to search...</p>

                    )

                }
            </div>

        </div>
    )
}

export default Search
