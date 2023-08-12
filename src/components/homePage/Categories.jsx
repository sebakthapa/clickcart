"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from 'next/image'
import { useContext } from "react"
import { CategoriesContext } from "@/context/categoriesContext"

const Categories = ({ categories: fetchedCategories }) => {
    console.log(fetchedCategories)

    const {  categories, setCategories } = useContext(CategoriesContext);

    const categoriesVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: .5 } },
        hidden: { opacity: 0, scale: 0.8 },
    }





    return (
        <section className="categories py-20 ">
            <h2 className='text-3xl font-bold capitalize mb-14' title="This section contains the most browsed categories">Shop Our top categories</h2>
            <div className="categories-cards-container flex flex-wrap justify-center gap-10 w-full ">
                {
                    categories?.map((cat, idx) => {
                        return (
                            <motion.div className="xs:w-full " key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={categoriesVariants} >
                                <Link href={`/products/category/${cat}`} className='category-card block relative group overflow-hidden  min-w-[200px] w-[250px] h-[400px] sm:w-[80%] xs:w-full   rounded-xl cursor-pointer'>
                                    <Image className='absolute -z-10 top-0 left-0 w-full h-full object-cover group-hover:scale-[1.2] transition duration-500 brightness-50' src={`https://source.unsplash.com/random/180x320/?${cat}`} alt={`${cat}`} width="200" height="300" />
                                    <h3 className="absolute top-[50%] translate-y-[-50%] left-0 w-full text-center text-2xl category-title capitalize font-bold text-gray-100 group-hover:opacity-100 group-hover:-translate-y-6 opacity-75 transition duration-500">{cat}</h3>
                                    <p className="browse -z-10 flex items-center gap-1 justify-center capitalize absolute bottom-[0%] left-0 w-full h-full  py-5 bg-[rgba(0,0,0,.3)] text-green-800  opacity-0  group-hover:opacity-100  text-center transition duration-500  text-sm">
                                        {/* {cat} <span> <AiOutlineArrowRight /> </span> */}
                                    </p>
                                </Link>
                            </motion.div>
                        )
                    })}
            </div>
        </section>
    )
}

export default Categories
