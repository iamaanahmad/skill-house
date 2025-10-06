"use client";

import React, { useEffect, useRef, useState } from 'react';
import { FileCode, Cpu, ShieldCheck, QrCode, Share2, Gem, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

const FeatureOrb = ({ 
    icon: Icon, 
    position, 
    delay, 
    label 
}: { 
    icon: React.ElementType; 
    position: string; 
    delay: number;
    label: string;
}) => (
    <div
        className={cn(
            "absolute flex flex-col items-center gap-2 group/orb cursor-pointer",
            "transition-all duration-500 hover:scale-110",
            position
        )}
        style={{ 
            animation: `float 4s ease-in-out infinite`,
            animationDelay: `${delay}s`
        }}
    >
        <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse-glow" />
            
            {/* Orb */}
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/90 to-accent/90 shadow-2xl shadow-primary/50 border-2 border-primary/20">
                <Icon className="w-10 h-10 text-primary-foreground relative z-10" />
                
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
            </div>
            
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover/orb:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
        </div>
        
        {/* Label */}
        <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover/orb:opacity-100 transition-opacity whitespace-nowrap">
            {label}
        </span>
    </div>
);

const ConnectionLine = ({ from, to, delay }: { from: string; to: string; delay: number }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <line
            x1={from.split(',')[0]}
            y1={from.split(',')[1]}
            x2={to.split(',')[0]}
            y2={to.split(',')[1]}
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-dash"
            style={{ animationDelay: `${delay}s` }}
        />
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

const Web3Visual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Initialize particles
        particlesRef.current = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles
            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Mouse interaction
                const dx = mousePos.x - particle.x;
                const dy = mousePos.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                }

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${283}, 59%, 57%, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.forEach((otherParticle) => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `hsla(${283}, 59%, 57%, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, [mousePos]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div 
            className="relative h-[500px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 via-background to-muted/30 border-2 border-primary/10"
            onMouseMove={handleMouseMove}
        >
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.6 }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            {/* Gradient mesh overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-accent/5 animate-pulse-slow" />

            {/* Central badge with 3D effect */}
            <div className="relative z-20 flex items-center justify-center" style={{ perspective: '1000px' }}>
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full bg-primary/5 animate-pulse-ring" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-accent/5 animate-pulse-ring" style={{ animationDelay: '1s' }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse-ring" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Main badge */}
                    <div className="relative z-30 flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent shadow-2xl shadow-primary/50 border-4 border-primary/20 animate-3d-rotate cursor-pointer hover:scale-110 transition-transform duration-300">
                        <ShieldCheck className="w-16 h-16 text-primary-foreground" />
                        
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 animate-shine" />
                    </div>
                </div>
            </div>

            {/* Feature orbs positioned around center */}
            <FeatureOrb 
                icon={FileCode} 
                position="top-20 left-1/4" 
                delay={0}
                label="Submit Evidence"
            />
            <FeatureOrb 
                icon={Cpu} 
                position="top-20 right-1/4" 
                delay={0.8}
                label="AI Analysis"
            />
            <FeatureOrb 
                icon={QrCode} 
                position="bottom-20 left-1/4" 
                delay={1.6}
                label="QR Verify"
            />
            <FeatureOrb 
                icon={Gem} 
                position="bottom-20 right-1/4" 
                delay={2.4}
                label="Mint NFT"
            />
            <FeatureOrb 
                icon={Share2} 
                position="top-1/2 left-10 -translate-y-1/2" 
                delay={3.2}
                label="Share Skills"
            />

            {/* Floating text labels */}
            <div className="absolute top-10 left-10 text-sm font-medium text-muted-foreground/50 animate-float">
                Blockchain Verified
            </div>
            <div className="absolute bottom-10 right-10 text-sm font-medium text-muted-foreground/50 animate-float" style={{ animationDelay: '1s' }}>
                AI Powered
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

            <style jsx>{`
                .bg-grid-pattern {
                    background-image:
                        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
                    background-size: 40px 40px;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes pulse-glow {
                    0%, 100% { transform: scale(0.8); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 0.6; }
                }
                .animate-pulse-glow {
                    animation: pulse-glow 3s ease-in-out infinite;
                }

                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                @keyframes pulse-ring {
                    0%, 100% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1); opacity: 1; }
                }
                .animate-pulse-ring {
                    animation: pulse-ring 4s ease-in-out infinite;
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }

                @keyframes rotate-3d {
                    0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
                    25% { transform: rotateY(5deg) rotateX(5deg); }
                    50% { transform: rotateY(0deg) rotateX(10deg); }
                    75% { transform: rotateY(-5deg) rotateX(5deg); }
                }
                .animate-3d-rotate {
                    animation: rotate-3d 8s ease-in-out infinite;
                    transform-style: preserve-3d;
                }

                @keyframes shine {
                    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                }
                .animate-shine {
                    animation: shine 3s ease-in-out infinite;
                }

                @keyframes dash {
                    to { stroke-dashoffset: -20; }
                }
                .animate-dash {
                    animation: dash 1s linear infinite;
                }

                .bg-gradient-radial {
                    background: radial-gradient(circle at center, var(--tw-gradient-stops));
                }
            `}</style>
        </div>
    );
};

export default Web3Visual;
