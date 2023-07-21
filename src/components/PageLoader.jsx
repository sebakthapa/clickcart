import React from 'react'

const PageLoader = ({message}) => {
    return (
        <div className='page_loader'>
            <main>
                <div> </div>
                <div> </div>
                <div> </div>
            </main>
            <p className='text-gray-400 font-semibold'>{ message ? message : "Getting things ready. Please wait..." }</p>

        </div>
    )
}


export default PageLoader
