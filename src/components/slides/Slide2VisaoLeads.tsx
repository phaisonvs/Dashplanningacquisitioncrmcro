import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { AnimatedNumber } from '../AnimatedNumber';
import { BG, WHITE, GREEN, RED, CLUSTERS } from '../theme';
import { ConversionExperienceSection } from './sharedConversionExperience';
import {
  DeckPill,
  KpiActionGroup,
  SlideHeroHeader,
  deckCardPresets,
  deckPillPresets,
  useDeckViewport,
} from './sharedDeckTypography';
import { MediaAcquisitionSection, collectStatusCounts, mediaSlots, type MediaAcquisitionItem } from './sharedMediaAcquisition';

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
    title: 'Evolução de integração Popup Primeira Compra',
    tags: ['LEADS', 'CRO', 'E-COMMERCE'] as const,
    status: 'pendente' as const,
    objective:
      'A evolução busca aumentar o preenchimento do formulário com novos gatilhos de interação com o usuário. Se o usuário fechar o popup sem preencher, ele continua disponível em toda a jornada do site, preso na lateral esquerda, enquanto evoluímos a integração dele e dos leads de localpages para dentro do core do SalesForce.',
    objectiveKpis: ['Leads'],
    desktopImageLink:
      'https://abcdaconstrucao.fbitsstatic.net/media/primeira-compra-opup.jpg?v=202603301612',
    mobileImageLink:
      'https://abcdaconstrucao.fbitsstatic.net/media/primeira-compra-mob.jpg?v=202603301612',
    imageLabel: 'Popup Primeira Compra',
    imageHeight: 240,
  },
  {
    title: 'Adição do CTA "Falar com especialista" nas Landing Pages "Mês do Consumidor" e "Chance Única"',
    tags: ['CRO', 'LEADS', 'ACQUISITION'] as const,
    status: 'feito' as const,
    objective: 'Integramos o CTA "Falar com especialista" para capturar dados dos usuários usando o formulário de WhatsApp floating.',
    objectiveKpis: ['Leads'],
    imageLabel: 'Landing Page',
    imageHeight: 240,
  },
  {
    title: 'Formulário WhatsApp Floating',
    tags: ['CRO', 'LEADS'] as const,
    status: 'feito' as const,
    objective: 'Dados de usuários chegavam com valores indevidos devido aos erros de máscaras dos inputs: Nome aceitava números, E-mail aceitava fora do padrão @(provedor).com.br e Telefone aceitava letras.',
    objectiveKpis: ['Leads'],
    mobileImageLink:
      'https://abcdaconstrucao.fbitsstatic.net/media/formulario-bot.jpg?v=202603301550',
    imageLabel: 'Formulário',
    imageHeight: 240,
  },
  {
    title: 'Adição do CTA e pop-up "Falar com especialista" nas Páginas que assumem cluster por categoria "Pisos e Revestimentos".',
    tags: ['CRO', 'LEADS'] as const,
    status: 'pendente' as const,
    objective: 'Fazer o usuário se cadastrar e iniciar o atendimento pelo bot de WhatsApp, reduzindo atrito no contato assistido das páginas de categoria de Pisos e Revestimentos.',
    objectiveKpis: ['Leads'],
    desktopImageLink:
      'https://abcdaconstrucao.fbitsstatic.net/media/popup-especialista-piso-desk.jpg?v=202603301545',
    mobileImageLink:
      'https://abcdaconstrucao.fbitsstatic.net/media/popup-especialista-piso-mob.jpg?v=202603301546',
    imageLabel: 'Categoria',
    imageHeight: 240,
  },
] satisfies Array<{
  title: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM'>;
  status: 'feito' | 'pendente' | 'bloqueado';
  objective: string;
  objectiveKpis?: string[];
  desktopImageLink?: string;
  mobileImageLink?: string;
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
      data-ui="contador-status-leads"
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
    data-ui="card-metrica-leads"
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
            data-ui="linha-comparacao-leads"
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
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--rotulo)', fontWeight: 700, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', marginBottom: '10px' }}>
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

const FunnelCardView = ({ stage, isActive, compact = false }: { stage: FunnelStage; isActive: boolean; compact?: boolean }) => {
  const isMaskedStage = stage.title === 'ETAPA 3' && stage.label === 'ORÇAMENTO (GARGALO)';
  const [isRevealed, setIsRevealed] = useState(() => !isMaskedStage);
  const shouldMask = isMaskedStage && !isRevealed;

  return (
    <motion.article
      data-ui="card-funil-leads"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        ...deckCardPresets.metric(compact, 'tight'),
        minHeight: undefined,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        data-ui="kpi-card-funil-content"
        aria-hidden={shouldMask}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? '14px' : '16px',
          filter: shouldMask ? 'blur(10px) saturate(0.72)' : 'none',
          opacity: shouldMask ? 0.2 : 1,
          pointerEvents: shouldMask ? 'none' : 'auto',
          userSelect: shouldMask ? 'none' : 'auto',
          transition: 'filter 180ms ease, opacity 180ms ease',
        }}
      >
        <div data-ui="kpi-card-header" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: compact ? 'stretch' : 'flex-start', flexDirection: compact ? 'column' : 'row' }}>
          <div data-ui="kpi-card-headline">
            <div data-ui="kpi-card-title" style={{ color: 'rgba(255,255,255,0.42)', fontSize: 'var(--rotulo)', fontWeight: 800, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>
              {stage.title}
            </div>
            <div data-ui="kpi-card-label" style={{ color: WHITE, fontSize: 'var(--paragrafo-grande)', fontWeight: 800, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', marginTop: '5px' }}>
              {stage.label}
            </div>
          </div>
          <div data-ui="kpi-card-date">
            <TokenTag label={stage.dateTag} compact />
          </div>
        </div>

        <div data-ui="kpi-card-value" style={{ fontSize: 'var(--titulo-pagina)', lineHeight: 1, fontWeight: 800, letterSpacing: 'var(--tracking-display)', color: WHITE }}>
          <AnimatedNumber
            target={stage.value.target}
            prefix={stage.value.prefix}
            suffix={stage.value.suffix}
            decimals={stage.value.decimals}
            isActive={isActive}
            duration={3000}
          />
        </div>

        <div data-ui="kpi-card-comparisons" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {stage.comparisons.map((row, index) => {
            const activeColor = row.tone === 'positive' ? GREEN : RED;
            const hasValue = Boolean(row.value);

            return (
              <div
                key={`${row.text}-${index}`}
                data-ui="linha-comparacao-funil-leads"
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
                <div data-ui="kpi-card-comparison-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: 'var(--paragrafo)', lineHeight: 1.35, minWidth: 0, flex: '1 1 auto' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
                  {row.text}
                </div>
                {hasValue && (
                  <div data-ui="kpi-card-comparison-value" style={{ color: activeColor, fontSize: 'var(--paragrafo)', fontWeight: 800, whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                    {row.value}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div data-ui="kpi-card-readings" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
          <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: 'var(--rotulo)', fontWeight: 800, letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Leituras
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stage.bullets.map((row, index) => (
              <div key={`${row.text}-${index}`} data-ui="kpi-card-reading" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
                <div data-ui="kpi-card-reading-text" style={{ color: 'rgba(255,255,255,0.74)', fontSize: 'var(--paragrafo)', lineHeight: 1.45 }}>
                  {row.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {stage.previousActions.length > 0 ? (
          <div data-ui="kpi-card-actions-previous">
            <KpiActionGroup actions={stage.previousActions} compact={compact} label="Ações da semana anterior" variant="previous" actionGap={10} />
          </div>
        ) : null}

        {stage.weekActions.length > 0 ? (
          <div data-ui="kpi-card-actions-week">
            <KpiActionGroup actions={stage.weekActions} compact={compact} label="Ação na semana" variant="week" actionGap={10} />
          </div>
        ) : null}
      </div>

      {isMaskedStage ? (
        <div
          data-ui="leads-funil-mask-layer"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            borderRadius: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              background: shouldMask
                ? 'linear-gradient(180deg, rgba(2, 6, 23, 0.56), rgba(2, 6, 23, 0.82))'
                : 'transparent',
              backdropFilter: shouldMask ? 'blur(10px)' : 'blur(0px)',
              opacity: shouldMask ? 1 : 0,
              transition: 'opacity 180ms ease, backdrop-filter 180ms ease, background 180ms ease',
            }}
          />

          <button
            type="button"
            data-ui="leads-funil-mask-toggle"
            aria-label={shouldMask ? 'Visualizar etapa 3' : 'Ocultar etapa 3'}
            aria-pressed={isRevealed}
            title={shouldMask ? 'Visualizar etapa 3' : 'Ocultar etapa 3'}
            onClick={() => setIsRevealed((current) => !current)}
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: compact ? '54px' : '62px',
              height: compact ? '54px' : '62px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.16)',
              background: shouldMask ? 'rgba(17, 24, 39, 0.82)' : 'rgba(255,255,255,0.08)',
              color: WHITE,
              boxShadow: shouldMask
                ? '0 18px 44px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 12px 30px rgba(0,0,0,0.18)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'transform 160ms ease, background 160ms ease, box-shadow 160ms ease',
            }}
          >
            {shouldMask ? <Eye size={22} /> : <EyeOff size={22} />}
          </button>
        </div>
      ) : null}
    </motion.article>
  );
};

const SectionTitle = ({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) => {
  const { isCompact } = useDeckViewport();

  return (
    <div data-ui="cabecalho-secao-leads" style={{ display: 'flex', justifyContent: 'space-between', alignItems: isCompact ? 'stretch' : 'flex-start', gap: '16px', flexWrap: 'wrap', flexDirection: isCompact ? 'column' : 'row' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: isCompact ? '100%' : 'auto' }}>
        <div style={{ width: '4px', height: '28px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
        <div>
          <div style={{ color: WHITE, fontSize: 'var(--titulo-secao)', fontWeight: 700, letterSpacing: 'var(--tracking-title)', lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'var(--paragrafo)', lineHeight: 1.5, marginTop: '6px' }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right ? <div style={{ display: 'flex', width: isCompact ? '100%' : 'auto', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>{right}</div> : null}
    </div>
  );
};

const leadMediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: 'KVs de aquisição de leads',
    description: 'Validar a leitura inicial dos KVs de aquisição com foco em volume qualificado de leads.',
    objectiveKpis: ['Leads'],
    tags: ['LEADS', 'ACQUISITION', 'CRO'],
    status: 'feito',
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'KVs',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-prevestimentos_quadrado-1-(1).png?v=202603271510',
    ),
  },
  {
    title: 'KVs de aquisição de leads',
    description: 'Testar uma variação de KV com reforço de oferta e clareza de conversão.',
    objectiveKpis: ['Receita'],
    tags: ['LEADS', 'ACQUISITION', 'CRO'],
    status: 'feito',
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'KVs',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-prevestimentos_quadrado-2.png?v=202603271646',
    ),
  },
  {
    title: 'KVs de aquisição de leads',
    description: 'Comparar uma terceira leitura de KV priorizando escala e eficiência na captação.',
    objectiveKpis: ['Investimento'],
    tags: ['LEADS', 'ACQUISITION', 'CRO'],
    status: 'feito',
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'KVs',
    media: mediaSlots(
      'https://abcdaconstrucao.fbitsstatic.net/media/abc_pmax-pisos-e-prevestimentos_quadrado-3-(1).png?v=202603271646',
    ),
  },
];

export function Slide2VisaoLeads({ isActive }: Props) {
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div
      data-ui="leads-root"
      style={{
        minHeight: '100vh',
        background: BG,
        padding: isMobile ? '108px 16px 48px' : isCompact ? '124px 24px 64px' : '140px clamp(28px, 5vw, 72px) 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? '40px' : '60px',
      }}
    >
      <section data-ui="leads-hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader
            accentColor={CLUSTERS.LEADS}
            title="Visão Leads MTD"
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: isCompact ? '0' : '8px' }}>
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

      <section data-ui="leads-metricas-principais" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
        {primaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <section data-ui="leads-metricas-secundarias" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
        {secondaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} compact={isCompact} />
        ))}
      </section>

      <section data-ui="leads-funil" style={deckCardPresets.section(isCompact)}>
        <SectionTitle
          title="Cadastro → Orçamento → Pedido"
          right={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <TokenTag label="CRO" compact />
              <TokenTag label="LEADS" compact />
              <TokenTag label="ACQUISITION" compact />
            </div>
          }
        />

        <div data-ui="leads-grid-funil" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isCompact ? '14px' : '18px' }}>
          {funnelStages.map((stage) => (
            <FunnelCardView key={stage.label} stage={stage} isActive={isActive} compact={isCompact} />
          ))}
        </div>
      </section>

      <div data-ui="leads-secao-evidencias">
        <ConversionExperienceSection items={conversionExperienceItems} />
      </div>

      <div data-ui="leads-secao-midias">
        <MediaAcquisitionSection items={leadMediaAcquisitionItems} />
      </div>
    </div>
  );
}


