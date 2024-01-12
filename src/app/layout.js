import React from 'react';

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './globals.css'
import { Inter } from 'next/font/google'
import Info from '@/components/Info';
import Nav from '@/components/Nav';
import { CategoriesContextProvider } from '@/context/categoriesContext';
import { ProductContexProvider } from '@/context/productsContext';
import { QUERYCLIENTPROVIDER } from '@/lib/queryClient';
import { CartContextProvider } from '@/context/cartContext';
import Footer from '@/components/Footer';
import { fetchCategories, fetchProducts } from '@/lib/fetch';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `ClickCart - One click and you're ready to checkout.`,
  description: 'Online Store',
}


export default async function RootLayout({ children }) {
  // const [queryClient] = React.useState(() => new QueryClient());
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <html lang="en">
      <body className={inter.className + " min-h-[100vh] "}>
        <QUERYCLIENTPROVIDER>

          <CategoriesContextProvider>
            <ProductContexProvider>
              <CartContextProvider>
                <ToastContainer
                  position="bottom-right"
                  autoClose={4000}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Zoom}
                  limit={4}
                />
                <Analytics />


                <div className="header w-screen">
                  <Info message="Get 50% off on selected items" phone="+056-23485" link="#" />
                  <Nav categories={categories} products={products} />
                </div>
                <div className='min-h-screen max-w-[2200px] mx-auto'>
                  {children}

                </div>
                <Footer />


              </CartContextProvider>
            </ProductContexProvider>
          </CategoriesContextProvider>


          <ReactQueryDevtools initialIsOpen={false} />
        </QUERYCLIENTPROVIDER>

      </body>
    </html>
  )
}
