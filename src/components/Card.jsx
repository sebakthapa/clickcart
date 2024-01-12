import { CartContext } from '@/context/cartContext';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Card = ({ type, quantity, link, priority, id, title, description, price, image, rating, category, }) => {
  const { cartData, addCart, increaseCart, decreaseCart, removeCart } = useContext(CartContext)

  const [checkoutCount, setCheckoutCount] = useState(quantity)

  const handleAddCart = () => {
    const cardData = { id, title, description, price, image, rating, category }
    // console.log(cardData)
    addCart(cardData)
    // console.log(cartData)
  }

  const handleCheckoutCountInc = () => {
    // setCheckoutCount((prev) => prev == 0 ? 0 : ++prev); 
    increaseCart(id)
  }
  const handleCheckoutCountDec = () => {
    // setCheckoutCount((prev) => prev == 0 ? 0 : --prev); 
    decreaseCart(id)
  }


  useEffect(() => {
    setCheckoutCount(quantity)
  }, [quantity])


  const control = useAnimation();
  const [ref, inView] = useInView({ rootMargin: "200px", triggerOnce: true, })

  
  const cardVariant = {
    visible: { opacity: 1, scale: 1, transition:{duration:0.3, type:"spring", stiffness:100, damping:15} },
    hidden: { scale: 0.8, opacity: 0,   },
    hover: { scale: 1.01, y: -3, transition: { duration: 0.5 } },
    active:{scale:1},
  }
  
  
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  
  if (!image) {
    return ""
  }
  
  // onHoverEnd={() => {control.start("visible")}} animate={control} 

  return (
    <motion.div  whileHover="hover" whileInView="visible" viewport={{ once: true, amount: 0.05 }} whileTap="active"  ref={ref} initial="hidden" variants={cardVariant} className='card h-[450px] w-full m-4 flex flex-col justify-between gap-4 bg-white rounded hover:shadow-lg  '>

      <Link href={link} className="image cursor-pointer w-full h-[60%] overflow-hidden group">
        <Image priority={priority} className='w-full h-full  object-contain px-10 py-4 transition duration-500' alt={title} src={image} width={200} height={300} />
      </Link>

      <div className="texts h-[40%] flex flex-col justify-between gap-2 py-4 px-5">
        <div className="top flex items-start justify-between gap-3">
          <Link href={link}><h5 className="title hover:text-orange-500 font-semibold transition duration-300 line-clamp-2">{title}</h5></Link>
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
        {/* <div className="counter flex items-center bg-green-50  rounded-full ">
          <button className="- py-3 sm:py-2 text-center align-middle  text-2xl sm:text-xl px-5 sm:px-4" onClick={() => { setCheckoutCount((prev) => prev == 1 ? 1 : --prev) }}>-</button>
          <p className="count py-3 sm:py-2 text-center align-middle text-xl sm:text-lg font-semibold">{count}</p>
          <button className="plus py-3 sm:py-2 text-center align-middle text-2xl sm:text-xl px-5 sm:px-4" onClick={() => { setCheckoutCount((prev) => prev === 12 ? 12 : ++prev) }}>+</button>
        </div> */}

        {
          type == "checkout" ? (
            <div className='flex gap-5'>
              <div className="counter flex items-center  bg-green-50  rounded-full ">
                <button className="- py-3 sm:py-2 text-center align-middle  text-2xl sm:text-xl px-5 sm:px-4" onClick={handleCheckoutCountDec}>-</button>
                <p className="count py-3 sm:py-2 text-center align-middle text-xl sm:text-lg font-semibold">{checkoutCount}</p>
                <button className="plus py-3 sm:py-2 text-center align-middle text-2xl sm:text-xl px-5 sm:px-4 " onClick={handleCheckoutCountInc}>+</button>
              </div>
              <button onClick={() => { removeCart(id) }} className="button active:scale-90 bg-red-700 py-3 w-full rounded-full text-neutral-100 font-semibold hover:bg-red-600 transition duration-300">
                Remove
              </button>
            </div>
          ) : (
            <button onClick={handleAddCart} className="button active:scale-90 bg-green-700 py-3 w-full text-neutral-100 font-semibold hover:bg-green-600 transition duration-300">
              Add to Cart
            </button>
          )
        }

      </div>

    </motion.div >
  )
}

export default Card
