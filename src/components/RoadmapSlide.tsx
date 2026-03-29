import React from 'react';
import { Calendar, CheckCircle2, Circle, Target } from 'lucide-react';

export function RoadmapSlide() {
  return (
    <div data-ui="legacy-roadmap-slide" className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div data-ui="legacy-roadmap-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-roadmap-slide-cabecalho" className="space-y-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-green-400" />
            <span className="text-green-400/90 text-sm tracking-wider uppercase">Product Roadmap</span>
          </div>
          <h2 className="text-5xl tracking-tight text-white">
            OUR PATH TO MARKET LEADERSHIP
          </h2>
        </div>

        {/* Timeline */}
        <div data-ui="legacy-roadmap-slide-cronograma" className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-400/50 to-white/20" />

          {/* Timeline items */}
          <div data-ui="legacy-roadmap-slide-itens" className="grid grid-cols-4 gap-8 relative">
            {/* Q1 2024 */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-neutral-900">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-green-400 text-sm mb-2">Q1 2024</span>
                <h3 className="text-white text-center mb-3">MVP Launch</h3>
              </div>
              <div className="bg-gradient-to-br from-green-900/40 to-neutral-900/60 border border-green-500/30 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Core banking features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Mobile app release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>10K users onboarded</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Q2-Q3 2024 */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-neutral-900">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <span className="text-green-400 text-sm mb-2">Q2-Q3 2024</span>
                <h3 className="text-white text-center mb-3">Scale & Expand</h3>
              </div>
              <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900 border border-white/20 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Multi-currency support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Instant transfers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>100K users milestone</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Q4 2024 */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/80 to-green-600/80 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-neutral-900">
                  <Circle className="w-8 h-8 text-white fill-white" />
                </div>
                <span className="text-white/60 text-sm mb-2">Q4 2024</span>
                <h3 className="text-white text-center mb-3">Premium Launch</h3>
              </div>
              <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900 border border-white/10 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <span>Premium subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <span>Virtual card issuance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2025 */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-neutral-900">
                  <Target className="w-8 h-8 text-white/60" />
                </div>
                <span className="text-white/40 text-sm mb-2">2025</span>
                <h3 className="text-white/80 text-center mb-3">Global Expansion</h3>
              </div>
              <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/60 border border-white/5 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                    <span>Launch in 50+ countries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                    <span>Business accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                    <span>1M+ users target</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-roadmap-slide-rodape" className="flex items-center gap-2 text-white/70">
          <div className="w-1 h-1 bg-green-400 rounded-full" />
          <span className="text-sm tracking-wide">Pocketswap</span>
        </div>
      </div>
    </div>
  );
}
