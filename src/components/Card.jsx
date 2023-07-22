import { CartContext } from '@/context/cartContext';
import { getSomeWords } from '@/lib';
import Image from 'next/image'
import Link from 'next/link';
import { handleClientScriptLoad } from 'next/script';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';

const Card = ({ type,quantity, link, priority, id, title, description, price, image, rating, category, }) => {
  const { cartData, addCart,  increaseCart, decreaseCart, removeCart  } = useContext(CartContext)

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

  

  if (!image) {
    return ""
  }
  return (
    <div className='card  h-[450px] w-full m-4 flex flex-col justify-between gap-4 bg-white rounded '>

      <Link href={link} className="image cursor-pointer w-full h-[60%] overflow-hidden group">
        <Image priority={priority} className='w-full h-full  object-contain px-10 py-4 group-hover:scale-110 active:scale-95 transition duration-500' alt={title} src={image} width={200} height={300} />
      </Link>

      <div className="texts h-[40%] flex flex-col justify-between gap-2 py-4 px-5">
        <div className="top flex items-start justify-between gap-3">
          <Link href={link}><h5 className="title">{getSomeWords(title, 5)}</h5></Link>
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
              <button onClick={() => {removeCart(id)}} className="button active:scale-90 bg-red-700 py-3 w-full rounded-full text-neutral-100 font-semibold hover:bg-red-600 transition duration-300">
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

    </div >
  )
}

export default Card
