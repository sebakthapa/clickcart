"use client"

import Link from "next/link"
import { AiFillStar, AiOutlineSearch } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { BiUser } from "react-icons/bi"
import { TbShoppingCartPlus } from "react-icons/tb"
import { PiCaretDownBold, PiPlusBold } from "react-icons/pi"
import { Suspense, useContext, useEffect, useState } from "react"
import Logo from "./Logo"
import { useQuery } from "@tanstack/react-query"
import { CategoriesContext } from "@/context/categoriesContext"
import PageLoader from "./PageLoader"
import lunr from "lunr"
import { ProductsContext } from "@/context/productsContext"
import Image from "next/image"
import { getSomeWords } from "@/lib"

const Nav = ({ }) => {
    const { categories, setCategories } = useContext(CategoriesContext);
    const { products, setProducts } = useContext(ProductsContext)

    const [searchText, setSearchText] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const [mobileNavShown, setMobileNavShown] = useState(false);

    const [searchedData, setSearchedData] = useState(null)

    const searchIndex = lunr(function () {
        this.ref("id")
        this.field('title')
        this.field('description')
        this.field('category')





        products?.forEach(doc => {
            // Tokenize the text into partial word fragments
            const tokens = doc.title.split(' ').flatMap(word => {
                let partialWords = [];
                for (let i = 1; i <= word.length; i++) {
                    partialWords.push(word.slice(0, i));
                }
                return partialWords;
            });

            // Add partial word fragments to the index
            tokens.forEach(token => {
                this.add({
                    id: doc.id,
                    title: token,
                    description: doc.description,
                    category: doc.category,
                });
            });
        });

    })

    const fetchCategories = async () => {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const res = await response.json();
        setCategories(res)
        return res;
    }

    const { isLoading, isError, error, data: fetchedCategories } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories })

    useEffect(() => {
        console.log("cat>>>>>>>>>>>>>>>>>>>>", categories)
    }, [categories])



    const handleSearch = (e) => {
        e.preventDefault();
        console.log("submitted")
        console.log(inputField)
    }

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchText(query);
        const results = searchIndex.search(query)

        const mappedResults = results.map(result => {
            const { ref, matchData } = result;
            const doc = products?.find(d => d.id == ref);
            return {
                ...doc,
                matchData: matchData.metadata,
            };
        });

        console.log(mappedResults);
        setSearchedData(mappedResults)


    }


    const handleSearchClick = (e) => {
        const target = e.target;
        const inputField = target.previousElementSibling;
        !searchFocused && inputField.focus();
    }

    const handleMobileNavClick = (e) => {
        const tag = e.target.tagName;
        if (tag === "A" || tag === "LI") {
            setMobileNavShown(false)
        }
    }

    const fetchAllProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const res = await response.json();
        setProducts(res)
        return res;
    }


    const { data: fetchedProducts } = useQuery({ queryKey: ['products'], queryFn: fetchAllProducts })

    // if (isLoading) {
    //     return <PageLoader />
    // }

    // if (isError) {
    //     return "ERROR OCCURED \n" + error.message
    // }


    return (
        <div className='nav h-[80px] w-full py-1 px-10 xl:px-5 lg:px-3 flex justify-between items-center bg-neutral-100'>
            <div className="left flex items-center justify-center gap-20 xl:gap-15 lg:gap-8 ">
                <Logo />

                <div className="nav-items font-medium md:hidden">
                    <ul className="flex items-center gap-8 lg:gap-5" >
                        <li><Link href="/">Home</Link> </li>
                        <li>
                            <div className="_dropdown">
                                <p className="title flex items-center gap-1   cursor-pointer capitalize">Category<span><PiCaretDownBold /></span></p>
                                <div className="dropdown_items bg-neutral-100">
                                    <ul className="[] flex flex-col">
                                        {
                                            categories?.map((cat, idx) => {
                                                return <li key={idx} className="capitalize w-fit"><Link href={`/products/${cat}`}>{cat}</Link ></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li><Link href="/products">Products</Link> </li>
                        <li><Link href="/">Delivery</Link> </li>
                    </ul>
                </div >
            </div>



            <div className="right flex items-center justify-center gap-10 lg:gap-5 w-fit ">
                <div className={` search-container inline-block w-fit relative cursor-pointer`} >
                    <form onSubmit={handleSearch} style={{ transition: "width .5s linear" }} className="searchInputContainer flex items-center rounded-lg">
                        <input autoComplete="off" id="searchInput" className={` input bg-gray-100 border-solid border-gray-200 border-2 border-r-0  absolute w-[300px] xl:w-[85px] lg:w-[0] px-4  focus:w-[300px] left-auto right-[49px] text-base bg-transparent   outline-none cursor-pointer rounded-full rounded-r-none focus:px-4 py-2 `} value={searchText} onChange={handleSearchInput} onBlur={() => setTimeout(() => setSearchFocused(false), 100)} onFocus={() => setSearchFocused(true)} type="text" placeholder="Search Product" />
                        <label htmlFor="searchInput" type="submit" className="icon border-solid border-gray-200 border-2 border-l-0 rounded-full rounded-l-none  w-[50px] cursor-pointer flex items-center justify-center px-4 py-2" onClick={handleSearchClick}>
                            <AiOutlineSearch className="w-6 h-6 text-gray-500" />
                        </label>
                    </form>
                    <div className={`search-content ${!searchFocused ? "hidden" : "block"} absolute top-full right-0 sm:right-[-50px] w-[500px] sm:w-[90vw] bg-gray-50 rounded-lg p-5 sm:p-2 h-[80vh] overflow-auto`}>
                        {
                            searchFocused ? (
                                <div className="flex flex-col gap-5">
                                    {
                                        searchedData?.map(({ title, image, id, price, rating }, idx) => {
                                            return (
                                                <Link href={`/products/${id}`}  className="search-card py-5 px-7 sm:py-3 sm:px-4 flex items-center gap-3 hover:bg-gray-200" key={idx}>
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
                                                                                <AiFillStar className='text-yellow-500 w-5 h-5' />
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
                                <p className="text-center p-4">Nothing matched your search</p>
                            )
                        }
                    </div>

                </div>

                <div className="meu-btn items-center justify-center hidden md:flex" onClick={() => { setMobileNavShown(true) }}>
                    <button className="  hamburger hover:bg-gray-300 transition duration-300 p-2   flex items-center justify-center rounded-full ">
                        <GiHamburgerMenu className="w-7 h-7 " />
                    </button>
                </div>

                <div className="menu font-medium flex items-center justify-center gap-8 text-xs xl:gap-4 md:hidden">
                    <Link href="#" className="account flex items-center justify-center">
                        <span className="icon mr-1">
                            <BiUser className="w-5 h-5" />
                        </span>
                        <span className="text">
                            Account
                        </span>
                    </Link>

                    <Link href="/" className="account flex items-center justify-center ">
                        <span className="icon mr-1">
                            <TbShoppingCartPlus className="w-5 h-5" />
                        </span>
                        <span className="text">
                            Cart
                        </span>
                    </Link>
                </div>
            </div>


            <div onClick={handleMobileNavClick} className={`mobile-nav bg-gray-100 fixed z-20 ${mobileNavShown ? "right-0" : "right-[-120%]"} top-0 h-screen w-screen bg_blur bg-[rgba(0,20,0,.2)] transition duration-500  hdden uppercase text-base font-medium`}>
                <div className="top flex items-center justify-between px-7 py-4 bg-green-900 text-gray-100">
                    <h2 className="text-3xl font-extrabold ">MENU</h2>
                    <div onClick={() => setMobileNavShown(false)} className="close w-[100px] bg-red-800 px-8 py-3 rounded text-center font-semibold text-gray-200  cursor-pointer flex items-center justify-center hover:bg-red-700 transition">
                        CLOSE <span className="inline-block rotate-45 "><PiPlusBold className="w-6 h-6" /></span>
                    </div>
                </div>
                <div className="nav-items">

                    <ul className="flex flex-col items-start justify-center -mr-2" >
                        <div className="section">
                            <Link href="/"><li className="">Home</li></Link>
                        </div>
                        {/* categories */}
                        <div className="section">
                            <p className="_heading">Categories:</p>
                            {
                                categories?.map((cat, idx) => {
                                    return <Link key={idx} className="" href={cat}>{cat}</Link >
                                })
                            }
                        </div>

                        {/* other */}
                        <div className="section">
                            <Link href="/products"><li className="">Products</li></Link>
                            <Link href="/"><li className="">Delivery</li></Link>
                        </div>
                    </ul>
                </div >

                <div className="menu flex flex-col items-center justify-center" >
                    <Link href="#" className="account flex items-center justify-center  w-full py-4 hover:bg-gray-300">
                        <span className="icon mr-1">
                            <BiUser className="w-5 h-5" />
                        </span>
                        <span className="text">
                            Account
                        </span>
                    </Link>

                    <Link href="/" className="account flex items-center justify-center w-full py-4 hover:bg-gray-300">
                        <span className="icon mr-1">
                            <TbShoppingCartPlus className="w-5 h-5" />
                        </span>
                        <span className="text">
                            Cart
                        </span>
                    </Link>
                </div>
            </div>
        </div>



    )
}

export default Nav
