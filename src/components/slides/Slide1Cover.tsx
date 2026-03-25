import { motion } from 'motion/react';
import { YELLOW, BG } from '../theme';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import coverBg from 'figma:asset/d372e1a58f8718b3849de8fc442cde0f366adde8.png';

interface Props { isActive: boolean }

export function Slide1Cover({ isActive }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(40px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with opacity */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.15,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <ImageWithFallback 
          src={coverBg} 
          alt="Background Pattern" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {/* Gradient overlay to blend with bg */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `linear-gradient(to right, ${BG} 20%, transparent 100%)`
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Top minimal tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Planning
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: '#FFF', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
            [ Acquisition | CRM | CRO ]
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ 
            color: 'rgba(255,255,255,0.5)', 
            fontSize: '20px', 
            maxWidth: '540px', 
            lineHeight: 1.6, 
            marginTop: '32px', 
            fontWeight: 300 
          }}
        >
          Revisão executiva consolidada. Foco em performance, eficiência de funil, saúde do e-commerce e próximos passos estratégicos.
        </motion.p>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '80px' }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
            ESTRATÉGIA Q1 2026
          </span>
        </motion.div>
      </div>
    </div>
  );
}
