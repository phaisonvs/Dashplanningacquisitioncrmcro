import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, WHITE, GREEN, RED } from '../theme';
import { ConversionExperienceSection } from './sharedConversionExperience';
import {
  DeckPill,
  KpiActionGroup,
  SlideHeroHeader,
  ACTIVE_REPORT_WEEK,
  deckCardPresets,
  deckPillPresets,
  cloneReportSnapshot,
  useDeckViewport,
} from './sharedDeckTypography';
import {
  MediaAcquisitionSection,
  collectStatusCounts,
  mediaSlots,
  type MediaAcquisitionItem,
} from './sharedMediaAcquisition';

interface Props {
  isActive: boolean;
}

type Status = 'feito' | 'pendente' | 'bloqueado';
type ClusterTag = 'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM';
type Tone = 'positive' | 'negative';

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
  dateTag: string;
  value: {
    target: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  };
  comparisons: Comparison[];
  bullets: Bullet[];
  previousActions: ActionCard[];
  weekActions: ActionCard[];
};

const action = (cluster: ClusterTag, status: Status, text: string): ActionCard => ({ cluster, status, text });
const bullet = (tone: Tone, text: string): Bullet => ({ tone, text });
const comparison = (tone: Tone, text: string, value?: string): Comparison => ({ tone, text, value });

const expansionMetrics: MetricCard[] = [
  {
    title: 'LEADS QUALIFICADOS',
    dateTag: 'Mar/2026',
    value: { target: 149 },
    comparisons: [
      comparison('positive', 'base suficiente para expansão controlada'),
      comparison('negative', 'volume ainda concentrado em poucas frentes'),
    ],
    bullets: [
      bullet('positive', 'A base de leads qualificados sustenta a frente de expansão com clareza de intenção.'),
      bullet('negative', 'A operação ainda depende de poucos canais e de cadência comercial consistente.'),
    ],
    previousActions: [
      action('ACQUISITION', 'feito', 'Estratégia "Oportunidade por Praça" (Gatilho Escassez)'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Ativação de estratégia LinkedIn Ads (Perfis B2B)'),
    ],
  },
  {
    title: 'APRESENTAÇÕES',
    dateTag: 'Mar/2026',
    value: { target: 9 },
    comparisons: [
      comparison('positive', 'taxa de avanço de 6%'),
      comparison('negative', 'escala ainda limitada pelo volume de entrada'),
    ],
    bullets: [
      bullet('positive', 'O avanço para apresentações mostra boa qualificação inicial da demanda.'),
      bullet('negative', 'O volume ainda não é suficiente para acelerar fechamento sem ampliar aquisição.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Fluxo D0, D2, D5 para leads não convertidos'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Nova LP focada em conversão e persona "Executivo"'),
    ],
  },
  {
    title: 'OPORTUNIDADES',
    dateTag: 'Mar/2026',
    value: { target: 6 },
    comparisons: [
      comparison('positive', 'taxa de avanço de 66%'),
      comparison('positive', 'sinal claro de qualificação comercial'),
    ],
    bullets: [
      bullet('positive', 'A conversão de apresentação para oportunidade segue como o melhor sinal da frente.'),
      bullet('negative', 'Ainda existe espaço para ampliar a geração de oportunidade em pipeline maior.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Destaque de leads com maior intenção via CRM e follow-up ativo'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Teste de formulário multi-step vs simples'),
    ],
  },
  {
    title: 'CONTRATOS FECHADOS',
    dateTag: 'Mar/2026',
    value: { target: 0 },
    comparisons: [
      comparison('negative', 'fechamento ainda não capturado no recorte atual'),
      comparison('positive', 'pipeline pronto para ativação comercial mais agressiva'),
    ],
    bullets: [
      bullet('negative', 'O volume atual ainda não converteu em contratos fechados.'),
      bullet('positive', 'A disciplina de aquisição e CRM cria a base para destravar o fechamento.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Reforço de nutrição e reaquecimento de leads parados'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Novas campanhas de B2B e reativação via CRM'),
    ],
  },
];

const conversionExperienceItems = [
  {
    title: 'Oportunidade por Praça',
    tags: ['ACQUISITION', 'LEADS', 'CRM'] as const,
    status: 'feito' as const,
    objective: 'A frente combina sinal de escassez territorial com qualificação comercial para gerar pipeline mais profundo e previsível.',
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
  {
    title: 'Ativação LinkedIn Ads',
    tags: ['ACQUISITION', 'CRO'] as const,
    status: 'pendente' as const,
    objective: 'A ativação de B2B precisa aumentar a densidade do topo com segmentação mais precisa e mensagem executiva.',
    imageLabel: 'Creative',
    imageHeight: 240,
  },
  {
    title: 'Fluxo D0, D2, D5',
    tags: ['CRM', 'LEADS'] as const,
    status: 'feito' as const,
    objective: 'A régua comercial em janelas curtas mantém o lead aquecido e reduz perda entre intenção e oportunidade.',
    imageLabel: 'Journey',
    imageHeight: 240,
  },
  {
    title: 'LP Executiva para Expansão',
    tags: ['CRO', 'LEADS', 'ACQUISITION'] as const,
    status: 'pendente' as const,
    objective: 'A LP precisa concentrar a proposta de valor da expansão e acelerar leitura de qualificação para a próxima conversa.',
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
] satisfies Array<{
  title: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM'>;
  status: 'feito' | 'pendente' | 'bloqueado';
  objective: string;
  desktopImageLink?: string;
  mobileImageLink?: string;
  desktopImage?: string;
  mobileImage?: string;
  imageLabel: string;
  imageHeight?: number;
}>;

const expansionMediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: 'KVs de EXP focado em geolocalização (cidades que queremos entrar e grandes cidades)',
    description:
      'Peças de expansão com geolocalização para reforçar praças prioritárias, ampliar relevância regional e captar demanda qualificada.',
    objectiveKpis: ['Leads'],
    tags: ['LEADS', 'ACQUISITION', 'CRO'],
    status: 'feito',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_expansão_quadrado-1-c1-(10).png?v=202603271510',
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_expansão_quadrado-1-c1-(2).png?v=202603271510',
    ),
    accent: CLUSTERS.ACQUISITION,
  },
];

const expansionReportSnapshots = {
  week13: {
    expansionMetrics,
    conversionExperienceItems,
  },
  // Editar esta cópia quando a semana ativa mudar.
  week14: {
    expansionMetrics: cloneReportSnapshot(expansionMetrics),
    conversionExperienceItems: cloneReportSnapshot(conversionExperienceItems),
  },
} as const;

const activeExpansionReport = expansionReportSnapshots[ACTIVE_REPORT_WEEK];

const statusCounts = collectStatusCounts(
  ...activeExpansionReport.expansionMetrics.map((item) => [...item.previousActions, ...item.weekActions]),
);

const tokenPalette: Record<ClusterTag, { color: string; background: string; border: string }> = {
  LEADS: { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.08)', border: 'rgba(125, 211, 252, 0.22)' },
  ACQUISITION: { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.22)' },
  CRO: { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.22)' },
  CRM: { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.22)' },
};

const statusPalette: Record<Status, { label: string; color: string; background: string; border: string }> = {
  feito: { label: 'Feito', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.06)', border: 'rgba(74, 222, 128, 0.16)' },
  pendente: { label: 'Pendente', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.06)', border: 'rgba(251, 191, 36, 0.16)' },
  bloqueado: { label: 'Bloqueado', color: '#F87171', background: 'rgba(248, 113, 113, 0.06)', border: 'rgba(248, 113, 113, 0.16)' },
};

const TokenTag = ({ label, compact = false }: { label: string; compact?: boolean }) => {
  const palette = tokenPalette[label as ClusterTag] ?? {
    color: 'rgba(255,255,255,0.72)',
    background: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.08)',
  };

  return <DeckPill label={label} compact={compact} preset={deckPillPresets.tokenMeta} palette={palette} />;
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
      /* Edita Contador de Status */
      data-ui="contador-status-expansao"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? '8px' : '10px',
        padding: compact ? '6px 10px' : '7px 12px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: palette.color, fontSize: 'var(--paragrafo)', fontWeight: 700, lineHeight: 1 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: palette.color, flexShrink: 0 }} />
        {palette.label}
      </span>
      <span style={{ color: WHITE, fontSize: 'var(--paragrafo-grande)', fontWeight: 800, lineHeight: 1 }}>
        <AnimatedNumber target={count} isActive={isActive} duration={900} />
      </span>
    </div>
  );
};

const MetricCardView = ({ item, isActive, compact = false }: { item: MetricCard; isActive: boolean; compact?: boolean }) => (
  <motion.article
    data-ui="card-metrica-expansao"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={deckCardPresets.metric(compact)}
  >
    <div data-ui="kpi-card-header" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: compact ? 'stretch' : 'flex-start', flexDirection: compact ? 'column' : 'row' }}>
      <div data-ui="kpi-card-title" style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'var(--paragrafo)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>
        {item.title}
      </div>
      <div data-ui="kpi-card-date">
        <TokenTag label={item.dateTag} compact />
      </div>
    </div>

    <div data-ui="kpi-card-value" style={{ fontSize: 'var(--titulo-pagina)', lineHeight: 1, fontWeight: 800, letterSpacing: 'var(--tracking-display)', color: WHITE }}>
      <AnimatedNumber
        target={item.value.target}
        prefix={item.value.prefix}
        suffix={item.value.suffix}
        decimals={item.value.decimals}
        isActive={isActive}
        duration={3000}
      />
    </div>

    <div data-ui="kpi-card-comparisons" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {item.comparisons.map((row, index) => {
        const activeColor = row.tone === 'positive' ? GREEN : RED;
        const hasValue = Boolean(row.value);

        return (
          <div
            key={`${row.text}-${index}`}
            /* Edita Linha de Comparacao */
            data-ui="linha-comparacao-expansao"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: hasValue ? 'space-between' : 'flex-start',
              gap: '12px',
              padding: compact ? '11px 14px' : '13px 18px',
              borderRadius: '10px',
              background: row.tone === 'positive' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 82, 82, 0.10)',
              border: `1px solid ${row.tone === 'positive' ? 'rgba(34, 197, 94, 0.24)' : 'rgba(255, 82, 82, 0.24)'}`,
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }}
          >
            <div data-ui="kpi-card-comparison-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: 'var(--paragrafo)', lineHeight: 1.35, minWidth: 0, flex: '1 1 auto' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div
                data-ui="kpi-card-comparison-value"
                style={{
                  paddingLeft: compact ? 0 : '12px',
                  borderLeft: compact ? 'none' : `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: 'var(--paragrafo)',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  flex: '0 0 auto',
                }}
              >
                {row.value}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div data-ui="kpi-card-readings" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '18px' }}>
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--rotulo)', fontWeight: 800, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', marginBottom: '10px' }}>
        Leituras
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.bullets.map((row, index) => (
          <div key={`${row.text}-${index}`} data-ui="kpi-card-reading" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
            <div data-ui="kpi-card-reading-text" style={{ color: 'rgba(255,255,255,0.74)', fontSize: 'var(--paragrafo)', lineHeight: 1.45 }}>
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    {item.previousActions.length > 0 ? (
      <div data-ui="kpi-card-actions-previous">
        <KpiActionGroup actions={item.previousActions} compact={compact} label="Ações da semana anterior" variant="previous" actionGap={12} />
      </div>
    ) : null}

    {item.weekActions.length > 0 ? (
      <div data-ui="kpi-card-actions-week">
        <KpiActionGroup actions={item.weekActions} compact={compact} label="Ação na semana" variant="week" actionGap={12} />
      </div>
    ) : null}
  </motion.article>
);

export function Slide8Expansao({ isActive }: Props) {
  const clusterColor = CLUSTERS.EXPANSAO;
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div data-ui="expansao-root" style={{ minHeight: '100vh', background: BG, padding: isMobile ? '108px 16px 48px' : isCompact ? '124px 24px 64px' : '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: isCompact ? '40px' : '60px' }}>
      <section data-ui="expansao-hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader
            accentColor={clusterColor}
            title="Visão de Expansão MTD"
            right={
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <StatusCounter status="feito" count={statusCounts.feito} isActive={isActive} compact={isCompact} />
                <StatusCounter status="pendente" count={statusCounts.pendente} isActive={isActive} compact={isCompact} />
                <StatusCounter status="bloqueado" count={statusCounts.bloqueado} isActive={isActive} compact={isCompact} />
              </div>
            }
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <TokenTag label="LEADS" compact />
              <TokenTag label="ACQUISITION" compact />
              <TokenTag label="CRO" compact />
              <TokenTag label="CRM" compact />
            </div>
          </SlideHeroHeader>
        </motion.div>
      </section>

      <section data-ui="expansao-metricas" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '20px' }}>
        {activeExpansionReport.expansionMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <div data-ui="expansao-secao-evidencias">
        <ConversionExperienceSection items={activeExpansionReport.conversionExperienceItems} />
      </div>

      <div data-ui="expansao-secao-midias">
        <MediaAcquisitionSection
          items={expansionMediaAcquisitionItems}
          singleCardMaxWidth={420}
        />
      </div>
    </div>
  );
}
