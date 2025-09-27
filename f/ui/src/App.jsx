import React, { useRef } from 'react'

import ThreeAnimation from './component/ThreeAnimation.jsx'
import Verify from './pages/Verify.jsx'
import HoverPlayCard from './component/Howercardplay.tsx'
import { Hero } from './component/Textswap.tsx'
import { InteractiveHoverButton } from './component/Button.tsx'
import { BackgroundLines } from './component/background-lines.jsx'
import { Footer } from './component/Footer.js'
import Whatwedo from './pages/Whatwedo.jsx'
// import Header from './pages/Header.jsx'

const App = () => {
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
        <div className="flex h-[60px] items-center justify-between px-4 md:px-6">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="font-black text-black text-xl md:text-2xl">DeepFake</div>
          </div>
          {/* Center Navigation - Hidden on small screens, can be expanded with mobile menu later */}
          <nav className="hidden md:flex gap-4 lg:gap-8 text-shadow-gray-400 font-mono text-black">
            <button className="hover:underline bg-transparent border-none cursor-pointer text-sm lg:text-base"
              onClick={() => handleNavClick("overview")}>
              Overview
            </button>
            <button className="hover:underline bg-transparent border-none cursor-pointer text-sm lg:text-base"
              onClick={() => handleNavClick("who-we-are")}>
              Who we are
            </button>
            <button className="hover:underline bg-transparent border-none cursor-pointer text-sm lg:text-base"
              onClick={() => handleNavClick("what-we-do")}>
              What we do
            </button>
            <button className="hover:underline bg-transparent border-none cursor-pointer text-sm lg:text-base"
              onClick={() => handleNavClick("developer")}>
              Developers
            </button>
          </nav>
          {/* Mobile menu button - placeholder for future enhancement */}
          <div className="md:hidden">
            <button className="p-2 text-black">☰</button>
          </div>
        </div>
      </header>

      {/* overview */}
      <div ref={overviewRef} id="overview" className="flex flex-col lg:flex-row w-full min-h-screen items-center justify-center gap-8 lg:gap-12 scroll-mt-20 pt-[60px] px-4 md:px-8">
        <div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
          <BackgroundLines />
        </div>
        <div className="flex flex-col flex-1 items-center justify-center h-full text-center lg:text-left">
          <Hero />
          <div className="mt-6 md:mt-8">
            <InteractiveHoverButton text="Upload Now" />
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center h-full space-y-6 max-w-md lg:max-w-none">
          <HoverPlayCard loop={true} src="/videos/Trump_and_Navalny_1080p.mp4" />
        </div>
      </div>

      {/* who we are */}
      <div ref={whoWeAreRef} id="who-we-are" className='min-h-screen w-full px-4 md:px-8 lg:px-20 scroll-mt-20'>
        <div className="border-b border-gray-300 pb-4 mb-8 text-xs tracking-[0.25em] font-bold text-black uppercase">
          who we are
        </div>
        <Whatwedo />
      </div>

      {/* what we do */}
      <div ref={whatWeDoRef} id="what-we-do" className='relative min-h-screen w-full scroll-mt-20 px-4 md:px-8 lg:px-20'>
        <div className="border-b border-gray-300 pb-4 mb-8 text-xs tracking-[0.25em] font-bold text-black uppercase">
          What we do
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8 pt-10'>
          <div className='flex-1 flex justify-center'>
            <ThreeAnimation />
          </div>
          <div className='flex-1 flex justify-center items-center p-4'>
            <Verify />
          </div>
        </div>
      </div>

      {/* developer */}
      <div ref={developerRef} id="developer" className="shadow-lg shadow-black/30 scroll-mt-20">
        <Footer />
      </div>
    </>
  )
}

export default App