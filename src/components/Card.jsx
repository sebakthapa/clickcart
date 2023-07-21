import { getSomeWords } from '@/lib';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { AiFillStar } from 'react-icons/ai';

const Card = ({ link, priority, title, description, price, image, rating, category, }) => {
  
  const handleAddCart = () => {

  }

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

          <button onClick={handleAddCart} className="button active:scale-90 bg-green-700 py-3 w-full text-neutral-100 font-semibold hover:bg-green-600 transition duration-300">
            Add to Cart
          </button>
        </div>

      </div>
  )
}

export default Card
