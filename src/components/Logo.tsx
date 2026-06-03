import React from 'react';

interface LogoProps {
  className?: string;
  size?: "small" | "normal" | "large";
}

export default function Logo({ className = "", size = "normal" }: LogoProps) {
  let heightClass = "h-10 sm:h-12";
  if (size === 'small') heightClass = "h-8";
  if (size === 'large') heightClass = "h-14 sm:h-16";

  return (
    <div className={`flex items-baseline relative transform transition-transform ${className}`}>
      {/* 
        Custom SVG tailored to match the provided logo: 
        A thick brush-style 'L' serving as a shopping cart, with two wheels underneath, 
        and the rest of the text "ojarápido" sitting above the bottom brush stroke of the 'L'.
      */}
      <svg 
        viewBox="0 0 240 100" 
        className={`${heightClass} w-auto text-current`} 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The 'L' Brush Stroke forming the cart */}
        <path 
          d="M 45,15 
             C 42,39 39,63 36,83 
             C 35,89 41,91 47,90 
             C 74,86 100,80 126,73 
             C 131,71 129,62 124,63 
             C 99,69 74,75 51,78 
             C 53,58 56,38 59,17 
             C 60,11 46,9 45,15 Z" 
        />
        
        {/* Cart Wheels */}
        <circle cx="65" cy="95" r="9" />
        <circle cx="95" cy="89" r="9" />

        {/* The text "ojarápido" - positioned to sit on the horizontal stroke */}
        <text 
          x="65" 
          y="72" 
          fontFamily="'Inter', system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="48" 
          letterSpacing="-2"
          fill="currentColor"
          transform="rotate(-4 65 72)"
        >
          ojarápido
        </text>
      </svg>
    </div>
  );
}
