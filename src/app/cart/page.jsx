"use client"
import Card from '@/components/Card';
import { CartContext } from '@/context/cartContext'
import Image from 'next/image';
import React, { useContext } from 'react'

const Page = () => {
  const { cartData } = useContext(CartContext);

  return (
    <div className='section mt-[113px]'>
      <h2 className="title text-3xl sm:text-xl sm:p-0 sm:pt-5 font-extrabold p-5">
        CHECKOUT
      </h2>

      <div className="row flex justify-around lg:flex-col lg:justify-center lg:items-center gap-10">
        <div className="cards-container flex flex-col items-center h-screen w-[50%] lg:w-full max-w-[800px] overflow-y-auto rounded-xl py-5 px-10 sm:px-5 xs:px-0 bg-[rgba(0,200,0,.1) sm:bg-transparent]">
          {
            cartData.length > 0 ? (
              <>
                {
                  cartData?.map(({ quantity, title, id, description, rating, price, image, category }, idx) => {
                    return <Card type="checkout" priority={idx < 8} link={`/products/${id}`} key={idx} id={id} quantity={quantity} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                  })
                }
              </>
            ) : (
              <p className="text-xl font-semibold text-gray-600 py-10 text-center">
                Your Cart is empty.
              </p>
            )
          }
        </div>

        {
          cartData?.length > 0 && (
            <div className="payments rounded-lg p-10 lg:p-5 bg-gray-100 w-[50%] lg:w-full flex flex-col gap-5 lg:gap-3 items-center">
              {/* h2.text-bold.text */}
              <h4 className="text-xl font-semibold mb-8">Select Payment Method:</h4>
              <div className="method-container flex flex-wrap justify-center gap-5">
                <div className="esewa flex flex-col items-center justify-center gap-3 w-fit bgred-500 p-5 rounded-xl cursor-pointer hover:bg-green-200 hover:shadow-lg hover:-translate-y-2 transition duration-500">
                  <div className="img">
                    <Image src="/esewa.png" width={80} height={80} />
                  </div>
                  <div className="texts">
                    Esewa Payment
                  </div>
                </div>

                <div className="khalti flex flex-col items-center justify-center gap-3 w-fit bgred-500 p-5 rounded-xl cursor-pointer hover:bg-purple-200 hover:shadow-lg hover:-translate-y-2 transition duration-500">
                  <div className="img">
                    <Image className='-mt-4' src="/khalti.png" width={100} height={100} />
                  </div>
                  <div className="texts">
                    Khalti Payment
                  </div>
                </div>

                <div className="bankTransfer flex flex-col items-center justify-center gap-3 w-fit bgred-500 p-5 rounded-xl cursor-pointer hover:bg-cyan-100 hover:shadow-lg hover:-translate-y-2 transition duration-500">
                  <div className="img">
                    <Image className='-mt-4' src="/bankTransfer.png" width={100} height={100} />
                  </div>
                  <div className="texts">
                    Bank Transfer
                  </div>
                </div>
              </div>
            </div>

          )
        }
      </div>

    </div>
  )
}

export default Page
