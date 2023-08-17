"use client"

import { ProductsContext } from '@/context/productsContext';
import { groupObjectsRandomly, isClient } from '@/lib';
import { useContext, useEffect, useState } from 'react'
import Card from './Card';
import { motion } from 'framer-motion';

const CardsContainer = ({ cardItems }) => {


  const [width, setWidth] = useState(isClient ? window?.innerWidth : 0);
  const [maxArrayLen, setMaxArrLen] = useState(Math.floor(isClient ? window?.innerWidth / 400 : 0))


  const { products, setProducts } = useContext(ProductsContext);

  const [finalProductsArray, setFinalProductsArray] = useState(null)

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (width < 350) {
        setMaxArrLen(1)
      } else {
        width > 1000 ? setMaxArrLen(Math.floor(window.innerWidth / 400)) : setMaxArrLen(Math.floor(window.innerWidth / 350));
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [width]);

  useEffect(() => {
    if (cardItems?.length > 0) {
      setFinalProductsArray(groupObjectsRandomly(cardItems, maxArrayLen < 1 ? 1 : maxArrayLen))

    }

  }, [maxArrayLen, cardItems])

  return (
    <motion.div   className="cards-container  w-full flex flex-col">
      {
        finalProductsArray?.map((arr, idx) => {
          return (
            <div key={idx} className="products-row flex w-full">
              {
                arr.length > 0 && arr.map(({ title, id, description, rating, price, image, category }, idx) => {
                  return (
                    <Card priority={idx < 8} link={`/products/${id}`} key={idx} id={id} title={title} price={price} description={description} rating={rating} image={image} category={category} />
                  )
                })
              }
            </div>
          )
        })
      }
    </motion.div>
  )
}

export default CardsContainer
