"use client"
import Card from '@/components/Card';
import { CartContext } from '@/context/cartContext'
import React, { useContext } from 'react'

const Page = () => {
  const { cartData} = useContext(CartContext);

  return (
    <div className='section mt-[113px]'>
      <h2 className="title text-3xl sm:text-xl sm:p-0 sm:pt-5 font-extrabold p-5">
        CHECKOUT
      </h2>

      <div className="row">
        <div className="cards-container">
          {
            cartData.length > 0 ? (
              <>
                {
                  cartData?.map(({quantity, title, id, description, rating, price, image, category }, idx) => {
                    return <Card type="checkout" priority={idx < 8} link={`/products/${id}`} key={idx} id={id} quantity={quantity} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                  })
              }
              </>
            ): (
                <p className = "text-xl font-semibold text-gray-600 py-10 text-center">
                  Your Cart is empty.
                </p>
            )
          }
        </div>
        <div className="payments">
          {/* h2.text-bold.text */}
          <div className="method-container">

          </div>
        </div>
      </div>

    </div>
  )
}

export default Page
