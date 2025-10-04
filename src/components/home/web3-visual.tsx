"use client";

import React from 'react';
import { FileCode, Cpu, ShieldCheck, QrCode, Share2, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeatureIcon = ({ icon: Icon, className, style }: { icon: React.ElementType, className?: string, style?: React.CSSProperties }) => (
    <div
        className={cn("absolute flex items-center justify-center w-16 h-16 bg-background rounded-full border shadow-lg", className)}
        style={style}
    >
        <Icon className="w-8 h-8 text-primary" />
    </div>
);

const Web3Visual = () => {
    return (
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-muted/50 group">
            <div className="absolute inset-0 z-20 bg-grid-pattern opacity-20" />
            
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>

                {/* Central Badge */}
                <div className="z-10 flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full animate-pulse-slow">
                    <div className="flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full animate-pulse-slower">
                        <FeatureIcon icon={ShieldCheck} className="w-20 h-20 !bg-primary/90 !shadow-2xl !shadow-primary/50 animate-badge-appear" />
                        <ShieldCheck className="absolute w-10 h-10 text-primary-foreground animate-badge-appear" style={{ animationDelay: '0.1s' }}/>
                    </div>
                </div>

                {/* Animated Lines */}
                <div className="absolute w-px h-[200px] bg-gradient-to-b from-transparent via-primary/50 to-transparent transform rotate-45 animate-line-expand" />
                <div className="absolute w-px h-[200px] bg-gradient-to-b from-transparent via-primary/50 to-transparent transform -rotate-45 animate-line-expand" style={{animationDelay: '0.2s'}}/>
                <div className="absolute w-[200px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-line-expand" style={{animationDelay: '0.4s'}}/>

                {/* Surrounding Feature Icons */}
                <FeatureIcon icon={FileCode} className="animate-feature-1" />
                <FeatureIcon icon={Cpu} className="animate-feature-2" />
                <FeatureIcon icon={QrCode} className="animate-feature-3" />
                <FeatureIcon icon={Gem} className="animate-feature-4" />
                <FeatureIcon icon={Share2} className="animate-feature-5" />

            </div>
             <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background" />

            <style jsx>{`
                .bg-grid-pattern {
                    background-image:
                        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .animate-pulse-slow {
                    animation: pulse 4s infinite ease-in-out;
                }
                .animate-pulse-slower {
                    animation: pulse 5s infinite ease-in-out;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                }

                @keyframes line-expand {
                    0% { transform: scale(0) rotate(var(--angle, 0deg)); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: scale(1.5) rotate(var(--angle, 0deg)); opacity: 0; }
                }
                .animate-line-expand {
                    animation: line-expand 4s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
                }

                @keyframes badge-appear {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-badge-appear {
                    animation: badge-appear 0.8s 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) both;
                }
                
                @keyframes feature-path {
                    0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                    25% { opacity: 1; }
                    75% { opacity: 1; }
                    100% { transform: var(--transform-end); opacity: 0; }
                }

                .animate-feature-1 { --transform-end: translate(-120px, -120px) scale(1); animation: feature-path 6s infinite ease-in-out; animation-delay: 0s; }
                .animate-feature-2 { --transform-end: translate(120px, -120px) scale(1); animation: feature-path 6s infinite ease-in-out; animation-delay: 1s; }
                .animate-feature-3 { --transform-end: translate(150px, 0px) scale(1); animation: feature-path 6s infinite ease-in-out; animation-delay: 2s; }
                .animate-feature-4 { --transform-end: translate(120px, 120px) scale(1); animation: feature-path 6s infinite ease-in-out; animation-delay: 3s; }
                .animate-feature-5 { --transform-end: translate(-120px, 120px) scale(1); animation: feature-path 6s infinite ease-in-out; animation-delay: 4s; }
            `}</style>
        </div>
    );
};

export default Web3Visual;
