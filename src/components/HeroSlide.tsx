import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSlide() {
  return (
    <div data-ui="legacy-hero-slide" className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-green-950 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-green-400/20 rounded-full blur-3xl" />
      
      {/* 3D Coin Elements */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-green-300/40 to-green-500/20 rounded-full blur-sm transform rotate-45" />
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-white/30 to-green-400/30 rounded-full blur-sm" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-green-200/30 to-white/20 rounded-full blur-sm transform -rotate-12" />

      {/* Content Container */}
      <div data-ui="legacy-hero-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-hero-slide-cabecalho" className="flex items-center gap-2 text-white/70">
          <div className="w-1 h-1 bg-green-400 rounded-full" />
          <span className="text-sm tracking-wide">Pocketswap</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-7xl tracking-tight text-white">
              FINANCE<br />
              WITHOUT BORDERS
            </h1>
            <p className="text-green-400/90 text-sm tracking-wider uppercase">
              Powered by Innovation
            </p>
          </div>

          <div className="flex items-center gap-3 text-white/80 group cursor-pointer">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div>
              <p className="text-sm">Seamless access to</p>
              <p className="text-green-400">global banking, simplified for everyone.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-hero-slide-rodape" className="flex items-center gap-2 text-white/70">
          <div className="w-1 h-1 bg-green-400 rounded-full" />
          <span className="text-sm tracking-wide">Pocketswap</span>
        </div>
      </div>

      {/* Pitch Deck Label */}
      <div className="absolute top-16 right-16 text-white/40 text-sm tracking-wide">
        Pitch Deck
      </div>
    </div>
  );
}
