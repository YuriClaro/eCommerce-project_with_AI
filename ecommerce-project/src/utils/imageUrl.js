const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export function getImageUrl(imagePath) {
  // Se for uma URL completa, retorna como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Caso contrário, constrói a URL completa com a base da API
  return `${API_BASE_URL}${imagePath}`;
}
