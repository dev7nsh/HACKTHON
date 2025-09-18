import React from 'react';
import {PointerHighlightDemo} from '../component/pointerworking.jsx';
import HoverPlayCard from '../component/Howercardplay.tsx';
import GoogleSearchBoxDemo from '../component/Searchbarui.tsx';
import { Pointerlink } from '../component/pointerwlink.jsx';
const Whatwedo = () => {
  return (
    <>
    <div className='h-screen pt-20'>
        {/* top */}

        <div className='border border-transparent shadow-lg shadow-black/10 rounded-xl bg-white pt-5 flex flex-row gap-50 items-center pl-60 '>
            {/* left */}
            <div className='w-2xs scale-150  '>
                <PointerHighlightDemo />
            </div>
            {/* right */}

            <div className='h-full space-y-5 scale-75 '>
                <HoverPlayCard loop={true} src="/videos/trevor_sesli.mp4" />
            </div>

        </div>

        {/* bottom */}
        <div className='h-1/3 mt-20 border border-transparent shadow-lg shadow-black/10 rounded-xl bg-white  flex flex-row items-center gap-100'>
          {/* left */}
          <div className='pl-40'>
            <GoogleSearchBoxDemo />
          </div>
          {/* right */}
          <div className='w-2xs scale-150'>
            <Pointerlink />
          </div>
        </div>

    </div>
    
    </>
   
  );
};

export default Whatwedo;