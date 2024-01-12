"use client"
import { ProductsContext } from "@/context/productsContext"
import { useContext, useEffect } from "react"
import Card from "../Card"
import Slider from "../Slider"
import Link from "next/link"
import Image from "next/image"
import { AiFillStar } from "react-icons/ai"

const TopProducts = ({ }) => {
    const { products } = useContext(ProductsContext)

    const topProducts = products?.length > 0 ? products.filter((product) => product.rating.rate > 3 && product.rating.count > 300) : null;

    // useEffect(() => {
    //     setProducts(products)
    // }, [products])

    return (
        <section className="topProducts py-20 ">
            <h2 className='text-3xl font-bold capitalize mb-5' title="This section contains products with highest ratings and reviews">Top Rated products</h2>
            <div className="topProducts-cards-container flex  justify-center items-center gap-10">
                <Slider>

                    {topProducts?.map(({ id, title, price, description, rating, image, category }, idx) => {
                        return (
                            <div key={title} className="w-[400px] xs:w-[100vw]  min-w-[300px]   shrink-0 sm:flex-shrink">
                                <div className='card h-[450px] w-full m-4 flex flex-col justify-between gap-4 bg-white rounded hover:shadow-lg  '>

                                    <Link href={`/product/${id}`} className="image cursor-pointer w-full h-[60%] overflow-hidden group">
                                        <Image priority={idx < 3} className='w-full h-full  object-contain px-10 py-4 transition duration-500' alt={title} src={image} width={200} height={300} />
                                    </Link>

                                    <div className="texts h-[40%] flex flex-col justify-between gap-2 py-4 px-5">
                                        <div className="top flex items-start justify-between gap-3">
                                            <Link href={`/product/${id}`}><h5 className="title hover:text-orange-500 font-semibold transition duration-300 clamp-1 line-clamp-2">{title}</h5></Link>
                                            <p className="price font-semibold">${price}</p>
                                        </div>

                                        {/* <p className="description">{description}</p> */}

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
                                        <Link href={`/product/${id}`} className=" flex items-center justify-center active:scale-90 bg-emerald-600 py-3 w-full text-neutral-100 font-semibold hover:bg-emerald-500 transition duration-300">
                                            View Details
                                        </Link>
                                    </div>
                                </div >
                            </div>
                        )
                    })}
                </Slider>

            </div>
        </section>
    )
}

export default TopProducts
