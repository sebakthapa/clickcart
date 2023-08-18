"use client"
import { filterString, isClient } from "@/lib"
import { useEffect, useRef, useState } from "react"
import { PiCaretDownBold } from "react-icons/pi"

const Dropdown = ({ options, onChange, }) => {
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [optionsShown, setOptionsShown] = useState(false);

    const dropdownRef = useRef()

    useEffect(() => {
        const calculatedMinWidth = options.reduce((acc, opt) => {
            return Math.max(acc, (opt.length * 10 + 15));
        }, 100); // Start with the initial value of minWidth
        // console.log()
        dropdownRef.current.style.width = calculatedMinWidth + "px"
    
        console.log(calculatedMinWidth)

    }, [options])


    isClient && window.addEventListener("mousedown", () => {
        optionsShown && setOptionsShown(false)
    })



    useEffect(() => {
        onChange(selectedOption)
    }, [selectedOption])

    return (
        <div ref={dropdownRef} className={`dropdown py-2 border-2 border-gray-400 relative  `}>
            <div onClick={() => setOptionsShown((prev) => !prev)} className="selectedOption px-2 flex items-center justify-between  gap-5 cursor-pointer">
                <p>{selectedOption}</p>
                <p> <PiCaretDownBold /> </p>
            </div>
            <ul className={` bg-gray-200  border-2 border-gray-400 rounded-sm transition duration-300 absolute z-10 w-full my-2  ${optionsShown ? "opacity-100" : "opacity-0"}`} >
                {
                    options.map((opt,idx) => {
                        const id = filterString(opt)
                        return (
                            <li key={idx} className="border-b-2 hover:bg-gray-300 cursor-pointer transition border-gray-400 border-collapse px-3 py-1 w-full" onClick={(e) => setSelectedOption(e.target.innerHTML)} value={id} >{opt}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Dropdown
