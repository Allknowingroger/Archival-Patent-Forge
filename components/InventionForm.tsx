
import React, { useState } from 'react';

interface InventionFormProps {
  onGenerate: (invention: string) => void;
  isLoading: boolean;
}

const InventionForm: React.FC<InventionFormProps> = ({ onGenerate, isLoading }) => {
  const [invention, setInvention] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invention.trim()) {
      onGenerate(invention.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 px-4">
      <div className="relative group">
        <label className="block text-xs uppercase tracking-[0.3em] text-[#a88d75] mb-4 font-serif-classic text-center">
          Declare Thy Invention for the Record
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={invention}
            onChange={(e) => setInvention(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., Steam-Powered Automaton or Clockwork Heart"
            className="flex-1 bg-[#2a2420] border-2 border-[#4a3f35] rounded-none px-6 py-4 text-[#e2d1c3] placeholder-[#6b5a4d] focus:outline-none focus:border-[#8b735b] transition-colors font-body text-xl shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !invention.trim()}
            className="bg-[#8b735b] hover:bg-[#a88d75] disabled:bg-[#4a3f35] disabled:cursor-not-allowed text-[#1a1614] font-serif-classic font-bold py-4 px-8 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(139,115,91,0.3)]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-[#1a1614] border-t-transparent rounded-full"></div>
                <span>Forging...</span>
              </>
            ) : (
              <span>Seal the Patent</span>
            )}
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-[#6b5a4d] italic font-body text-sm">
        Archival records are permanent. Please ensure clarity in nomenclature.
      </p>
    </form>
  );
};

export default InventionForm;
