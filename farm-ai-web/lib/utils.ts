export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const diseases = {
  powdery_mildew: {
    name: 'Powdery Mildew',
    description: 'Fungal disease causing white powder-like coating on leaves',
    symptoms: ['White/gray powdery coating', 'Leaf yellowing', 'Early leaf drop'],
    treatments: ['Sulfur sprays', 'Potassium bicarbonate', 'Neem oil'],
  },
  leaf_rust: {
    name: 'Leaf Rust',
    description: 'Fungal disease with rust-colored pustules on leaves',
    symptoms: ['Rust-colored spots', 'Yellow halos', 'Leaf yellowing and dropping'],
    treatments: ['Copper fungicide', 'Sulfur-based products', 'Propiconazole'],
  },
  early_blight: {
    name: 'Early Blight',
    description: 'Fungal disease affecting tomato and potato plants',
    symptoms: ['Irregular brown spots', 'Concentric rings', 'Yellow halo around spots'],
    treatments: ['Chlorothalonil', 'Mancozeb', 'Copper fungicide'],
  },
  bacterial_wilt: {
    name: 'Bacterial Wilt',
    description: 'Bacterial disease causing plant wilting despite adequate water',
    symptoms: ['Wilting despite moisture', 'Vascular browning', 'Plant death'],
    treatments: ['Remove infected plants', 'Insect control', 'Crop rotation'],
  },
  blossom_end_rot: {
    name: 'Blossom End Rot',
    description: 'Calcium deficiency disorder in tomatoes and peppers',
    symptoms: ['Dark sunken spots', 'Water-soaked appearance', 'Affects fruit end'],
    treatments: ['Calcium application', 'Consistent watering', 'Lime application'],
  },
}

export const medicines = {
  sulfur: {
    name: 'Sulfur Dust/Spray',
    activeIngredient: 'Elemental Sulfur',
    dosage: '5-10 g per liter of water',
    diseases: ['powdery_mildew', 'mites'],
    safetyPeriod: '3 days',
  },
  neem: {
    name: 'Neem Oil',
    activeIngredient: 'Azadirachtin',
    dosage: '3-5% solution',
    diseases: ['powdery_mildew', 'mealy_bugs', 'scale_insects'],
    safetyPeriod: '7 days',
  },
  copper: {
    name: 'Copper Fungicide',
    activeIngredient: 'Copper Oxide/Sulfate',
    dosage: '2-3 g per liter',
    diseases: ['leaf_rust', 'early_blight', 'bacterial_spot'],
    safetyPeriod: '5 days',
  },
  mancozeb: {
    name: 'Mancozeb',
    activeIngredient: 'Mancozeb',
    dosage: '2.5-3 g per liter',
    diseases: ['early_blight', 'late_blight'],
    safetyPeriod: '7 days',
  },
}
