import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { CARD_BG, CARD_BORDER, CLUSTERS, WHITE } from "../theme";

export const SLIDE_TITLE_WEIGHT = 700;
export const SLIDE_SECTION_TITLE_WEIGHT = 700;
export const SLIDE_META_WEIGHT = 700;

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1180;

export function useDeckViewport() {
  const [width, setWidth] = useState(() =>
    typeof window === "undefined" ? TABLET_BREAKPOINT : window.innerWidth,
  );

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
  const isCompact = width < TABLET_BREAKPOINT;

  return { width, isMobile, isTablet, isCompact };
}

type ResponsiveValue = string | { compact: string; regular: string };

const resolveResponsiveValue = (value: ResponsiveValue, isCompact: boolean) =>
  typeof value === "string" ? value : isCompact ? value.compact : value.regular;

export type DeckStatus = "feito" | "pendente" | "bloqueado";

export type DeckPalette = {
  color: string;
  background: string;
  border: string;
};

const FALLBACK_PILL_PALETTE: DeckPalette = {
  color: "rgba(255,255,255,0.72)",
  background: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
};

export const deckTagPalettes: Record<string, DeckPalette> = {
  LEADS: {
    color: "#7DD3FC",
    background: "rgba(125, 211, 252, 0.08)",
    border: "rgba(125, 211, 252, 0.22)",
  },
  ACQUISITION: {
    color: "#A78BFA",
    background: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.22)",
  },
  CRO: {
    color: "#60A5FA",
    background: "rgba(96, 165, 250, 0.08)",
    border: "rgba(96, 165, 250, 0.22)",
  },
  CRM: {
    color: "#2DD4BF",
    background: "rgba(45, 212, 191, 0.08)",
    border: "rgba(45, 212, 191, 0.22)",
  },
  Leads: {
    color: "#7DD3FC",
    background: "rgba(125, 211, 252, 0.08)",
    border: "rgba(125, 211, 252, 0.22)",
  },
  ROAS: {
    color: "#FDE68A",
    background: "rgba(253, 230, 138, 0.08)",
    border: "rgba(253, 230, 138, 0.22)",
  },
  Receita: {
    color: "#4ADE80",
    background: "rgba(74, 222, 128, 0.08)",
    border: "rgba(74, 222, 128, 0.22)",
  },
  Pedidos: {
    color: "#A78BFA",
    background: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.22)",
  },
  Investimento: {
    color: "#FCA5A5",
    background: "rgba(252, 165, 165, 0.08)",
    border: "rgba(252, 165, 165, 0.22)",
  },
  Conversão: {
    color: "#60A5FA",
    background: "rgba(96, 165, 250, 0.08)",
    border: "rgba(96, 165, 250, 0.22)",
  },
  KPIs: {
    color: "#FDE68A",
    background: "rgba(253, 230, 138, 0.08)",
    border: "rgba(253, 230, 138, 0.22)",
  },
  "E-COMMERCE": {
    color: CLUSTERS.ECOMMERCE,
    background: "rgba(252, 165, 165, 0.08)",
    border: "rgba(252, 165, 165, 0.22)",
  },
  EXPANSAO: {
    color: CLUSTERS.EXPANSAO,
    background: "rgba(253, 186, 116, 0.08)",
    border: "rgba(253, 186, 116, 0.22)",
  },
  ESTRATEGIA: {
    color: CLUSTERS.ESTRATEGIA,
    background: "rgba(254, 240, 138, 0.08)",
    border: "rgba(254, 240, 138, 0.22)",
  },
};

export const getDeckTagPalette = (label: string): DeckPalette =>
  deckTagPalettes[label] ?? FALLBACK_PILL_PALETTE;

export const deckStatusPalettes: Record<
  DeckStatus,
  { label: string; color: string; background: string; border: string }
> = {
  feito: {
    label: "Feito",
    color: "#4ADE80",
    background: "rgba(74, 222, 128, 0.08)",
    border: "rgba(74, 222, 128, 0.18)",
  },
  pendente: {
    label: "Pendente",
    color: "#FBBF24",
    background: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.18)",
  },
  bloqueado: {
    label: "Bloqueado",
    color: "#F87171",
    background: "rgba(248, 113, 113, 0.08)",
    border: "rgba(248, 113, 113, 0.18)",
  },
};

export type DeckPillPreset = {
  padding: ResponsiveValue;
  borderRadius: ResponsiveValue;
  letterSpacing: ResponsiveValue;
  fontSize: string;
  fontWeight: number;
  includeDot?: boolean;
  dotSize?: string;
  gap?: ResponsiveValue;
  uppercase?: boolean;
};

export const deckPillPresets = {
  tokenMeta: {
    padding: { compact: "4px 10px", regular: "5px 12px" },
    borderRadius: "6px",
    letterSpacing: "var(--tracking-label)",
    fontSize: "var(--rotulo)",
    fontWeight: 800,
  },
  tokenChip: {
    padding: { compact: "6px 10px", regular: "8px 13px" },
    borderRadius: "999px",
    letterSpacing: "var(--tracking-label)",
    fontSize: "var(--rotulo)",
    fontWeight: 800,
  },
  mediaToken: {
    padding: { compact: "4px 8px", regular: "5px 10px" },
    borderRadius: "999px",
    letterSpacing: {
      compact: "var(--tracking-label)",
      regular: "var(--tracking-label)",
    },
    fontSize: "var(--rotulo)",
    fontWeight: 700,
  },
  conversionToken: {
    padding: { compact: "4px 8px", regular: "4px 9px" },
    borderRadius: "999px",
    letterSpacing: {
      compact: "var(--tracking-label)",
      regular: "var(--tracking-label)",
    },
    fontSize: "var(--rotulo)",
    fontWeight: 700,
  },
  status: {
    padding: "4px 8px",
    borderRadius: "999px",
    letterSpacing: "var(--tracking-label)",
    fontSize: "var(--rotulo)",
    fontWeight: 700,
    includeDot: true,
    gap: "5px",
  },
  statusTight: {
    padding: "3px 8px",
    borderRadius: "999px",
    letterSpacing: "var(--tracking-label)",
    fontSize: "var(--rotulo)",
    fontWeight: 700,
    includeDot: true,
    gap: "5px",
  },
} as const satisfies Record<string, DeckPillPreset>;

type DeckPillProps = {
  label: ReactNode;
  compact?: boolean;
  preset?: DeckPillPreset;
  palette?: DeckPalette;
  style?: CSSProperties;
};

export function DeckPill({
  label,
  compact = false,
  preset = deckPillPresets.tokenMeta,
  palette,
  style,
}: DeckPillProps) {
  const resolvedPalette =
    palette ??
    (typeof label === "string"
      ? getDeckTagPalette(label)
      : FALLBACK_PILL_PALETTE);

  return (
    <span
      /* Edita Tag/Pill Base */
      data-ui="ponto-rotulo"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        maxWidth: "100%",
        alignSelf: "flex-start",
        flex: "0 0 auto",
        gap: preset.includeDot
          ? resolveResponsiveValue(preset.gap ?? "5px", compact)
          : 0,
        padding: resolveResponsiveValue(preset.padding, compact),
        borderRadius: resolveResponsiveValue(preset.borderRadius, compact),
        border: `1px solid ${resolvedPalette.border}`,
        background: resolvedPalette.background,
        color: resolvedPalette.color,
        fontSize: preset.fontSize,
        fontWeight: preset.fontWeight,
        letterSpacing: resolveResponsiveValue(preset.letterSpacing, compact),
        lineHeight: 1,
        textTransform: preset.uppercase === false ? "none" : "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {preset.includeDot ? (
        <span
          style={{
            width: preset.dotSize ?? "5px",
            height: preset.dotSize ?? "5px",
            borderRadius: "999px",
            background: resolvedPalette.color,
            flexShrink: 0,
          }}
        />
      ) : null}
      {label}
    </span>
  );
}

export function DeckStatusPill({
  status,
  compact = false,
  preset = deckPillPresets.status,
  style,
}: {
  status: DeckStatus;
  compact?: boolean;
  preset?: DeckPillPreset;
  style?: CSSProperties;
}) {
  const palette = deckStatusPalettes[status];

  return (
    <DeckPill
      label={palette.label}
      palette={palette}
      compact={compact}
      preset={preset}
      style={style}
    />
  );
}

type DeckCardShellPreset = {
  background: string;
  border: string;
  borderRadius: ResponsiveValue;
  padding: ResponsiveValue;
  gap: ResponsiveValue;
  display: CSSProperties["display"];
  flexDirection: CSSProperties["flexDirection"];
  boxShadow?: string;
  minHeight?: string;
  overflow?: CSSProperties["overflow"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
};

const createDeckCardStyle = (
  compact: boolean,
  preset: DeckCardShellPreset,
): CSSProperties => ({
  background: preset.background,
  border: preset.border,
  borderRadius: resolveResponsiveValue(preset.borderRadius, compact),
  padding: resolveResponsiveValue(preset.padding, compact),
  gap: resolveResponsiveValue(preset.gap, compact),
  display: preset.display,
  flexDirection: preset.flexDirection,
  boxShadow: preset.boxShadow,
  minHeight: preset.minHeight,
  overflow: preset.overflow,
  alignItems: preset.alignItems,
  justifyContent: preset.justifyContent,
});

export const deckCardPresets = {
  section: (compact: boolean, variant: "default" | "wide" = "default") =>
    /* Edita Preset de Secao */
    createDeckCardStyle(compact, {
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: variant === "wide" ? "20px" : "18px",
      padding:
        variant === "wide"
          ? { compact: "20px", regular: "26px" }
          : { compact: "18px", regular: "22px" },
      gap:
        variant === "wide"
          ? { compact: "24px", regular: "32px" }
          : { compact: "24px", regular: "32px" },
      display: "flex",
      flexDirection: "column",
    }),
  surface: (compact: boolean, tone: "default" | "subtle" = "default") =>
    /* Edita Preset de Superficie */
    createDeckCardStyle(compact, {
      background:
        tone === "subtle"
          ? "rgba(255,255,255,0.018)"
          : "rgba(255,255,255,0.022)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: "14px",
      padding: compact ? "20px" : "26px",
      gap: compact ? "16px" : "20px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }),
  metric: (
    compact: boolean,
    size: "default" | "tight" = "default",
    tone: "default" | "subtle" = "default",
  ) =>
    /* Edita Preset de Card de Metrica */
    createDeckCardStyle(compact, {
      background:
        tone === "subtle"
          ? "rgba(255,255,255,0.018)"
          : "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: "16px",
      padding:
        size === "tight"
          ? compact
            ? "16px"
            : "18px"
          : compact
            ? "22px"
            : "30px",
      gap:
        size === "tight"
          ? compact
            ? "14px"
            : "16px"
          : compact
            ? "18px"
            : "24px",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
    }),
  action: (
    variant: "previous" | "week",
    compact: boolean,
    surface: "glass" | "solid" = "glass",
  ) =>
    /* Edita Preset de Card de Acao */
    createDeckCardStyle(compact, {
      background:
        surface === "solid"
          ? variant === "previous"
            ? "rgba(255,255,255,0.012)"
            : CARD_BG
          : variant === "previous"
            ? "rgba(255,255,255,0.018)"
            : "rgba(20,20,20,0.88)",
      border:
        surface === "solid"
          ? `1px solid ${variant === "previous" ? "rgba(255,255,255,0.04)" : CARD_BORDER}`
          : `1px solid ${variant === "previous" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: "14px",
      padding: compact ? "16px" : "18px",
      gap: "0px",
      display: "block",
      flexDirection: "column",
      boxShadow:
        surface === "solid"
          ? "inset 0 1px 0 rgba(255,255,255,0.02)"
          : variant === "previous"
            ? "inset 0 1px 0 rgba(255,255,255,0.02)"
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
    }),
  mediaCard: (compact: boolean) =>
    /* Edita Preset de Card de Midia */
    createDeckCardStyle(compact, {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.018) 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: compact ? "18px" : "20px",
      padding: "0px",
      gap: "16px",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      overflow: "hidden",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
    }),
  carouselNavRail: (compact: boolean) =>
    ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: compact ? "12px" : "14px",
      padding: compact ? "12px 16px" : "16px 18px",
    }) as CSSProperties,
  carouselNavButton: (compact: boolean) =>
    ({
      width: compact ? "34px" : "38px",
      height: compact ? "34px" : "38px",
      borderRadius: "999px",
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(0,0,0,0.5)",
      color: WHITE,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backdropFilter: "blur(10px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.28)",
    }) as CSSProperties,
  carouselExpandButton: (compact: boolean) =>
    ({
      width: compact ? "34px" : "36px",
      height: compact ? "34px" : "36px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(0,0,0,0.62)",
      color: WHITE,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.24)",
    }) as CSSProperties,
} as const;

export const getMediaCarouselNavButtonStyle = (isCompact: boolean) =>
  deckCardPresets.carouselNavButton(isCompact);

export const MediaCarouselNavControls = ({
  isCompact,
  onPrevious,
  onNext,
  ariaLabelPrefix = "Imagem",
}: {
  isCompact: boolean;
  onPrevious: () => void;
  onNext: () => void;
  ariaLabelPrefix?: string;
}) => (
  <div
    data-ui="nav-carrossel-midia"
    style={deckCardPresets.carouselNavRail(isCompact)}
  >
    <button
      type="button"
      aria-label={`${ariaLabelPrefix} anterior`}
      onClick={(event) => {
        event.stopPropagation();
        onPrevious();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      data-ui="nav-carrossel-midia-anterior"
      style={deckCardPresets.carouselNavButton(isCompact)}
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
      data-ui="nav-carrossel-midia-proxima"
      style={deckCardPresets.carouselNavButton(isCompact)}
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

export type KpiActionItem = {
  cluster: string;
  status: DeckStatus;
  text: string;
};

type KpiActionGroupProps = {
  actions: KpiActionItem[];
  compact: boolean;
  label: string;
  variant: "previous" | "week";
  surface?: "glass" | "solid";
  actionGap?: number;
};

const getKpiActionGroupFadeMask = (
  variant: "previous" | "week",
  surface: "glass" | "solid",
  compact: boolean,
): CSSProperties => {
  const fadeHeight =
    compact
      ? surface === "solid"
        ? variant === "previous"
          ? 82
          : 92
        : variant === "previous"
          ? 86
          : 96
      : surface === "solid"
        ? variant === "previous"
          ? 96
          : 108
        : variant === "previous"
          ? 100
          : 112;

  return {
    WebkitMaskImage: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${fadeHeight}px), rgba(0,0,0,0) 100%)`,
    maskImage: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${fadeHeight}px), rgba(0,0,0,0) 100%)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };
};

export function KpiActionGroup({
  actions,
  compact,
  label,
  variant,
  surface = "glass",
  actionGap = compact ? 12 : 12,
}: KpiActionGroupProps) {
  const [isOpen, setIsOpen] = useState(actions.length <= 1);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const isExpandable = actions.length > 1;

  useLayoutEffect(() => {
    if (!isExpandable) {
      setIsOpen(true);
      setCollapsedHeight(null);
      setExpandedHeight(null);
      return undefined;
    }

    const measure = () => {
      const content = contentRef.current;
      if (!content) {
        return;
      }

      const nextExpanded = content.scrollHeight;
      const firstHeight = itemRefs.current[0]?.offsetHeight ?? 0;
      const secondHeight = itemRefs.current[1]?.offsetHeight ?? firstHeight;
      const nextCollapsed = Math.ceil(firstHeight + actionGap + secondHeight / 2);

      setCollapsedHeight(nextCollapsed);
      setExpandedHeight(nextExpanded);
    };

    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [actionGap, actions.length, compact, isExpandable, surface, variant]);

  useLayoutEffect(() => {
    if (!isExpandable) {
      return undefined;
    }

    if (isOpen && expandedHeight == null) {
      const content = contentRef.current;
      if (content) {
        setExpandedHeight(content.scrollHeight);
      }
    }

    return undefined;
  }, [expandedHeight, isExpandable, isOpen]);

  const currentMaxHeight = isExpandable
    ? isOpen
      ? expandedHeight ?? collapsedHeight ?? "none"
      : collapsedHeight ?? "none"
    : "none";

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        data-ui="kpi-action-group"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: compact ? "10px" : "12px",
        }}
      >
        <div
          data-ui="kpi-action-group-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "var(--rotulo)",
              fontWeight: 800,
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          {isExpandable ? (
            <CollapsibleTrigger
              type="button"
              data-ui="kpi-action-group-toggle"
              aria-label={`${isOpen ? "Ver menos" : "Ver mais"} ${label}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: compact ? "7px 10px" : "8px 12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.035)",
                color: WHITE,
                fontSize: "var(--rotulo)",
                fontWeight: 800,
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              <span>{isOpen ? "Ver menos" : "Ver mais"}</span>
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 180ms ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </CollapsibleTrigger>
          ) : null}
        </div>

        <div
          data-ui="kpi-action-group-shell"
          style={{
            position: "relative",
            overflow: "hidden",
            maxHeight: currentMaxHeight === "none" ? undefined : currentMaxHeight,
            transition: "max-height 240ms ease",
            ...(isExpandable && !isOpen
              ? getKpiActionGroupFadeMask(variant, surface, compact)
              : {}),
          }}
        >
          <div
            ref={contentRef}
            data-ui="kpi-action-group-content"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${actionGap}px`,
            }}
          >
            {actions.map((action, index) => (
              <div
                key={`${action.cluster}-${action.status}-${action.text}-${index}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-ui="kpi-action-item"
                style={{
                  minWidth: 0,
                  height: "fit-content",
                }}
              >
                <div
                  data-ui="kpi-action-card"
                  style={deckCardPresets.action(variant, compact, surface)}
                >
                  <div
                    data-ui="kpi-action-card-head"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: compact ? "10px" : "12px",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <div data-ui="kpi-action-card-cluster">
                      <DeckPill
                        label={action.cluster}
                        compact
                        preset={deckPillPresets.tokenMeta}
                      />
                    </div>
                    <div data-ui="kpi-action-card-status">
                      <DeckStatusPill
                        status={action.status}
                        preset={deckPillPresets.status}
                        style={{ fontWeight: 800 }}
                      />
                    </div>
                  </div>
                  <div
                    data-ui="kpi-action-card-text"
                    style={{
                      color:
                        variant === "previous"
                          ? "rgba(255,255,255,0.74)"
                          : "rgba(255,255,255,0.88)",
                      fontSize: "var(--paragrafo)",
                      lineHeight: 1.55,
                      fontWeight: 500,
                    }}
                  >
                    {action.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Collapsible>
  );
}

type SlideHeroHeaderProps = {
  accentColor: string;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  titleMaxWidth?: string;
};

type SlideSectionHeaderProps = {
  accentColor?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
};

type SlideEvidenceHeaderProps = {
  accentColor: string;
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  eyebrow?: ReactNode;
  right?: ReactNode;
  titleMaxWidth?: string;
};

export function SlideHeroHeader({
  accentColor,
  title,
  subtitle,
  right,
  children,
  titleMaxWidth = "920px",
}: SlideHeroHeaderProps) {
  const { isCompact } = useDeckViewport();

  return (
    <div
      /* Edita Cabecalho de Secao */
      data-ui="cabecalho-hero"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: isCompact ? "stretch" : "flex-start",
        gap: isCompact ? "16px" : "22px",
        flexDirection: isCompact ? "column" : "row",
        flexWrap: "wrap",
      }}
    >
      <div
        data-ui="cabecalho-hero-conteudo"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: isCompact ? "12px" : "14px",
          minWidth: 0,
          width: isCompact ? "100%" : "auto",
        }}
      >
        <div
          style={{
            width: "3px",
            height: isCompact ? "20px" : "24px",
            background: accentColor,
            borderRadius: "999px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            minWidth: 0,
            maxWidth: isCompact ? "100%" : titleMaxWidth,
            width: "100%",
          }}
        >
          <div
            data-ui="cabecalho-hero-titulo"
            style={{
              color: WHITE,
              fontSize: "var(--titulo-pagina)",
              fontWeight: SLIDE_TITLE_WEIGHT,
              letterSpacing: "var(--tracking-display)",
              lineHeight: isCompact ? 1.08 : 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              data-ui="cabecalho-hero-subtitulo"
              style={{
                color: "rgba(255,255,255,0.56)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.45,
                fontWeight: 300,
                marginTop: isCompact ? "6px" : "8px",
                letterSpacing: "var(--tracking-copy)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
          {children ? (
            <div
              style={{
                marginTop: subtitle
                  ? isCompact
                    ? "18px"
                    : "24px"
                  : isCompact
                    ? "20px"
                    : "28px",
              }}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
      {right ? (
        <div
          data-ui="cabecalho-hero-acoes"
          style={{
            display: "flex",
            width: isCompact ? "100%" : "auto",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: isCompact ? "6px" : "8px",
          }}
        >
          {right}
        </div>
      ) : null}
    </div>
  );
}

export function SlideSectionHeader({
  accentColor,
  title,
  subtitle,
  right,
}: SlideSectionHeaderProps) {
  const { isCompact } = useDeckViewport();

  return (
    <div
      /* Edita Cabecalho de Evidencia */
      data-ui="cabecalho-secao"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: isCompact ? "stretch" : "flex-start",
        gap: isCompact ? "12px" : "16px",
        flexDirection: isCompact ? "column" : "row",
        flexWrap: "wrap",
      }}
    >
      <div
        data-ui="cabecalho-secao-conteudo"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          minWidth: 0,
          width: isCompact ? "100%" : "auto",
        }}
      >
        {accentColor ? (
          <div
            style={{
              width: "3px",
              height: "20px",
              background: accentColor,
              borderRadius: "999px",
              flexShrink: 0,
            }}
          />
        ) : null}
        <div style={{ minWidth: 0, width: "100%" }}>
          <div
            data-ui="cabecalho-secao-titulo"
            style={{
              color: WHITE,
              fontSize: "var(--titulo-secao)",
              fontWeight: SLIDE_SECTION_TITLE_WEIGHT,
              letterSpacing: "var(--tracking-title)",
              lineHeight: isCompact ? 1.08 : 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              data-ui="cabecalho-secao-subtitulo"
              style={{
                color: "rgba(255,255,255,0.44)",
                fontSize: "var(--rotulo)",
                lineHeight: 1.4,
                marginTop: isCompact ? "4px" : "5px",
                letterSpacing: "var(--tracking-label)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right ? (
        <div
          data-ui="cabecalho-secao-acoes"
          style={{
            display: "flex",
            width: isCompact ? "100%" : "auto",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: isCompact ? "6px" : "8px",
          }}
        >
          {right}
        </div>
      ) : null}
    </div>
  );
}

export function SlideEvidenceHeader({
  accentColor,
  title,
  subtitle,
  badge,
  eyebrow = "Evidências da frente",
  right,
  titleMaxWidth = "920px",
}: SlideEvidenceHeaderProps) {
  const { isCompact } = useDeckViewport();

  return (
    <div
      data-ui="cabecalho-evidencia"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: isCompact ? "stretch" : "flex-start",
        gap: isCompact ? "16px" : "22px",
        flexDirection: isCompact ? "column" : "row",
        flexWrap: "wrap",
      }}
    >
      <div
        data-ui="cabecalho-evidencia-conteudo"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: isCompact ? "12px" : "14px",
          minWidth: 0,
          width: isCompact ? "100%" : "auto",
        }}
      >
        <div
          style={{
            width: "3px",
            height: isCompact ? "20px" : "24px",
            background: accentColor,
            borderRadius: "999px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
        <div
          style={{
            minWidth: 0,
            maxWidth: isCompact ? "100%" : titleMaxWidth,
            width: "100%",
          }}
        >
          <div
            data-ui="cabecalho-evidencia-rotulo"
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "var(--rotulo)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            data-ui="cabecalho-evidencia-linha-titulo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: isCompact ? "8px" : "10px",
              flexWrap: "wrap",
              marginTop: isCompact ? "5px" : "6px",
            }}
          >
            <div
              data-ui="cabecalho-evidencia-titulo"
              style={{
                color: WHITE,
                fontSize: "var(--titulo-secao)",
                fontWeight: SLIDE_SECTION_TITLE_WEIGHT,
                letterSpacing: "var(--tracking-title)",
                lineHeight: isCompact ? 1.08 : 1.12,
              }}
            >
              {title}
            </div>
            {badge ? (
              <div
                data-ui="cabecalho-evidencia-badge"
                style={{ flex: "0 0 auto" }}
              >
                {badge}
              </div>
            ) : null}
          </div>
          {subtitle ? (
            <div
              data-ui="cabecalho-evidencia-subtitulo"
              style={{
                color: "rgba(255,255,255,0.48)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.5,
                marginTop: isCompact ? "8px" : "10px",
                maxWidth: "780px",
                letterSpacing: "var(--tracking-copy)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right ? (
        <div
          data-ui="cabecalho-evidencia-acoes"
          style={{
            display: "flex",
            width: isCompact ? "100%" : "auto",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: isCompact ? "6px" : "8px",
          }}
        >
          {right}
        </div>
      ) : null}
    </div>
  );
}
