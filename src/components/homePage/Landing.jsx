"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from 'next/image'

import { BsArrowRightCircle } from 'react-icons/bs'


const Landing = () => {
    const titleVariants = {
        visible: { opacity: 1, transition: { duration: 1 } },
        hidden: { opacity: 0 },
    }
    const descriptionVariants = {
        visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
        hidden: { opacity: 0 },
    }
    const buttonsVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } },
        hidden: { opacity: 0, y: 30 },
    }


    return (
        <section style={{ background: "url('/landingBG.png')", backgroundSize: "cover" }} className="w-full bg-red-500 Landing-section h-[625px] lg:h-[600px] md:h-[450px] sm:h-[400px] flex items-center lg:items-center justify-center md:justify-start   bg-cover bg-no-repeat">
            <div className='text-area flex flex-col gap-10 lg:gap-5 w-[630px] md:w-[540px] sm:w-full xs:-mt-28'>
                <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={titleVariants} className="title text-6xl xl:text-5xl lg:text-4xl md:text-6xl sm:text-5xl xs:text-3xl  font-bold text-green-900">Shopping And <br />Department Store.</motion.h2>
                <motion.h5 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={descriptionVariants} className="subtitle text-xl xl:text-lg lg-text-sm md:text-xl sm:text-base xs:text-sm font-medium text-green-900">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</motion.h5>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={buttonsVariants} className="buttons flex gap-2">
                    <Link className='flex items-center px-7  py-3 xs:py-2 xs:px-4 xs:text-xs bg-green-900 rounded-full text-gray-100 font-medium  hover:bg-green-700 hover:translate-y-[-7px] transition duration-500' href="#">Learn More</Link>
                    <Link className='group flex items-center  gap-1  px-7 py-3 xs:py-2 xs:px-5 xs:text-sm border-solid border-green-900 border-2 hover:bg-green-900 rounded-full text-green-900 hover:text-gray-100 font-medium  transition duration-500' href="/products">Products  <span className='group-hover:translate-x-3 transition-transform duration-700'><BsArrowRightCircle className='w-5 h-5' /></span></Link>
                </motion.div>
            </div>
            <div className="hero-images ml-11 animate_hover md:hidden">
                <Image alt='ClickCart services' className="g-red-500 -mt-7 w-[95%]" src="/landingSVG.svg" width={1000} height={300} />
            </div>
        </section>
    )
}

export default Landing
