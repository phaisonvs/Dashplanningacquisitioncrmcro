import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export function ProblemSlide() {
  return (
    <div data-ui="legacy-problema-slide" className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
      
      {/* Content Container */}
      <div data-ui="legacy-problema-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-problema-slide-cabecalho" className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <span className="text-red-400/90 text-sm tracking-wider uppercase">The Problem</span>
        </div>

        {/* Main Content */}
        <div data-ui="legacy-problema-slide-principal" className="grid grid-cols-2 gap-16">
          {/* Left Side - Title */}
          <div className="space-y-8">
            <h2 className="text-6xl tracking-tight text-white">
              TRADITIONAL<br />
              BANKING IS<br />
              BROKEN
            </h2>
            <p className="text-white/60 text-lg">
              Millions face barriers that prevent them from accessing essential financial services.
            </p>
          </div>

          {/* Right Side - Problems Grid */}
          <div data-ui="legacy-problema-slide-cards" className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 border border-red-500/20 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white">High Fees</p>
              <p className="text-white/50 text-sm">Average 3-5% on international transfers</p>
            </div>

            <div className="bg-neutral-800/50 border border-red-500/20 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white">Slow Processing</p>
              <p className="text-white/50 text-sm">3-5 days for cross-border payments</p>
            </div>

            <div className="bg-neutral-800/50 border border-red-500/20 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white">Limited Access</p>
              <p className="text-white/50 text-sm">1.7B adults remain unbanked</p>
            </div>

            <div className="bg-neutral-800/50 border border-red-500/20 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white">Poor Experience</p>
              <p className="text-white/50 text-sm">Complex processes and outdated tech</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-problema-slide-rodape" className="text-white/40 text-sm">
          These challenges create friction in the global economy
        </div>
      </div>
    </div>
  );
}
