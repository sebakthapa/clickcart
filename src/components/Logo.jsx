import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className='block max-w-[180px]'>
        <div className="logo flex items-center gap-2 ">
            <div className="image">
                <Image className="min-w-[50px] brightness-75" alt='ClickCart Logo' src={"/van.png"} height={50} width={50} />
            </div>
            <p className="text font-extrabold text-green-800 text-2xl lg:text-xl sm:text-lg md:text-2xl">
                ClickCart
            </p>
            </div>
            </Link>
    )
}

export default Logo
