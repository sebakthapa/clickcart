import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/">
        <div className="logo flex items-center gap-2">
            <div className="image">
                <Image src={"/van.png"} height={50} width={50} className='brightness-75'/>
            </div>
            <p className="text font-extrabold text-green-800 text-2xl lg:text-xl sm:text-lg md:text-2xl">
                OnlineStore
            </p>
            </div>
            </Link>
    )
}

export default Logo
