import { motion } from 'motion/react';
import { CLUSTERS, WHITE } from '../theme';
import { ImageViewer } from './ImageViewer';
import { SlideEvidenceHeader, useDeckViewport } from './sharedDeckTypography';

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
};

type EvidenceTag = ConversionExperienceItem['tags'][number];
const EVIDENCE_TAG_ORDER: EvidenceTag[] = ['CRO', 'ACQUISITION', 'LEADS', 'CRM', 'E-COMMERCE'];

const orderEvidenceTags = (tags: ConversionExperienceItem['tags']) =>
  [...tags].sort((left, right) => EVIDENCE_TAG_ORDER.indexOf(left) - EVIDENCE_TAG_ORDER.indexOf(right));

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

const TokenTag = ({ label, compact = false }: { label: ConversionExperienceItem['tags'][number]; compact?: boolean }) => {
  const palette = tokenStyle(label);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        maxWidth: '100%',
        alignSelf: 'flex-start',
        flex: '0 0 auto',
        padding: compact ? '4px 8px' : '4px 9px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-chip)',
        fontWeight: 700,
        letterSpacing: compact ? '0.07em' : '0.08em',
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
        width: 'fit-content',
        maxWidth: '100%',
        alignSelf: 'flex-start',
        flex: '0 0 auto',
        padding: '3px 8px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-chip)',
        fontWeight: 700,
        letterSpacing: '0.07em',
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

const ObjectiveBlock = ({ text, compact = false }: { text: string; compact?: boolean }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.018)',
      padding: compact ? '16px' : '18px',
      borderRadius: '14px',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div
      style={{
        color: WHITE,
        fontSize: 'var(--text-meta)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: compact ? '8px' : '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <div style={{ width: '3px', height: '10px', background: CLUSTERS.CRO, borderRadius: '999px' }} />
      Objetivo da frente
    </div>
    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'var(--text-body)', lineHeight: 1.5, fontWeight: 300 }}>
      {text}
    </div>
  </div>
);

const EvidenceCard = ({ item }: { item: ConversionExperienceItem }) => {
  const desktopImage = item.desktopImage ?? item.mobileImage;
  const mobileImage = item.mobileImage ?? item.desktopImage;
  const { isCompact } = useDeckViewport();

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '16px' : '20px', padding: isCompact ? '20px' : '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', flexDirection: 'row', flexWrap: 'nowrap' }}>
          <div style={{ display: 'flex', minWidth: 0, flex: '1 1 auto', alignItems: 'flex-start', gap: isCompact ? '6px' : '8px', flexDirection: 'column' }}>
            <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 700, marginBottom: '0', lineHeight: 1.25 }}>
              {item.title}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {orderEvidenceTags(item.tags).map((tag) => (
                <TokenTag key={`${item.title}-${tag}`} label={tag} compact={isCompact} />
              ))}
            </div>
          </div>
          <div style={{ alignSelf: 'flex-start' }}>
            <StatusPill status={item.status} />
          </div>
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

        <ObjectiveBlock text={item.objective} compact={isCompact} />
      </div>
    </motion.article>
  );
};

export function ConversionExperienceSection({
  items,
  title = 'Conversão & Experiência',
  subtitle = 'Leitura visual das peças e frentes que alimentam conversão e experiência.',
}: ConversionExperienceSectionProps) {
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '18px',
        padding: isCompact ? '18px' : '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? '24px' : '32px',
      }}
    >
      <SlideEvidenceHeader
        accentColor={CLUSTERS.CRO}
        title={title}
        subtitle={subtitle}
        badge={
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '5px 9px',
              borderRadius: '999px',
              border: `1px solid ${tokenStyle('CRO').border}`,
              background: tokenStyle('CRO').background,
              color: tokenStyle('CRO').color,
              fontSize: 'var(--text-chip)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            CRO
          </span>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isCompact ? '16px' : '22px' }}>
        {items.map((item) => (
          <EvidenceCard key={item.title} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
