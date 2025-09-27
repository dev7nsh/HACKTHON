import React from 'react';
import {PointerHighlightDemo} from '../component/pointerworking.jsx';
import HoverPlayCard from '../component/Howercardplay.tsx';
import GoogleSearchBoxDemo from '../component/Searchbarui.tsx';
import { Pointerlink } from '../component/pointerwlink.jsx';
const Whatwedo = () => {
  return (
    <>
    <div className='min-h-screen py-8'>
        {/* top */}
        <div className='border border-transparent shadow-lg shadow-black/10 rounded-xl bg-white p-4 md:p-6 flex flex-col lg:flex-row gap-8 items-center mb-8'>
            {/* left */}
            <div className='w-full lg:w-1/2 flex justify-center'>
                <div className='scale-110 md:scale-125 lg:scale-150'>
                    <PointerHighlightDemo />
                </div>
            </div>
            {/* right */}
            <div className='w-full lg:w-1/2 flex justify-center'>
                <div className='scale-75 md:scale-90'>
                    <HoverPlayCard loop={true} src="/videos/trevor_sesli.mp4" />
                </div>
            </div>
        </div>

        {/* bottom */}
        <div className='border border-transparent shadow-lg shadow-black/10 rounded-xl bg-white p-4 md:p-6 flex flex-col lg:flex-row items-center gap-8'>
          {/* left */}
          <div className='w-full lg:w-1/2 flex justify-center'>
            <GoogleSearchBoxDemo />
          </div>
          {/* right */}
          <div className='w-full lg:w-1/2 flex justify-center'>
            <div className='scale-110 md:scale-125 lg:scale-150'>
              <Pointerlink />
            </div>
          </div>
        </div>

    </div>
    
    </>
   
  );
};

export default Whatwedo;