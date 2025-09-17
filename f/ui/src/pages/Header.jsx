import { useState } from "react";
import Headroom from "react-headroom";

const Header = () => {
  return (
   
    <> <Headroom>
      <header className="w-full bg-white border border-gray-400/40">
        <div className="flex h-[60px] items-center justify-between px-6">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            {/* <div className="w-8">
              <img src="src/assets/Z (1).png" alt="Logo" />
            </div> */}
            <div className="font-black text-black text-2xl">DeepFake</div>
          </div>

          {/* Center Navigation */}
          <nav className="flex gap-8 text-shadow-gray-400 font-mono text-black">
            <a href="#" className="hover:underline">
              Overview
            </a>
            <a href="#" className="hover:underline">
              Who we are
            </a>
            <a href="#" className="hover:underline">
              What we do
            </a>
            <a href="#" className="hover:underline">
              Dvelopers
            </a>
          </nav>

          {/* Right-side Image (Optional) */}
          {/* <div className="hidden md:block">
            <img
              src="src/assets/Rectangle 34.png"
              alt="Decoration"
              className="h-8"
            />
          </div> */}
        </div>
      </header>
    </Headroom></>
  );
};



       


        
        

    
       
        
        


        


export default Header;