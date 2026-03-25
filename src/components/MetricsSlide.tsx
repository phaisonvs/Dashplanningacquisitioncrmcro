import React from 'react';
import { TrendingUp, Users, DollarSign, Globe } from 'lucide-react';

export function MetricsSlide() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-green-950/30 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-green-400/10 to-transparent blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-5xl tracking-tight text-white max-w-2xl">
            BANKING MADE SIMPLE,<br />
            IN DEMAND
          </h2>
          <p className="text-white/60">
            Our platform is growing rapidly across global markets
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl">
          {/* Metric 1 - Users */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/60">Total Users</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl text-green-400">260M</span>
                <div className="flex items-center gap-1 text-green-400 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+23%</span>
                </div>
              </div>
              <p className="text-white/50 text-sm">Active monthly users worldwide</p>
            </div>
          </div>

          {/* Metric 2 - Volume */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/60">Trading Volume</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl text-white">53M</span>
                <div className="flex items-center gap-1 text-green-400 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+45%</span>
                </div>
              </div>
              <p className="text-white/50 text-sm">Daily trading volume in USD</p>
            </div>
          </div>

          {/* Metric 3 - Countries */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/60">Global Reach</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl text-white">150+</span>
              </div>
              <p className="text-white/50 text-sm">Countries with active users</p>
            </div>
          </div>

          {/* Metric 4 - Transactions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/60">Transactions</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl text-white">2.4B</span>
              </div>
              <p className="text-white/50 text-sm">Total transactions processed</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <p className="text-white/60 text-sm max-w-md">
            Trusted by millions of users globally, powering the future of modern banking.
          </p>
          <div className="flex items-center gap-2 text-white/70">
            <div className="w-1 h-1 bg-green-400 rounded-full" />
            <span className="text-sm tracking-wide">Pocketswap</span>
          </div>
        </div>
      </div>
    </div>
  );
}