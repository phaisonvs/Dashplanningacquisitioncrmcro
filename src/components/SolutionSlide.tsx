import React from 'react';
import { CheckCircle2, Smartphone, Globe, Shield } from 'lucide-react';

export function SolutionSlide() {
  return (
    <div data-ui="legacy-solucao-slide" className="relative w-full h-full bg-gradient-to-br from-green-950/20 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
      
      {/* Content Container */}
      <div data-ui="legacy-solucao-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-solucao-slide-cabecalho" className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
          <span className="text-green-400/90 text-sm tracking-wider uppercase">Our Solution</span>
        </div>

        {/* Main Content - Centered */}
        <div data-ui="legacy-solucao-slide-principal" className="flex items-center justify-center">
          <div className="max-w-5xl space-y-16">
            {/* Title */}
            <div data-ui="legacy-solucao-slide-titulo" className="text-center space-y-4">
              <h2 className="text-6xl tracking-tight text-white">
                A MODERN BANKING<br />
                PLATFORM FOR EVERYONE
              </h2>
              <p className="text-green-400/90 text-lg">
                Simple, fast, and accessible financial services
              </p>
            </div>

            {/* Solution Pillars */}
            <div data-ui="legacy-solucao-slide-pilares" className="grid grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl">Mobile First</h3>
                <p className="text-white/60 text-sm">
                  Access your finances anywhere, anytime with our intuitive mobile app
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900/40 to-neutral-900/80 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 space-y-4 text-center transform scale-105">
                <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl">Global Reach</h3>
                <p className="text-white/60 text-sm">
                  Send and receive money across borders instantly with low fees
                </p>
              </div>

              <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 space-y-4 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl">Secure</h3>
                <p className="text-white/60 text-sm">
                  Bank-grade security with advanced encryption and fraud protection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-solucao-slide-rodape" className="flex items-center gap-2 text-white/70">
          <div className="w-1 h-1 bg-green-400 rounded-full" />
          <span className="text-sm tracking-wide">Pocketswap</span>
        </div>
      </div>
    </div>
  );
}
