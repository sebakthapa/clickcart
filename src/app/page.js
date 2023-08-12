import Landing from '@/components/homePage/Landing'
import Categories from '@/components/homePage/Categories'
import TopProducts from '@/components/homePage/TopProducts'



export default function Home() {
  const fetchCategories = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories", { cache: "force-cache" })
    const data = await res.json();
    return data;
  }

  const categories = fetchCategories();
  

  return (
    <div className='home'>
      <Landing />
      <TopProducts />
      <Categories categories={categories} />
      
    </div>
  )
}

