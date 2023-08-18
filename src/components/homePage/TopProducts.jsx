"use client"
import { ProductsContext } from "@/context/productsContext"
import { useContext, useEffect } from "react"
import Card from "../Card"
import Slider from "../Slider"

const TopProducts = ({}) => {
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
                                <Card priority={idx < 8} link={`/products/${id}`} key={idx} id={id} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                            </div>
                        )
                    })}
                </Slider>

            </div>
        </section>
    )
}

export default TopProducts
