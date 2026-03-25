import React from 'react';

export function BarriersSlide() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/5 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Top Section - Cards Preview */}
        <div className="flex gap-4 justify-center items-start">
          <div className="w-48 h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg p-6 border border-white/5">
            <p className="text-white/90 text-sm mb-1">Hidden</p>
            <p className="text-white/90 text-sm">Fees</p>
            <p className="text-white/40 text-xs mt-2">Traditional banks charge...</p>
          </div>
          <div className="w-48 h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg p-6 border border-white/5">
            <p className="text-white/90 text-sm mb-1">Limited</p>
            <p className="text-white/90 text-sm">Access</p>
            <p className="text-white/40 text-xs mt-2">Millions remain unbanked...</p>
          </div>
          <div className="w-48 h-32 bg-gradient-to-br from-green-900/40 to-green-950/40 rounded-lg p-6 border border-green-500/20">
            <p className="text-white/90 text-sm mb-1">Slow</p>
            <p className="text-white/90 text-sm">Transfers</p>
            <p className="text-green-400/60 text-xs mt-2">Days for international...</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <h2 className="text-6xl tracking-tight text-white max-w-xl">
            BARRIERS TO<br />
            MODERN BANKING
          </h2>

          {/* Statistics */}
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <div className="flex items-end gap-4">
                <div className="flex-1 h-3 bg-green-400 rounded-full" style={{ width: '90%' }} />
                <span className="text-5xl text-white">1.7B</span>
              </div>
              <p className="text-white/60 text-sm">
                Adults remain unbanked<br />
                globally, lacking access to basic services.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-end gap-4">
                <div className="flex-1 h-3 bg-white/20 rounded-full" style={{ width: '10%' }} />
                <span className="text-5xl text-white/40">$200B</span>
              </div>
              <p className="text-white/60 text-sm">
                Lost annually in hidden fees<br />
                and inefficient transfers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-white/50 text-sm max-w-md">
          <p>Current state of global banking.</p>
          <p className="mt-2">A massive opportunity for innovation...</p>
        </div>
      </div>
    </div>
  );
}