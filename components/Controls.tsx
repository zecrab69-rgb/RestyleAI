import React, { useState, useMemo } from 'react';
import { Sparkles, Wand2, Hammer, Gem, Shuffle, Filter, CheckCircle2 } from 'lucide-react';
import { STYLE_PRESETS, MATERIALS, SPECIAL_PROMPTS } from '../constants';

interface ControlsProps {
  isLoading: boolean;
  onGenerate: (prompt: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({ isLoading, onGenerate }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  
  // Filter States
  const [askMaterial, setAskMaterial] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [onlyEasy, setOnlyEasy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      onGenerate(customPrompt);
    }
  };

  const handlePresetClick = (presetId: string, prompt: string) => {
    setSelectedPresetId(presetId);
    setCustomPrompt(prompt);
  };

  const handleFreestyle = () => {
    // Filter accessible presets if 'onlyEasy' is checked, otherwise all
    const pool = onlyEasy 
      ? STYLE_PRESETS.filter(p => p.difficulty === 'easy') 
      : STYLE_PRESETS;
      
    const randomPreset = pool[Math.floor(Math.random() * pool.length)];
    setSelectedPresetId(randomPreset.id);
    setCustomPrompt(randomPreset.prompt);
    onGenerate(randomPreset.prompt);
  };

  // Filter presets based on material AND difficulty
  const visiblePresets = useMemo(() => {
    return STYLE_PRESETS.filter(p => {
      // 1. Material Filter
      const matchesMaterial = !askMaterial || !selectedMaterial || p.tags?.includes(selectedMaterial);
      
      // 2. Difficulty Filter
      const matchesDifficulty = !onlyEasy || p.difficulty === 'easy';

      return matchesMaterial && matchesDifficulty;
    });
  }, [askMaterial, selectedMaterial, onlyEasy]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto">
      
      {/* --- Section 1: Filters (Material & Feasibility) --- */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
        
        {/* Toggle Title */}
        <div className="flex items-center gap-2 mb-2 text-stone-800 font-semibold">
          <Filter size={18} className="text-khaki-600" />
          <h3>Filtres Intelligents</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          
          {/* Col 1: Material Checkbox */}
          <div className="flex-1 space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={askMaterial}
                onChange={(e) => {
                  setAskMaterial(e.target.checked);
                  if (!e.target.checked) setSelectedMaterial(null);
                }}
                className="w-4 h-4 text-khaki-600 rounded border-stone-300 focus:ring-khaki-500"
              />
              Filtrer par matériau
            </label>

            {askMaterial && (
              <div className="flex flex-wrap gap-2 animate-in slide-in-from-left-2 duration-200">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(selectedMaterial === mat.id ? null : mat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border
                      ${selectedMaterial === mat.id 
                        ? 'bg-khaki-600 text-white border-khaki-600' 
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'}
                    `}
                  >
                    {mat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: DIY / Feasibility Toggle */}
          <div className="flex-1 border-t sm:border-t-0 sm:border-l border-stone-100 pt-4 sm:pt-0 sm:pl-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={onlyEasy}
                  onChange={(e) => setOnlyEasy(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-stone-700 group-hover:text-emerald-700 transition-colors">
                  Mode Facile / DIY
                </span>
                <span className="text-xs text-stone-400 leading-tight mt-1">
                  Affiche uniquement les transformations simples à réaliser soi-même.
                </span>
              </div>
            </label>
          </div>

        </div>
        
        {/* Helper text if list is empty */}
        {selectedMaterial && visiblePresets.length === 0 && (
          <p className="w-full text-xs text-orange-500 italic mt-2 bg-orange-50 p-2 rounded">
            Aucun style ne correspond à cette combinaison (Matériau + Difficulté). Essayez de décocher "Mode Facile".
          </p>
        )}
      </div>

      {/* --- Section 2: Presets Grid --- */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
            {selectedMaterial ? `Styles : ${MATERIALS.find(m => m.id === selectedMaterial)?.label}` : 'Tous les Styles'}
            {onlyEasy && <span className="text-emerald-600 ml-2 normal-case border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">DIY Facile</span>}
          </h3>
          <span className="text-xs text-stone-400">{visiblePresets.length} résultat(s)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
          {visiblePresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.id, preset.prompt)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 flex flex-col gap-1 relative
                ${selectedPresetId === preset.id 
                  ? 'border-khaki-500 bg-khaki-50 ring-1 ring-khaki-500' 
                  : 'border-stone-200 bg-white hover:border-khaki-300 hover:shadow-sm'}
              `}
              disabled={isLoading}
            >
              <div className="flex justify-between items-start w-full">
                <span className="font-medium text-stone-800 text-sm flex items-center gap-2">
                  {preset.name}
                  {selectedPresetId === preset.id && <Sparkles size={14} className="text-khaki-600" />}
                </span>
                {preset.difficulty === 'easy' && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                    Facile
                  </span>
                )}
                {preset.difficulty === 'hard' && !onlyEasy && (
                  <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 uppercase tracking-wide">
                    Expert
                  </span>
                )}
              </div>
              <span className="text-xs text-stone-500 line-clamp-2 pr-2">{preset.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Section 3: Magic Actions --- */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onGenerate(SPECIAL_PROMPTS.GOOD_TASTE)}
          disabled={isLoading}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-stone-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all group"
          title="Design élégant et intemporel"
        >
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
            <Gem size={20} />
          </div>
          <span className="text-xs font-semibold">Bon goût</span>
        </button>

        {/* Note: This button generates a GENERIC feasible prompt, different from the filter above which selects specific presets */}
        <button
          onClick={() => onGenerate(SPECIAL_PROMPTS.FEASIBILITY)}
          disabled={isLoading}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-stone-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
          title="Suggérer une transformation simple"
        >
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xs font-semibold text-center">Prompt Facile</span>
        </button>

        <button
          onClick={handleFreestyle}
          disabled={isLoading}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-stone-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all group"
          title="Choix aléatoire (respecte les filtres)"
        >
          <div className="p-2 bg-orange-100 text-orange-600 rounded-full group-hover:rotate-180 transition-transform duration-500">
            <Shuffle size={20} />
          </div>
          <span className="text-xs font-semibold">Freestyle</span>
        </button>
      </div>

      {/* --- Section 4: Manual Input & Main Button --- */}
      <div className="space-y-3 pt-4 border-t border-stone-200">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={customPrompt}
            onChange={(e) => {
              setCustomPrompt(e.target.value);
              if (selectedPresetId) setSelectedPresetId(null);
            }}
            placeholder="Ou décrivez votre idée précise..."
            className="w-full min-h-[80px] p-3 pr-10 rounded-xl border border-stone-300 focus:border-khaki-500 focus:ring-1 focus:ring-khaki-500 outline-none resize-none text-sm text-stone-700 placeholder-stone-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !customPrompt.trim()}
            className="absolute bottom-2 right-2 text-stone-400 hover:text-khaki-600 disabled:opacity-50"
          >
            <Wand2 size={18} />
          </button>
        </form>

        <button
          onClick={() => onGenerate(customPrompt)}
          disabled={isLoading || !customPrompt.trim()}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200
            ${isLoading 
              ? 'bg-stone-100 text-stone-400 cursor-wait' 
              : 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-lg active:transform active:scale-[0.99]'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-stone-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transformation...
            </>
          ) : (
            <>
              Lancer la transformation
              <Sparkles size={20} className="text-yellow-300" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};