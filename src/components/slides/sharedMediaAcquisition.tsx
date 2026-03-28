import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio';
import { CLUSTERS, WHITE } from '../theme';
import { SlideEvidenceHeader, useDeckViewport } from './sharedDeckTypography';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';

export type Status = 'feito' | 'pendente' | 'bloqueado';

type StatusItem = {
  status: Status;
};

export type MediaAsset = {
  src: string;
  alt?: string;
  aspectRatio?: number;
  formatLabel?: string;
};

type MediaAssetInput = string | MediaAsset | null | undefined;

export type MediaAcquisitionItem = {
  title: string;
  description: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE'>;
  status: Status;
  media: Array<MediaAsset | null>;
  accent: string;
  badgeLabel?: string;
};

const normalizeMediaAsset = (source: MediaAssetInput): MediaAsset | null => {
  if (!source) {
    return null;
  }

  if (typeof source === 'string') {
    const src = source.trim();
    return src ? { src } : null;
  }

  const src = source.src.trim();
  if (!src) {
    return null;
  }

  return {
    ...source,
    src,
  };
};

export const mediaSlots = (...sources: MediaAssetInput[]): Array<MediaAsset | null> => sources.map(normalizeMediaAsset);

export const mediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: 'Facebook Feed - Semana do Consumidor',
    description: 'Feed quadrado para mídia paga com leitura direta, oferta sazonal e foco em alcance qualificado.',
    tags: ['LEADS', 'ACQUISITION'],
    status: 'feito',
    media: mediaSlots({
      src: lpSemanaConsumidorImg,
      alt: 'Facebook Feed - Semana do Consumidor',
      aspectRatio: 1,
      formatLabel: 'Feed 1:1',
    }),
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'Feed',
  },
  {
    title: 'Hero Feed - Conversão',
    description: 'Peça quadrada para reforçar hierarquia visual e credibilidade no topo do funil.',
    tags: ['CRO', 'ACQUISITION'],
    status: 'feito',
    media: mediaSlots({
      src: heroDesktopImg,
      alt: 'Hero Feed - Conversão',
      aspectRatio: 1,
      formatLabel: 'Feed 1:1',
    }),
    accent: CLUSTERS.CRO,
    badgeLabel: 'Feed',
  },
  {
    title: 'Remarketing Feed - Oferta Relâmpago',
    description: 'Criativo quadrado de remarketing para reforçar urgência comercial e reduzir dispersão.',
    tags: ['ACQUISITION', 'CRM'],
    status: 'pendente',
    media: mediaSlots({
      src: lpChanceUnicaImg,
      alt: 'Remarketing Feed - Oferta Relâmpago',
      aspectRatio: 1,
      formatLabel: 'Feed 1:1',
    }),
    accent: CLUSTERS.CRM,
    badgeLabel: 'Feed',
  },
  {
    title: 'Instagram Story - Chance Única',
    description: 'Story vertical com urgência, prova de valor e CTA rápido para absorver intenção alta.',
    tags: ['ACQUISITION', 'CRO'],
    status: 'pendente',
    media: mediaSlots({
      src: lpChanceUnicaMobileImg,
      alt: 'Instagram Story - Chance Única',
      aspectRatio: 9 / 16,
      formatLabel: 'Story 9:16',
    }),
    accent: CLUSTERS.CRO,
    badgeLabel: 'Story',
  },
  {
    title: 'Instagram Story - WhatsApp & Captura',
    description: 'Story vertical para contato assistido e captura com menos fricção.',
    tags: ['CRM', 'LEADS'],
    status: 'feito',
    media: mediaSlots({
      src: heroMobileImg,
      alt: 'Instagram Story - WhatsApp & Captura',
      aspectRatio: 9 / 16,
      formatLabel: 'Story 9:16',
    }),
    accent: CLUSTERS.CRM,
    badgeLabel: 'Story',
  },
  {
    title: 'Instagram Feed - Semana do Consumidor',
    description: 'Peça de feed adicional para fechar a sequência da galeria com variação de mensagem e formato.',
    tags: ['LEADS', 'CRO'],
    status: 'feito',
    media: mediaSlots({
      src: lpSemanaConsumidorMobileImg,
      alt: 'Instagram Feed - Semana do Consumidor',
      aspectRatio: 1,
      formatLabel: 'Feed 1:1',
    }),
    accent: CLUSTERS.LEADS,
    badgeLabel: 'Feed',
  },
];

export const collectStatusCounts = (...groups: ReadonlyArray<ReadonlyArray<StatusItem>>) =>
  groups.reduce(
    (acc, group) => {
      group.forEach((item) => {
        acc[item.status] += 1;
      });
      return acc;
    },
    { feito: 0, pendente: 0, bloqueado: 0 } as Record<Status, number>,
  );

type AspectRatioBucket = {
  label: '16:9' | '1:1' | '4:5' | '2:3';
  ratio: number;
};

type ResolvedMediaAspect = {
  ratio: number;
  label: string;
};

const CANONICAL_ASPECT_BUCKETS: AspectRatioBucket[] = [
  { label: '16:9', ratio: 16 / 9 },
  { label: '1:1', ratio: 1 },
  { label: '4:5', ratio: 4 / 5 },
  { label: '2:3', ratio: 2 / 3 },
];

const DISPLAY_ASPECT_BUCKETS: Array<{ label: string; ratio: number }> = [
  { label: '16:9', ratio: 16 / 9 },
  { label: '1:1', ratio: 1 },
  { label: '4:5', ratio: 4 / 5 },
  { label: '2:3', ratio: 2 / 3 },
  { label: '9:16', ratio: 9 / 16 },
];

const mediaAspectCache = new Map<string, ResolvedMediaAspect>();
const mediaAspectPending = new Map<string, Promise<ResolvedMediaAspect>>();

const normalizeRatio = (value: number, fallback = 1) => (Number.isFinite(value) && value > 0 ? value : fallback);

const pickClosestCanonicalAspect = (ratio: number): AspectRatioBucket => {
  const normalized = normalizeRatio(ratio);

  return CANONICAL_ASPECT_BUCKETS.reduce((closest, candidate) => {
    const currentDistance = Math.abs(normalized - closest.ratio);
    const candidateDistance = Math.abs(normalized - candidate.ratio);

    return candidateDistance < currentDistance ? candidate : closest;
  }, CANONICAL_ASPECT_BUCKETS[0]);
};

const formatAspectRatioLabel = (ratio: number) => {
  const normalized = normalizeRatio(ratio);
  const displayMatch = DISPLAY_ASPECT_BUCKETS.find((bucket) => Math.abs(bucket.ratio - normalized) < 0.02);

  if (displayMatch) {
    return displayMatch.label;
  }

  return pickClosestCanonicalAspect(normalized).label;
};

const getSourceHintAspectRatio = (src: string) => {
  const normalizedSource = decodeURIComponent(src.split('?')[0] ?? src).toLowerCase();

  if (normalizedSource.includes('horizontal') || normalizedSource.includes('landscape') || normalizedSource.includes('wide')) {
    return 16 / 9;
  }

  if (
    normalizedSource.includes('quadrado') ||
    normalizedSource.includes('square') ||
    normalizedSource.includes('1x1') ||
    normalizedSource.includes('1-1') ||
    normalizedSource.includes('1_1') ||
    normalizedSource.includes('9x9') ||
    normalizedSource.includes('9-9')
  ) {
    return 1;
  }

  if (
    normalizedSource.includes('retrato') ||
    normalizedSource.includes('portrait') ||
    normalizedSource.includes('vertical') ||
    normalizedSource.includes('4x5') ||
    normalizedSource.includes('4-5') ||
    normalizedSource.includes('4_5')
  ) {
    return 4 / 5;
  }

  if (normalizedSource.includes('2x3') || normalizedSource.includes('2-3') || normalizedSource.includes('2_3')) {
    return 2 / 3;
  }

  return null;
};

const getInitialMediaAspect = (asset: MediaAsset): ResolvedMediaAspect => {
  if (asset.aspectRatio && Number.isFinite(asset.aspectRatio) && asset.aspectRatio > 0) {
    const ratio = normalizeRatio(asset.aspectRatio);
    return {
      ratio,
      label: asset.formatLabel ?? formatAspectRatioLabel(ratio),
    };
  }

  const cached = mediaAspectCache.get(asset.src);
  if (cached) {
    return cached;
  }

  const hintedRatio = getSourceHintAspectRatio(asset.src);
  if (hintedRatio) {
    return {
      ratio: hintedRatio,
      label: asset.formatLabel ?? formatAspectRatioLabel(hintedRatio),
    };
  }

  return {
    ratio: 1,
    label: asset.formatLabel ?? '1:1',
  };
};

const probeMediaAspect = (src: string, fallback: ResolvedMediaAspect) => {
  const cached = mediaAspectCache.get(src);
  if (cached) {
    return Promise.resolve(cached);
  }

  const pending = mediaAspectPending.get(src);
  if (pending) {
    return pending;
  }

  const promise = new Promise<ResolvedMediaAspect>((resolve) => {
    const image = new Image();

    image.decoding = 'async';
    image.onload = () => {
      const naturalRatio = image.naturalWidth > 0 && image.naturalHeight > 0 ? image.naturalWidth / image.naturalHeight : fallback.ratio;
      const bucket = pickClosestCanonicalAspect(naturalRatio);
      const resolved = {
        ratio: bucket.ratio,
        label: bucket.label,
      };

      mediaAspectCache.set(src, resolved);
      mediaAspectPending.delete(src);
      resolve(resolved);
    };
    image.onerror = () => {
      mediaAspectCache.set(src, fallback);
      mediaAspectPending.delete(src);
      resolve(fallback);
    };
    image.src = src;
  });

  mediaAspectPending.set(src, promise);
  return promise;
};

const useResolvedMediaAspect = (asset: MediaAsset | null) => {
  const [resolvedAspect, setResolvedAspect] = useState<ResolvedMediaAspect | null>(() => (asset ? getInitialMediaAspect(asset) : null));

  useEffect(() => {
    let isActive = true;

    if (!asset) {
      setResolvedAspect(null);
      return undefined;
    }

    const initialAspect = getInitialMediaAspect(asset);
    setResolvedAspect(initialAspect);

    if (asset.aspectRatio && Number.isFinite(asset.aspectRatio) && asset.aspectRatio > 0) {
      return undefined;
    }

    void probeMediaAspect(asset.src, initialAspect).then((nextAspect) => {
      if (isActive) {
        setResolvedAspect(nextAspect);
      }
    });

    return () => {
      isActive = false;
    };
  }, [asset?.aspectRatio, asset?.formatLabel, asset?.src]);

  return resolvedAspect;
};

export const getMediaCarouselNavButtonStyle = (isCompact: boolean) =>
  ({
    width: isCompact ? '34px' : '38px',
    height: isCompact ? '34px' : '38px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(0,0,0,0.5)',
    color: WHITE,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 12px 28px rgba(0,0,0,0.28)',
  }) as const;

const MediaCarouselNavControls = ({
  isCompact,
  onPrevious,
  onNext,
  ariaLabelPrefix = 'Imagem',
}: {
  isCompact: boolean;
  onPrevious: () => void;
  onNext: () => void;
  ariaLabelPrefix?: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isCompact ? '12px' : '14px',
      padding: isCompact ? '4px 16px 10px' : '6px 18px 12px',
    }}
  >
    <button
      type="button"
      aria-label={`${ariaLabelPrefix} anterior`}
      onClick={(event) => {
        event.stopPropagation();
        onPrevious();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      style={getMediaCarouselNavButtonStyle(isCompact)}
    >
      <ChevronLeft size={16} />
    </button>
    <button
      type="button"
      aria-label={`${ariaLabelPrefix} próxima`}
      onClick={(event) => {
        event.stopPropagation();
        onNext();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      style={getMediaCarouselNavButtonStyle(isCompact)}
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

const tokenStyle = (tag: MediaAcquisitionItem['tags'][number]) => {
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

const TokenTag = ({ label, compact = false }: { label: MediaAcquisitionItem['tags'][number]; compact?: boolean }) => {
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
        padding: compact ? '4px 8px' : '5px 10px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-chip)',
        fontWeight: 700,
        letterSpacing: compact ? '0.08em' : '0.09em',
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

const ExpandableMediaCard = ({ item, isCompact }: { item: MediaAcquisitionItem; isCompact: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaAssets = useMemo(() => item.media.map(normalizeMediaAsset).filter((asset): asset is MediaAsset => Boolean(asset)), [item.media]);
  const hasMedia = mediaAssets.length > 0;
  const hasMultiple = mediaAssets.length > 1;
  const activeAsset = mediaAssets[activeIndex] ?? null;
  const frameAsset = mediaAssets[0] ?? null;
  const frameAspect = useResolvedMediaAspect(frameAsset);
  const frameRatio = frameAspect?.ratio ?? frameAsset?.aspectRatio ?? 1;

  useEffect(() => {
    setActiveIndex((current) => {
      if (!mediaAssets.length) {
        return 0;
      }

      return current >= mediaAssets.length ? 0 : current;
    });
  }, [mediaAssets.length]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const goToPrevious = () => {
    if (!hasMultiple) {
      return;
    }

    setActiveIndex((current) => (current - 1 + mediaAssets.length) % mediaAssets.length);
  };

  const goToNext = () => {
    if (!hasMultiple) {
      return;
    }

    setActiveIndex((current) => (current + 1) % mediaAssets.length);
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.018) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: isCompact ? '18px' : '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          minHeight: '100%',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        <div
          style={{
            padding: isCompact ? '16px 16px 0' : '18px 18px 0',
            display: 'flex',
            alignItems: isCompact ? 'stretch' : 'flex-start',
            justifyContent: 'space-between',
            gap: '14px',
            flexDirection: isCompact ? 'column' : 'row',
          }}
        >
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 700, lineHeight: 1.24, letterSpacing: '-0.01em' }}>
              {item.title}
            </div>
          </div>
          <div style={{ alignSelf: isCompact ? 'flex-start' : 'auto' }}>
            <StatusPill status={item.status} />
          </div>
        </div>

        {hasMultiple ? <MediaCarouselNavControls isCompact={isCompact} onPrevious={goToPrevious} onNext={goToNext} /> : null}

        <div
          style={{
            position: 'relative',
            padding: isCompact ? '14px 16px 16px' : '16px 18px 18px',
          }}
        >
          {hasMedia ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Expandir ${item.title}`}
              style={{
                position: 'absolute',
                top: isCompact ? '20px' : '24px',
                right: isCompact ? '18px' : '30px',
                zIndex: 5,
                width: isCompact ? '34px' : '36px',
                height: isCompact ? '34px' : '36px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.62)',
                color: WHITE,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
              }}
            >
              <Maximize2 size={16} />
            </button>
          ) : null}

          <MediaCarouselViewport
            asset={activeAsset}
            total={mediaAssets.length}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onActivate={hasMedia ? () => setIsOpen(true) : undefined}
            isCompact={isCompact}
            variant="card"
            frameRatio={frameRatio}
            ariaLabel={`Mídia do card ${item.title}`}
          />
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.94)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isCompact ? '16px' : '32px',
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(1200px, 100%)',
                maxHeight: '92vh',
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gap: isCompact ? '14px' : '18px',
                background: 'rgba(18,18,18,0.92)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: isCompact ? '18px' : '22px',
                padding: isCompact ? '16px' : '20px',
                boxShadow: '0 36px 80px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: isCompact ? 'stretch' : 'flex-start',
                  gap: '16px',
                  flexDirection: isCompact ? 'column' : 'row',
                }}
              >
              <div style={{ minWidth: 0 }}>
                  <div style={{ color: WHITE, fontSize: 'var(--text-section)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {item.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: isCompact ? '36px' : '40px',
                    height: isCompact ? '36px' : '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    color: WHITE,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {hasMultiple ? <MediaCarouselNavControls isCompact={isCompact} onPrevious={goToPrevious} onNext={goToNext} /> : null}

              <MediaCarouselViewport
                asset={activeAsset}
                total={mediaAssets.length}
                onPrevious={goToPrevious}
                onNext={goToNext}
                isCompact={isCompact}
                variant="modal"
                frameRatio={frameRatio}
                modalMaxHeightPx={isCompact ? 420 : 500}
                ariaLabel={`Visualização ampliada do card ${item.title}`}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <StatusPill status={item.status} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export const MediaAcquisitionSection = ({
  title = 'Mídias Acquisition',
  subtitle = 'Leitura visual das peças e frentes que alimentam aquisição e qualidade de lead.',
  items = mediaAcquisitionItems,
}: {
  title?: string;
  subtitle?: string;
  items?: MediaAcquisitionItem[];
}) => {
  const { isMobile, isCompact } = useDeckViewport();
  const sectionBadgePalette = {
    color: '#A78BFA',
    background: 'rgba(167, 139, 250, 0.08)',
    border: 'rgba(167, 139, 250, 0.22)',
  };

  const itemsByColumn = useMemo(() => {
    const totalColumns = isMobile ? 1 : isCompact ? 2 : 4;
    const columns = Array.from({ length: totalColumns }, () => [] as MediaAcquisitionItem[]);

    items.forEach((item, index) => {
      columns[index % totalColumns].push(item);
    });

    return columns;
  }, [items, isCompact, isMobile]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: isCompact ? '20px' : '26px',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? '24px' : '32px',
      }}
    >
      <SlideEvidenceHeader
        accentColor={CLUSTERS.ACQUISITION}
        title={title}
        subtitle={subtitle}
        badge={
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 10px',
              borderRadius: '999px',
              border: `1px solid ${sectionBadgePalette.border}`,
              background: sectionBadgePalette.background,
              color: sectionBadgePalette.color,
              fontSize: 'var(--text-chip)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ACQUISITION
          </span>
        }
      />

      <div
        style={{
          width: '100%',
          minWidth: 0,
          alignSelf: 'stretch',
          display: 'grid',
          gridTemplateColumns: `repeat(${itemsByColumn.length}, minmax(0, 1fr))`,
          gap: '14px',
        }}
      >
        {itemsByColumn.map((columnItems, columnIndex) => (
          <div
            key={`media-column-${columnIndex}`}
            style={{
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: isCompact ? '14px' : '18px',
            }}
          >
            {columnItems.map((item) => (
              <div key={item.title} style={{ minWidth: 0, height: 'fit-content' }}>
                <ExpandableMediaCard item={item} isCompact={isCompact} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const StatusPill = ({ status }: { status: Status }) => {
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
        padding: '4px 8px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-chip)',
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

type MediaCarouselViewportProps = {
  asset: MediaAsset | null;
  badgeLabel?: string;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onActivate?: () => void;
  isCompact: boolean;
  variant: 'card' | 'modal';
  frameRatio: number;
  modalMaxHeightPx?: number;
  ariaLabel: string;
};

const MediaCarouselViewport = ({
  asset,
  badgeLabel,
  total,
  onPrevious,
  onNext,
  onActivate,
  isCompact,
  variant,
  frameRatio,
  modalMaxHeightPx,
  ariaLabel,
}: MediaCarouselViewportProps) => {
  const resolvedAspect = useResolvedMediaAspect(asset);
  const frameLabel = asset?.formatLabel ?? resolvedAspect?.label ?? badgeLabel ?? 'Mídia';
  const hasMultiple = total > 1 && Boolean(onPrevious && onNext);
  const widthCap = variant === 'modal' ? Math.round((modalMaxHeightPx ?? (isCompact ? 420 : 500)) * normalizeRatio(frameRatio)) : null;
  const swipeStartX = useRef<number | null>(null);
  const swipeTriggered = useRef(false);

  const handleActivate = () => {
    if (!onActivate) {
      return;
    }

    if (swipeTriggered.current) {
      swipeTriggered.current = false;
      return;
    }

    onActivate();
  };

  const handlePointerDown = (event: { pointerType: string; button: number; clientX: number }) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    swipeStartX.current = event.clientX;
    swipeTriggered.current = false;
  };

  const handlePointerUp = (event: { clientX: number }) => {
    if (swipeStartX.current == null || !hasMultiple) {
      swipeStartX.current = null;
      return;
    }

    const delta = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(delta) > 42) {
      swipeTriggered.current = true;

      if (delta < 0) {
        onNext?.();
      } else {
        onPrevious?.();
      }
    }
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
  };

  const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === 'ArrowLeft' && hasMultiple) {
      event.preventDefault();
      onPrevious?.();
      return;
    }

    if (event.key === 'ArrowRight' && hasMultiple) {
      event.preventDefault();
      onNext?.();
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && onActivate) {
      event.preventDefault();
      onActivate();
    }
  };

  const useStoryCrop = variant === 'card' && frameLabel === 'Story 9:16';
  const imageFit = useStoryCrop ? 'cover' : 'contain';
  const imagePosition = useStoryCrop ? 'center top' : 'center';

  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: isCompact ? '5px 9px' : '6px 10px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(0,0,0,0.48)',
    color: WHITE,
    fontSize: 'var(--text-chip)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1,
    textTransform: 'uppercase',
    backdropFilter: 'blur(10px)',
  } as const;

  return (
    <motion.div layout style={{ width: variant === 'modal' && widthCap ? `min(100%, ${widthCap}px)` : '100%' }}>
      <AspectRatio ratio={frameRatio} style={{ width: '100%' }}>
        <div
          role="group"
          tabIndex={hasMultiple || Boolean(onActivate) ? 0 : -1}
          aria-label={ariaLabel}
          onClick={handleActivate}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerCancel}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: variant === 'modal' ? '18px' : '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: asset ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
            cursor: hasMultiple ? 'grab' : onActivate ? 'pointer' : 'default',
            touchAction: 'pan-y',
            userSelect: 'none',
          }}
        >
          {asset ? (
            <>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={asset.src}
                  src={asset.src}
                  alt={asset.alt ?? frameLabel}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.26, ease: 'easeOut' }}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: imageFit,
                    objectPosition: imagePosition,
                    display: 'block',
                  }}
                />
              </AnimatePresence>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    variant === 'modal'
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.06) 46%, rgba(0,0,0,0.62) 100%)'
                      : 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.72) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '10px',
                  pointerEvents: 'none',
                }}
              >
                <span style={pillStyle}>{frameLabel}</span>
              </div>
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isCompact ? '18px' : '24px',
              }}
            >
              <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 700, lineHeight: 1.3, textAlign: 'center' }}>
                Sem imagens vinculadas
              </div>
            </div>
          )}
        </div>
      </AspectRatio>

    </motion.div>
  );
};

