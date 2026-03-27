import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { AnimatedNumber } from '../AnimatedNumber';
import { BG, WHITE, GREEN, RED, CLUSTERS } from '../theme';
import { ConversionExperienceSection } from './sharedConversionExperience';
import { SlideHeroHeader, useDeckViewport } from './sharedDeckTypography';
import { MediaAcquisitionSection, collectStatusCounts, mediaSlots, type MediaAcquisitionItem } from './sharedMediaAcquisition';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';

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

type FunnelStage = MetricCard & {
  label: string;
};

const action = (cluster: ClusterTag, status: Status, text: string): ActionCard => ({ cluster, status, text });
const bullet = (tone: Tone, text: string): Bullet => ({ tone, text });
const comparison = (tone: Tone, text: string, value?: string): Comparison => ({ tone, text, value });

const primaryMetrics: MetricCard[] = [
  {
    title: 'LEADS MTD',
    dateTag: 'Mar/2026',
    value: { target: 4525 },
    comparisons: [
      comparison('positive', 'vs 3.304 em Fev', '+37% MoM'),
      comparison('positive', 'vs 4.381 em Mar', '+3% YoY'),
    ],
    bullets: [
      bullet('negative', 'Funil perde eficiência entre cadastro e orçamento mesmo com volume alto.'),
      bullet('positive', 'Volume de leads e ROAS geral cresceram na comparação mensal.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Reengajamento da rede para retomar cadastros no Pipe com rotina diária de cobrança.'),
      action('CRO', 'feito', 'Inclusão de botão de contato nas páginas de pisos e em LPs promocionais para ampliar captação qualificada.'),
    ],
    weekActions: [
      action('CRM', 'pendente', 'Otimização de fluxos e Bot no Site'),
      action('ACQUISITION', 'pendente', 'Redistribuir mídia para lojas com 0 entradas'),
    ],
  },
  {
    title: 'RECEITA PEDIDOS',
    dateTag: 'Mar/2026',
    value: { target: 1.03, prefix: 'R$', suffix: 'M', decimals: 2 },
    comparisons: [
      comparison('negative', 'vs R$1.056K', '-2% MoM'),
      comparison('negative', 'vs R$1.789K', '-42% YoY'),
    ],
    bullets: [
      bullet('negative', 'Receita ainda abaixo do ano anterior por queda de conversão no meio do funil.'),
      bullet('positive', 'Remanejamento inicial de mídia já melhorou qualidade de tráfego em campanhas de produto.'),
    ],
    previousActions: [
      action('ACQUISITION', 'feito', 'Primeiro ajuste de verba para canais com maior intenção de compra e menor dispersão.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Remanejar até 20% do budget para Shopping e remarketing de produto com validação na quarta.'),
    ],
  },
  {
    title: 'INVESTIMENTO',
    dateTag: 'Mar/2026',
    value: { target: 85, prefix: 'R$', suffix: 'K' },
    comparisons: [
      comparison('negative', 'vs R$93,4k', '-9% MoM'),
      comparison('negative', 'vs R$208,5k', '-59% YoY'),
    ],
    bullets: [
      bullet('negative', 'Nível de investimento ficou abaixo da referência, limitando escala de cobertura.'),
      bullet('positive', 'Mapa de campanhas com ROAS acima da média já está priorizado para expansão controlada.'),
    ],
    previousActions: [
      action('ACQUISITION', 'feito', 'Redistribuição de budget por loja com foco nas regiões de maior demanda e melhor resposta.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Aplicar +15% de verba nas campanhas com maior taxa de pedidos e revisar custo por loja diariamente.'),
    ],
  },
  {
    title: 'PEDIDOS',
    dateTag: 'Mar/2026',
    value: { target: 323 },
    comparisons: [
      comparison('negative', 'vs 342', '-5,5% MoM'),
      comparison('negative', 'vs 484', '-33% YoY'),
    ],
    bullets: [
      bullet('negative', 'Quantidade de pedidos segue abaixo por fricção no avanço de lead qualificado.'),
      bullet('positive', 'Base de campanhas de conversão está pronta para nova rodada de criativos e audiência.'),
    ],
    previousActions: [
      action('ACQUISITION', 'pendente', 'Ajuste de público de remarketing iniciado, aguardando janela completa para validação.'),
      action('CRO', 'bloqueado', 'Reforço de pontos de contato travado por dependência de publicação em páginas-chave.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Subir 3 criativos novos e revisar exclusões de baixa intenção nas campanhas de conversão.'),
      action('CRO', 'pendente', 'Ajustar distribuição de contato em home e páginas de produto para reduzir abandono.'),
    ],
  },
];

const secondaryMetrics: MetricCard[] = [
  {
    title: 'ROAS GERAL',
    dateTag: 'Mar/2026',
    value: { target: 12.1, decimals: 1 },
    comparisons: [
      comparison('positive', 'vs 11,3', '+7,7% MoM'),
      comparison('positive', 'vs 8,5', '+42% YoY'),
    ],
    bullets: [
      bullet('negative', 'Resultado positivo ainda não compensa totalmente a perda de eficiência do funil final.'),
      bullet('positive', 'ROAS geral evoluiu e validou as campanhas de melhor estrutura para escalar com controle.'),
    ],
    previousActions: [
      action('ACQUISITION', 'feito', 'Congelamento da estrutura vencedora para evitar perda de eficiência por mudanças bruscas.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Manter público e orçamento base, testando só variações de copy e criativo na semana.'),
    ],
  },
  {
    title: 'ROAS POTENCIAL DE ORÇAMENTOS',
    dateTag: 'Mar/2026',
    value: { target: 44.2, decimals: 1 },
    comparisons: [comparison('positive', 'potencial ainda subexplorado')],
    bullets: [
      bullet('negative', 'Distância entre potencial e realizado indica alocação ineficiente em campanhas de orçamento.'),
      bullet('positive', 'Lista de campanhas elegíveis para ajuste fino de lance já foi priorizada.'),
    ],
    previousActions: [
      action('ACQUISITION', 'feito', 'Identificação dos 5 IDs com maior potencial para revisão de lance e limite de CPA.'),
      action('ACQUISITION', 'feito', 'Pausa de campanhas com baixo ROAS potencial para reduzir dispersão e liberar verba eficiente.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Executar ajuste de lance + limite de CPA com revisão nas terças e quintas.'),
      action('CRO', 'pendente', 'Testar novas LPs com maior qualificação de lead para reduzir perda entre cadastro e orçamento.'),
    ],
  },
  {
    title: 'TICKET MÉDIO PEDIDO',
    dateTag: 'Mar/2026',
    value: { target: 3193, prefix: 'R$' },
    comparisons: [
      comparison('positive', 'vs R$3.089', '+3,3%'),
      comparison('negative', 'vs R$3.696', '-13,6%'),
    ],
    bullets: [
      bullet('negative', 'Ticket melhora no curto prazo, mas segue abaixo do ano anterior e perto de mix e desconto.'),
      bullet('positive', 'Estrutura de bundle e régua de recuperação preparada para elevar valor por pedido.'),
    ],
    previousActions: [
      action('CRM', 'pendente', 'Régua de recuperação com ofertas complementares criada, aguardando publicação completa.'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Ativar bundle de 2 itens por categoria com -10% e rastrear impacto por UTM.'),
      action('CRM', 'pendente', 'Disparo segmentado para carrinho com destaque de bundle e prazo de oferta.'),
    ],
  },
];

const funnelStages: FunnelStage[] = [
  {
    title: 'ETAPA 1',
    label: 'LEADS (BASE ÍNDICE)',
    dateTag: 'Mar/2026 · Funil',
    value: { target: 100 },
    comparisons: [comparison('positive', 'vs base índice do funil', '100')],
    bullets: [
      bullet('negative', 'Apenas 31,2% avançam para cadastro e parte da base ainda chega fria, com baixa intenção de compra.'),
      bullet('positive', 'Base de leads mantém volume e define referência clara para otimizar eficiência entre etapas.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Reengajamento comercial da base para recuperar cadastros em aberto no Pipe.'),
    ],
    weekActions: [
      action('ACQUISITION', 'pendente', 'Reforçar segmentação de mídia para elevar proporção de leads com intenção real de compra.'),
    ],
  },
  {
    title: 'ETAPA 2',
    label: 'CADASTRO',
    dateTag: 'Mar/2026 · Funil',
    value: { target: 31.2, decimals: 1, suffix: '%' },
    comparisons: [
      comparison('negative', 'vs base de leads', '31,2% de avanço'),
      comparison('negative', 'vs orçamento', 'queda de 20,1 p.p no avanço'),
    ],
    bullets: [
      bullet('negative', 'Compressão após cadastro permanece alta por falta de nutrição/follow-up e experiência comercial inconsistente entre unidades.'),
      bullet('positive', 'Rotina comercial por filial já está estruturada para acelerar avanço de cadastro para orçamento.'),
    ],
    previousActions: [
      action('CRM', 'feito', 'Rotina diária de cobrança comercial para reduzir tempo de resposta pós-cadastro.'),
    ],
    weekActions: [
      action('CRM', 'pendente', 'Implementar playbook único de follow-up por filial para acelerar evolução ao orçamento.'),
      action('CRM', 'pendente', 'Estruturar follow-up comercial por filial para acelerar retorno de leads cadastrados.'),
    ],
  },
  {
    title: 'ETAPA 3',
    label: 'ORÇAMENTO (GARGALO)',
    dateTag: 'Mar/2026 · Funil',
    value: { target: 11.1, decimals: 1, suffix: '%' },
    comparisons: [
      comparison('negative', 'vs cadastro', '35,6% de avanço para orçamento'),
      comparison('positive', 'gap de ROAS', 'potencial 44,2 vs realizado 12,1'),
    ],
    bullets: [
      bullet('negative', 'Maior vazamento concentrado entre cadastro e orçamento, principal ponto de fricção do funil.'),
      bullet('positive', 'WhatsApp e mídia ajustada já mostram custo mais competitivo, e o gap de ROAS (44,2 vs 12,1) abre espaço para escalar testes com eficiência.'),
    ],
    previousActions: [
      action('CRO', 'feito', 'Inclusão de WhatsApp em páginas de maior intenção para reduzir atrito de contato.'),
      action('ACQUISITION', 'feito', 'Redistribuição de budget para canais e lojas com melhor resposta comercial.'),
      action('ACQUISITION', 'feito', 'Pausa de campanhas com baixo ROAS potencial para reduzir dispersão de verba.'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Testar novas LPs com maior qualificação para reduzir perda no trecho cadastro → orçamento.'),
    ],
  },
  {
    title: 'ETAPA 4',
    label: 'CONV. LEAD → PEDIDO',
    dateTag: 'Mar/2026 · Funil',
    value: { target: 7.1, decimals: 1, suffix: '%' },
    comparisons: [
      comparison('negative', 'vs 10% em Fev', '-2,9 p.p MoM'),
      comparison('negative', 'vs 11% em Mar', '-3,9 p.p YoY'),
    ],
    bullets: [
      bullet('negative', 'Taxa de conversão caiu e confirma o gargalo de qualificação no meio do funil.'),
      bullet('positive', 'Fluxo de contato por WhatsApp foi especificado para testes rápidos no e-commerce.'),
    ],
    previousActions: [
      action('CRO', 'feito', 'Mapeamento das páginas com maior queda de avanço e deficiência de hipóteses de abordagem.'),
      action('CRO', 'feito', 'Campanhas com CTA de WhatsApp apresentaram custo mais baixo e viraram referência para expansão.'),
    ],
    weekActions: [
      action('CRO', 'pendente', 'Publicar CTA de WhatsApp em home + carrinho com 2 scripts A/B e medir avanço qualificado.'),
      action('ACQUISITION', 'pendente', 'Recuperar conversão de orçamentos → pedidos'),
    ],
  },
];

const conversionExperienceItems = [
  {
    title: 'Adição do CTA "Falar com especialista" nas Landing Pages "Mês do Consumidor" e "Chance Única"',
    tags: ['LEADS', 'ACQUISITION', 'CRO'] as const,
    status: 'feito' as const,
    objective: 'Integramos o CTA "Falar com especialista" para capturar dados dos usuários usando o formulário de WhatsApp floating.',
    desktopImage: lpSemanaConsumidorImg,
    mobileImage: lpSemanaConsumidorMobileImg,
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
  {
    title: 'Formulário WhatsApp Floating',
    tags: ['CRM', 'LEADS', 'CRO'] as const,
    status: 'feito' as const,
    objective: 'Dados de usuários chegavam com valores indevidos devido aos erros de máscaras dos inputs: Nome aceitava números, E-mail aceitava fora do padrão @(provedor).com.br e Telefone aceitava letras.',
    desktopImage: heroDesktopImg,
    mobileImage: heroMobileImg,
    imageLabel: 'Formulário',
    imageHeight: 240,
  },
  {
    title: 'Adição do CTA "Falar com especialista" nas Páginas que assumem cluster por categoria "Pisos e Revestimentos"',
    tags: ['LEADS', 'CRO'] as const,
    status: 'feito' as const,
    objective: 'Ao considerarmos o custo alto para cotações de frete, ajustamos para que a jornada priorizasse contato assistido nas páginas de categoria de Pisos e Revestimentos.',
    desktopImage: lpChanceUnicaImg,
    mobileImage: lpChanceUnicaMobileImg,
    imageLabel: 'Categoria',
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

const allActions = [...primaryMetrics, ...secondaryMetrics, ...funnelStages].flatMap((item) => [...item.previousActions, ...item.weekActions]);
const statusCounts = collectStatusCounts(allActions);

const tokenPalette: Record<string, { color: string; background: string; border: string }> = {
  LEADS: { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.08)', border: 'rgba(125, 211, 252, 0.28)' },
  ACQUISITION: { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.28)' },
  CRO: { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.28)' },
  CRM: { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.28)' },
};

const statusPalette: Record<Status, { label: string; color: string; background: string; border: string }> = {
  feito: { label: 'Feito', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.06)', border: 'rgba(74, 222, 128, 0.16)' },
  pendente: { label: 'Pendente', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.06)', border: 'rgba(251, 191, 36, 0.16)' },
  bloqueado: { label: 'Bloqueado', color: '#F87171', background: 'rgba(248, 113, 113, 0.06)', border: 'rgba(248, 113, 113, 0.16)' },
};

const TokenTag = ({ label, compact = false }: { label: string; compact?: boolean }) => {
  const palette = tokenPalette[label] ?? {
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
        fontSize: 'var(--text-chip)',
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

const ActionCardView = ({ action, variant = 'week', compact = false }: { action: ActionCard; variant?: 'previous' | 'week'; compact?: boolean }) => (
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
      <TokenTag label={action.cluster} compact />
      <StatusPill status={action.status} />
    </div>
    <div style={{ color: variant === 'previous' ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.88)', fontSize: 'var(--text-body)', lineHeight: 1.55, fontWeight: 500 }}>
      {action.text}
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
              borderRadius: '8px',
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

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ações da semana anterior
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.previousActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="previous" compact={compact} />
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {item.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="week" compact={compact} />
        ))}
      </div>
    </div>
  </motion.article>
);

const FunnelCardView = ({ stage, isActive, compact = false }: { stage: FunnelStage; isActive: boolean; compact?: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: compact ? '16px' : '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? '14px' : '16px',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: compact ? 'stretch' : 'flex-start', flexDirection: compact ? 'column' : 'row' }}>
      <div>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-chip)', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {stage.title}
        </div>
        <div style={{ color: WHITE, fontSize: 'var(--text-body-lg)', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', marginTop: '5px' }}>
          {stage.label}
        </div>
      </div>
      <TokenTag label={stage.dateTag} compact />
    </div>

    <div style={{ fontSize: 'var(--text-hero)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
      <AnimatedNumber
        target={stage.value.target}
        prefix={stage.value.prefix}
        suffix={stage.value.suffix}
        decimals={stage.value.decimals}
        isActive={isActive}
        duration={3000}
      />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {stage.comparisons.map((row, index) => {
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
              padding: compact ? '9px 12px' : '10px 14px',
              borderRadius: '8px',
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
              <div style={{ color: activeColor, fontSize: 'var(--text-body)', fontWeight: 800, whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                {row.value}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Leituras
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.bullets.map((row, index) => (
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
        Ações da semana anterior
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.previousActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="previous" compact={compact} />
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--text-meta)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="week" compact={compact} />
        ))}
      </div>
    </div>
  </motion.article>
);

const SectionTitle = ({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) => {
  const { isCompact } = useDeckViewport();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isCompact ? 'stretch' : 'flex-start', gap: '16px', flexWrap: 'wrap', flexDirection: isCompact ? 'column' : 'row' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: isCompact ? '100%' : 'auto' }}>
        <div style={{ width: '4px', height: '28px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
        <div>
          <div style={{ color: WHITE, fontSize: 'var(--text-section)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'var(--text-body)', lineHeight: 1.5, marginTop: '6px' }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right ? <div style={{ display: 'flex', width: isCompact ? '100%' : 'auto', justifyContent: isCompact ? 'flex-start' : 'flex-end', flexWrap: 'wrap', gap: '8px' }}>{right}</div> : null}
    </div>
  );
};

const leadMediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: 'KVs de aquisição de leads',
    description: 'Conjunto de KVs para aquisição de leads com leitura direta e foco em conversão.',
    tags: ['LEADS', 'CRM'],
    status: 'feito',
    accent: CLUSTERS.CRM,
    badgeLabel: 'KVs',
    media: mediaSlots('https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-prevestimentos_quadrado-1-(1).png?v=202603271510'),
  },
  {
    title: 'KVs do Mês do Consumidor + ativações em andamento até 31/03',
    description: 'Atualização de peças do mês do consumidor e ativações em andamento até 31/03.',
    tags: ['CRM', 'LEADS'],
    status: 'feito',
    accent: CLUSTERS.CRM,
    badgeLabel: 'KVs',
    media: mediaSlots(),
  },
  {
    title: 'Atualização de criativos PMAX para pisos e paredes e chuveiros Lorenzetti',
    description: 'Pacote de PMAX para pisos, paredes e chuveiros Lorenzetti.',
    tags: ['CRO', 'ACQUISITION'],
    status: 'feito',
    accent: CLUSTERS.CRO,
    badgeLabel: 'PMAX',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-paredes_quadrado-3.png?v=202603271517',
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-lorenzeti_horizontal-4.png?v=202603271517',
    ),
  },
  {
    title: 'Criativos “Super Chance Única” (e-commerce) + campanhas relâmpago Deca (oportunidade)',
    description: 'Criativos de oportunidade para Super Chance Única e campanhas relâmpago Deca.',
    tags: ['E-COMMERCE', 'ACQUISITION'],
    status: 'feito',
    accent: CLUSTERS.ECOMMERCE,
    badgeLabel: 'E-commerce',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_tanque_quadrado-1-(1).png?v=202603271517',
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_campanha-rel%C3%A2mpago-deca_quadrado-2.png?v=202603271517',
    ),
  },
  {
    title: 'KVs diários para a Semana do Consumidor, incluindo campanha dedicada da Docol.',
    description: 'Sequência diária de KVs para a Semana do Consumidor com campanha dedicada da Docol.',
    tags: ['LEADS', 'ACQUISITION'],
    status: 'feito',
    accent: CLUSTERS.LEADS,
    badgeLabel: 'KVs',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/[abc]-campanha-docol_retrato-4.png?v=202603271510',
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_mc_produtos-foco_retrato-4-1.png?v=202603271517',
    ),
  },
  {
    title: 'KVs de EXP focado em geolocalização (cidades que queremos entrar e grandes cidades)',
    description: 'KVs de expansão com foco em geolocalização e praças prioritárias.',
    tags: ['ACQUISITION', 'CRO'],
    status: 'feito',
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'EXP',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_expans%C3%A3o_quadrado-1-c1-(10).png?v=202603271510',
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_expans%C3%A3o_quadrado-1-c1-(2).png?v=202603271510',
    ),
  },
];

export function Slide2VisaoLeads({ isActive }: Props) {
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        padding: isMobile ? '108px 16px 48px' : isCompact ? '124px 24px 64px' : '140px clamp(28px, 5vw, 72px) 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? '40px' : '60px',
      }}
    >
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader
            accentColor={CLUSTERS.LEADS}
            title="Visão Leads MTD"
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: isCompact ? 'flex-start' : 'flex-end', marginTop: isCompact ? '0' : '8px' }}>
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

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
        {primaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
        {secondaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <section
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
        <SectionTitle
          title="Cadastro → Orçamento → Pedido"
          right={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: isCompact ? 'flex-start' : 'flex-end' }}>
              <TokenTag label="CRO" compact />
              <TokenTag label="LEADS" compact />
              <TokenTag label="ACQUISITION" compact />
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
          {funnelStages.map((stage) => (
            <FunnelCardView key={stage.label} stage={stage} isActive={isActive} compact={isCompact} />
          ))}
        </div>
      </section>

      <ConversionExperienceSection items={conversionExperienceItems} />

      <MediaAcquisitionSection items={leadMediaAcquisitionItems} />
    </div>
  );
}

