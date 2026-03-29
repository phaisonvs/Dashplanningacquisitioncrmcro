import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

export function MarketSlide() {
  return (
    <div data-ui="legacy-mercado-slide" className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-green-500/5 to-transparent" />

      {/* Content Container */}
      <div data-ui="legacy-mercado-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-mercado-slide-cabecalho" className="space-y-2">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-green-400/90 text-sm tracking-wider uppercase">Market Opportunity</span>
          </div>
          <h2 className="text-5xl tracking-tight text-white">
            A MASSIVE & GROWING MARKET
          </h2>
        </div>

        {/* Main Content - Split Layout */}
        <div data-ui="legacy-mercado-slide-principal" className="grid grid-cols-2 gap-16">
          {/* Left Side - TAM SAM SOM */}
          <div data-ui="legacy-mercado-slide-tamanho" className="space-y-8">
            <div className="space-y-6">
              {/* TAM */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl text-white">$8.5T</span>
                  <span className="text-white/60">TAM</span>
                </div>
                <div className="w-full h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
                <p className="text-white/60 text-sm">Total Addressable Market - Global digital banking</p>
              </div>

              {/* SAM */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl text-white">$2.1T</span>
                  <span className="text-white/60">SAM</span>
                </div>
                <div className="w-4/5 h-4 bg-gradient-to-r from-green-400/80 to-green-500/80 rounded-full" />
                <p className="text-white/60 text-sm">Serviceable Addressable Market - Mobile-first banking</p>
              </div>

              {/* SOM */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl text-white">$180B</span>
                  <span className="text-white/60">SOM</span>
                </div>
                <div className="w-2/5 h-4 bg-gradient-to-r from-green-400/60 to-green-500/60 rounded-full" />
                <p className="text-white/60 text-sm">Serviceable Obtainable Market - Initial target segments</p>
              </div>
            </div>
          </div>

          {/* Right Side - Market Stats */}
          <div data-ui="legacy-mercado-slide-estatisticas" className="space-y-6">
            <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-white/60">Market Growth</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl text-green-400">23.4%</span>
                  <span className="text-white/60">CAGR</span>
                </div>
                <p className="text-white/50 text-sm">Projected annual growth through 2030</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900 rounded-xl p-6 border border-white/5">
                <p className="text-white/60 text-sm mb-2">Unbanked Population</p>
                <p className="text-3xl text-white">1.7B</p>
              </div>
              <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900 rounded-xl p-6 border border-white/5">
                <p className="text-white/60 text-sm mb-2">Smartphone Users</p>
                <p className="text-3xl text-white">6.8B</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-neutral-900/80 border border-green-500/20 rounded-xl p-6">
              <p className="text-white text-sm mb-2">Cross-border payment volume expected to reach</p>
              <p className="text-4xl text-green-400">$250T</p>
              <p className="text-white/50 text-sm mt-1">by 2027</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-mercado-slide-rodape" className="text-white/50 text-sm">
          Source: McKinsey Global Banking Report, World Bank Financial Inclusion Data
        </div>
      </div>
    </div>
  );
}
