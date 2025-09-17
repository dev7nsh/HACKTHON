import React from 'react'

import ThreeAnimation from './component/ThreeAnimation.jsx'
import Verify from './pages/Verify.jsx'
import HoverPlayCard from './component/Howercardplay.tsx'
import { Hero } from './component/Textswap.tsx'
import Header from './pages/Header.jsx'
const App = () => {
    return (
        <>
            {/* Header */}
			<Header />
            

            <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-white to-gray-100'>
                {/* left side */}
                <div className='flex-1/2 w-full h-screen overflow-hidden'>
                    <Hero />
                </div>
                {/* Right side */}
                <div className='w-full flex-1/2 h-screen flex flex-col items-center justify-center space-y-6'>
                    <HoverPlayCard src={"https://www.pexels.com/download/video/33929099/"} />
                </div>
            </div>

            <div className='relative overflow h-screen w-screen'>
                <div className="absolute right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
                    VERIFIABLE AI LAB
                </div>
                <div className='pl-[600px]'>
                    <ThreeAnimation />
                </div>
                <div className='absolute top-20 left-15 w-4xl h-full items-center p-4'>
                    <Verify />
                </div>
            </div>
        </>
    )
}

export default App