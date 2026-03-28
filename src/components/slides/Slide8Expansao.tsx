import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, WHITE, GREEN, RED } from '../theme';
import { ConversionExperienceSection } from './sharedConversionExperience';
import { SlideHeroHeader, useDeckViewport } from './sharedDeckTypography';
import { MediaAcquisitionSection, collectStatusCounts } from './sharedMediaAcquisition';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';

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
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
  {
    title: 'Ativação LinkedIn Ads',
    tags: ['ACQUISITION', 'CRO'] as const,
    status: 'pendente' as const,
    objective: 'A ativação de B2B precisa aumentar a densidade do topo com segmentação mais precisa e mensagem executiva.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Creative',
    imageHeight: 240,
  },
  {
    title: 'Fluxo D0, D2, D5',
    tags: ['CRM', 'LEADS'] as const,
    status: 'feito' as const,
    objective: 'A régua comercial em janelas curtas mantém o lead aquecido e reduz perda entre intenção e oportunidade.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Journey',
    imageHeight: 240,
  },
  {
    title: 'LP Executiva para Expansão',
    tags: ['CRO', 'LEADS', 'ACQUISITION'] as const,
    status: 'pendente' as const,
    objective: 'A LP precisa concentrar a proposta de valor da expansão e acelerar leitura de qualificação para a próxima conversa.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
] satisfies Array<{
  title: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM'>;
  status: 'feito' | 'pendente' | 'bloqueado';
  objective: string;
  desktopImage?: string;
  mobileImage?: string;
  imageLabel: string;
  imageHeight?: number;
}>;

const statusCounts = collectStatusCounts(
  ...expansionMetrics.map((item) => [...item.previousActions, ...item.weekActions]),
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
        padding: compact ? '4px 10px' : '5px 12px',
        borderRadius: '6px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-meta)',
        fontWeight: 800,
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

const StatusPill = ({ status }: { status: Status }) => {
  const palette = statusPalette[status];

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
        fontWeight: 800,
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
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: palette.color, fontSize: 'var(--text-body)', fontWeight: 700, lineHeight: 1 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: palette.color, flexShrink: 0 }} />
        {palette.label}
      </span>
      <span style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 800, lineHeight: 1 }}>
        <AnimatedNumber target={count} isActive={isActive} duration={900} />
      </span>
    </div>
  );
};

const ActionCardView = ({ actionItem, variant = 'week', compact = false }: { actionItem: ActionCard; variant?: 'previous' | 'week'; compact?: boolean }) => (
  <div
    style={{
      background: variant === 'previous' ? 'rgba(255,255,255,0.018)' : 'rgba(20,20,20,0.88)',
      border: `1px solid ${variant === 'previous' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '14px',
      padding: compact ? '16px' : '18px',
      boxShadow: variant === 'previous' ? 'inset 0 1px 0 rgba(255,255,255,0.02)' : 'inset 0 1px 0 rgba(255,255,255,0.03)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: compact ? '10px' : '12px', flexDirection: 'row', flexWrap: 'nowrap' }}>
      <TokenTag label={actionItem.cluster} compact />
      <StatusPill status={actionItem.status} />
    </div>
    <div style={{ color: variant === 'previous' ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.88)', fontSize: 'var(--text-body)', lineHeight: 1.55, fontWeight: 500 }}>
      {actionItem.text}
    </div>
  </div>
);

const MetricCardView = ({ item, isActive, compact = false }: { item: MetricCard; isActive: boolean; compact?: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: compact ? '22px' : '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? '18px' : '24px',
      minHeight: '100%',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: compact ? 'stretch' : 'flex-start', flexDirection: compact ? 'column' : 'row' }}>
      <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'var(--text-body)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.title}
      </div>
      <TokenTag label={item.dateTag} compact />
    </div>

    <div style={{ fontSize: 'var(--text-hero)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
      <AnimatedNumber
        target={item.value.target}
        prefix={item.value.prefix}
        suffix={item.value.suffix}
        decimals={item.value.decimals}
        isActive={isActive}
        duration={3000}
      />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {item.comparisons.map((row, index) => {
        const activeColor = row.tone === 'positive' ? GREEN : RED;
        const hasValue = Boolean(row.value);

        return (
          <div
            key={`${row.text}-${index}`}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: 'var(--text-body)', lineHeight: 1.35, minWidth: 0, flex: '1 1 auto' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div
                style={{
                  paddingLeft: compact ? 0 : '12px',
                  borderLeft: compact ? 'none' : `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: 'var(--text-body)',
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

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '18px' }}>
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Leituras
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.bullets.map((row, index) => (
          <div key={`${row.text}-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
            <div style={{ color: 'rgba(255,255,255,0.74)', fontSize: 'var(--text-body)', lineHeight: 1.45 }}>
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ações da semana anterior
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.previousActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="previous" compact={compact} />
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="week" compact={compact} />
        ))}
      </div>
    </div>
  </motion.article>
);

export function Slide8Expansao({ isActive }: Props) {
  const clusterColor = CLUSTERS.EXPANSAO;
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: isMobile ? '108px 16px 48px' : isCompact ? '124px 24px 64px' : '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: isCompact ? '40px' : '60px' }}>
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader
            accentColor={clusterColor}
            title="Visão de Expansão MTD"
            right={
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: isCompact ? 'flex-start' : 'flex-end' }}>
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

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '20px' }}>
        {expansionMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <ConversionExperienceSection items={conversionExperienceItems} />

      <MediaAcquisitionSection />
    </div>
  );
}

