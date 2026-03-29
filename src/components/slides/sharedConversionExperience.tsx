import { motion } from 'motion/react';
import { CLUSTERS, WHITE } from '../theme';
import { ImageViewer } from './ImageViewer';
import {
  DeckPill,
  DeckStatusPill,
  SlideEvidenceHeader,
  deckCardPresets,
  deckPillPresets,
  useDeckViewport,
} from './sharedDeckTypography';

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

const ObjectiveBlock = ({ text, compact = false }: { text: string; compact?: boolean }) => (
  <div
    /* Edita Bloco de Objetivo da Frente */
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
      style={deckCardPresets.surface(isCompact)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '16px' : '20px', padding: isCompact ? '20px' : '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', flexDirection: 'row', flexWrap: 'nowrap' }}>
          <div style={{ display: 'flex', minWidth: 0, flex: '1 1 auto', alignItems: 'flex-start', gap: isCompact ? '6px' : '8px', flexDirection: 'column' }}>
            <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 700, marginBottom: '0', lineHeight: 1.25 }}>
              {item.title}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {orderEvidenceTags(item.tags).map((tag) => (
                <DeckPill key={`${item.title}-${tag}`} label={tag} compact={isCompact} preset={deckPillPresets.conversionToken} />
              ))}
            </div>
          </div>
          <div style={{ alignSelf: 'flex-start' }}>
            <DeckStatusPill status={item.status} preset={deckPillPresets.statusTight} />
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
      /* Edita Secao de Experiencia de Conversao */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={deckCardPresets.section(isCompact)}
    >
      <SlideEvidenceHeader
        accentColor={CLUSTERS.CRO}
        title={title}
        subtitle={subtitle}
        badge={
          <DeckPill
            label="CRO"
            compact
            preset={deckPillPresets.conversionToken}
            style={{ padding: "5px 9px", letterSpacing: "0.1em", fontWeight: 700 }}
          />
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
