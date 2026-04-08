'use client';

import { format } from 'date-fns';
import Image from 'next/image';

interface HeroImageProps {
  month: Date;
}

export default function HeroImage({ month }: HeroImageProps) {
  const monthNumber = month.getMonth(); // 0-11
  
  const monthImages: Record<number, string> = {
    0: '/months/january.jpg',
    1: '/months/february.jpg',
    2: '/months/march.jpg',
    3: '/months/april.jpg',
    4: '/months/may.jpg',
    5: '/months/june.jpg',
    6: '/months/july.jpg',
    7: '/months/august.jpg',
    8: '/months/september.jpg',
    9: '/months/october.jpg',
    10: '/months/november.jpg',
    11: '/months/december.jpg',
  };

  const imageSrc = monthImages[monthNumber] || '/months/january.jpg';

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-200">
      {/* Main hero image */}
      <Image
        src={imageSrc}
        alt={`${format(month, 'MMMM')} ${format(month, 'yyyy')}`}
        fill
        className="object-cover"
        priority
      />

      {/* Subtle overlay for texture effect */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
