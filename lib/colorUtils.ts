// Extract dominant color from image for theme generation
export async function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 1, 1);
          const imageData = ctx.getImageData(0, 0, 1, 1);
          const data = imageData.data;
          const hex = '#' + [data[0], data[1], data[2]].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
          resolve(hex);
        } else {
          resolve('#3b82f6');
        }
      };
      img.onerror = () => resolve('#3b82f6');
      img.src = imageSrc;
    } catch {
      resolve('#3b82f6');
    }
  });
}

// Generate complementary colors from dominant color
export function generateComplementaryColors(dominantColor: string): {
  light: string;
  dark: string;
  accent: string;
} {
  try {
    const hex = dominantColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Generate light and dark variants
    const lightColor = luminance > 0.5 
      ? `rgba(${r}, ${g}, ${b}, 0.15)` 
      : `rgba(${r}, ${g}, ${b}, 0.25)`;
    
    const darkColor = luminance > 0.5 
      ? `rgba(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)}, 0.8)` 
      : `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, 0.8)`;

    // Complementary color (opposite on color wheel)
    const accentColor = `#${(0xFFFFFF ^ parseInt(hex, 16)).toString(16).padStart(6, '0')}`;

    return {
      light: lightColor,
      dark: darkColor,
      accent: accentColor,
    };
  } catch {
    return {
      light: 'rgba(59, 130, 246, 0.15)',
      dark: 'rgba(37, 99, 235, 0.8)',
      accent: '#dc2626',
    };
  }
}
