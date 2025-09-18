import { Space } from "lucide-react";
import { PointerHighlight } from "./pointer-highlight";

export function PointerHighlightDemo() {
  return (
    <div className="  max-w-4xl gap-4  ">
     
      
      <div className="rounded-md ">
        
        <div
          className="  max-w-lg text-base font-bold tracking-tight md:text-base ">
          Preserving truth in the
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1">
            <span className="relative z-10">Age of AI deception </span>
          </PointerHighlight>
          .
        </div>
        <p className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 ">
          We analyze videos and audio using advanced AI to detect manipulation and deliver results as fast as possible, giving users instant clarity on whether the content is real or fake.
        </p>
      </div>
    </div>
  );
}
