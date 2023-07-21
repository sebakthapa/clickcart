"use client"

import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { BiUser } from "react-icons/bi"
import { TbShoppingCartPlus } from "react-icons/tb"
import { PiCaretDownBold, PiPlusBold } from "react-icons/pi"
import { Suspense, useState } from "react"
import Logo from "./Logo"

const Nav = () => {

    const [searchText, setSearchText] = useState("");
    const [searchFocused, setSearchFocused] = useState(true);
    const [mobileNavShown, setMobileNavShown] = useState(false);


    const handleSearch = (e) => {
        e.preventDefault();
        console.log("submitted")

        console.log(inputField)
        console.log(e)

    }

    const handleSearchClick = (e) => {
        const target = e.target;
        const inputField = target.previousElementSibling;
        !searchFocused && inputField.focus();

    }

    return (
        <div className='nav h-[60px] width-full py-1 px-3 flex justify-between items-center bg-neutral-100 fixed z-10 to-5 left-0 w-screen'>
            <div className="left flex items-center justify-center gap-20 xl:gap-15 lg:gap-10 ">
                <Logo />

                <div className="nav-items font-medium md:hidden">
                    <ul className="flex items-center gap-8 lg:gap-5" >
                    <li><Link href="/">Home</Link> </li>
                        <li>
                            <div className="_dropdown">
                                <p className="title flex items-center gap-1   cursor-pointer capitalize">Category<span><PiCaretDownBold /></span></p>
                                <div className="dropdown_items bg-neutral-100">
                                    <ul>
                                        <li><Link href="/">Men's clothing</Link ></li>
                                        <li><Link href="/">Category 2</Link ></li>
                                        <li><Link href="/">Category 3</Link ></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li><Link href="/">Deals</Link> </li>
                        <li><Link href="/">Delivery</Link> </li>
                    </ul>
                </div >
            </div>



            <div className="right flex items-center justify-center gap-10 lg:gap-5 w-fit ">
                <div className={` search-container relative cursor-pointer`} >
                    <form onSubmit={handleSearch} style={{transition: "width .5s linear"}} className="searchInputContainer flex items-center rounded-lg">
                        <input id="searchInput" className={` input bg-gray-100 border-solid border-gray-200 border-2 border-r-0  absolute w-[300px] xl:w-[85px] lg:w-[0] px-4  focus:w-[300px] left-auto right-[49px] text-base bg-transparent   outline-none cursor-pointer rounded-full rounded-r-none focus:px-4 py-2 `} value={searchText} onChange={(e) => setSearchText(e.target.value)} onBlur={() => setSearchFocused(false)} onFocus={() => setSearchFocused(true)} type="text" placeholder="Search Product" />
                        <label htmlFor="searchInput" type="submit" className="icon border-solid border-gray-200 border-2 border-l-0 rounded-full rounded-l-none  w-[50px] cursor-pointer flex items-center justify-center px-4 py-2" onClick={handleSearchClick}>
                            <AiOutlineSearch className="w-6 h-6 text-gray-500" />
                        </label>
                    </form>

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


            <div className={`mobile-nav bg-gray-100 fixed z-20 ${mobileNavShown ? "right-0" : "right-[-100%]"} top-0 h-screen w-screen bg_blur bg-[rgba(0,20,0,.2)] transition duration-500  hdden uppercase text-base font-medium`}>
                    <div className="top flex items-center justify-between px-7 py-4">
                    <h2 className="text-3xl font-extrabold text-green-950">MENU</h2>
                        <div onClick={() => setMobileNavShown(false)} className="close w-[100px] bg-red-800 px-8 py-3 rounded text-center font-semibold text-gray-200  cursor-pointer flex items-center justify-center hover:bg-red-700 transition">
                            CLOSE <span className="inline-block rotate-45 "><PiPlusBold className="w-6 h-6" /></span>
                        </div>
                    </div>
                    <div className="nav-items">
                        <ul className="flex flex-col items-start justify-center -mr-2" >
                            {/* categories */}
                            <p className="_heading ">Categories:</p>
                            <Link href="/"><li className="">Men's clothing</li></Link >
                            <Link href="/"><li className="">Category 2</li></Link >
                            <Link href="/"><li className="">Category 3</li></Link >
                            <Link href="/"><li className="">Deals</li></Link>

                            {/* other */}
                            <Link href="/"><li className="">What's New</li></Link>
                            <Link href="/"><li className="">Delivery</li></Link>
                        </ul>
                    </div >

                    <div className="menu flex flex-col items-center justify-center  border-solid border-gray-300 border-t-[3px] pt-5 ">
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
