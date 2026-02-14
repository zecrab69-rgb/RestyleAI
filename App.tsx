import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { Controls } from './components/Controls';
import { ComparisonView } from './components/ComparisonView';
import { FeedbackSection } from './components/FeedbackSection';
import { restyleFurniture } from './services/geminiService';
import { GenerationState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState>({
    originalImage: null,
    generatedImage: null,
    isLoading: false,
    error: null,
  });

  const handleImageSelect = (base64: string) => {
    setState(prev => ({ ...prev, originalImage: base64, generatedImage: null, error: null }));
  };

  const handleGenerate = async (prompt: string) => {
    if (!state.originalImage) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await restyleFurniture(state.originalImage, prompt);
      setState(prev => ({ ...prev, generatedImage: result, isLoading: false }));
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Une erreur est survenue lors de la génération. Veuillez réessayer." 
      }));
    }
  };

  const handleReset = () => {
    setState({
      originalImage: null,
      generatedImage: null,
      isLoading: false,
      error: null
    });
  };

  const handleChangeStyle = () => {
    setState(prev => ({
      ...prev,
      generatedImage: null,
      error: null
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Intro Text */}
        {!state.generatedImage && (
          <div className="text-center max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 tracking-tight">
              Donnez une nouvelle vie à vos meubles
            </h2>
            <p className="text-lg text-stone-600">
              Téléchargez une photo de votre meuble et utilisez l'IA pour visualiser de nouvelles patines, couleurs et styles tendances.
            </p>
          </div>
        )}

        {/* Error Banner */}
        {state.error && (
          <div className="w-full max-w-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center gap-2 animate-pulse">
            <AlertCircle size={20} />
            <p>{state.error}</p>
          </div>
        )}

        {/* Main Interface Flow */}
        <div className="w-full flex flex-col items-center gap-10">
          
          {/* Step 1: Upload (Hidden if generated, shown if editing or initial) */}
          {!state.generatedImage && (
            <div className="w-full max-w-xl">
              {state.originalImage ? (
                <div className="relative group rounded-xl overflow-hidden shadow-md mb-8">
                   <img 
                    src={state.originalImage} 
                    alt="Original" 
                    className="w-full h-64 object-cover object-center"
                   />
                   <button 
                    onClick={handleReset}
                    className="absolute top-3 right-3 bg-white/90 text-stone-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-white shadow-sm"
                   >
                    Changer l'image
                   </button>
                </div>
              ) : (
                <ImageUpload onImageSelected={handleImageSelect} />
              )}
            </div>
          )}

          {/* Step 2: Controls (Shown if image uploaded but not yet generated) */}
          {state.originalImage && !state.generatedImage && (
            <Controls isLoading={state.isLoading} onGenerate={handleGenerate} />
          )}

          {/* Step 3: Result View (Shown if generated) */}
          {state.originalImage && state.generatedImage && (
            <ComparisonView 
              original={state.originalImage}
              generated={state.generatedImage}
              onReset={handleReset}
              onChangeStyle={handleChangeStyle}
            />
          )}

        </div>

        {/* Feedback Section */}
        <FeedbackSection />

      </main>

      <footer className="py-6 border-t border-stone-200 text-center text-stone-400 text-sm">
        <p>&copy; {new Date().getFullYear()} RestyleAI. Designed for creativity.</p>
      </footer>
    </div>
  );
};

export default App;