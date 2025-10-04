"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Web3Visual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeCount = 25; // Increased cube count for more density

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing cubes if any, to prevent duplication on HMR
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    for (let i = 0; i < cubeCount; i++) {
      const cube = document.createElement('div');
      cube.className = 'absolute bg-primary/20 animate-float-rotate';
      
      const size = Math.random() * 50 + 15; // Increased max size
      const duration = Math.random() * 20 + 15; // Slower, more majestic movement
      const delay = Math.random() * -35;
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
        const x = (clientX / offsetWidth - 0.5) * 35; // Reduced rotation for a more subtle effect
        const y = (clientY / offsetHeight - 0.5) * -35;
        container.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const parent = container.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);

      return () => {
          parent.removeEventListener('mousemove', handleMouseMove);
      }
    }

  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-background/50 group">
       <div 
        ref={containerRef}
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cubes will be generated here by useEffect */}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background" />
      <div className="absolute inset-0 z-20 bg-grid-pattern opacity-20" />
      <style jsx>{`
        @keyframes float-rotate {
          0% {
            transform: translateY(30px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
            border-radius: 0.5rem;
            box-shadow: 0 0 5px 0px hsl(var(--primary) / 0.3);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 25px 5px hsl(var(--primary) / 0.5);
          }
          100% {
            transform: translateY(-200px) rotateX(450deg) rotateY(270deg) rotateZ(180deg);
            opacity: 0;
            border-radius: 50%;
            box-shadow: 0 0 5px 0px hsl(var(--primary) / 0.3);
          }
        }
        .animate-float-rotate {
          animation-name: float-rotate;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default Web3Visual;
