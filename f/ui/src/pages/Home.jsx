import React, { useRef } from 'react'

import ThreeAnimation from '../component/ThreeAnimation.jsx'
import Verify from './Verify.jsx'
import HoverPlayCard from '../component/Howercardplay.tsx'
import { Hero } from '../component/Textswap.tsx'
import { InteractiveHoverButton } from '../component/Button.tsx'
import { BackgroundLines } from '../component/background-lines.jsx'
import { Footer } from '../component/Footer.js'
import Whatwedo from './Whatwedo.jsx'
// import Header from './Header.jsx'
"use client";

import { HoverImageGallery } from "../component/hoverimage";


const Home = () => {
  // Section refs
  const overviewRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const developerRef = useRef(null);

  // Navigation handler
  const handleNavClick = (section) => {
    if (section === "overview" && overviewRef.current) overviewRef.current.scrollIntoView({ behavior: "smooth" });
    if (section === "who-we-are" && whoWeAreRef.current) whoWeAreRef.current.scrollIntoView({ behavior: "smooth" });
    if (section === "what-we-do" && whatWeDoRef.current) whatWeDoRef.current.scrollIntoView({ behavior: "smooth" });
    if (section === "developer" && developerRef.current) developerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Header with navigation */}
      <header className="w-full bg-white border border-gray-400/40 fixed top-0 left-0 z-50 backdrop-blur-sm">
        <div className="flex h-[60px] items-center justify-between px-6">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="font-black text-black text-2xl">DeepFake</div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick("overview")}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick("who-we-are")}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
            >
              Who We Are
            </button>
            <button 
              onClick={() => handleNavClick("what-we-do")}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
            >
              What We Do
            </button>
            <button 
              onClick={() => handleNavClick("developer")}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
            >
              Developer
            </button>
          </nav>
          
          {/* Mobile menu button (optional) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-black">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* overview */}
      <div ref={overviewRef} id="overview" className="  flex flex-row w-full h-screen items-center justify-center gap-12 scroll-mt-20 pt-[60px]">
        <div className='  flex items-center justify-center opacity-20 pointer-events-none'>
          <BackgroundLines />
        </div>
        <div className="flex flex-col flex-1 items-center justify-center h-full">
          <Hero />
          <div className="mt-8">
             <InteractiveHoverButton text="Upload Now" href="https://hackthon-upload.onrender.com" />
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center h-full space-y-6">
          <HoverPlayCard loop={true} src="/videos/Trump_and_Navalny_1080p.mp4" />
        </div>
      </div>

      {/* who we are */}
      <div ref={whoWeAreRef} id="who-we-are" className='h-screen w-screen px-20 scroll-mt-20'>
        <div className="right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
          who we are
        </div>
        <Whatwedo />
      </div>

      {/* what we do */}
      <div ref={whatWeDoRef} id="what-we-do" className='relative h-[1000px] w-screen scroll-mt-20'>
        <div className="absolute right-80 border-b border-gray-300 top-20 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
          What we do
        </div>
        <div className='pl-[600px] pt-10'>
          <ThreeAnimation />
        </div>
        <div className='absolute top-20 left-15 w-4xl h-full items-center p-4'>
          <Verify />
        </div>
      </div>

         
      <div className='relative h-screen w-screen scroll-mt-20 '>
          <div className="absolute right-80 border-b border-gray-300 top-0 left-15 w-80% pb-4 items-center text-xs tracking-[0.25em] font-bold text-black">
           SIH PPT
           </div>


         <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <HoverImageGallery />
      <p className="mt-10">Hover over the images</p>
    </div>

      </div> 


      
   
      

      

      {/* developer */}
      <div ref={developerRef} id="developer" className="shadow-lg shadow-black/30 scroll-mt-20">
        <Footer />
      </div>
    </>
  )
}

export default Home
