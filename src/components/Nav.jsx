"use client"

import Link from "next/link"
import { GiHamburgerMenu } from "react-icons/gi"
import { BiUser } from "react-icons/bi"
import { TbShoppingCartPlus } from "react-icons/tb"
import { PiPlusBold } from "react-icons/pi"
import { useContext, useEffect, useRef, useState } from "react"
import Logo from "./Logo"
import { CategoriesContext } from "@/context/categoriesContext"
import { ProductsContext } from "@/context/productsContext"
import { CartContext } from "@/context/cartContext"
import Search from "./Search"
import { isClient } from "@/lib"

const Nav = ({ categories, products }) => {
    const { setCategories } = useContext(CategoriesContext);
    const { setProducts } = useContext(ProductsContext);

    const { cartCount } = useContext(CartContext)
    const [mobileNavShown, setMobileNavShown] = useState(false);

    const [isSmallDevice, setIsSmallDevice] = useState(isClient ? ( window.innerWidth > 767 ? false : true) : null)


    useEffect(() => {
        setCategories(categories)
        setProducts(products)
    }, [categories, products])



    const handleMobileNavClick = (e) => {
        const tag = e.target.tagName;
        if (tag === "A" || tag === "LI") {
            setMobileNavShown(false)
        }
    }





    return (
        <header className='nav  w-full flex flex-col justify-center  bg-neutral-100 shadow-md '>
            <nav className="top flex justify-between items-center px-8 py-1  xl:px-5 lg:px-3  gap-5">
                <div className="left flex items-center justify-center gap-20 xl:gap-15 lg:gap-8 ">
                    <Logo />
                </div>
                {
                    isSmallDevice || (
                        <Search products={products} categories={categories} />
                    )
                }
                <div className="right flex items-center justify-center gap-10 lg:gap-5 w-fit ">


                    <div className="meu-btn items-center justify-center hidden md:" onClick={() => { setMobileNavShown(true) }}>
                        <button className="  hamburger hover:bg-gray-300 transition duration-300 p-2   flex items-center justify-center rounded-full ">
                            <GiHamburgerMenu className="w-7 h-7 " />
                        </button>
                    </div>

                    <div className="menu font-medium flex items-center justify-center gap-8 text-xs xl:gap-4 ">
                        <Link href="#" className="account flex items-center justify-center" title="This is not currently available.">
                            <span className="icon mr-1">
                                <BiUser className="w-5 h-5" />
                            </span>
                            <span className="text xs:hidden">
                                Account
                            </span>
                        </Link>

                        <Link href="/cart" className=" account flex items-center justify-center ">
                            <span className="icon mr-1">
                                <TbShoppingCartPlus className="w-5 h-5" />
                            </span>
                            <span className="text xs:hidden">
                                Cart
                            </span>
                            <span className="cart-count xs:-ml-4 opacity-80 xs:-mt-6 relative flex h-5 w-5 ml-1">
                                <span className="animate-ping absolute  flex h-full w-full rounded-full bg-green-700  opacity-75"></span>
                                <span className="relative inline-flex  items-center justify-center rounded-full h-5 w-5 bg-green-800 text-white ">{cartCount}</span>
                            </span>
                        </Link>
                    </div>
                </div>


                <div onClick={handleMobileNavClick} className={`mobile-nav overflow-auto bg-gray-100 fixed z-20 ${mobileNavShown ? "right-0" : "right-[-120%]"} top-0 min-h-screen h-fit w-screen bg_blur bg-[rgba(0,20,0,.2)] transition duration-500   uppercase text-base font-medium`}>
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
                                        return <Link key={idx} className="" href={`/products/category/${cat}`}>{cat}</Link >
                                    })
                                }
                            </div>

                            {/* other */}
                            <div className="section">
                                <Link href="/products"><li className="">Products</li></Link>
                            </div>
                        </ul>
                    </div >

                    <div className="menu flex flex-col items-center justify-center" >
                        <Link href="#" title="My account" className="account flex items-center justify-center  w-full py-4 hover:bg-gray-300">
                            <span className="icon mr-1">
                                <BiUser className="w-5 h-5" />
                            </span>
                            <span className="text ">
                                Account
                            </span>
                        </Link>

                        <Link href="/cart" title="My cart" className="account flex items-center justify-center w-full py-4 hover:bg-gray-300">
                            <span className="icon mr-1">
                                <TbShoppingCartPlus className="w-5 h-5" />
                            </span>
                            <span className="text ">
                                Cart
                            </span>
                            <span className="cart-count relative flex h-7 w-7 ml-1">
                                <span className="animate-ping absolute  flex h-full w-full rounded-full bg-green-700  opacity-75"></span>
                                <span className="relative inline-flex  items-center justify-center rounded-full h-7 w-7 bg-green-800 text-white ">{cartCount}</span>
                            </span>
                        </Link>
                    </div>
                </div>

            </nav>

            {
                isSmallDevice && (
                    <nav className="mid px-4 py-2">
                        <Search products={products} categories={categories} />
                    </nav>
                )
            }

            <nav className="bottom bg-gray-200 px-8   xl:px-5 lg:px-3 overflow-y-hidden py-[0.2rem] overflow-x-auto hide_scrollbar">
                <div className="nav-items font-medium ">
                    <ul className="[] flex justify-start items-center gap-5 ">
                        <Link href="/products" ><li className="block shrink-0 w-fit hover:outline outline-2 text-sm font-semibold text-gray-700 outline-gray-500 py-2 px-[0.2rem] rounded cursor-pointer transition duration-300 ">All</li></Link>
                        {
                            categories?.map((cat, idx) => {
                                return <Link key={idx} className="capitalize block shrink-0" href={`/products/category/${cat}`}><li className="hover:outline outline-2 text-sm font-semibold text-gray-700 outline-gray-500 py-2 px-[0.2rem] rounded cursor-pointer transition duration-300 ">{cat} </li></Link >
                            })
                        }
                    </ul>
                </div >
            </nav>
        </header>



    )
}

export default Nav





// const searchIndex = lunr(function () {
//     this.ref("id")
//     this.field('title')
//     this.field('description')
//     this.field('category')





//     products?.forEach(doc => {
//         // Tokenize the text into partial word fragments
//         const tokens = doc.title.split(' ').flatMap(word => {
//             let partialWords = [];
//             for (let i = 1; i <= word.length; i++) {
//                 partialWords.push(word.slice(0, i));
//             }
//             return partialWords;
//         });

//         // Add partial word fragments to the index
//         tokens.forEach(token => {
//             this.add({
//                 id: doc.id,
//                 title: token,
//                 description: doc.description,
//                 category: doc.category,
//             });
//         });
//     });

// })