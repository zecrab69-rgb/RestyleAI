export interface StylePreset {
  id: string;
  name: string;
  prompt: string;
  description: string;
  tags?: string[]; // Array of material IDs this preset is suitable for
  difficulty?: 'easy' | 'medium' | 'hard'; // Level of DIY difficulty
}

export interface GenerationState {
  originalImage: string | null; // Base64 full string
  generatedImage: string | null; // Base64 full string
  isLoading: boolean;
  error: string | null;
}

export interface ImageDimensions {
  width: number;
  height: number;
}