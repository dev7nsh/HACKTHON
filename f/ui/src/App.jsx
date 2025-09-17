import React from 'react'

import ThreeAnimation from './component/ThreeAnimation.jsx'
import Verify from './pages/Verify.jsx'
import HoverPlayCard from './component/Howercardplay.tsx'
import { Hero } from './component/Textswap.tsx'
import Header from './pages/Header.jsx'
import {InteractiveHoverButton} from './component/Button.tsx'
import { BackgroundLines } from './component/background-lines.jsx'
import { HoverBorderGradient } from './component/hover-border-gradient.jsx'
const App = () => {
    return (
        <>
            {/* Header */}

				
			<Header  />
		
      

            <div className='relative flex flex-row h-screen bg-gradient-to-b from-white via-white to-gray-100 items-center justify-center'>
  {/* Background lines */}
  <div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
    <BackgroundLines />
  </div>

  {/* Left side */}
  <div className='flex flex-col flex-1/2 items-center justify-center h-full z-10'>
    <Hero />
    <div className='mt-8'>
      <InteractiveHoverButton   text="Upload Now" />
    </div>
  </div>

  {/* Right side */}
  <div className='flex flex-col flex-1/2 items-center justify-center h-full z-10 space-y-6'>
    <HoverPlayCard  loop={""} src={"https://www.pexels.com/download/video/33929099/"} />
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