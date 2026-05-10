import React from 'react';
import {PointerHighlightDemo} from '../component/pointerworking.jsx';
import HoverPlayCard from '../component/Howercardplay.tsx';
import GoogleSearchBoxDemo from '../component/Searchbarui.tsx';
import { Pointerlink } from '../component/pointerwlink.jsx';
const Whatwedo = () => {
  return (
    <>
    <div className='w-full py-4 sm:py-10 space-y-6 sm:space-y-10'>
        {/* top card */}
        <div className='border border-gray-100 shadow-xl rounded-2xl bg-white p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-8 sm:gap-12 items-center justify-center'>
            {/* left */}
            <div className='w-full max-w-xs sm:max-w-sm'>
                <PointerHighlightDemo />
            </div>
            {/* right */}
            <div className='w-full max-w-sm'>
                <HoverPlayCard loop={true} src="/videos/trevor_sesli.mp4" />
            </div>
        </div>

        {/* bottom card */}
        <div className='border border-gray-100 shadow-xl rounded-2xl bg-white flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 p-5 sm:p-8 md:p-10'>
          {/* left */}
          <div className='w-full max-w-md'>
            <GoogleSearchBoxDemo />
          </div>
          {/* right */}
          <div className='w-full max-w-xs'>
            <Pointerlink />
          </div>
        </div>
    </div>
    
    </>
   
  );
};

export default Whatwedo;