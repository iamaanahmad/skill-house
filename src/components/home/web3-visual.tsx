"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Web3Visual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeCount = 20;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < cubeCount; i++) {
      const cube = document.createElement('div');
      cube.className = 'absolute w-10 h-10 bg-primary/20 border border-primary/50 animate-float';
      
      const size = Math.random() * 40 + 10;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * -25;
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;
      cube.style.left = `${x}%`;
      cube.style.top = `${y}%`;
      cube.style.animationDuration = `${duration}s`;
      cube.style.animationDelay = `${delay}s`;
      
      container.appendChild(cube);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = container;
        const x = (clientX / offsetWidth - 0.5) * 45;
        const y = (clientY / offsetHeight - 0.5) * -45;
        container.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
        container.removeEventListener('mousemove', handleMouseMove);
    }

  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-background/50 border shadow-inner">
       <div 
        ref={containerRef}
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
      >
        {/* Cubes will be generated here by useEffect */}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background/50" />
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(20px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
            border-radius: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-180px) rotateX(360deg) rotateY(180deg) rotateZ(180deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default Web3Visual;
