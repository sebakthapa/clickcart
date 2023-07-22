import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `ClickCart - One click and you're ready to checkout.`,
  description: 'Online Store',
}




export default function RootLayout({ children }) {
  // const [queryClient] = React.useState(() => new QueryClient());
  return (
    <html lang="en">
      <body className={inter.className + " min-h-[100vh] max-w-[2000px]"}>
        <QUERYCLIENTPROVIDER>

          <CategoriesContextProvider>
            <ProductContexProvider>
              <CartContextProvider>
                

                <div className="header fixed z-50 top-0 left-0 w-full">
                  <Info message="Get 50% off on selected items" phone="+056-23485" link="#" />
                  <Nav />
                </div>
                {children}
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
