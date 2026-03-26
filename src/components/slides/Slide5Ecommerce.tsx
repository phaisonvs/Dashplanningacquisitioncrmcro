import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, CARD_BG, CARD_BORDER, WHITE, GREEN, RED } from '../theme';
import { Calendar, CheckCircle2, Maximize2, Minimize2, Zap } from 'lucide-react';
import { ImageUploadPlaceholder } from './ImageUploadPlaceholder';
import { ImageViewer } from './ImageViewer';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';
import { useState } from 'react';

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
    title: 'SESSÃ•ES',
    value: { target: 232, suffix: 'K' },
    subtitle: 'Total de visitas no perÃ­odo',
    comparisons: [comparison('positive', 'vs 203K MoM')],
    bullets: [
      bullet('positive', 'Volume de sessÃµes mantÃ©m base de trÃ¡fego para acelerar ganho de conversÃ£o.'),
      bullet('negative', 'ComunicaÃ§Ã£o promocional de baixa pregnÃ¢ncia.'),
      bullet('negative', 'Crescimento de trÃ¡fego ainda nÃ£o converte na mesma proporÃ§Ã£o em pedido.'),
    ],
    previousActions: [action('CRO', 'feito', 'ReformulaÃ§Ã£o completa da Hero Section com foco em hierarquia visual, sliders e CTAs.')],
    weekActions: [action('CRO', 'pendente', 'Subir LPs e selos promocionais no header para capturar melhor o trÃ¡fego jÃ¡ existente.')],
  },
  {
    title: 'TAXA DE CONVERSÃƒO',
    value: { target: 0.58, suffix: '%', decimals: 2 },
    subtitle: 'Abaixo do benchmark esperado',
    comparisons: [comparison('positive', 'vs 0,56% MoM')],
    bullets: [
      bullet('negative', 'Instabilidades no checkout (Gateway Cielo).'),
      bullet('negative', 'ConversÃ£o ainda pressionada pelo valor percebido da oferta e etapas finais do funil.'),
    ],
    previousActions: [
      action('CRO', 'feito', 'Mapeamento de fricÃ§Ãµes prioritÃ¡rias do funil com foco em checkout e PDP.'),
      action('CRO', 'feito', 'Ajustes de hero e componentes crÃ­ticos para reduzir atrito na navegaÃ§Ã£o inicial.'),
    ],
    weekActions: [action('CRO', 'pendente', 'Subir LPs, selos promocionais e testes de experiÃªncia com bundles/frete.')],
  },
  {
    title: 'RECEITA CAPTADA',
    value: { target: 1.13, prefix: 'R$', suffix: 'M', decimals: 2, decimalSeparator: '.' },
    subtitle: 'R$876K faturada',
    comparisons: [comparison('negative', 'vs R$1.36M captado e 773K faturado MoM')],
    bullets: [
      bullet('negative', 'CaptaÃ§Ã£o de receita responde a ativaÃ§Ãµes promocionais e base de trÃ¡fego atual.'),
      bullet('positive', 'Queda frente Ã  referÃªncia indica necessidade de elevar conversÃ£o e ticket simultaneamente.'),
    ],
    previousActions: [action('CRO', 'feito', 'Subida de vitrine segmentada "Chance Ãšnica" para ampliar captaÃ§Ã£o comercial.')],
    weekActions: [action('CRO', 'pendente', 'Aprofundar anÃ¡lise de vendas em encomenda expressa para ampliar recuperaÃ§Ã£o de faturamento.')],
  },
  {
    title: 'INVESTIMENTO',
    value: { target: 102, prefix: 'R$', suffix: 'K' },
    comparisons: [comparison('negative', 'vs 121,5K', 'âˆ’16% MoM')],
    bullets: [
      bullet('negative', 'Investimento menor limita escala em campanhas com potencial de recuperaÃ§Ã£o.'),
      bullet('positive', 'Ajuste de verba cria oportunidade para realocaÃ§Ã£o mais eficiente por categoria.'),
    ],
    previousActions: [],
    weekActions: [action('ACQUISITION', 'pendente', 'Priorizar verba em campanhas com melhor resposta e pausar frentes ineficientes.')],
  },
];

const bottomMetrics: MetricCard[] = [
  {
    title: 'ROAS',
    value: { target: 11 },
    comparisons: [comparison('negative', 'vs 11,2 MoM')],
    bullets: [
      bullet('negative', 'ROAS realizado abaixo do potencial indica ineficiÃªncia na alocaÃ§Ã£o e no mix.'),
      bullet('positive', 'HÃ¡ margem clara para otimizaÃ§Ã£o com ajustes de feed e priorizaÃ§Ã£o por campanha.'),
    ],
    previousActions: [action('ACQUISITION', 'feito', 'Congelamento da estrutura vencedora para evitar perda de eficiÃªncia por mudanÃ§as bruscas.')],
    weekActions: [action('ACQUISITION', 'pendente', 'Manter pÃºblico e orÃ§amento base, testando sÃ³ variaÃ§Ãµes de copy e criativo na semana.')],
  },
  {
    title: 'TICKET MÃ‰DIO',
    value: { target: 795, prefix: 'R$' },
    comparisons: [comparison('negative', 'vs R$994,40', 'âˆ’20% MoM')],
    bullets: [
      bullet('negative', 'Ticket segue comprimido e reduz margem de eficiÃªncia do canal.'),
      bullet('positive', 'Mix e comunicaÃ§Ã£o de valor precisam reforÃ§ar itens de maior retorno.'),
    ],
    previousActions: [action('CRO', 'feito', 'Teste de oferta bundles vs frete grÃ¡tis condicionado estruturado no front.')],
    weekActions: [action('CRO', 'pendente', 'Executar testes com bundles e frete para elevar valor mÃ©dio por pedido.')],
  },
  {
    title: 'PEDIDOS',
    value: { target: 1392 },
    comparisons: [comparison('positive', 'vs 1.375 MoM')],
    bullets: [
      bullet('positive', 'Volume de pedidos mostra traÃ§Ã£o e sustenta janela para ganho incremental rÃ¡pido.'),
      bullet('negative', 'FricÃ§Ã£o logÃ­stica: impacto de frete na decisÃ£o.'),
      bullet('negative', 'ConversÃ£o ainda abaixo do ideal impede expansÃ£o mais forte de receita faturada.'),
    ],
    previousActions: [action('CRO', 'feito', 'ImplementaÃ§Ã£o de venda apartada (split) para recuperar pedidos com mix de itens.')],
    weekActions: [action('CRO', 'pendente', 'Evoluir split de entregas para reduzir perda de pedido nas etapas finais.')],
  },
];

const statusCounts: Record<Status, number> = {
  feito: 8,
  pendente: 9,
  bloqueado: 0,
};

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
        fontSize: '11px',
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
        fontSize: '10px',
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
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: palette.color, fontSize: '12px', fontWeight: 700, lineHeight: 1 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '999px', background: palette.color, flexShrink: 0 }} />
        {palette.label}
      </span>
      <span style={{ color: WHITE, fontSize: '14px', fontWeight: 800, lineHeight: 1 }}>
        <AnimatedNumber target={count} isActive={isActive} duration={900} />
      </span>
    </div>
  );
};

const ActionCardView = ({ actionItem, variant = 'week' }: { actionItem: ActionCard; variant?: 'previous' | 'week' }) => (
  <div
    style={{
      background: variant === 'previous' ? 'rgba(255,255,255,0.018)' : CARD_BG,
      border: `1px solid ${variant === 'previous' ? 'rgba(255,255,255,0.05)' : CARD_BORDER}`,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <TokenTag label={actionItem.cluster} compact />
      <StatusPill status={actionItem.status} />
    </div>
    <div style={{ color: variant === 'previous' ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.55, fontWeight: 500 }}>
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
      borderRadius: '14px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      minHeight: '100%',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{ color: 'rgba(255,255,255,0.46)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.title}
      </div>
      <TokenTag label="Mar/2026" compact />
    </div>

    <div style={{ fontSize: 'clamp(30px, 3vw, 50px)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
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
      <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: '13px', lineHeight: 1.45, fontWeight: 400 }}>
        {item.subtitle}
      </div>
    )}

    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
              padding: '12px 16px',
              borderRadius: '10px',
              background: row.tone === 'positive' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 82, 82, 0.10)',
              border: `1px solid ${row.tone === 'positive' ? 'rgba(34, 197, 94, 0.22)' : 'rgba(255, 82, 82, 0.22)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: '12px', lineHeight: 1.35 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div
                style={{
                  paddingLeft: '12px',
                  borderLeft: `2px solid ${activeColor}`,
                  color: activeColor,
                  fontSize: '12px',
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

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Leituras
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {item.bullets.map((row, index) => (
          <div key={`${row.text}-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
            <div style={{ color: 'rgba(255,255,255,0.74)', fontSize: '13px', lineHeight: 1.45 }}>
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    {item.previousActions.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          AÃ§Ãµes da semana anterior
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {item.previousActions.map((itemAction, index) => (
            <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="previous" />
          ))}
        </div>
      </div>
    )}

    {item.weekActions.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          AÃ§Ã£o na semana
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {item.weekActions.map((itemAction, index) => (
            <ActionCardView key={`${itemAction.text}-${index}`} actionItem={itemAction} variant="week" />
          ))}
        </div>
      </div>
    )}
  </motion.article>
);

export function Slide5Ecommerce({ isActive }: Props) {
  const clusterColor = CLUSTERS.ECOMMERCE;
  const [isLPExpanded, setIsLPExpanded] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* 1. Hero */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '4px', height: '32px', background: clusterColor, borderRadius: '2px' }} />
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Visão de Funil — E-commerce
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <StatusCounter status="feito" count={statusCounts.feito} isActive={isActive} />
              <StatusCounter status="pendente" count={statusCounts.pendente} isActive={isActive} />
              <StatusCounter status="bloqueado" count={statusCounts.bloqueado} isActive={isActive} />
            </div>
          </div>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '18px' }}>
            {topMetrics.map((item) => (
              <MetricCardView key={item.title} item={item} isActive={isActive} />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {bottomMetrics.map((item) => (
              <MetricCardView key={item.title} item={item} isActive={isActive} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. EficiÃªncia de MÃ­dia */}
      <section>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: WHITE, fontSize: '20px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', background: CLUSTERS.ACQUISITION, borderRadius: '50%' }} />
            EficiÃªncia de MÃ­dia
            <span style={{ background: `${CLUSTERS.ACQUISITION}15`, color: CLUSTERS.ACQUISITION, border: `1px solid ${CLUSTERS.ACQUISITION}40`, padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>ACQUISITION</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
             <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Volume MTD</div>
                <div style={{ color: WHITE, fontSize: '20px', fontWeight: 700 }}>8,5M <span style={{fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.4)'}}>Impr.</span></div>
                <div style={{ color: WHITE, fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>3,2M <span style={{fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.4)'}}>Alcance</span></div>
             </div>
             <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Gap de ROAS Global</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <div style={{ color: RED, fontSize: '28px', fontWeight: 800 }}>11.0</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>vs 16.0 <span style={{fontSize:'10px'}}>(Potencial)</span></div>
                </div>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ color: RED, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DiagnÃ³stico</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300 }}>
              â€¢ DÃ©ficit de competitividade em categorias core no Google Shopping.<br/>
              â€¢ Queda acentuada do Ticket MÃ©dio e instabilidade de mix de ofertas.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ color: CLUSTERS.ACQUISITION, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plano de AÃ§Ã£o ACQUISITION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               {[
                 'Drill down por campanha: pausar ineficientes.',
                 'OtimizaÃ§Ã£o do feed de produtos Google Shopping.',
                 'Campanhas focadas em linhas exclusivas.'
               ].map((item, i) => (
                 <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                   <div style={{ color: CLUSTERS.ACQUISITION, marginTop: '2px' }}>â†’</div>
                   <div style={{ color: WHITE, fontSize: '14px', fontWeight: 300 }}>{item}</div>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. CONVERSÃƒO & EXPERIÃŠNCIA - FULL WIDTH */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '12px', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div>
          <div style={{ color: WHITE, fontSize: '28px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', background: CLUSTERS.CRO, borderRadius: '50%' }} />
            ConversÃ£o & ExperiÃªncia
            <span style={{ background: `${CLUSTERS.CRO}15`, color: CLUSTERS.CRO, border: `1px solid ${CLUSTERS.CRO}40`, padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>CRO</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300 }}>
            EvoluÃ§Ã£o contÃ­nua da plataforma de e-commerce com foco em reduÃ§Ã£o de fricÃ§Ãµes, otimizaÃ§Ã£o de conversÃ£o e experiÃªncia do usuÃ¡rio.
          </p>
        </div>

        {/* FricÃ§Ãµes Identificadas */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ color: RED, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} />
            FricÃ§Ãµes Mapeadas
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              'Instabilidades no checkout (Gateway Cielo)',
              'FricÃ§Ã£o logÃ­stica: impacto de frete na decisÃ£o',
              'ComunicaÃ§Ã£o promocional de baixa pregnÃ¢ncia'
            ].map((item, i) => (
              <div key={i} style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '16px', 
                borderRadius: '8px',
                border: `1px solid ${RED}20`,
                borderLeft: `3px solid ${RED}`
              }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300 }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Landing Pages Internas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            background: 'rgba(255,255,255,0.018)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '14px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Landing Pages Internas de Conversão
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span>Responsável: Phaison</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} />
                  Prazo: [Inserir data]
                </span>
              </div>
            </div>
            <div
              style={{
                color: WHITE,
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                userSelect: 'none',
              }}
              onClick={() => setIsLPExpanded(!isLPExpanded)}
            >
              {isLPExpanded ? (
                <>
                  <Minimize2 size={16} />
                  Minimizar
                </>
              ) : (
                <>
                  <Maximize2 size={16} />
                  Expandir
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div>
                    <div style={{ color: WHITE, fontSize: '15px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                      LP Interna Semana do Consumidor
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <TokenTag label="LEADS" compact />
                      <TokenTag label="CRO" compact />
                      <TokenTag label="E-COMMERCE" compact />
                    </div>
                  </div>
                  <StatusPill status="feito" />
                </div>

                <ImageViewer
                  id="lp-semana-consumidor"
                  desktopImage={lpSemanaConsumidorImg}
                  mobileImage={lpSemanaConsumidorMobileImg}
                  alt="LP Semana do Consumidor"
                  height={300}
                  label="Landing Page"
                  fullWidth={true}
                />

                {isLPExpanded && (
                  <div style={{ background: 'rgba(255,255,255,0.018)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: WHITE, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '3px', height: '12px', background: CLUSTERS.ECOMMERCE, borderRadius: '2px' }} />
                      Objetivo da Frente
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: 1.6, fontWeight: 300 }}>
                      Geração de leads e conversão de produtos selecionados, com apelo de oportunidade, organização por clusters de categoria e reforço de visibilidade orgânica.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div>
                    <div style={{ color: WHITE, fontSize: '15px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                      LP Interna Chance Única
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <TokenTag label="LEADS" compact />
                      <TokenTag label="CRO" compact />
                      <TokenTag label="E-COMMERCE" compact />
                    </div>
                  </div>
                  <StatusPill status="pendente" />
                </div>

                <ImageViewer
                  id="lp-chance-unica"
                  desktopImage={lpChanceUnicaImg}
                  mobileImage={lpChanceUnicaMobileImg}
                  alt="LP Chance Única"
                  height={300}
                  label="Landing Page"
                  fullWidth={true}
                />

                {isLPExpanded && (
                  <div style={{ background: 'rgba(255,255,255,0.018)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: WHITE, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '3px', height: '12px', background: CLUSTERS.ECOMMERCE, borderRadius: '2px' }} />
                      Objetivo da Frente
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: 1.6, fontWeight: 300 }}>
                      Captação de leads apoiada por urgência comercial e apelo de oportunidade.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>        {/* EvoluÃ§Ãµes Realizadas no Front */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ color: GREEN, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            EvoluÃ§Ãµes Realizadas no Front
          </div>
          
          {/* Hero Section Evolution - Featured Block */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)', 
            padding: '24px', 
            borderRadius: '10px',
            border: `2px solid ${GREEN}30`,
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Image Viewer */}
              <div style={{ flex: 1 }}>
                <ImageViewer 
                  id="hero-section-evolution"
                  desktopImage={heroDesktopImg}
                  mobileImage={heroMobileImg}
                  alt="EvoluÃ§Ã£o da Hero Section"
                  width={500}
                  height={300}
                  label="Hero Section"
                />
              </div>
              
              {/* Description */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                <div>
                  <div style={{ 
                    color: GREEN, 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    marginBottom: '8px'
                  }}>
                    EvoluÃ§Ã£o Recente
                  </div>
                  <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    ReformulaÃ§Ã£o Completa da Hero Section
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
                    Nova interface responsiva com otimizaÃ§Ã£o de conversÃ£o para desktop e mobile, incluindo sliders interativos e hierarquia visual aprimorada.
                  </div>
                </div>
                
                {/* Evolution Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'AdiÃ§Ã£o de sliders no fullbanner',
                    'OtimizaÃ§Ã£o de hierarquia visual',
                    'Responsividade mobile aprimorada',
                    'CTAs mais evidentes'
                  ].map((point, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '4px', 
                        height: '4px', 
                        background: GREEN, 
                        borderRadius: '50%' 
                      }} />
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 400 }}>
                        {point}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { title: 'OtimizaÃ§Ã£o de selos promocionais no Header', image: 'selos-header' },
              { title: 'Subida de vitrine segmentada "Chance Ãšnica"', image: 'vitrine-chance-unica' },
              { title: 'A/B Test: Bundles vs Frete GrÃ¡tis condicionado', image: 'ab-test-bundles' },
              { title: 'ImplementaÃ§Ã£o de Venda Apartada (Split)', image: 'venda-apartada' }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '16px',
                background: 'rgba(255,255,255,0.02)', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.04)',
                alignItems: 'center'
              }}>
                <ImageUploadPlaceholder 
                  id={item.image}
                  width={120}
                  height={80}
                  label="EvidÃªncia"
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: WHITE, fontSize: '14px', fontWeight: 600, lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CorreÃ§Ãµes e EvoluÃ§Ãµes Recentes */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ color: CLUSTERS.CRO, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
            CorreÃ§Ãµes e EvoluÃ§Ãµes Recentes do Site
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[
              {
                title: 'Componente de pesquisa mobile + autocomplete',
                desc: 'Corrigidos erros e ajustada interface do overlay de busca',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'search-mobile'
              },
              {
                title: 'RÃ©gua de vantagens mobile',
                desc: 'Campanhas para acelerar entrada em LPs: Chance Ãšnica, MÃªs do Consumidor e LanÃ§amentos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'regua-vantagens'
              },
              {
                title: 'FormulÃ¡rio WhatsApp Floating',
                desc: 'CorreÃ§Ã£o de mÃ¡scaras dos inputs. Em anÃ¡lise: insert do lead na Salesforce',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'whatsapp-floating'
              },
              {
                title: 'InserÃ§Ã£o de novas vitrines nas LPs',
                desc: 'SetorizaÃ§Ã£o de categorias em novos hotsites',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'vitrines-lps'
              },
              {
                title: 'Spots de produtos mobile',
                desc: 'Melhorias de usabilidade e leitura',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'spots-mobile'
              },
              {
                title: 'Bug fix: selos de campanha',
                desc: 'Corrigido produto vinculado a dois tipos de selo simultaneamente',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'bug-selos'
              }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '16px',
                background: 'rgba(255,255,255,0.02)', 
                padding: '18px', 
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.04)'
              }}>
                <ImageViewer 
                  id={item.id}
                  desktopImage={item.imageDesk}
                  mobileImage={item.imageMobile}
                  alt={item.title}
                  width={140}
                  height={100}
                  label="Print"
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ color: WHITE, fontSize: '14px', fontWeight: 600, lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EvoluÃ§Ãµes de PDP */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: CLUSTERS.CRO, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              EvoluÃ§Ãµes de PDP (Product Detail Page)
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              Melhorias contÃ­nuas nas pÃ¡ginas de produto para aumentar conversÃ£o e reduzir fricÃ§Ãµes
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                title: 'Melhorias de front â€” Variantes por Categoria',
                desc: 'PDPs de Pisos e Revestimentos (variante 1) e Demais categorias (variante 2)',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-variantes'
              },
              {
                title: 'Ajustes de UI na seÃ§Ã£o product__view',
                desc: 'OtimizaÃ§Ãµes para desktop e mobile',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-product-view'
              },
              {
                title: 'BotÃ£o "Falar com especialista"',
                desc: 'IncluÃ­do nas PDPs de Pisos e Revestimentos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-especialista'
              },
              {
                title: 'Elementos complementares de conversÃ£o',
                desc: 'Badges Livelo, calculadora e recursos de apoio Ã  decisÃ£o',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-elementos'
              },
              {
                title: 'RevisÃ£o API de cotaÃ§Ã£o de frete',
                desc: 'OtimizaÃ§Ã£o do retorno de dados da Frete RÃ¡pido',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-frete-api'
              },
              {
                title: 'PrÃ³xima evoluÃ§Ã£o mobile',
                desc: 'Acordeom para ficha tÃ©cnica dos produtos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-acordeom-mobile'
              },
              {
                title: 'CorreÃ§Ã£o: Formas de Pagamento',
                desc: 'Restaurado evento de clique e centralizado pop-up com melhor leitura dos detalhes',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-pagamento'
              }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '16px',
                background: 'rgba(255,255,255,0.02)', 
                padding: '18px', 
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.04)',
                alignItems: 'center'
              }}>
                <ImageViewer 
                  id={item.id}
                  desktopImage={item.imageDesk}
                  mobileImage={item.imageMobile}
                  alt={item.title}
                  width={160}
                  height={100}
                  label="Screenshot"
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ color: WHITE, fontSize: '14px', fontWeight: 600, lineHeight: 1.3 }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plano de AÃ§Ã£o CRO */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '10px', border: `1px solid ${CLUSTERS.CRO}30` }}>
          <div style={{ color: CLUSTERS.CRO, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            PrÃ³ximos Passos CRO
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              'Continuar testes A/B de ofertas promocionais',
              'Implementar acordeom mobile em PDPs',
              'Monitorar integraÃ§Ã£o Salesforce do WhatsApp form'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ color: CLUSTERS.CRO, marginTop: '2px', fontSize: '14px' }}>â†’</div>
                <div style={{ color: WHITE, fontSize: '13px', fontWeight: 300, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

      </motion.section>

    </div>
  );
}





