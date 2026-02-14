import { StylePreset } from './types';

export const MAX_IMAGE_SIZE_MB = 4;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Material Categories
export const MATERIALS = [
  { id: 'wood', label: 'Bois' },
  { id: 'metal', label: 'Métal' },
  { id: 'fabric', label: 'Tissu / Rembourré' },
  { id: 'plastic', label: 'Plastique / Synthétique' },
  { id: 'stone', label: 'Pierre / Marbre' },
];

// Special Prompts
export const SPECIAL_PROMPTS = {
  GOOD_TASTE: "Apply a universally acclaimed, timeless, and elegant interior design style. Use harmonious color palettes (like Sage Green, Terracotta, or Navy Blue) and high-end finishes. Ensure the lighting is warm and the texture looks expensive and well-maintained.",
  FEASIBILITY: "Restyle this furniture using simple, DIY-friendly techniques suitable for beginners. Use chalk paint, simple sanding, or wax. Avoid complex structural changes. Keep it realistic and achievable with standard hardware store supplies.",
};

// Presets with tags for filtering
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'ceruse-blanche',
    name: 'Céruse Blanche',
    prompt: 'Apply a white limewash patina effect to the furniture, creating a soft, weathered shabby chic look while keeping the underlying grain visible.',
    description: 'Adouci à la cire blanche',
    tags: ['wood'],
    difficulty: 'easy'
  },
  {
    id: 'scandi-natural',
    name: 'Scandinave Brut',
    prompt: 'Strip the paint to reveal light, natural raw oak wood. Matte varnish protection only. Minimalist and organic.',
    description: 'Bois clair naturel poncé',
    tags: ['wood'],
    difficulty: 'medium'
  },
  {
    id: 'sage-green-chalk',
    name: 'Vert Sauge (Chalk)',
    prompt: 'Paint the furniture in a matte Sage Green using chalk paint. Lightly distress the edges for a subtle vintage feel. Change handles to brass.',
    description: 'Peinture à la craie tendance',
    tags: ['wood', 'metal', 'plastic'],
    difficulty: 'easy'
  },
  {
    id: 'antique-dark',
    name: 'Patine Noire Antique',
    prompt: 'Apply a dark antique wax patina to the edges and carvings to create depth and an aged, historical look.',
    description: 'Vieilli à la cire sombre',
    tags: ['wood', 'metal'],
    difficulty: 'medium'
  },
  {
    id: 'gold-accents',
    name: 'Détails Dorés',
    prompt: 'Add delicate gold leaf gilding to the carved details and rosettes. Matte finish base with highlighted ornaments.',
    description: 'Rehauts à la feuille d\'or',
    tags: ['wood', 'metal', 'stone'],
    difficulty: 'hard'
  },
  {
    id: 'concrete-effect',
    name: 'Effet Béton Ciré',
    prompt: 'Apply a grey concrete texture overlay. Industrial and modern brutalist look. Smooth matte grey finish.',
    description: 'Texture minérale moderne',
    tags: ['wood', 'plastic', 'stone'],
    difficulty: 'medium'
  },
  {
    id: 'distressed-wood',
    name: 'Usure Naturelle',
    prompt: 'Make the furniture look heavily distressed and worn, with paint chipping away to reveal raw material underneath, rustic farmhouse style.',
    description: 'Style rustique très usé',
    tags: ['wood'],
    difficulty: 'medium'
  },
  {
    id: 'midnight-blue',
    name: 'Bleu Nuit Profond',
    prompt: 'Paint the entire piece in a deep, rich Midnight Blue with a satin finish. Elegant and contemporary.',
    description: 'Peinture satinée élégante',
    tags: ['wood', 'metal', 'plastic'],
    difficulty: 'easy'
  },
  {
    id: 'modern-matte',
    name: 'Mat Moderne',
    prompt: 'Refine the finish to be ultra-matte and smooth. Change hardware to sleek matte black handles. Contemporary minimalist style.',
    description: 'Finition lisse et mate',
    tags: ['wood', 'metal', 'plastic', 'stone'],
    difficulty: 'easy'
  },
  {
    id: 'industrial-rust',
    name: 'Indus Rouillé',
    prompt: 'Apply an industrial style with rust effects and raw steel texture. Exposed rivets and worn metal look.',
    description: 'Effet métal vieilli',
    tags: ['metal', 'plastic'], // Removed 'wood' as per request
    difficulty: 'hard'
  },
  {
    id: 'velvet-upholstery',
    name: 'Velours Royal',
    prompt: 'Change the upholstery fabric to a luxurious deep emerald green velvet. Keep the frame classic.',
    description: 'Remplacement tissu velours',
    tags: ['fabric'],
    difficulty: 'medium'
  },
  {
    id: 'boucle-fabric',
    name: 'Tissu Bouclette',
    prompt: 'Reupholster with white creamy bouclette fabric. Soft, textured, and cozy modern aesthetic.',
    description: 'Tissu blanc texturé mode',
    tags: ['fabric'],
    difficulty: 'medium'
  },
  {
    id: 'boho-rattan',
    name: 'Esprit Bohème',
    prompt: 'Give it a light, natural rattan or wicker texture look. Airy and organic feel.',
    description: 'Texture naturelle claire',
    tags: ['wood', 'plastic'],
    difficulty: 'hard'
  },
  {
    id: 'marble-effect',
    name: 'Effet Marbre',
    prompt: 'Transform the surface to look like high-quality white Carrara marble with grey veining. Smooth, polished stone finish.',
    description: 'Finition pierre luxueuse',
    tags: ['stone', 'plastic', 'wood'],
    difficulty: 'hard'
  },
  {
    id: 'terracotta-clay',
    name: 'Terracotta',
    prompt: 'Paint in a warm earthy Terracotta clay color with a matte, chalky texture. Mediterranean vibe.',
    description: 'Couleur terre cuite chaude',
    tags: ['wood', 'plastic', 'stone'],
    difficulty: 'easy'
  }
];