"use client"

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const Slider = ({ children }) => {
    const handleLeftScroll = (e) => {
        const slider = e.target.nextElementSibling;
        const width = slider.clientWidth;
        slider.scrollLeft -= (0.95 * width);

    }
    const handleRightScroll = (e) => {
        const slider = e.target.previousElementSibling;
        console.log(slider)
        const width = slider.clientWidth;
        slider.scrollLeft += (0.95 * width);
        
    }
    return (
        <div className="slider pr-5 xs:pr-0 relative bg-transparent w-full scroll-smooth">

            <button
                className="left outline-none absolute top-1/2 -translate-y-1/2 left-0 w-10 h-10 rounded-full bg-[rgba(0,0,0,.1)] hover:bg-[rgba(0,0,0,.2)] active:bg-[rgba(0,0,0,.1)] bg_blur transition duration-300 z-10 flex items-center justify-center cursor-pointer"
                onClick={handleLeftScroll}
            >
                <AiOutlineLeft className="w-7 h-7 sm:h-5 sm:w-5 text-white pointer-events-none" />
            </button>

            <div className="sliderContents flex justify-start items-center gap-10  overflow-x-auto hide_scrollbar scroll-smooth">
                {children}
            </div>

            <button
                className="right outline-none absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 rounded-full bg-[rgba(0,0,0,.1)] hover:bg-[rgba(0,0,0,.2)] active:bg-[rgba(0,0,0,.1)] bg_blur transition duration-300 z-10 flex items-center justify-center cursor-pointer"
                onClick={handleRightScroll}
            >
                <AiOutlineRight className="w-7 h-7 sm:h-5 sm:w-5 text-white pointer-events-none" />
            </button>
        </div>
    )
}

export default Slider;
