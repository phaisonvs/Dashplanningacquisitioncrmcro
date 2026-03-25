import React from 'react';
import { Lock, Coins, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

export function FeaturesSlide() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-6xl tracking-tight text-white max-w-3xl">
            EASY TODAY, SMARTER TOMORROW.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-4 max-w-6xl">
          {/* Feature Card 1 */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Zero Hidden Fees</p>
                <p className="text-white/50 text-xs">Transparent pricing with no surprises</p>
              </div>
            </div>
          </div>

          {/* Feature Card 2 - with 3D coin visual */}
          <div className="bg-gradient-to-br from-green-950/40 via-neutral-900 to-neutral-900 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all group relative overflow-hidden">
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-green-500/20 rounded-full blur-sm" />
            <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-white/20 to-green-400/30 rounded-full blur-sm" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Instant Transfers</p>
                <p className="text-white/50 text-xs">Send money globally in seconds</p>
              </div>
            </div>
          </div>

          {/* Feature Card 3 - with lock icon */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-all group relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-400/20 to-transparent rounded-tl-full" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Premium Accounts</p>
                <p className="text-white/50 text-xs">Exclusive benefits for power users</p>
              </div>
            </div>
          </div>

          {/* Feature Card 4 - with coin icon */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">High-Yield Savings</p>
                <p className="text-white/50 text-xs">Earn competitive interest on deposits</p>
              </div>
            </div>
          </div>

          {/* Additional Feature Cards - Second Row */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Bank-Level Security</p>
                <p className="text-white/50 text-xs">Your assets are protected with enterprise security</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl p-6 border border-white/5 hover:border-green-500/30 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm mb-1">Real-time Analytics</p>
                <p className="text-white/50 text-xs">Track your portfolio performance live</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gradient-to-br from-green-950/30 to-neutral-900 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="flex items-center justify-between h-full">
              <div className="space-y-2">
                <p className="text-white">Multi-Currency Support</p>
                <p className="text-white/50 text-xs">Hold and exchange 150+ currencies seamlessly</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/30 to-green-500/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/60 text-sm">
          Built for everyone, from individuals to businesses.
        </div>
      </div>
    </div>
  );
}