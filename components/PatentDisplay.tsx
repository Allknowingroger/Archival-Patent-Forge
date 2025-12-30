
import React from 'react';
import { PatentData } from '../types';

interface PatentDisplayProps {
  data: PatentData;
}

const PatentDisplay: React.FC<PatentDisplayProps> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto mt-16 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Illustration */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#4a3f35] to-[#2a2420] rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative border-8 border-[#2a2420] shadow-2xl overflow-hidden bg-[#d9c5b2]">
            <img 
              src={data.imageUrl} 
              alt={`Patent Drawing of ${data.inventionName}`}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="mt-6 flex justify-between items-center px-2">
            <span className="text-[#6b5a4d] font-typewriter text-xs">OFFICIAL COPY • NO. {data.patentNumber}</span>
            <button 
              onClick={() => window.print()}
              className="text-[#a88d75] hover:text-[#e2d1c3] text-sm font-serif-classic underline underline-offset-4 decoration-[#4a3f35] flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Archive Record
            </button>
          </div>
        </div>

        {/* Right: Textual Specification */}
        <div className="bg-[#2a2420] p-8 md:p-12 border border-[#4a3f35] shadow-xl relative overflow-hidden">
          {/* Watermark effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#352d28] rotate-45 select-none pointer-events-none text-9xl font-serif-classic opacity-20">
            OFFICIAL
          </div>
          
          <div className="relative z-10">
            <div className="text-center border-b border-[#4a3f35] pb-8 mb-8">
              <h1 className="font-serif-classic text-3xl md:text-4xl text-[#c19a6b] mb-2 uppercase tracking-widest">
                United States Patent Office.
              </h1>
              <p className="text-[#a88d75] italic font-body text-lg">
                {data.inventor}, of the Republic, Assignor of certain parts.
              </p>
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-[#6b5a4d] font-typewriter text-sm gap-2">
                <span>SPECIFICATION forming part of Letters Patent No. {data.patentNumber}</span>
                <span className="uppercase">{data.date}</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-serif-classic text-[#a88d75] text-xl mb-4 border-l-4 border-[#8b735b] pl-4 italic">
                  To all whom it may concern:
                </h2>
                <div className="font-body text-[#e2d1c3] leading-relaxed text-lg whitespace-pre-line drop-shadow-sm">
                  {data.specification}
                </div>
              </section>

              <section className="pt-8 border-t border-[#4a3f35]">
                <h2 className="font-serif-classic text-[#a88d75] text-xl mb-4 italic">
                  What I claim as new and desire to secure by Letters Patent is—
                </h2>
                <ol className="space-y-4 list-decimal list-inside font-body text-[#e2d1c3] text-lg italic">
                  {data.claims.map((claim, idx) => (
                    <li key={idx} className="pl-2 leading-relaxed">
                      {claim}
                    </li>
                  ))}
                </ol>
              </section>

              <div className="pt-12 flex flex-col items-end gap-2 opacity-80">
                <div className="font-typewriter text-[#6b5a4d] text-sm uppercase">Witness my hand:</div>
                <div className="font-serif-classic text-2xl text-[#c19a6b] italic border-b border-[#c19a6b] pb-1 w-fit">
                  {data.inventor}
                </div>
                <div className="text-[#6b5a4d] font-typewriter text-xs">Recorded in the annals of history.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentDisplay;
