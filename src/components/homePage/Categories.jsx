"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from 'next/image'
import { useContext, useEffect } from "react"
import { CategoriesContext } from "@/context/categoriesContext"

const Categories = ({  }) => {
    const { categories } = useContext(CategoriesContext);

    const categoriesVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: .5 } },
        hidden: { opacity: 0, scale: 0.8 },
    }

    // useEffect(() => {
    //     setCategories(categories)

    // }, [categories])


    return (
        <section className="categories py-20 ">
            <h2 className='text-3xl font-bold capitalize mb-5' title="This section contains the most browsed categories">Shop Our top categories</h2>
            <div className="categories-cards-container grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 place-items-center  gap-10  w-full ">
                {
                    categories?.map((cat, idx) => {
                        return (
                            <motion.div className="xs:w-full w-full " key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={categoriesVariants} >
                                <Link href={`/products/category/${cat}`} className='category-card block relative group overflow-hidden mx-auto  min-w-[250px] w-full max-w-[400px] h-[400px]    rounded cursor-pointer'>
                                    <Image className='absolute -z-10 top-0 left-0 w-full h-full object-cover group-hover:scale-[1.2] transition duration-500 brightness-50' src={ `/${cat}.jpg`} alt={`${cat}`} width="200" height="300" />
                                    <h3 className="absolute top-[50%] translate-y-[-50%] left-0 w-full text-center text-xl category-title capitalize font-bold text-gray-100 group-hover:scale-125 group-hover:opacity-100 group-hover:-translate-y-6 opacity-75 transition duration-500">{cat}</h3>
                                    
                                </Link>
                            </motion.div>
                        )
                    })}
            </div>
        </section>
    )
}

export default Categories
