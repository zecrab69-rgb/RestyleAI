import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { MAX_IMAGE_SIZE_MB, ACCEPTED_IMAGE_TYPES } from '../constants';

interface ImageUploadProps {
  onImageSelected: (base64: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Format non supporté. Utilisez JPG, PNG ou WEBP.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(`L'image est trop volumineuse (Max ${MAX_IMAGE_SIZE_MB}MB).`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`relative group w-full h-64 sm:h-80 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-6 cursor-pointer
        ${dragActive ? 'border-khaki-500 bg-khaki-50' : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-stone-400'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleChange}
      />
      
      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {dragActive ? <ImageIcon className="text-khaki-600" size={32} /> : <Upload className="text-stone-400 group-hover:text-khaki-600" size={32} />}
      </div>
      
      <h3 className="text-lg font-semibold text-stone-700 mb-1">
        Déposez votre meuble ici
      </h3>
      <p className="text-sm text-stone-500 text-center max-w-xs">
        ou cliquez pour sélectionner. (JPG, PNG - Max 4MB)
      </p>

      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-50 text-red-600 p-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-red-100">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};