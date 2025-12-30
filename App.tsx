
import React, { useState, useCallback } from 'react';
import { PatentData, GenerationStatus } from './types';
import { generatePatentText, generatePatentImage } from './services/geminiService';
import InventionForm from './components/InventionForm';
import PatentDisplay from './components/PatentDisplay';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>({ step: 'idle', message: '' });
  const [patentData, setPatentData] = useState<PatentData | null>(null);

  const handleGenerate = async (invention: string) => {
    try {
      setPatentData(null);
      
      // Step 1: Draft the Text
      setStatus({ step: 'drafting', message: 'Consulting the Patent Examiners...' });
      const textData = await generatePatentText(invention);
      
      // Step 2: Illustrate the mechanisms
      setStatus({ step: 'illustrating', message: 'Inking technical schematics (Fig 1, 2, 3)...' });
      const imageUrl = await generatePatentImage(invention, textData.inventor, textData.date);
      
      // Step 3: Finalize
      setStatus({ step: 'finalizing', message: 'Affixing official wax seals...' });
      
      const newPatent: PatentData = {
        id: crypto.randomUUID(),
        inventionName: invention,
        ...textData,
        imageUrl
      };

      setPatentData(newPatent);
      setStatus({ step: 'idle', message: '' });
    } catch (error) {
      console.error('Forge failure:', error);
      setStatus({ step: 'error', message: 'The archival process has failed. Perhaps the invention is too advanced for this century.' });
    }
  };

  return (
    <div className="min-h-screen pb-24 selection:bg-[#8b735b] selection:text-[#1a1614]">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

      {/* Navigation Header */}
      <header className="relative py-12 px-4 border-b border-[#352d28]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 bg-[#c19a6b] rounded-full blur-xl opacity-20"></div>
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#c19a6b] relative drop-shadow-lg">
              <path fill="currentColor" d="M50 5 L10 25 L10 75 L50 95 L90 75 L90 25 Z" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <path fill="currentColor" d="M50 15 L50 85 M15 32 L85 68 M15 68 L85 32" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="font-serif-classic text-5xl md:text-7xl text-[#c19a6b] tracking-tighter text-center leading-none">
            Archival Patent Forge
          </h1>
          <p className="mt-4 font-body text-[#a88d75] italic text-lg md:text-xl tracking-wide max-w-xl text-center">
            Establishing industrial priority through technical artistry since MDCCCLXX.
          </p>
        </div>
      </header>

      <main>
        {/* Form Section */}
        <section className="relative z-10">
          <InventionForm onGenerate={handleGenerate} isLoading={status.step !== 'idle' && status.step !== 'error'} />
        </section>

        {/* Loading / Status Section */}
        {status.step !== 'idle' && (
          <div className="max-w-md mx-auto mt-12 px-4 animate-pulse">
            <div className="flex flex-col items-center gap-6">
              <div className="h-1 w-full bg-[#352d28] rounded-full overflow-hidden">
                <div className="h-full bg-[#c19a6b] transition-all duration-1000" 
                  style={{ width: status.step === 'drafting' ? '33%' : status.step === 'illustrating' ? '66%' : '90%' }}>
                </div>
              </div>
              <p className="font-typewriter text-[#a88d75] text-sm tracking-widest uppercase text-center">
                {status.message}
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status.step === 'error' && (
          <div className="max-w-xl mx-auto mt-12 px-4">
            <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-none text-red-200 font-body text-center">
              <p className="font-serif-classic text-xl mb-2">Clerical Error Encountered</p>
              <p className="opacity-80">{status.message}</p>
              <button 
                onClick={() => setStatus({ step: 'idle', message: '' })}
                className="mt-4 text-xs uppercase tracking-widest underline underline-offset-4"
              >
                Attempt New Entry
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {patentData && <PatentDisplay data={patentData} />}
      </main>

      {/* Footer Decoration */}
      <footer className="mt-24 text-center pb-12">
        <div className="max-w-6xl mx-auto px-4 opacity-40">
          <div className="h-px bg-gradient-to-r from-transparent via-[#4a3f35] to-transparent w-full mb-8"></div>
          <p className="font-serif-classic text-[#6b5a4d] text-xs uppercase tracking-[0.4em]">
            Proprietary Technology of the National Bureau of Patents • Established 1870
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
