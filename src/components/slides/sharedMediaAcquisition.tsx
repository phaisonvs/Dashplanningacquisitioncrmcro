import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { CLUSTERS, WHITE } from "../theme";
import {
  DeckPill,
  DeckStatusPill,
  MediaCarouselNavControls,
  SlideEvidenceHeader,
  deckCardPresets,
  deckPillPresets,
  useDeckViewport,
} from "./sharedDeckTypography";
import lpSemanaConsumidorImg from "figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png";
import lpChanceUnicaImg from "figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png";
import lpSemanaConsumidorMobileImg from "figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png";
import lpChanceUnicaMobileImg from "figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png";
import heroDesktopImg from "figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png";
import heroMobileImg from "figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png";

export type Status = "feito" | "pendente" | "bloqueado";

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
  tags: Array<"KPIs" | "LEADS" | "ACQUISITION" | "CRO" | "CRM" | "E-COMMERCE">;
  objectiveKpis?: string[];
  status: Status;
  media: Array<MediaAsset | null>;
  accent: string;
  badgeLabel?: string;
};

const normalizeMediaAsset = (source: MediaAssetInput): MediaAsset | null => {
  if (!source) {
    return null;
  }

  if (typeof source === "string") {
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

export const mediaSlots = (
  ...sources: MediaAssetInput[]
): Array<MediaAsset | null> => sources.map(normalizeMediaAsset);

type MediaTag = MediaAcquisitionItem["tags"][number];

const MEDIA_TAG_ORDER: MediaTag[] = [
  "KPIs",
  "LEADS",
  "ACQUISITION",
  "CRO",
  "CRM",
  "E-COMMERCE",
];

const orderMediaTags = (tags: MediaAcquisitionItem["tags"]) =>
  [...tags].sort(
    (left, right) =>
      MEDIA_TAG_ORDER.indexOf(left) - MEDIA_TAG_ORDER.indexOf(right),
  );

const MediaTagPill = ({
  tag,
  compact = false,
}: {
  tag: MediaTag;
  compact?: boolean;
}) => (
  <DeckPill
    label={tag}
    compact={compact}
    preset={
      tag === "KPIs" ? deckPillPresets.tokenChip : deckPillPresets.tokenMeta
    }
    style={tag === "KPIs" ? { textTransform: "none" } : undefined}
  />
);

const ObjectiveBlock = ({
  text,
  accent,
  kpis = [],
  compact = false,
}: {
  text: string;
  accent: string;
  kpis?: string[];
  compact?: boolean;
}) => (
  <div
    data-ui="bloco-objetivo-frente"
    style={{
      background: "rgba(255,255,255,0.018)",
      padding: compact ? "16px" : "18px",
      borderRadius: "14px",
      border: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: compact ? "stretch" : "flex-start",
        gap: "10px",
        flexDirection: compact ? "column" : "row",
        marginBottom: compact ? "8px" : "10px",
      }}
    >
      <div
        style={{
          color: WHITE,
          fontSize: "var(--paragrafo)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-label)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div
          style={{
            width: "3px",
            height: "10px",
            background: accent,
            borderRadius: "999px",
          }}
        />
        Objetivo da Frente
      </div>
      {kpis[0] ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: compact ? "flex-start" : "flex-end",
            alignItems: "center",
          }}
        >
          <DeckPill
            key={kpis[0]}
            label={kpis[0]}
            compact={compact}
            preset={deckPillPresets.tokenChip}
            style={{ textTransform: "none" }}
          />
        </div>
      ) : null}
    </div>
    <div
      style={{
        color: "rgba(255,255,255,0.68)",
        fontSize: "var(--paragrafo)",
        lineHeight: 1.5,
        fontWeight: 300,
      }}
    >
      {text}
    </div>
  </div>
);

export const mediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: "Facebook Feed - Semana do Consumidor",
    description:
      "Feed quadrado para mídia paga com leitura direta, oferta sazonal e foco em alcance qualificado.",
    tags: ["LEADS", "ACQUISITION"],
    status: "feito",
    media: mediaSlots({
      src: lpSemanaConsumidorImg,
      alt: "Facebook Feed - Semana do Consumidor",
      aspectRatio: 1,
      formatLabel: "Feed 1:1",
    }),
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: "Feed",
  },
  {
    title: "Hero Feed - Conversão",
    description:
      "Peça quadrada para reforçar hierarquia visual e credibilidade no topo do funil.",
    tags: ["CRO", "ACQUISITION"],
    status: "feito",
    media: mediaSlots({
      src: heroDesktopImg,
      alt: "Hero Feed - Conversão",
      aspectRatio: 1,
      formatLabel: "Feed 1:1",
    }),
    accent: CLUSTERS.CRO,
    badgeLabel: "Feed",
  },
  {
    title: "Remarketing Feed - Oferta Relâmpago",
    description:
      "Criativo quadrado de remarketing para reforçar urgência comercial e reduzir dispersão.",
    tags: ["ACQUISITION", "CRM"],
    status: "pendente",
    media: mediaSlots({
      src: lpChanceUnicaImg,
      alt: "Remarketing Feed - Oferta Relâmpago",
      aspectRatio: 1,
      formatLabel: "Feed 1:1",
    }),
    accent: CLUSTERS.CRM,
    badgeLabel: "Feed",
  },
  {
    title: "Instagram Story - Chance Única",
    description:
      "Story vertical com urgência, prova de valor e CTA rápido para absorver intenção alta.",
    tags: ["ACQUISITION", "CRO"],
    status: "pendente",
    media: mediaSlots({
      src: lpChanceUnicaMobileImg,
      alt: "Instagram Story - Chance Única",
      aspectRatio: 9 / 16,
      formatLabel: "Story 9:16",
    }),
    accent: CLUSTERS.CRO,
    badgeLabel: "Story",
  },
  {
    title: "Instagram Story - WhatsApp & Captura",
    description:
      "Story vertical para contato assistido e captura com menos fricção.",
    tags: ["CRM", "LEADS"],
    status: "feito",
    media: mediaSlots({
      src: heroMobileImg,
      alt: "Instagram Story - WhatsApp & Captura",
      aspectRatio: 9 / 16,
      formatLabel: "Story 9:16",
    }),
    accent: CLUSTERS.CRM,
    badgeLabel: "Story",
  },
  {
    title: "Instagram Feed - Semana do Consumidor",
    description:
      "Peça de feed adicional para fechar a sequência da galeria com variação de mensagem e formato.",
    tags: ["LEADS", "CRO"],
    status: "feito",
    media: mediaSlots({
      src: lpSemanaConsumidorMobileImg,
      alt: "Instagram Feed - Semana do Consumidor",
      aspectRatio: 1,
      formatLabel: "Feed 1:1",
    }),
    accent: CLUSTERS.LEADS,
    badgeLabel: "Feed",
  },
];

export const collectStatusCounts = (
  ...groups: ReadonlyArray<ReadonlyArray<StatusItem>>
) =>
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
  label: "16:9" | "1:1" | "4:5" | "2:3";
  ratio: number;
};

type ResolvedMediaAspect = {
  ratio: number;
  label: string;
};

const CANONICAL_ASPECT_BUCKETS: AspectRatioBucket[] = [
  { label: "16:9", ratio: 16 / 9 },
  { label: "1:1", ratio: 1 },
  { label: "4:5", ratio: 4 / 5 },
  { label: "2:3", ratio: 2 / 3 },
];

const DISPLAY_ASPECT_BUCKETS: Array<{ label: string; ratio: number }> = [
  { label: "16:9", ratio: 16 / 9 },
  { label: "1:1", ratio: 1 },
  { label: "4:5", ratio: 4 / 5 },
  { label: "2:3", ratio: 2 / 3 },
  { label: "9:16", ratio: 9 / 16 },
];

const mediaAspectCache = new Map<string, ResolvedMediaAspect>();
const mediaAspectPending = new Map<string, Promise<ResolvedMediaAspect>>();

const normalizeRatio = (value: number, fallback = 1) =>
  Number.isFinite(value) && value > 0 ? value : fallback;

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
  const displayMatch = DISPLAY_ASPECT_BUCKETS.find(
    (bucket) => Math.abs(bucket.ratio - normalized) < 0.02,
  );

  if (displayMatch) {
    return displayMatch.label;
  }

  return pickClosestCanonicalAspect(normalized).label;
};

const getSourceHintAspectRatio = (src: string) => {
  const normalizedSource = decodeURIComponent(
    src.split("?")[0] ?? src,
  ).toLowerCase();

  if (
    normalizedSource.includes("horizontal") ||
    normalizedSource.includes("landscape") ||
    normalizedSource.includes("wide")
  ) {
    return 16 / 9;
  }

  if (
    normalizedSource.includes("quadrado") ||
    normalizedSource.includes("square") ||
    normalizedSource.includes("1x1") ||
    normalizedSource.includes("1-1") ||
    normalizedSource.includes("1_1") ||
    normalizedSource.includes("9x9") ||
    normalizedSource.includes("9-9")
  ) {
    return 1;
  }

  if (
    normalizedSource.includes("retrato") ||
    normalizedSource.includes("portrait") ||
    normalizedSource.includes("vertical") ||
    normalizedSource.includes("4x5") ||
    normalizedSource.includes("4-5") ||
    normalizedSource.includes("4_5")
  ) {
    return 4 / 5;
  }

  if (
    normalizedSource.includes("2x3") ||
    normalizedSource.includes("2-3") ||
    normalizedSource.includes("2_3")
  ) {
    return 2 / 3;
  }

  return null;
};

const getInitialMediaAspect = (asset: MediaAsset): ResolvedMediaAspect => {
  if (
    asset.aspectRatio &&
    Number.isFinite(asset.aspectRatio) &&
    asset.aspectRatio > 0
  ) {
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
    label: asset.formatLabel ?? "1:1",
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

    image.decoding = "async";
    image.onload = () => {
      const naturalRatio =
        image.naturalWidth > 0 && image.naturalHeight > 0
          ? image.naturalWidth / image.naturalHeight
          : fallback.ratio;
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
  const [resolvedAspect, setResolvedAspect] =
    useState<ResolvedMediaAspect | null>(() =>
      asset ? getInitialMediaAspect(asset) : null,
    );

  useEffect(() => {
    let isActive = true;

    if (!asset) {
      setResolvedAspect(null);
      return undefined;
    }

    const initialAspect = getInitialMediaAspect(asset);
    setResolvedAspect(initialAspect);

    if (
      asset.aspectRatio &&
      Number.isFinite(asset.aspectRatio) &&
      asset.aspectRatio > 0
    ) {
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

const ExpandableMediaCard = ({
  item,
  isCompact,
}: {
  item: MediaAcquisitionItem;
  isCompact: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaAssets = useMemo(
    () =>
      item.media
        .map(normalizeMediaAsset)
        .filter((asset): asset is MediaAsset => Boolean(asset)),
    [item.media],
  );
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
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const goToPrevious = () => {
    if (!hasMultiple) {
      return;
    }

    setActiveIndex(
      (current) => (current - 1 + mediaAssets.length) % mediaAssets.length,
    );
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
        data-ui="card-midia-expansivel"
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={deckCardPresets.mediaCard(isCompact)}
      >
        <div
          /* Edita Card de Midia Expansivel */
          data-ui="card-midia-cabecalho"
          style={{
            padding: isCompact ? "16px 16px 0" : "18px 18px 0",
            display: "flex",
            alignItems: isCompact ? "stretch" : "flex-start",
            justifyContent: "space-between",
            gap: "14px",
            flexDirection: isCompact ? "column" : "row",
          }}
        >
          <div
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flex: "1 1 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isCompact ? "stretch" : "flex-start",
                gap: "12px",
                flexDirection: isCompact ? "column" : "row",
              }}
            >
              <div
                style={{
                  color: WHITE,
                  fontSize: "var(--paragrafo-grande)",
                  fontWeight: 700,
                  lineHeight: 1.24,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </div>
              <div style={{ alignSelf: isCompact ? "flex-start" : "auto" }}>
                <DeckStatusPill status={item.status} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                alignItems: "flex-start",
              }}
            >
              {orderMediaTags(item.tags).map((tag) => (
                <MediaTagPill
                  key={`${item.title}-${tag}`}
                  tag={tag}
                  compact={isCompact}
                />
              ))}
            </div>
          </div>
        </div>

        {hasMultiple ? (
          <MediaCarouselNavControls
            isCompact={isCompact}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        ) : null}

        <div
          style={{
            position: "relative",
            padding: isCompact ? "14px 16px 16px" : "0 18px 16px",
          }}
        >
          {hasMedia ? (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={`Expandir ${item.title}`}
              style={{
                position: "absolute",
                top: isCompact ? "20px" : "24px",
                right: isCompact ? "18px" : "30px",
                zIndex: 5,
                ...deckCardPresets.carouselExpandButton(isCompact),
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
          <div
            style={{
              marginTop: isCompact ? "14px" : "16px",
            }}
          >
            <ObjectiveBlock
              text={item.description}
              accent={item.accent}
              kpis={item.objectiveKpis}
              compact={isCompact}
            />
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            data-ui="midia-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            /* Edita Overlay do Modal de Midia */
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.94)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isCompact ? "16px" : "32px",
            }}
          >
            <motion.div
              data-ui="midia-modal"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              /* Edita Modal de Midia Ampliado */
              style={{
                width: "min(1200px, 100%)",
                maxHeight: "92vh",
                display: "flex",
                flexDirection: "column",
                gap: isCompact ? "14px" : "18px",
                background: "rgba(18,18,18,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: isCompact ? "18px" : "22px",
                padding: isCompact ? "16px" : "20px",
                boxShadow: "0 36px 80px rgba(0,0,0,0.45)",
              }}
            >
              <div
                data-ui="midia-modal-cabecalho"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: "1 1 auto",
                  }}
                >
                  <div
                    style={{
                      color: WHITE,
                      fontSize: "var(--titulo-secao)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </div>
                  <DeckStatusPill status={item.status} />
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  data-ui="midia-modal-fechar"
                  style={{
                    width: isCompact ? "36px" : "40px",
                    height: isCompact ? "36px" : "40px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: WHITE,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {hasMultiple ? (
                <MediaCarouselNavControls
                  isCompact={isCompact}
                  onPrevious={goToPrevious}
                  onNext={goToNext}
                />
              ) : null}

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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export const MediaAcquisitionSection = ({
  title = "Mídias Acquisition",
  subtitle = "Leitura visual das peças e frentes que alimentam aquisição e qualidade de lead.",
  items = mediaAcquisitionItems,
  singleCardMaxWidth,
}: {
  title?: string;
  subtitle?: string;
  items?: MediaAcquisitionItem[];
  singleCardMaxWidth?: number;
}) => {
  const { isMobile, isCompact } = useDeckViewport();
  const isSingleCard = items.length === 1 && typeof singleCardMaxWidth === "number";

  const itemsByColumn = useMemo(() => {
    const maxColumns = isMobile ? 1 : isCompact ? 2 : 4;
    const totalColumns = Math.max(1, Math.min(items.length, maxColumns));
    const columns = Array.from(
      { length: totalColumns },
      () => [] as MediaAcquisitionItem[],
    );

    items.forEach((item, index) => {
      columns[index % totalColumns].push(item);
    });

    return columns;
  }, [items, isCompact, isMobile]);

  return (
    <motion.section
      /* Edita Secao de Midias Acquisition */
      data-ui="secao-midias-aquisicao"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={deckCardPresets.section(isCompact, "wide")}
    >
      <SlideEvidenceHeader
        accentColor={CLUSTERS.ACQUISITION}
        title={title}
        subtitle={subtitle}
        badge={
          <DeckPill
            label="ACQUISITION"
            compact
            preset={deckPillPresets.tokenChip}
            style={{ letterSpacing: "0.12em", fontWeight: 700 }}
          />
        }
      />

      <div
        /* Edita Grid de Cards de Midia */
        data-ui="grid-cards-midia"
        style={{
          width: isSingleCard ? `min(100%, ${singleCardMaxWidth}px)` : "100%",
          minWidth: 0,
          margin: isSingleCard ? "0" : undefined,
          alignSelf: isSingleCard ? "flex-start" : "stretch",
          display: "grid",
          gridTemplateColumns: `repeat(${itemsByColumn.length}, minmax(0, 1fr))`,
          gap: "14px",
        }}
      >
        {itemsByColumn.map((columnItems, columnIndex) => (
          <div
            key={`media-column-${columnIndex}`}
            style={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: isCompact ? "14px" : "18px",
            }}
          >
            {columnItems.map((item) => (
              <div
                key={`${item.title}-${item.status}-${item.description}-${item.media
                  .map((asset) => asset?.src ?? "missing")
                  .join("|")}`}
                style={{ minWidth: 0, height: "fit-content" }}
              >
                <ExpandableMediaCard item={item} isCompact={isCompact} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.section>
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
  variant: "card" | "modal";
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
  const frameLabel =
    asset?.formatLabel ?? resolvedAspect?.label ?? badgeLabel ?? "Mídia";
  const hasMultiple = total > 1 && Boolean(onPrevious && onNext);
  const widthCap =
    variant === "modal"
      ? Math.round(
          (modalMaxHeightPx ?? (isCompact ? 420 : 500)) *
            normalizeRatio(frameRatio),
        )
      : null;
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

  const handlePointerDown = (event: {
    pointerType: string;
    button: number;
    clientX: number;
  }) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
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

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "ArrowLeft" && hasMultiple) {
      event.preventDefault();
      onPrevious?.();
      return;
    }

    if (event.key === "ArrowRight" && hasMultiple) {
      event.preventDefault();
      onNext?.();
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && onActivate) {
      event.preventDefault();
      onActivate();
    }
  };

  const useStoryCrop = variant === "card" && frameLabel === "Story 9:16";
  const imageFit = useStoryCrop ? "cover" : "contain";
  const imagePosition = useStoryCrop ? "center top" : "center";

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: isCompact ? "5px 9px" : "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.48)",
    color: WHITE,
    fontSize: "var(--rotulo)",
    fontWeight: 700,
    letterSpacing: "0.08em",
    lineHeight: 1,
    textTransform: "uppercase",
    backdropFilter: "blur(10px)",
  } as const;

  return (
    <motion.div
      data-ui="midia-viewport"
      layout
      style={{
        width:
          variant === "modal" && widthCap ? `min(100%, ${widthCap}px)` : "100%",
        margin: variant === "modal" ? "0 auto" : undefined,
      }}
    >
      <AspectRatio ratio={frameRatio} style={{ width: "100%" }}>
        <div
          data-ui="midia-viewport-frame"
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
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: variant === "modal" ? "18px" : "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: asset
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.015)",
            cursor: hasMultiple ? "grab" : onActivate ? "pointer" : "default",
            touchAction: "pan-y",
            userSelect: "none",
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
                  transition={{ duration: 0.26, ease: "easeOut" }}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: imageFit,
                    objectPosition: imagePosition,
                    display: "block",
                  }}
                />
              </AnimatePresence>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    variant === "modal"
                      ? "linear-gradient(180deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.06) 46%, rgba(0,0,0,0.62) 100%)"
                      : "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.72) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  right: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "10px",
                  pointerEvents: "none",
                }}
              >
                <span style={pillStyle}>{frameLabel}</span>
              </div>
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isCompact ? "18px" : "24px",
              }}
            >
              <div
                style={{
                  color: WHITE,
                  fontSize: "var(--paragrafo-grande)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                Sem imagens vinculadas
              </div>
            </div>
          )}
        </div>
      </AspectRatio>
    </motion.div>
  );
};
