import AllProducts from '@/components/products/AllProducts';
import { fetchByCategory } from '@/lib/fetch';


const Page = async ({ params }) => {
  const category = params.category.replaceAll("%20", " ")
  
  const products = await fetchByCategory(category) 
  

 
  return (
    // <<div className='mt-5'>
    //   <h1 className='capitalize font-bold text-4xl mx-10 my-5'>{category}</h1>
    //   <CardsContainer cardItems={fetchedProducts} />
    // </div>>
    <AllProducts products={products}  />
  )
}

export default Page
