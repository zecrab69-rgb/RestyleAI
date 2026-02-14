import React, { useState } from 'react';
import { ArrowRightLeft, Download, RefreshCw, Palette } from 'lucide-react';

interface ComparisonViewProps {
  original: string;
  generated: string;
  onReset: () => void;
  onChangeStyle: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ original, generated, onReset, onChangeStyle }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => setIsResizing(true);
  const handleTouchStart = () => setIsResizing(true);
  
  const handleMouseUp = () => setIsResizing(false);
  const handleTouchEnd = () => setIsResizing(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isResizing) return;
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isResizing) return;
    handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generated;
    link.download = 'restyle-meuble.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl select-none cursor-ew-resize bg-stone-100"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
        {/* Underneath Image (Generated) */}
        <img 
          src={generated} 
          alt="Restyled Furniture" 
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />

        {/* Overlay Image (Original) - Clip Path based on slider */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={original} 
            alt="Original Furniture" 
            className="absolute top-0 left-0 w-full h-full object-cover object-center max-w-none" 
          />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-khaki-600">
            <ArrowRightLeft size={20} />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm pointer-events-none">
          Avant (Original)
        </div>
        <div className="absolute top-4 right-4 bg-khaki-600/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm pointer-events-none">
          Après (Restylé)
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium transition-colors"
        >
          <RefreshCw size={18} />
          Nouvelle image
        </button>

        <button
          onClick={onChangeStyle}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium transition-colors"
        >
          <Palette size={18} />
          Changer de style
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-khaki-600 text-white hover:bg-khaki-700 font-medium transition-colors shadow-md"
        >
          <Download size={18} />
          Télécharger le résultat
        </button>
      </div>
    </div>
  );
};