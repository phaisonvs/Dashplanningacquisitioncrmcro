import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, CARD_BG, CARD_BORDER, WHITE, GREEN, RED } from '../theme';
import { MediaAcquisitionSection, collectStatusCounts } from './sharedMediaAcquisition';
import { ConversionExperienceSection } from './sharedConversionExperience';
import { SlideHeroHeader } from './sharedDeckTypography';
import { ImageViewer } from './ImageViewer';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';

interface Props { isActive: boolean }

type Status = 'feito' | 'pendente' | 'bloqueado';
type ClusterTag = 'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE';
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
};

const action = (cluster: ClusterTag, status: Status, text: string): ActionCard => ({ cluster, status, text });
const bullet = (tone: Tone, text: string): Bullet => ({ tone, text });
const comparison = (tone: Tone, text: string, value?: string): Comparison => ({ tone, text, value });

const topMetrics: MetricCard[] = [
  {
    title: 'SESSÕES',
    value: { target: 232, suffix: 'K' },
    subtitle: 'Total de visitas no período',
    comparisons: [comparison('positive', 'vs 203K MoM')],
    bullets: [
      bullet('positive', 'Volume de sessões mantém base de tráfego para acelerar ganho de conversão.'),
      bullet('negative', 'Comunicação promocional de baixa pregnância.'),
      bullet('negative', 'Crescimento de tráfego ainda não converte na mesma proporção em pedido.'),
    ],
    previousActions: [action('CRO', 'feito', 'Reformulação completa da Hero Section com foco em hierarquia visual, sliders e CTAs.')],
    weekActions: [action('CRM', 'pendente', 'Mecânica de Whatsapp e E-mail Marketing')],
  },
  {
    title: 'TAXA DE CONVERSÃO',
    value: { target: 0.58, suffix: '%', decimals: 2 },
    subtitle: 'Abaixo do benchmark esperado',
    comparisons: [comparison('positive', 'vs 0,56% MoM')],
    bullets: [
      bullet('negative', 'Instabilidades no checkout (Gateway Cielo).'),
      bullet('negative', 'Conversão ainda pressionada pelo valor percebido da oferta e etapas finais do funil.'),
    ],
    previousActions: [
      action('CRO', 'feito', 'Mapeamento de fricções prioritárias do funil com foco em checkout e PDP.'),
      action('CRO', 'feito', 'Ajustes de hero e componentes críticos para reduzir atrito na navegação inicial.'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Reestruturar UX do e-commerce (catálogo + filtros)'),
      action('CRO', 'pendente', 'Continuar testes A/B de ofertas promocionais'),
    ],
  },
  {
    title: 'RECEITA CAPTADA',
    value: { target: 1.13, prefix: 'R$', suffix: 'M', decimals: 2, decimalSeparator: '.' },
    subtitle: 'R$876K faturada',
    comparisons: [comparison('negative', 'vs R$1.36M captado e 773K faturado MoM')],
    bullets: [
      bullet('negative', 'Captação de receita responde a ativações promocionais e base de tráfego atual.'),
      bullet('positive', 'Queda frente à referência indica necessidade de elevar conversão e ticket simultaneamente.'),
    ],
    previousActions: [action('CRO', 'feito', 'Subida de vitrine segmentada "Chance Única" para ampliar captação comercial.')],
    weekActions: [
      action('CRO', 'pendente', 'Aprofundar análise de vendas em encomenda expressa para ampliar recuperação de faturamento.'),
      action('CRM', 'pendente', 'Monitorar integração Salesforce do WhatsApp form'),
    ],
  },
  {
    title: 'INVESTIMENTO',
    value: { target: 102, prefix: 'R$', suffix: 'K' },
    comparisons: [comparison('negative', 'vs 121,5K', '−16% MoM')],
    bullets: [
      bullet('negative', 'Investimento menor limita escala em campanhas com potencial de recuperação.'),
      bullet('positive', 'Ajuste de verba cria oportunidade para realocação mais eficiente por categoria.'),
    ],
    previousActions: [],
    weekActions: [action('ACQUISITION', 'pendente', 'Aumentar eficiência de campanhas (ROAS)')],
  },
];

const bottomMetrics: MetricCard[] = [
  {
    title: 'ROAS',
    value: { target: 11 },
    comparisons: [comparison('negative', 'vs 11,2 MoM')],
    bullets: [
      bullet('negative', 'ROAS realizado abaixo do potencial indica ineficiência na alocação e no mix.'),
      bullet('positive', 'Há margem clara para otimização com ajustes de feed e priorização por campanha.'),
    ],
    previousActions: [action('ACQUISITION', 'feito', 'Congelamento da estrutura vencedora para evitar perda de eficiência por mudanças bruscas.')],
    weekActions: [action('ACQUISITION', 'pendente', 'Manter público e orçamento base, testando só variações de copy e criativo na semana.')],
  },
  {
    title: 'TICKET MÉDIO',
    value: { target: 795, prefix: 'R$' },
    comparisons: [comparison('negative', 'vs R$994,40', '−20% MoM')],
    bullets: [
      bullet('negative', 'Ticket segue comprimido e reduz margem de eficiência do canal.'),
      bullet('positive', 'Mix e comunicação de valor precisam reforçar itens de maior retorno.'),
    ],
    previousActions: [action('CRO', 'feito', 'Teste de oferta bundles vs frete grátis condicionado estruturado no front.')],
    weekActions: [action('CRO', 'pendente', 'Executar testes com bundles e frete para elevar valor médio por pedido.')],
  },
  {
    title: 'PEDIDOS',
    value: { target: 1392 },
    comparisons: [comparison('positive', 'vs 1.375 MoM')],
    bullets: [
      bullet('positive', 'Volume de pedidos mostra tração e sustenta janela para ganho incremental rápido.'),
      bullet('negative', 'Fricção logística: impacto de frete na decisão.'),
      bullet('negative', 'Conversão ainda abaixo do ideal impede expansão mais forte de receita faturada.'),
    ],
    previousActions: [action('CRO', 'feito', 'Implementação de venda apartada (split) para recuperar pedidos com mix de itens.')],
    weekActions: [
      action('CRO', 'pendente', 'Evoluir Split de Entregas e análises de experiência'),
      action('CRO', 'pendente', 'Implementar acordeom mobile em PDPs'),
    ],
  },
];

const statusCounts = collectStatusCounts(
  [...topMetrics, ...bottomMetrics].flatMap((item) => [...item.previousActions, ...item.weekActions]),
);

const tokenPalette: Record<ClusterTag, { color: string; background: string; border: string }> = {
  LEADS: { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.07)', border: 'rgba(125, 211, 252, 0.22)' },
  ACQUISITION: { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.07)', border: 'rgba(167, 139, 250, 0.22)' },
  CRO: { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.07)', border: 'rgba(96, 165, 250, 0.22)' },
  CRM: { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.07)', border: 'rgba(45, 212, 191, 0.22)' },
  'E-COMMERCE': { color: CLUSTERS.ECOMMERCE, background: 'rgba(252, 165, 165, 0.07)', border: 'rgba(252, 165, 165, 0.22)' },
};

const statusPalette: Record<Status, { label: string; color: string; background: string; border: string }> = {
  feito: { label: 'Feito', color: '#86EFAC', background: 'rgba(134, 239, 172, 0.06)', border: 'rgba(134, 239, 172, 0.14)' },
  pendente: { label: 'Pendente', color: '#FCD34D', background: 'rgba(252, 211, 77, 0.06)', border: 'rgba(252, 211, 77, 0.14)' },
  bloqueado: { label: 'Bloqueado', color: '#FCA5A5', background: 'rgba(252, 165, 165, 0.06)', border: 'rgba(252, 165, 165, 0.14)' },
};

const googleShoppingLogoUrl = 'https://www.gstatic.com/images/branding/product/2x/shopping_48dp.png';

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

const StatusCounter = ({ status, count, isActive }: { status: Status; count: number; isActive: boolean }) => {
  const palette = statusPalette[status];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '7px 12px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.018)',
        border: `1px solid ${CARD_BORDER}`,
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

const GoogleShoppingBadge = () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 9px',
      borderRadius: '8px',
      background: '#FFFFFF',
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.22)',
      flexShrink: 0,
    }}
  >
    <img
      src={googleShoppingLogoUrl}
      alt="Google Shopping"
      style={{
        width: '22px',
        height: '22px',
        objectFit: 'contain',
        display: 'block',
      }}
    />
    <span
      style={{
        color: '#161616',
        fontSize: 'var(--text-chip)',
        fontWeight: 900,
        letterSpacing: '0.06em',
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      Google Shopping
    </span>
  </div>
);

const ActionCardView = ({ actionItem, variant = 'week' }: { actionItem: ActionCard; variant?: 'previous' | 'week' }) => (
  <div
    style={{
      background: variant === 'previous' ? 'rgba(255,255,255,0.012)' : CARD_BG,
      border: `1px solid ${variant === 'previous' ? 'rgba(255,255,255,0.04)' : CARD_BORDER}`,
      borderRadius: '14px',
      padding: '18px 20px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <TokenTag label={actionItem.cluster} compact />
      <StatusPill status={actionItem.status} />
    </div>
    <div style={{ color: variant === 'previous' ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.88)', fontSize: 'var(--text-body)', lineHeight: 1.55, fontWeight: 500 }}>
      {actionItem.text}
    </div>
  </div>
);

const MetricCardView = ({ item, isActive }: { item: MetricCard; isActive: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.018)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      minHeight: '100%',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{ color: 'rgba(255,255,255,0.46)', fontSize: 'var(--text-body)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.title}
      </div>
      <TokenTag label="Mar/2026" compact />
    </div>

    <div style={{ fontSize: 'var(--text-hero)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
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

    {item.subtitle && (
      <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: 'var(--text-body)', lineHeight: 1.45, fontWeight: 400 }}>
        {item.subtitle}
      </div>
    )}

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
              gap: '14px',
              padding: '13px 18px',
              borderRadius: '10px',
              background: row.tone === 'positive' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 82, 82, 0.10)',
              border: `1px solid ${row.tone === 'positive' ? 'rgba(34, 197, 94, 0.22)' : 'rgba(255, 82, 82, 0.22)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: 'var(--text-body)', lineHeight: 1.35 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div
                style={{
                  paddingLeft: '12px',
                  borderLeft: `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: 'var(--text-body)',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
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
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
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

    {item.previousActions.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Ações da semana anterior
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {item.previousActions.map((itemAction, index) => (
            <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="previous" />
          ))}
        </div>
      </div>
    )}

    {item.weekActions.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Ação na semana
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {item.weekActions.map((itemAction, index) => (
            <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="week" />
          ))}
        </div>
      </div>
    )}
  </motion.article>
);

const mediaEfficiencyCard = {
  comparisons: [comparison('negative', 'vs 16.0 potencial', '−31%')],
  bullets: [
    bullet('negative', 'Déficit de competitividade em categorias core no Google Shopping.'),
    bullet('negative', 'Queda acentuada do Ticket Médio e instabilidade de mix de ofertas.'),
  ],
  weekActions: [
    action('ACQUISITION', 'pendente', 'Drill down por campanha e otimização do feed de Google Shopping para recuperar ROAS.'),
  ],
  value: { target: 11 },
  subtitle: 'Gap de ROAS Global',
};

const MediaEfficiencyCardView = ({ isActive }: { isActive: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.018)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ color: 'rgba(255,255,255,0.46)', fontSize: 'var(--text-body)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Eficiência de Mídia
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <TokenTag label="Mar/2026" compact />
        <GoogleShoppingBadge />
      </div>
    </div>

    <div style={{ fontSize: 'var(--text-hero)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
      <AnimatedNumber target={mediaEfficiencyCard.value.target} isActive={isActive} duration={3000} />
    </div>

    {mediaEfficiencyCard.subtitle && (
      <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: 'var(--text-body)', lineHeight: 1.45, fontWeight: 400 }}>
        {mediaEfficiencyCard.subtitle}
      </div>
    )}

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {mediaEfficiencyCard.comparisons.map((row, index) => {
        const activeColor = row.tone === 'positive' ? GREEN : RED;
        const hasValue = Boolean(row.value);

        return (
          <div
            key={`${row.text}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: hasValue ? 'space-between' : 'flex-start',
              gap: '14px',
              padding: '13px 18px',
              borderRadius: '10px',
              background: 'rgba(255, 82, 82, 0.10)',
              border: '1px solid rgba(255, 82, 82, 0.22)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: 'var(--text-body)', lineHeight: 1.35 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div
                style={{
                  paddingLeft: '12px',
                  borderLeft: `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: 'var(--text-body)',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
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
        {mediaEfficiencyCard.bullets.map((row, index) => (
          <div key={`${row.text}-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
            <div style={{ color: 'rgba(255,255,255,0.74)', fontSize: 'var(--text-body)', lineHeight: 1.45 }}>
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {mediaEfficiencyCard.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="week" />
        ))}
      </div>
    </div>
  </motion.article>
);

type EvidenceItem = {
  title: string;
  tags: ClusterTag[];
  status: Status;
  objective: string;
  desktopImage?: string;
  mobileImage?: string;
  imageLabel: string;
  imageHeight?: number;
};

const frontEvidenceItems: EvidenceItem[] = [
  {
    title: 'LP Interna Semana do Consumidor',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos a subida da LP Interna Semana do Consumidor, reforçando a hierarquia de conversão, a organização por clusters e a visibilidade orgânica.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'LP Interna Chance Única',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'pendente',
    objective: 'Reforçamos a captação com urgência comercial na LP Interna Chance Única, destacando oferta, desconto e janela de oportunidade.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Reformulação Completa da Hero Section',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos a reformulação completa da hero section, com sliders, hierarquia visual mais clara, CTAs mais evidentes e responsividade mobile aprimorada.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Hero Section',
    imageHeight: 300,
  },
  {
    title: 'Componente de pesquisa mobile + autocomplete',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos ajustes no componente de busca mobile, corrigimos o autocomplete e reduzimos atrito na descoberta de produtos.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Régua de vantagens mobile',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Reforçamos a régua de vantagens no mobile para acelerar a entrada em LPs como Chance Única, Mês do Consumidor e Lançamentos.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Formulário WhatsApp Floating',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'pendente',
    objective: 'Realizamos correções de máscaras dos inputs e estruturamos o fluxo do WhatsApp Floating para integrar o lead à Salesforce sem perda de conversão.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Inserção de novas vitrines nas LPs',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos a inserção de novas vitrines nas LPs, setorizando categorias e ampliando a superfície de navegação.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Spots de produtos mobile',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos ajustes nos spots de produtos mobile para melhorar leitura, usabilidade e clareza na navegação.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Bug fix: selos de campanha',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Corrigimos o vínculo duplicado de selos de campanha e estabilizamos a exibição comercial nas LPs.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Melhorias de front — Variantes por Categoria',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos melhorias de front por categoria nas PDPs, adaptando a experiência para Pisos e Revestimentos e demais categorias.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Ajustes de UI na seção product__view',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos ajustes de UI na seção product__view para reduzir fricção na leitura de produto em desktop e mobile.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Botão "Falar com especialista"',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Inserimos o CTA Falar com especialista nas PDPs, reforçando contato assistido e prova social.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Elementos complementares de conversão',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Reforçamos a decisão com badges Livelo, calculadora e recursos complementares de conversão.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Revisão API de cotação de frete',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'pendente',
    objective: 'Revisamos a API de cotação de frete para melhorar o retorno da Frete Rápido e reduzir incerteza logística.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Próxima evolução mobile',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'pendente',
    objective: 'Estruturamos a próxima evolução mobile com acordeom para ficha técnica e leitura mais fluida.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
  {
    title: 'Correção: Formas de Pagamento',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Realizamos a correção do evento de clique e da leitura do pop-up de formas de pagamento.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 300,
  },
];

const mediaAcquisitionItems: EvidenceItem[] = [
  {
    title: 'LP Interna Semana do Consumidor',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Versão consolidada das peças de aquisição com foco em tráfego pago, clareza de oferta e conversão.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 280,
  },
  {
    title: 'LP Interna Chance Única',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'],
    status: 'pendente',
    objective: 'Uma segunda camada de oferta para absorver intenção alta e sustentar a captura qualificada.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 280,
  },
  {
    title: 'Hero Section de Conversão',
    tags: ['CRO', 'E-COMMERCE'],
    status: 'feito',
    objective: 'Hero pensada para reforçar mídia, hierarquia visual e leitura imediata da proposta de valor.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Hero Section',
    imageHeight: 280,
  },
  {
    title: 'WhatsApp Floating e captura',
    tags: ['CRM', 'CRO', 'LEADS'],
    status: 'feito',
    objective: 'Camada de captura assistida para transformar tráfego em lead e alimentar o CRM com menos atrito.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 280,
  },
];

const ObjectiveBlock = ({ text }: { text: string }) => (
  <div
    style={{
      background: 'rgba(255,255,255,0.018)',
      padding: '18px',
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
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <div style={{ width: '3px', height: '10px', background: CLUSTERS.ECOMMERCE, borderRadius: '999px' }} />
      Objetivo da Frente
    </div>
    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'var(--text-body)', lineHeight: 1.5, fontWeight: 300 }}>
      {text}
    </div>
  </div>
);

const EvidenceCardView = ({ item }: { item: EvidenceItem }) => {
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
          <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 700, marginBottom: '0', lineHeight: 1.35 }}>
            {item.title}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {item.tags.map((tag) => (
              <TokenTag key={`${item.title}-${tag}`} label={tag} compact />
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
        fullWidth={true}
      />

      <ObjectiveBlock text={item.objective} />
    </div>
  </motion.article>
);
};

export function Slide5Ecommerce({ isActive }: Props) {
  const clusterColor = CLUSTERS.ECOMMERCE;

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      
      {/* 1. Hero */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader
            accentColor={clusterColor}
            title="Visão de Funil — E-commerce"
            right={
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <StatusCounter status="feito" count={statusCounts.feito} isActive={isActive} />
                <StatusCounter status="pendente" count={statusCounts.pendente} isActive={isActive} />
                <StatusCounter status="bloqueado" count={statusCounts.bloqueado} isActive={isActive} />
              </div>
            }
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <TokenTag label="CRO" compact />
              <TokenTag label="E-COMMERCE" compact />
              <TokenTag label="ACQUISITION" compact />
              <TokenTag label="CRM" compact />
            </div>
          </SlideHeroHeader>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px' }}>
            {topMetrics.map((item) => (
              <MetricCardView key={item.title} item={item} isActive={isActive} />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px' }}>
            {bottomMetrics.map((item) => (
              <MetricCardView key={item.title} item={item} isActive={isActive} />
            ))}
            <MediaEfficiencyCardView isActive={isActive} />
          </div>
        </div>
      </section>

      <ConversionExperienceSection items={frontEvidenceItems} />

      <MediaAcquisitionSection />
    </div>
  );
}















