"use client"

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const Slider = ({ children }) => {

    const handleLeftScroll = (e) => {
        const slider = e.target.nextElementSibling;

        const scrollPosition = slider.scrollLeft;

        if (scrollPosition > 0) {
            let count = 0;
            const scrollPos = slider.scrollLeft;
            const width = parseInt(window.getComputedStyle(slider).width);

            const scrollInterval = setInterval(() => {
                console.log(slider.scrollLeft, )
                slider.scrollLeft -= 20;
                count++;
                if (slider.scrollLeft < (scrollPos - width) || slider.scrollLeft == 0) {
                    clearInterval(scrollInterval)
                }
            }, 5)
        }
    }


    const handleRightScroll = (e) => {
        const slider = e.target.previousElementSibling;
        const width = parseInt(window.getComputedStyle(slider).width);
        const scrollPos = slider.scrollLeft;

        const scrollInterval = setInterval(() => {
            slider.scrollLeft += 20;
            if (slider.scrollLeft > (scrollPos + width) || slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth)) {
                clearInterval(scrollInterval)
            }
        }, 5)
    }
    return (
        <div className="slider pr-5 xs:pr-0 relative bg-transparent w-full">

            <button
                className="left outline-none absolute top-1/2 -translate-y-1/2 left-0 w-20 h-20 sm:h-10 sm:w-10 rounded-full bg-[rgba(0,0,0,.2)] hover:bg-[rgba(0,0,0,.3)] active:bg-[rgba(0,0,0,.4)] bg_blur transition duration-300 z-10 flex items-center justify-center cursor-pointer"
                onClick={handleLeftScroll}
            >
                <AiOutlineLeft className="w-10 h-10 sm:h-5 sm:w-5 text-white pointer-events-none" />
            </button>

            <div className="sliderContents flex justify-start items-center gap-10  overflow-x-auto hide_scrollbar">
                {children}
            </div>

            <button
                className="right outline-none absolute top-1/2 -translate-y-1/2 right-0 w-20 h-20 sm:h-10 sm:w-10 rounded-full bg-[rgba(0,0,0,.2)] hover:bg-[rgba(0,0,0,.3)] active:bg-[rgba(0,0,0,.4)] bg_blur transition duration-300 z-10 flex items-center justify-center cursor-pointer"
                onClick={handleRightScroll}
            >
                <AiOutlineRight className="w-10 h-10 sm:h-5 sm:w-5 text-white pointer-events-none" />
            </button>
        </div>
    )
}

export default Slider;
