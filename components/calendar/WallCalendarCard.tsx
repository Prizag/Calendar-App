'use client';

import { ReactNode } from 'react';

interface WallCalendarCardProps {
  children: ReactNode;
  isFlipping?: boolean;
}

export function WallCalendarCard({ children, isFlipping = false }: WallCalendarCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8" style={{
      backgroundImage: 'url(/wood-texture.jpg)',
      backgroundColor: '#f5f1e8',
    }}>
      {/* Wall shadow effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* Calendar card with 3D perspective */}
      <div className="relative w-full max-w-2xl" style={{
        perspective: '1000px',
      }}>
        {/* Hanging element (metal rod) */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full shadow-2xl z-10" style={{
          boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
        }} />

        {/* Main calendar card */}
        <div 
          className={`bg-white overflow-hidden transition-transform duration-500 ease-out ${isFlipping ? 'rotate-y-180' : ''}`}
          style={{
            borderRadius: '12px',
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.15),
              0 0 40px rgba(0,0,0,0.08),
              inset 0 1px 0 rgba(255,255,255,0.8)
            `,
            transform: isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Decorative border frame */}
          <div className="absolute inset-0 pointer-events-none" style={{
            border: '8px solid',
            borderColor: '#f0ebe5',
            borderRadius: '12px',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.03)',
          }} />

          {/* Content */}
          <div className="relative z-1 flex flex-col">
            {children}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gray-300 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gray-300 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gray-300 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gray-300 pointer-events-none" />
        </div>

        {/* Bottom shadow (wall mounting effect) */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-gradient-to-b from-black/20 to-transparent blur-xl" style={{
          marginTop: '-20px',
        }} />
      </div>

      {/* Subtle ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 70%)',
      }} />
    </div>
  );
}
