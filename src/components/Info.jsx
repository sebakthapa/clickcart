import Link from "next/link";
import { BsTelephone } from "react-icons/bs"

const Info = ({phone, message, link}) => {
    return (
        <div className='bg-green-950 flex text-neutral-100 items-center justify-center  sm:flex-row-reverse w-full py-2 px-5  text-xs '>
            <p className="phone flex items-center gap-1 xs:hidden">
                <BsTelephone className="" />
                <span className="min-w-[100px]">
                    {phone}
                </span>
            </p>

            <div className="message flex items-center justify-center sm:justify-start xs:justify-between   w-full  ">
                <p className="text pr-3 border-solid border-gray-100 border-r-2 xs:border-0">
                    {message}
                </p>
                <p className="link pl-3 underline">
                    <Link href={link}>Shop Now</Link>
                </p>
            </div>

            <div className="menu flex justify-center gap-1 items-center  sm:hidden">
                <div className="language ">
                    <select name="" id="" className="bg-transparent cursor-pointer px-2">
                        <option className="text-gray-700" value="english">Eng</option>
                        <option disabled title="Coming Soon!" className="text-gray-700" value="nepali">नेपा</option>
                    </select>
                </div>
                <div className="location">
                    <select name="" id="" className="bg-transparent cursor-pointer px-2">
                        <option className="text-gray-700" value="nepal">Nepal</option>
                        <option disabled title="Coming Soon!" className="text-gray-700" value="india">India</option>
                        <option disabled title="Coming Soon!" className="text-gray-700" value="bhutan">Bhutan</option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default Info
