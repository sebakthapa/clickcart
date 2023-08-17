import ProductDetails from "@/components/productDetails/ProductDetails"
import { fetchSingleProduct } from "@/lib/fetch"


const Page = async ({ params }) => {

  const singleProduct = await fetchSingleProduct(params.id)


  return (
   <ProductDetails product={singleProduct} />
  )
}

export default Page
