import React from 'react';
import { ArrowRight, Mail, Globe, Phone, Twitter, Linkedin } from 'lucide-react';

export function ContactSlide() {
  return (
    <div data-ui="legacy-contato-slide" className="relative w-full h-full bg-gradient-to-br from-neutral-950 via-green-950/40 to-neutral-900 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-500/20 to-transparent blur-3xl" />
      <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-green-400/10 blur-3xl" />

      {/* Content Container */}
      <div data-ui="legacy-contato-slide-conteudo" className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header */}
        <div data-ui="legacy-contato-slide-cabecalho" className="text-white/40 text-sm tracking-wide">
          Pitch Deck
        </div>

        {/* Main Content */}
        <div data-ui="legacy-contato-slide-principal" className="space-y-12 max-w-3xl">
          <div className="space-y-4">
            <h2 className="text-6xl tracking-tight text-white">
              BANKING MADE SIMPLE,<br />
              IN DEMAND
            </h2>
            <p className="text-green-400/90 text-sm tracking-wider uppercase">
              Powered by Innovation
            </p>
          </div>

          {/* Value Proposition */}
          <div data-ui="legacy-contato-slide-proposta" className="flex items-start gap-3 text-white/80 group cursor-pointer max-w-xl">
            <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            <div>
              <p className="text-white/70 text-sm">Our business model combines</p>
              <p className="text-green-400">
                <span className="text-white">transparent fees</span>, <span className="text-white">premium services</span>, and <span className="text-white">value-added products</span>.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div data-ui="legacy-contato-slide-contatos" className="grid grid-cols-2 gap-8 max-w-2xl">
            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white/60 text-sm">Address</span>
              </div>
              <p className="text-white pl-10">123 Innovation Street, Singapore</p>
            </div>

            {/* Website */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white/60 text-sm">Website</span>
              </div>
              <p className="text-white pl-10">www.pocketswap.com</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white/60 text-sm">Phone</span>
              </div>
              <p className="text-white pl-10">+65 1234 5678</p>
            </div>

            {/* Social */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">Social</span>
              </div>
              <div className="flex gap-2 pl-0">
                <button className="w-10 h-10 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4 text-green-400" />
                </button>
                <button className="w-10 h-10 bg-green-500/20 hover:bg-green-500/30 rounded flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4 text-green-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div data-ui="legacy-contato-slide-rodape" className="flex items-center gap-2 text-white/70">
          <div className="w-1 h-1 bg-green-400 rounded-full" />
          <span className="text-sm tracking-wide">Pocketswap</span>
        </div>
      </div>
    </div>
  );
}
