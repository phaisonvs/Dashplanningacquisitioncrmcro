import { motion } from 'motion/react';
import { BG, CLUSTERS } from '../theme';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import coverBg from 'figma:asset/d372e1a58f8718b3849de8fc442cde0f366adde8.png';

interface Props { isActive: boolean }

const coverTokens = [
  { label: 'ACQUISITION', color: CLUSTERS.ACQUISITION },
  { label: 'CRO', color: CLUSTERS.CRO },
  { label: 'CRM', color: CLUSTERS.CRM },
];

const TokenPill = ({
  label,
  color,
  compact = false,
}: {
  label: string;
  color: string;
  compact?: boolean;
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: compact ? '5px 10px' : '14px 22px',
      borderRadius: compact ? '999px' : '16px',
      border: `1px solid ${color}66`,
      background: `${color}10`,
      color,
      fontSize: compact ? 'var(--text-chip)' : 'var(--text-section)',
      fontWeight: 800,
      letterSpacing: compact ? '0.1em' : '0.12em',
      lineHeight: 1,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      boxShadow: compact ? 'none' : `0 0 0 1px ${color}10 inset`,
    }}
  >
    {label}
  </span>
);

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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <ImageWithFallback
          src={coverBg}
          alt="Background Pattern"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to right, ${BG} 20%, transparent 100%)`,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          <span
            style={{
              color: 'rgba(255,255,255,0.42)',
              fontSize: 'var(--text-meta)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Planning Semanal
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            {coverTokens.map((token) => (
              <TokenPill key={`hero-${token.label}`} label={token.label} color={token.color} />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'var(--text-body-lg)',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginTop: '32px',
            fontWeight: 300,
          }}
        >
          Revisão executiva consolidada. Foco em performance, eficiência de funil, saúde do e-commerce e próximos passos estratégicos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '80px' }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 'var(--text-meta)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Semana 13 · 23 Mar — 27 Mar 2026
          </span>
        </motion.div>
      </div>
    </div>
  );
}

