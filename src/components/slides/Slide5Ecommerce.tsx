import { motion } from "motion/react";
import { AnimatedNumber } from "../AnimatedNumber";
import {
  CLUSTERS,
  BG,
  CARD_BG,
  CARD_BORDER,
  WHITE,
  GREEN,
  RED,
} from "../theme";
import {
  MediaAcquisitionSection,
  collectStatusCounts,
  mediaSlots,
  type MediaAcquisitionItem,
} from "./sharedMediaAcquisition";
import {
  ConversionExperienceSection,
  type ConversionExperienceItem,
} from "./sharedConversionExperience";
import {
  DeckPill,
  KpiActionGroup,
  SlideHeroHeader,
  ACTIVE_REPORT_WEEK,
  deckCardPresets,
  deckPillPresets,
  cloneReportSnapshot,
  useDeckViewport,
} from "./sharedDeckTypography";
import { ImageViewer } from "./ImageViewer";

interface Props {
  isActive: boolean;
}

type Status = "feito" | "pendente" | "bloqueado";
type ClusterTag = "LEADS" | "ACQUISITION" | "CRO" | "CRM" | "E-COMMERCE";
type Tone = "positive" | "negative";

type Comparison = {
  tone: Tone;
  text: string;
  value?: string;
};

type Bullet = {
  tone: Tone;
  text: string;
};

type ActionCard = {
  cluster: ClusterTag;
  status: Status;
  text: string;
};

type MetricCard = {
  title: string;
  value: {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    decimalSeparator?: string;
  };
  subtitle?: string;
  comparisons: Comparison[];
  bullets: Bullet[];
  previousActions: ActionCard[];
  weekActions: ActionCard[];
  hideValue?: boolean;
};

const action = (
  cluster: ClusterTag,
  status: Status,
  text: string,
): ActionCard => ({ cluster, status, text });
const bullet = (tone: Tone, text: string): Bullet => ({ tone, text });
const comparison = (tone: Tone, text: string, value?: string): Comparison => ({
  tone,
  text,
  value,
});

const topMetrics: MetricCard[] = [
  {
    title: "SESSÕES",
    value: { target: 294783 },
    subtitle: "Total de visitas no período",
    comparisons: [
      comparison("positive", "MoM", "272.934 (+8%)"),
      comparison("negative", "YoY", "346.203 (-15%)"),
    ],
    bullets: [
      bullet(
        "positive",
        "Leve aumento de sessões em virtude de campanhas de tráfego. O Objetivo era trazer uma audiência diferente daquela que a gente vinha impactando seguidamente",
      ),
    ],
    previousActions: [
      action("ACQUISITION", "feito", "Campanhas de tráfego em Meta Ads com o objetivo de trazer tráfego qualificado"),
      action("CRO", "feito", "Aumento das campanhas de Remarketing também em meta para manter o fluxo em todas as etapas do funil"),
    ],
    weekActions: [],
  },
  {
    title: "TAXA DE CONVERSÃO",
    value: { target: 0.62, suffix: "%", decimals: 2 },
    subtitle: "Abaixo do benchmark esperado",
    comparisons: [
      comparison("positive", "MoM", "0,56% (+0.06p.p)"),
      comparison("negative", "YoY", "0,85% (-0.23p.p)"),
    ],
    bullets: [
      bullet(
        "positive",
        "Leve aumento da Taxa de conversão frente ao último mês. LPs de Chance única, Semana do consumidor e outras estratégias de varejo ajudaram a aumentar este indicador",
      ),
      bullet(
        "negative",
        "Taxa de conversão baixa frente ao histórico do ecommerce. Precisamos aumentar a fiscalização sobre o frete",
      ),
    ],
    previousActions: [
      action("ACQUISITION", "feito", "LISTA DE PUBLICOS ALVO PARA CAMPANHAS GERAIS E DE CATEGORIA"),
      action("CRO", "feito", "CONSTRUÇÃO DE AUDIÊNCIAS PERSONALIZADAS PARA O ECOMM"),
      action("CRM", "feito", "INSLUSÃO DE SELOS CHANCE ÚNICA, LANÇAMENTOS, EXCLUSIVOS"),
      action("CRM", "pendente", "DISPAROS DE E-MAIL MARKETING PROMOCIONAL E CARRINHO ABANDONADO"),
    ],
    weekActions: [
      action("CRO", "pendente", "SPLIT DE PEDIDOS, REGIONALIZAÇÃO DE PREÇOS, EVOLUÇÃO DO BOT"),
    ],
  },
  {
    title: "RECEITA CAPTADA",
    value: { target: 1.53, suffix: "M", decimals: 2 },
    comparisons: [
      comparison("positive", "MoM", "1,44M (+6%)"),
      comparison("negative", "YoY", "2,25M (-32%)"),
    ],
    bullets: [],
    previousActions: [],
    weekActions: [],
  },
  {
    title: "INVESTIMENTO",
    value: { target: 109.1, suffix: "K", decimals: 1 },
    comparisons: [
      comparison("negative", "MoM", "121K (-10%)"),
      comparison("negative", "YoY", "269K (-59,4%)"),
    ],
    bullets: [],
    previousActions: [],
    weekActions: [],
  },
];

const bottomMetrics: MetricCard[] = [
  {
    title: "ROAS",
    value: { target: 14.02, decimals: 2 },
    comparisons: [
      comparison("positive", "MoM", "11,9"),
      comparison("positive", "YoY", "8,36"),
    ],
    bullets: [],
    previousActions: [],
    weekActions: [],
  },
  {
    title: "TICKET MÉDIO",
    value: { target: 820.66, prefix: "R$", decimals: 2 },
    comparisons: [comparison("positive", "MoM", "R$1012,23")],
    bullets: [
      bullet("positive", "Ticket médio aumento aproximadamente 15% em relação a última semana"),
      bullet("negative", "Ticket abaixo da nossa média. Nosso canal ainda está dependente dos produtos que mais vendiam e que hoje não estão disponíveis mais"),
    ],
    previousActions: [action("CRO", "feito", "Compre Junto cadastrados")],
    weekActions: [action("CRO", "pendente", "Fazer estudo sobre outras opções de compre junto")],
  },
  {
    title: "PEDIDOS",
    value: { target: 0 },
    comparisons: [],
    bullets: [],
    previousActions: [],
    weekActions: [],
    hideValue: true,
  },
];

const ecommerceReportSnapshots = {
  week13: {
    topMetrics,
    bottomMetrics,
  },
  // Editar esta cÃ³pia quando a semana ativa mudar.
  week14: {
    topMetrics: cloneReportSnapshot(topMetrics),
    bottomMetrics: cloneReportSnapshot(bottomMetrics),
  },
} as const;

const activeEcommerceReport = ecommerceReportSnapshots[ACTIVE_REPORT_WEEK];

const statusCounts = collectStatusCounts(
  [...activeEcommerceReport.topMetrics, ...activeEcommerceReport.bottomMetrics].flatMap((item) => [
    ...item.previousActions,
    ...item.weekActions,
  ]),
);

const tokenPalette: Record<
  ClusterTag,
  { color: string; background: string; border: string }
> = {
  LEADS: {
    color: "#7DD3FC",
    background: "rgba(125, 211, 252, 0.07)",
    border: "rgba(125, 211, 252, 0.22)",
  },
  ACQUISITION: {
    color: "#A78BFA",
    background: "rgba(167, 139, 250, 0.07)",
    border: "rgba(167, 139, 250, 0.22)",
  },
  CRO: {
    color: "#60A5FA",
    background: "rgba(96, 165, 250, 0.07)",
    border: "rgba(96, 165, 250, 0.22)",
  },
  CRM: {
    color: "#2DD4BF",
    background: "rgba(45, 212, 191, 0.07)",
    border: "rgba(45, 212, 191, 0.22)",
  },
  "E-COMMERCE": {
    color: CLUSTERS.ECOMMERCE,
    background: "rgba(252, 165, 165, 0.07)",
    border: "rgba(252, 165, 165, 0.22)",
  },
};

const statusPalette: Record<
  Status,
  { label: string; color: string; background: string; border: string }
> = {
  feito: {
    label: "Feito",
    color: "#86EFAC",
    background: "rgba(134, 239, 172, 0.06)",
    border: "rgba(134, 239, 172, 0.14)",
  },
  pendente: {
    label: "Pendente",
    color: "#FCD34D",
    background: "rgba(252, 211, 77, 0.06)",
    border: "rgba(252, 211, 77, 0.14)",
  },
  bloqueado: {
    label: "Bloqueado",
    color: "#FCA5A5",
    background: "rgba(252, 165, 165, 0.06)",
    border: "rgba(252, 165, 165, 0.14)",
  },
};

const googleShoppingLogoUrl =
  "https://www.gstatic.com/images/branding/product/2x/shopping_48dp.png";

const TokenTag = ({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) => {
  const palette = tokenPalette[label as ClusterTag] ?? {
    color: "rgba(255,255,255,0.72)",
    background: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)",
  };

  return (
    <DeckPill
      label={label}
      compact={compact}
      preset={deckPillPresets.tokenMeta}
      palette={palette}
    />
  );
};

const StatusPill = ({ status }: { status: Status }) => {
  const palette = statusPalette[status];

  return (
    <DeckPill
      label={palette.label}
      palette={palette}
      compact
      preset={deckPillPresets.status}
      style={{ fontWeight: 800 }}
    />
  );
};

const StatusCounter = ({
  status,
  count,
  isActive,
  compact = false,
}: {
  status: Status;
  count: number;
  isActive: boolean;
  compact?: boolean;
}) => {
  const palette = statusPalette[status];

  return (
    <div
      data-ui="contador-status-ecommerce"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "8px" : "10px",
        padding: compact ? "6px 10px" : "7px 12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.018)",
        border: `1px solid ${CARD_BORDER}`,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: palette.color,
          fontSize: "var(--paragrafo)",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "999px",
            background: palette.color,
            flexShrink: 0,
          }}
        />
        {palette.label}
      </span>
      <span
        style={{
          color: WHITE,
          fontSize: "var(--paragrafo-grande)",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        <AnimatedNumber target={count} isActive={isActive} duration={900} />
      </span>
    </div>
  );
};

const GoogleShoppingBadge = () => (
  <div
    /* Edita Bloco de Objetivo */
    data-ui="ecommerce-bloco-objetivo"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 9px",
      borderRadius: "8px",
      background: "#FFFFFF",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.22)",
      flexShrink: 0,
    }}
  >
    <img
      src={googleShoppingLogoUrl}
      alt="Google Shopping"
      style={{
        width: "22px",
        height: "22px",
        objectFit: "contain",
        display: "block",
      }}
    />
    <span
      style={{
        color: "#161616",
        fontSize: "var(--rotulo)",
        fontWeight: 900,
        letterSpacing: "var(--tracking-label)",
        lineHeight: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Google Shopping
    </span>
  </div>
);

const MetricCardView = ({
  item,
  isActive,
  compact = false,
}: {
  item: MetricCard;
  isActive: boolean;
  compact?: boolean;
}) => (
  <motion.article
  data-ui="card-metrica-ecommerce"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  style={deckCardPresets.metric(compact, "default", "subtle")}
  >
    <div
      data-ui="kpi-card-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: compact ? "stretch" : "flex-start",
        flexDirection: compact ? "column" : "row",
      }}
    >
      <div
        data-ui="kpi-card-title"
        style={{
          color: "rgba(255,255,255,0.46)",
          fontSize: "var(--paragrafo)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </div>
      <div data-ui="kpi-card-date">
        <TokenTag label="Mar/2026" compact />
      </div>
    </div>

    {!item.hideValue && (
      <div
        data-ui="kpi-card-value"
        style={{
          fontSize: "var(--titulo-pagina)",
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: "var(--tracking-display)",
          color: WHITE,
        }}
      >
        <AnimatedNumber
          target={item.value.target}
          prefix={item.value.prefix}
          suffix={item.value.suffix}
          decimals={item.value.decimals}
          decimalSeparator={item.value.decimalSeparator}
          isActive={isActive}
          duration={3000}
        />
      </div>
    )}

    {item.subtitle && (
      <div
        data-ui="kpi-card-subtitle"
        style={{
          color: "rgba(255,255,255,0.56)",
          fontSize: "var(--paragrafo)",
          lineHeight: 1.45,
          fontWeight: 400,
        }}
      >
        {item.subtitle}
      </div>
    )}

    <div data-ui="kpi-card-comparisons" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {item.comparisons.map((row, index) => {
        const activeColor = row.tone === "positive" ? GREEN : RED;
        const hasValue = Boolean(row.value);

        return (
          <div
            key={`${row.text}-${index}`}
            /* Edita Linha de Comparacao */
            data-ui="linha-comparacao-ecommerce"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: hasValue ? "space-between" : "flex-start",
              gap: "12px",
              padding: compact ? "11px 14px" : "13px 18px",
              borderRadius: "10px",
              background:
                row.tone === "positive"
                  ? "rgba(34, 197, 94, 0.08)"
                  : "rgba(255, 82, 82, 0.10)",
              border: `1px solid ${row.tone === "positive" ? "rgba(34, 197, 94, 0.22)" : "rgba(255, 82, 82, 0.22)"}`,
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            <div
              data-ui="kpi-card-comparison-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.84)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.35,
                minWidth: 0,
                flex: "1 1 auto",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: activeColor,
                  flexShrink: 0,
                }}
              />
              {row.text}
            </div>
            {hasValue && (
              <div
                data-ui="kpi-card-comparison-value"
                style={{
                  paddingLeft: compact ? 0 : "12px",
                  borderLeft: compact ? "none" : `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: "var(--paragrafo)",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  flex: "0 0 auto",
                }}
              >
                {row.value}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div
      data-ui="kpi-card-readings"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingTop: compact ? "18px" : "20px",
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.50)",
          fontSize: "var(--rotulo)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        Leituras
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: compact ? "12px" : "14px",
        }}
      >
        {item.bullets.map((row, index) => (
          <div
            key={`${row.text}-${index}`}
            data-ui="kpi-card-reading"
            style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
          >
            <span
              style={{
                marginTop: "7px",
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: row.tone === "positive" ? GREEN : RED,
                flexShrink: 0,
              }}
            />
            <div
              data-ui="kpi-card-reading-text"
              style={{
                color: "rgba(255,255,255,0.74)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.45,
              }}
            >
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    {item.previousActions.length > 0 ? (
      <div data-ui="kpi-card-actions-previous">
        <KpiActionGroup actions={item.previousActions} compact={compact} label="AÃ§Ãµes da semana anterior" variant="previous" surface="solid" actionGap={12} />
      </div>
    ) : null}

    {item.weekActions.length > 0 ? (
      <div data-ui="kpi-card-actions-week">
        <KpiActionGroup actions={item.weekActions} compact={compact} label="AÃ§Ã£o na semana" variant="week" surface="solid" actionGap={12} />
      </div>
    ) : null}
  </motion.article>
);

const mediaEfficiencyCard = {
  comparisons: [comparison("negative", "vs 16.0 potencial", "âˆ’31%")],
  bullets: [
    bullet(
      "negative",
      "DÃ©ficit de competitividade em categorias core no Google Shopping.",
    ),
    bullet(
      "negative",
      "Queda acentuada do Ticket MÃ©dio e instabilidade de mix de ofertas.",
    ),
  ],
  weekActions: [
    action(
      "ACQUISITION",
      "pendente",
      "Drill down por campanha e otimizaÃ§Ã£o do feed de Google Shopping para recuperar ROAS.",
    ),
  ],
  value: { target: 11 },
  subtitle: "Gap de ROAS Global",
};

const MediaEfficiencyCardView = ({
  isActive,
  compact = false,
}: {
  isActive: boolean;
  compact?: boolean;
}) => (
  <motion.article
    /* Edita Card de Evidencia */
  data-ui="card-eficiencia-ecommerce"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  style={{
      ...deckCardPresets.metric(compact, "default", "subtle"),
      minHeight: undefined,
    }}
  >
    <div
      data-ui="kpi-card-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        alignItems: compact ? "stretch" : "center",
        flexWrap: "wrap",
        flexDirection: compact ? "column" : "row",
      }}
    >
      <div
        data-ui="kpi-card-title"
        style={{
          color: "rgba(255,255,255,0.46)",
          fontSize: "var(--paragrafo)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
        }}
      >
        EficiÃªncia de MÃ­dia
      </div>
      <div
        data-ui="kpi-card-date"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: compact ? "flex-start" : "flex-end",
        }}
      >
        <TokenTag label="Mar/2026" compact />
        <GoogleShoppingBadge />
      </div>
    </div>

    <div
      data-ui="kpi-card-value"
      style={{
        fontSize: "var(--titulo-pagina)",
        lineHeight: 1,
        fontWeight: 800,
        letterSpacing: "var(--tracking-display)",
        color: WHITE,
      }}
    >
      <AnimatedNumber
        target={mediaEfficiencyCard.value.target}
        isActive={isActive}
        duration={3000}
      />
    </div>

    {mediaEfficiencyCard.subtitle && (
      <div
        data-ui="kpi-card-subtitle"
        style={{
          color: "rgba(255,255,255,0.56)",
          fontSize: "var(--paragrafo)",
          lineHeight: 1.45,
          fontWeight: 400,
        }}
      >
        {mediaEfficiencyCard.subtitle}
      </div>
    )}

    <div data-ui="kpi-card-comparisons" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {mediaEfficiencyCard.comparisons.map((row, index) => {
        const activeColor = row.tone === "positive" ? GREEN : RED;
        const hasValue = Boolean(row.value);

        return (
          <div
            key={`${row.text}-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: hasValue ? "space-between" : "flex-start",
              gap: "12px",
              padding: compact ? "11px 14px" : "13px 18px",
              borderRadius: "10px",
              background: "rgba(255, 82, 82, 0.10)",
              border: "1px solid rgba(255, 82, 82, 0.22)",
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            <div
              data-ui="kpi-card-comparison-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255,255,255,0.84)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.35,
                minWidth: 0,
                flex: "1 1 auto",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: activeColor,
                  flexShrink: 0,
                }}
              />
              {row.text}
            </div>
            {hasValue && (
              <div
                data-ui="kpi-card-comparison-value"
                style={{
                  paddingLeft: compact ? 0 : "12px",
                  borderLeft: compact ? "none" : `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: "var(--paragrafo)",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  flex: "0 0 auto",
                }}
              >
                {row.value}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div
      data-ui="kpi-card-readings"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingTop: "18px",
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.50)",
          fontSize: "var(--rotulo)",
          fontWeight: 800,
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Leituras
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {mediaEfficiencyCard.bullets.map((row, index) => (
          <div
            key={`${row.text}-${index}`}
            data-ui="kpi-card-reading"
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <span
              style={{
                marginTop: "7px",
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: row.tone === "positive" ? GREEN : RED,
                flexShrink: 0,
              }}
            />
            <div
              data-ui="kpi-card-reading-text"
              style={{
                color: "rgba(255,255,255,0.74)",
                fontSize: "var(--paragrafo)",
                lineHeight: 1.45,
              }}
            >
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div data-ui="kpi-card-actions-week">
      <KpiActionGroup actions={mediaEfficiencyCard.weekActions} compact={compact} label="AÃ§Ã£o na semana" variant="week" surface="solid" actionGap={10} />
    </div>
  </motion.article>
);

type EvidenceItem = ConversionExperienceItem;

const frontEvidenceItems: EvidenceItem[] = [
  {
    title: "LP Interna Semana do Consumidor",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Estruturar a LP para fortalecer a hierarquia de conversÃ£o, organizar a navegaÃ§Ã£o por clusters, ampliar a exposiÃ§Ã£o comercial das ofertas e incorporar novas vitrines, sustentando a estratÃ©gia de remarketing com Feed de Oferta RelÃ¢mpago, countdown e demais vieses de urgÃªncia, escassez e retomada de intenÃ§Ã£o de compra.",
    objectiveKpis: ["ConversÃ£o"],
    desktopImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/semana-consumidor-desk.png?v=202603301522",
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/mes-consumidor-mobile.png?v=202603301523",
    imageLabel: "Landing Page",
    imageHeight: 300,
  },
  {
    title: "LP Interna Chance Ãšnica",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Estruturar a LP para ampliar o senso de urgÃªncia comercial, destacar oferta e desconto, acelerar a entrada do usuÃ¡rio nas vitrines e produtos priorizados e incorporar novas vitrines, reforÃ§ando a estratÃ©gia de remarketing com Feed de Oferta RelÃ¢mpago, countdown e demais vieses de urgÃªncia, escassez e estÃ­mulo Ã  conversÃ£o imediata.",
    objectiveKpis: ["ConversÃ£o"],
    desktopImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/595fd04a2f57291355bfa3c39256501d943983aa.png?v=202603301517",
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png?v=202603301517",
    imageLabel: "Landing Page",
    imageHeight: 300,
  },
  {
    title: "ReformulaÃ§Ã£o Hero Section",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Reformular a hero section para qualificar a entrada da homepage com melhor hierarquia visual, sliders, CTAs mais evidentes, responsividade mobile, evoluÃ§Ã£o da busca com autocomplete, reforÃ§o da rÃ©gua de vantagens no mobile, melhoria dos spots de produtos mobile e correÃ§Ã£o dos selos de campanha para estabilizar a exibiÃ§Ã£o comercial e reduzir atrito na descoberta de produtos.",
    objectiveKpis: ["ConversÃ£o"],
    desktopImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png?v=202603301523",
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png?v=202603301526",
    imageLabel: "Hero Section",
    imageHeight: 300,
  },
  {
    title: "Performance da busca e autocomplete",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Melhorar a performance do componente de busca e do autocomplete para acelerar a localizaÃ§Ã£o de produtos, reduzir atrito na navegaÃ§Ã£o e ampliar a entrada qualificada nas vitrines.",
    objectiveKpis: ["ConversÃ£o"],
    desktopImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/perfoamance-busca.jpg?v=202603292204",
    imageLabel: "Busca e autocomplete",
    imageHeight: 300,
  },
  {
    title: "FormulÃ¡rio WhatsApp Floating",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Estruturar o fluxo do WhatsApp Floating em mobile com mÃ¡scaras corretas, menor perda de preenchimento e integraÃ§Ã£o do lead Ã  Salesforce.",
    objectiveKpis: ["Leads"],
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/formulario-bot.jpg?v=202603292204",
    imageLabel: "WhatsApp Floating",
    imageHeight: 300,
  },
  {
    title: "EvoluÃ§Ãµes de conversÃ£o e usabilidade para PDPs de Pisos",
    tags: ["CRO", "E-COMMERCE"],
    status: "feito",
    objective:
      "Consolidar melhorias de front nas PDPs de Pisos, com ajustes de UI na seÃ§Ã£o product__view, inserÃ§Ã£o do CTA Falar com especialista, inclusÃ£o de elementos complementares de conversÃ£o como badges Livelo e calculadora, alÃ©m da correÃ§Ã£o do evento de clique e da leitura do pop-up de formas de pagamento, reduzindo fricÃ§Ã£o na jornada, qualificando a leitura do produto e reforÃ§ando apoio comercial na decisÃ£o de compra.",
    objectiveKpis: ["ConversÃ£o"],
    desktopImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/pdp-piso-desk.jpg?v=202603301550",
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/pdp-piso-mobi.png?v=202603301550",
    imageLabel: "Landing Page",
    imageHeight: 300,
  },
  {
    title: "Split de entrega no minicart",
    tags: ["CRO", "E-COMMERCE"],
    status: "pendente",
    objective:
      "Exibir o split de entrega no minicart mobile para dar mais clareza sobre prazos e composiÃ§Ã£o do pedido, reduzindo dÃºvida antes da finalizaÃ§Ã£o da compra.",
    objectiveKpis: ["ConversÃ£o"],
    mobileImageLink:
      "https://abcdaconstrucao.fbitsstatic.net/media/minicart2-split.png?v=202603292204",
    imageLabel: "Minicart",
    imageHeight: 300,
  },
];
const ObjectiveBlock = ({
  text,
  compact = false,
}: {
  text: string;
  compact?: boolean;
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.018)",
      padding: compact ? "16px" : "18px",
      borderRadius: "14px",
      border: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <div
      style={{
        color: WHITE,
        fontSize: "var(--rotulo)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-label)",
        marginBottom: compact ? "8px" : "10px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          width: "3px",
          height: "10px",
          background: CLUSTERS.ECOMMERCE,
          borderRadius: "999px",
        }}
      />
      Objetivo da Frente
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

const EvidenceCardView = ({
  item,
  compact = false,
}: {
  item: EvidenceItem;
  compact?: boolean;
}) => {
  const desktopImageLink = item.desktopImageLink ?? item.desktopImage;
  const mobileImageLink = item.mobileImageLink ?? item.mobileImage;
  const hasAnyImage = Boolean(desktopImageLink || mobileImageLink);
  const visibleTags = item.tags.filter(
    (tag) => tag === "CRO" || tag === "ACQUISITION" || tag === "CRM",
  );

  return (
    <motion.article
      data-ui="card-evidencia-ecommerce"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={deckCardPresets.surface(compact)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: compact ? "16px" : "20px",
          padding: compact ? "20px" : "26px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: compact ? "flex-start" : "center",
              gap: compact ? "10px" : "12px",
              flexWrap: "wrap",
              flexDirection: compact ? "column" : "row",
            }}
          >
            <div
              style={{
                color: WHITE,
                fontSize: "var(--paragrafo-grande)",
                fontWeight: 700,
                marginBottom: "0",
                lineHeight: 1.35,
              }}
            >
              {item.title}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {visibleTags.map((tag) => (
                <TokenTag key={`${item.title}-${tag}`} label={tag} compact />
              ))}
            </div>
          </div>
          <div style={{ alignSelf: "flex-start" }}>
            <StatusPill status={item.status} />
          </div>
        </div>

        {hasAnyImage ? (
          <ImageViewer
            id={item.title}
            desktopImageLink={desktopImageLink}
            mobileImageLink={mobileImageLink}
            alt={item.title}
            height={item.imageHeight ?? 240}
            label={item.imageLabel}
            fullWidth={true}
          />
        ) : null}

        <ObjectiveBlock text={item.objective} compact={compact} />
      </div>
    </motion.article>
  );
};

const ecommerceMediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: "KVs do MÃªs do Consumidor + ativaÃ§Ãµes em andamento atÃ© 31/03",
    description:
      "KVs institucionais e ativaÃ§Ãµes em andamento para sustentar a janela do MÃªs do Consumidor atÃ© 31/03.",
    tags: ["ACQUISITION", "E-COMMERCE"],
    objectiveKpis: ["ROAS"],
    status: "feito",
    media: mediaSlots(
      "https://abcdaconstrucao.fbitsstatic.net/media/abc_mc_institucional_horizontal-5.png?v=202603271517",
    ),
    accent: CLUSTERS.ACQUISITION,
  },
  {
    title:
      "AtualizaÃ§Ã£o de criativos PMAX para pisos e paredes e chuveiros Lorenzetti",
    description:
      "AtualizaÃ§Ã£o de criativos PMAX para reforÃ§ar cobertura de categoria e ampliar performance em pisos, paredes e chuveiros Lorenzetti.",
    tags: ["ACQUISITION", "E-COMMERCE"],
    objectiveKpis: ["ROAS"],
    status: "feito",
    media: mediaSlots(
      "https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-paredes_quadrado-3.png?v=202603271517",
    ),
    accent: CLUSTERS.ACQUISITION,
  },
  {
    title:
      "Criativos â€œSuper Chance Ãšnicaâ€ (e-commerce) + campanhas relÃ¢mpago Deca (oportunidade)",
    description:
      "Pacote de criativos para Super Chance Ãšnica e campanhas relÃ¢mpago Deca com foco em oportunidade e aceleraÃ§Ã£o de pedidos.",
    tags: ["ACQUISITION", "E-COMMERCE"],
    objectiveKpis: ["Receita"],
    status: "feito",
    media: mediaSlots(
      "https://abcdaconstrucao.fbitsstatic.net/media/abc_tanque_quadrado-1-(1).png?v=202603271517",
      "https://abcdaconstrucao.fbitsstatic.net/media/abc_campanha-relÃ¢mpago-deca_quadrado-2.png?v=202603271517",
    ),
    accent: CLUSTERS.ACQUISITION,
  },
  {
    title:
      "KVs diÃ¡rios para a Semana do Consumidor, incluindo campanha dedicada da Docol.",
    description:
      "KVs diÃ¡rios da Semana do Consumidor e campanha dedicada da Docol para manter frequÃªncia e conversÃ£o ao longo da janela promocional.",
    tags: ["ACQUISITION", "E-COMMERCE"],
    objectiveKpis: ["ConversÃ£o"],
    status: "feito",
    media: mediaSlots(
      "https://abcdaconstrucao.fbitsstatic.net/media/[abc]-campanha-docol_retrato-4.png?v=202603271510",
      "https://abcdaconstrucao.fbitsstatic.net/media/abc_mc_produtos-foco_retrato-4-1.png?v=202603271517",
    ),
    accent: CLUSTERS.ACQUISITION,
  },
];

export function Slide5Ecommerce({ isActive }: Props) {
  const clusterColor = CLUSTERS.ECOMMERCE;
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div
      data-ui="ecommerce-root"
      style={{
        minHeight: "100vh",
        background: BG,
        padding: isMobile
          ? "128px 16px 48px"
          : isCompact
            ? "124px 24px 64px"
            : "140px clamp(40px, 8vw, 100px) 80px",
        display: "flex",
        flexDirection: "column",
        gap: isCompact ? "40px" : "60px",
      }}
    >
      {/* 1. Hero */}
      <section data-ui="ecommerce-hero">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SlideHeroHeader
            accentColor={clusterColor}
            title="Visão de Funil — E-commerce"
            right={
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <StatusCounter
                  status="feito"
                  count={statusCounts.feito}
                  isActive={isActive}
                  compact={isCompact}
                />
                <StatusCounter
                  status="pendente"
                  count={statusCounts.pendente}
                  isActive={isActive}
                  compact={isCompact}
                />
                <StatusCounter
                  status="bloqueado"
                  count={statusCounts.bloqueado}
                  isActive={isActive}
                  compact={isCompact}
                />
              </div>
            }
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <TokenTag label="CRO" compact />
              <TokenTag label="ACQUISITION" compact />
              <TokenTag label="CRM" compact />
            </div>
          </SlideHeroHeader>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isCompact ? "18px" : "22px",
            marginTop: isCompact ? "24px" : "36px",
          }}
        >
          <div
            data-ui="ecommerce-metricas-principais"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isCompact
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
              gap: isCompact ? "14px" : "18px",
            }}
          >
            {activeEcommerceReport.topMetrics.map((item) => (
              <MetricCardView
                key={item.title}
                item={item}
                isActive={isActive}
                compact={isCompact}
              />
            ))}
          </div>

            <div
              data-ui="ecommerce-metricas-secundarias"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                ? "1fr"
                : isCompact
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
              gap: isCompact ? "14px" : "18px",
            }}
          >
            {activeEcommerceReport.bottomMetrics.map((item) => (
              <MetricCardView
                key={item.title}
                item={item}
                isActive={isActive}
                compact={isCompact}
              />
            ))}
            <MediaEfficiencyCardView isActive={isActive} compact={isCompact} />
          </div>
        </div>
      </section>

      <div data-ui="ecommerce-secao-evidencias">
        <ConversionExperienceSection items={frontEvidenceItems} />
      </div>

      <div data-ui="ecommerce-secao-midias">
        <MediaAcquisitionSection items={ecommerceMediaAcquisitionItems} />
      </div>
    </div>
  );
}


