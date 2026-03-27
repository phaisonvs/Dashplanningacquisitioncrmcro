import { motion } from 'motion/react';
import { CLUSTERS, WHITE } from '../theme';
import { ImageViewer } from './ImageViewer';
import { SlideSectionHeader, SLIDE_META_WEIGHT } from './sharedDeckTypography';

export type ConversionExperienceItem = {
  title: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE'>;
  status: 'feito' | 'pendente' | 'bloqueado';
  objective: string;
  desktopImage?: string;
  mobileImage?: string;
  imageLabel: string;
  imageHeight?: number;
};

type ConversionExperienceSectionProps = {
  items: ConversionExperienceItem[];
  title?: string;
  subtitle?: string;
  badges?: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE'>;
};

const tokenStyle = (tag: ConversionExperienceItem['tags'][number]) => {
  switch (tag) {
    case 'LEADS':
      return { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.08)', border: 'rgba(125, 211, 252, 0.22)' };
    case 'ACQUISITION':
      return { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.22)' };
    case 'CRO':
      return { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.22)' };
    case 'CRM':
      return { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.22)' };
    case 'E-COMMERCE':
      return { color: CLUSTERS.ECOMMERCE, background: 'rgba(252, 165, 165, 0.08)', border: 'rgba(252, 165, 165, 0.22)' };
    default:
      return { color: 'rgba(255,255,255,0.72)', background: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' };
  }
};

const TokenTag = ({ label }: { label: ConversionExperienceItem['tags'][number] }) => {
  const palette = tokenStyle(label);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.09em',
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

const StatusPill = ({ status }: { status: ConversionExperienceItem['status'] }) => {
  const palette = {
    feito: { label: 'Feito', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.08)', border: 'rgba(74, 222, 128, 0.18)' },
    pendente: { label: 'Pendente', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.08)', border: 'rgba(251, 191, 36, 0.18)' },
    bloqueado: { label: 'Bloqueado', color: '#F87171', background: 'rgba(248, 113, 113, 0.08)', border: 'rgba(248, 113, 113, 0.18)' },
  }[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 8px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '999px', background: palette.color, flexShrink: 0 }} />
      {palette.label}
    </span>
  );
};

const ObjectiveBlock = ({ text }: { text: string }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.018)',
      padding: '22px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div
      style={{
        color: WHITE,
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div style={{ width: '3px', height: '12px', background: CLUSTERS.CRO, borderRadius: '2px' }} />
      Objetivo da frente
    </div>
    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: 1.65, fontWeight: 300 }}>
      {text}
    </div>
  </div>
);

const EvidenceCard = ({ item }: { item: ConversionExperienceItem }) => {
  const desktopImage = item.desktopImage ?? item.mobileImage;
  const mobileImage = item.mobileImage ?? item.desktopImage;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        background: 'rgba(255,255,255,0.022)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '14px',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ color: WHITE, fontSize: '16px', fontWeight: 700, marginBottom: '0', lineHeight: 1.35 }}>
              {item.title}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.tags.map((tag) => (
                <TokenTag key={`${item.title}-${tag}`} label={tag} />
              ))}
            </div>
          </div>
          <StatusPill status={item.status} />
        </div>

        <ImageViewer
          id={item.title}
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          alt={item.title}
          height={item.imageHeight ?? 240}
          label={item.imageLabel}
          fullWidth
        />

        <ObjectiveBlock text={item.objective} />
      </div>
    </motion.article>
  );
};

export function ConversionExperienceSection({
  items,
  title = 'Conversão & Experiência',
  subtitle,
  badges = ['CRO'],
}: ConversionExperienceSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '18px',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
      }}
    >
      <SlideSectionHeader
        accentColor={CLUSTERS.CRO}
        title={title}
        subtitle={subtitle}
        right={
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {badges.map((badge) => {
              const palette = tokenStyle(badge as ConversionExperienceItem['tags'][number]);
              return (
                <span
                  key={badge}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    border: `1px solid ${palette.border}`,
                    background: palette.background,
                    color: palette.color,
                    fontSize: '10px',
                    fontWeight: SLIDE_META_WEIGHT,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '22px' }}>
        {items.map((item) => (
          <EvidenceCard key={item.title} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
