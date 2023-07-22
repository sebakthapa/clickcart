"use client"
import PageLoader from '@/components/PageLoader';
import { CartContext } from '@/context/cartContext';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const Page = ({ params }) => {

  const [count, setCount] = useState(1);
  const {cartData,  addCart} = useContext(CartContext)


  const fetchSingleProduct = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const res = await response.json();
    return res;
  }

  const { isLoading, isError, data: fetchedProduct, error } = useQuery({ queryKey: ["products", params.id], queryFn: fetchSingleProduct })

  const handleAddCart = () => {
    const cardData = { ...fetchedProduct, quantity:count }
    // console.log(cardData)
    addCart(cardData)
    // console.log(cartData)
    setCount(1)
  }




  if (isError) {
    return (
      " ERROR OCCURED"
    )
  }
  if (isLoading) {
    return (
      <PageLoader message="Fetching product details for you" />
    )
  }
  return (
    <div className='product-details mt-[113px] flex md:flex-col-reverse justify-center gap-10 w-full 0 p-10 sm:p-5'>
      <div className="images w-[50%] lg:w-[50%] md:w-full flex flex-col items-center gap-5">
        <div className="image p-5 bg-white">
          <Image priority="true" alt={fetchedProduct.title} className='object-contain' src={fetchedProduct.image} height={400} width={600} />
        </div>
        <div className="option-images flex justify-center gap-3 w-fit">
          <Image alt={fetchedProduct.title} className='cursor-pointer w-15% xl:w-[80px] xs:w-[60px] p-4 xs:p-2 bg-green-100 rounded-lg hover:scale-110 transition duration-300' src={fetchedProduct.image} height={100} width={100} />
          <Image alt={fetchedProduct.title} className='cursor-pointer w-15% xl:w-[80px] xs:w-[60px] p-4 xs:p-2 bg-red-100 rounded-lg hover:scale-110 transition duration-300' src={fetchedProduct.image} height={100} width={100} />
          <Image alt={fetchedProduct.title} className='cursor-pointer w-15% xl:w-[80px] xs:w-[60px] p-4 xs:p-2 bg-blue-100 rounded-lg hover:scale-110 transition duration-300' src={fetchedProduct.image} height={100} width={100} />
          <Image alt={fetchedProduct.title} className='cursor-pointer w-15% xl:w-[80px] xs:w-[60px] p-4 xs:p-2 bg-yellow-100 rounded-lg hover:scale-110 transition duration-300' src={fetchedProduct.image} height={100} width={100} />
        </div>
      </div>

      <div className="details w-[50%] lg:w-[50%] md:w-full flex flex-col gap-7">
        <div className="product-info flex flex-col gap-4">
          <h2 className="title font-bold text-3xl">{fetchedProduct.title}</h2>
          <p className="descrption text-gray-700 font-medium">{fetchedProduct.description}</p>
          <div className="ratings flex gap-1 items-center">
            <span className="stars flex text-xl" title={`${fetchedProduct.rating?.rate} out of 5`}>
              {
                Array(Math.floor(fetchedProduct.rating?.rate ? fetchedProduct.rating.rate : 0))
                  .fill()
                  .map((_, i) => (
                    <AiFillStar key={i} className='text-yellow-500 w-7 h-7' />
                  ))}
            </span>
            <span className="number " title={`${fetchedProduct.rating?.count} customers rated this product`}>({fetchedProduct.rating?.count})</span>
          </div>
        </div>

        <div className="pricing text-gray-700">
          <h6 className="price font-bold text-2xl">${fetchedProduct.price}</h6>
          <p className="text text-sm">Financing for this product is not available.</p>
        </div>

        <div className="variants">

        </div>

        <div className="buy flex flex-col  gap-7">
          <div className="add flex items-center gap-5">
            <div className="counter flex items-center bg-green-50  rounded-full ">
              <button className="- py-3 sm:py-2 text-center align-middle  text-2xl sm:text-xl px-5 sm:px-4" onClick={() => {setCount((prev) => prev == 1 ? 1 :--prev)}}>-</button>
              <p className="count py-3 sm:py-2 text-center align-middle text-xl sm:text-lg font-semibold">{count}</p>
              <button className="plus py-3 sm:py-2 text-center align-middle text-2xl sm:text-xl px-5 sm:px-4" onClick={() => {setCount((prev) => prev === 12 ? 12 : ++prev)}}>+</button>
            </div>
            <div className="items-left text-sm">
              Hurry up!  Only<br /> <span className='text-yellow-500 text- font-bold'>{12} items</span> left.
            </div>
          </div>

          <div className="buttons flex gap-4">
            <Link href="/cart" onClick={handleAddCart} className='py-3 px-7 sm:py-2 sm:px-5 text-gray-100 bg-green-800 hover:bg-green-700 hover:-translate-y-1 transition duration-300 rounded-full'>Buy Now</Link>
            <button className='py-3 px-7 sm:py-2 sm:px-5 text-green-800 hover:text-gray-100 hover:bg-green-800 border-solid border-2 border-green-800 rounded-full transition duration-300' onClick={handleAddCart}>Add to Cart</button>
          </div>
        </div>

        <div className="facilities">

        </div>
      </div>
    </div>
  )
}

export default Page
