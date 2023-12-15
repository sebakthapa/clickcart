"use client"
import Card from '@/components/Card';
import { CartContext } from '@/context/cartContext'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const { cartData, subtotal, clearCart } = useContext(CartContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [submitting, setSubmitting] = useState(false)
 

  const handleOrder = async (e) => {
    try {
      setSubmitting(true)
      e.preventDefault();

      const res = await axios.post("/api/order", {
        name,
        email,
        address,
        orders:cartData,
      })


      if (res.status == 200) {
        clearCart();
        window.scrollTo(0,0);
        toast.success("Order has been placed")
      }
    } catch (error) {
      toast.error("Some Error Occured! Please try again!")
    } finally {
      setSubmitting(false)
    }


  }

  


  return (
    <div className={`section mt-10 ${submitting && " cursor-progress"}`}>
      <h2 className="title text-3xl sm:text-xl sm:p-0 sm:pt-5 font-extrabold p-5">
        CHECKOUT
      </h2>

      <div className={`row flex justify-around lg:flex-col lg:justify-center lg:items-center gap-10 ${submitting && "pointer-events-none opacity-50"}`} >
        <div className="cards-container flex flex-col items-center h-screen w-[50%] lg:w-full max-w-[800px] overflow-y-auto  lg:overflow-y-visible lg:h-fit rounded-xl py-5 px-10 sm:px-5 xs:px-0 bg-[rgba(0,200,0,.1) sm:bg-transparent]">
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
            <div className="payments mb-10 rounded-lg p-10 lg:p-5 bg-gray-100 w-[50%] lg:w-full flex flex-col gap-5 lg:gap-3 items-center">
              <div className="subtotal w-full mb-10">
                <p className='text-lg  font-bold flex gap-3'>Subtotal: <span> $ {subtotal} </span></p>
              </div>
              {/* <div className="payment-method ">
                <h4 className="text-xl font-semibold mb-8">Select Payment Method:</h4>
                <div className='mehtods-container flex flex-wrap justify-center gap-5'>

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

              </div> */}

              <form action="" className='w-full' onSubmit={handleOrder}>
                <div className="input_container">
                  <input name='firstname' autoComplete='given-name' onChange={(e) => setName(e.target.value)} value={name} id='firstname' type="text" required />
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div className="input_container mt-5">
                  <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' type="email" required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input_container mt-5">
                  <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" id='address' required autoCapitalize='address-level4' />
                  <label htmlFor="address">Shipping Address</label>
                </div>
                <button className='p-5 py-4 bg-green-600 rounded font-semibold text-gray-100 mt-5 hover:text-white hover:bg-green-700 transition duration-300 active:scale-90' type="submit">{submitting ? "Placing Order" : "Place Order"}</button>
              </form>
            </div>

          )
        }
      </div>

    </div>
  )
}

export default Page
