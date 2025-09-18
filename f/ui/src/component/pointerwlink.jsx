import { Space } from "lucide-react";
import { PointerHighlight } from "./pointer-highlight";

export function Pointerlink() {
  return (
    <div className="  max-w-4xl gap-4  ">
     
      
      <div className="rounded-md ">
        
        <div
          className="  max-w-lg text-base font-bold tracking-tight md:text-base ">
          One link
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1">
            <span className="relative z-10">to reveal the truth </span>
          </PointerHighlight>
          .
        </div>
        <p className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 ">
Users can simply share a link to any video or audio, and our system instantly analyzes it to check for deepfake manipulation, providing fast and reliable results without needing to upload files.        </p>
      </div>
    </div>
  );
}
