import Landing from '@/components/homePage/Landing'
import Categories from '@/components/homePage/Categories'
import TopProducts from '@/components/homePage/TopProducts'
import { fetchCategories, fetchProducts } from '@/lib/fetch';



export default async function Home() {
  // const categories = await fetchCategories();
  // const products = await fetchProducts();

  return (
    <div className='home'>
      <Landing  />
      <TopProducts />
      <Categories   />
      
    </div>
  )
}

