import React from 'react'

import ThreeAnimation from './component/ThreeAnimation.jsx'
import Verify from './pages/Verify.jsx'
import HoverPlayCard from './component/Howercardplay.tsx'
import { Hero } from './component/Textswap.tsx'
import Header from './pages/Header.jsx'
import {InteractiveHoverButton} from './component/Button.tsx'
import { BackgroundLines } from './component/background-lines.jsx'
import { HoverBorderGradient } from './component/hover-border-gradient.jsx'
import { Footer } from './component/Footer.js'
const App = () => {
    return (
        <>
                    {/* Header */}

                        
                    <Header  />
                
            

                 <div className="flex flex-row w-full h-screen items-center justify-center gap-12">

                {/* centerred  */}

                <div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
                    <BackgroundLines />
                 </div>

                {/* Left side */}
                <div className="flex flex-col flex-1 items-center justify-center h-full">
                    <Hero />
                    <div className="mt-8">
                    <InteractiveHoverButton text="Upload Now" />
                    </div>
                </div>
                {/* Right side */}
                <div className="flex flex-col flex-1 items-center justify-center h-full space-y-6">
                    <HoverPlayCard loop={true} src="/videos/Trump_and_Navalny_1080p.mp4" />
                </div>
             </div>   

             {/* who we doo */}

             <div className='h-screen w-screen px-20 '>
                 <div className=" right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
                    What we do 
                </div>



             </div>


            {/* who we are  */}   

            <div className='relative overflow h-[1000px] w-screen'>
                <div className="absolute right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
                    What we do 
                </div>
                <div className='pl-[600px]'>
                    <ThreeAnimation />
                </div>
                <div className='absolute top-20 left-15 w-4xl h-full items-center p-4'>
                    <Verify />
                </div>
            </div>

            {/* Footer */}

           <div className="shadow-lg shadow-black/30">
			
			<Footer />
		</div>

           
        </>
    )
}

export default App