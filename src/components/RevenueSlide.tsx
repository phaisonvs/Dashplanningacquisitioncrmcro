import React from 'react';
import { PieChart, CreditCard, Users, Repeat, Sparkles } from 'lucide-react';

export function RevenueSlide() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-green-950/20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-green-500/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <PieChart className="w-6 h-6 text-green-400" />
            <span className="text-green-400/90 text-sm tracking-wider uppercase">Revenue Model</span>
          </div>
          <h2 className="text-5xl tracking-tight text-white">
            MULTIPLE REVENUE STREAMS
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-12">
          {/* Revenue Streams */}
          <div className="space-y-4">
            {/* Stream 1 */}
            <div className="bg-gradient-to-r from-green-900/40 to-neutral-900/60 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white">Transaction Fees</p>
                    <p className="text-white/50 text-xs">0.5% per transaction</p>
                  </div>
                </div>
                <span className="text-2xl text-green-400">45%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Stream 2 */}
            <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white">Premium Subscriptions</p>
                    <p className="text-white/50 text-xs">$9.99/month</p>
                  </div>
                </div>
                <span className="text-2xl text-white">30%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400/80 to-green-500/80 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            {/* Stream 3 */}
            <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white">Interchange Revenue</p>
                    <p className="text-white/50 text-xs">Card transactions</p>
                  </div>
                </div>
                <span className="text-2xl text-white">15%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400/60 to-green-500/60 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            {/* Stream 4 */}
            <div className="bg-neutral-800/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white">Value-Added Services</p>
                    <p className="text-white/50 text-xs">Insurance, loans, etc.</p>
                  </div>
                </div>
                <span className="text-2xl text-white">10%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400/40 to-green-500/40 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          {/* Right Side - Projections */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900 border border-white/10 rounded-xl p-8">
              <p className="text-white/60 text-sm mb-6">5-Year Revenue Projection</p>
              
              {/* Year projections */}
              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-white/40 text-xs">Year 1</p>
                    <div className="h-8 bg-green-500/20 rounded" style={{ width: '20%' }} />
                  </div>
                  <span className="text-white text-sm pb-1">$5M</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-white/40 text-xs">Year 2</p>
                    <div className="h-8 bg-green-500/30 rounded" style={{ width: '40%' }} />
                  </div>
                  <span className="text-white text-sm pb-1">$18M</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-white/40 text-xs">Year 3</p>
                    <div className="h-8 bg-green-500/50 rounded" style={{ width: '65%' }} />
                  </div>
                  <span className="text-white text-sm pb-1">$45M</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-white/40 text-xs">Year 4</p>
                    <div className="h-8 bg-green-500/70 rounded" style={{ width: '85%' }} />
                  </div>
                  <span className="text-white text-sm pb-1">$92M</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-white/40 text-xs">Year 5</p>
                    <div className="h-8 bg-green-400 rounded" style={{ width: '100%' }} />
                  </div>
                  <span className="text-green-400 pb-1">$180M</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-neutral-900 border border-green-500/20 rounded-xl p-8">
              <p className="text-white/60 text-sm mb-3">Customer Acquisition Cost</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-white">$12</span>
                <span className="text-white/60">per user</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">Lifetime Value</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-green-400">$420</span>
                  <span className="text-white/60 text-sm">LTV:CAC ratio of 35:1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/50 text-sm">
          Conservative projections based on current user growth trends
        </div>
      </div>
    </div>
  );
}
