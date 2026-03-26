import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { AnimatedNumber } from '../AnimatedNumber';
import { BG, WHITE, GREEN, RED, CLUSTERS } from '../theme';

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
      action('CRM', 'pendente', 'Meta por representante para cadastros no Pipe com monitoramento diário até sexta.'),
      action('ACQUISITION', 'pendente', 'Foco em praças zeradas com campanhas locais para elevar geração de leads nas filiais com baixo volume.'),
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
      action('ACQUISITION', 'pendente', 'Escalar campanhas com maior taxa de pedidos, mantendo controle diário de custo por loja.'),
    ],
  },
];

const allActions = [...primaryMetrics, ...secondaryMetrics, ...funnelStages].flatMap((item) => [...item.previousActions, ...item.weekActions]);
const statusCounts = allActions.reduce(
  (acc, current) => {
    acc[current.status] += 1;
    return acc;
  },
  { feito: 0, pendente: 0, bloqueado: 0 } as Record<Status, number>,
);

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
        padding: compact ? '4px 10px' : '5px 12px',
        borderRadius: '6px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: compact ? '11px' : '11px',
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
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
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

const ActionCardView = ({ action, variant = 'week' }: { action: ActionCard; variant?: 'previous' | 'week' }) => (
  <div
    style={{
      background: variant === 'previous' ? 'rgba(255,255,255,0.018)' : 'rgba(20,20,20,0.88)',
      border: `1px solid ${variant === 'previous' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '12px',
      padding: '14px',
      boxShadow: variant === 'previous' ? 'inset 0 1px 0 rgba(255,255,255,0.02)' : 'inset 0 1px 0 rgba(255,255,255,0.03)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <TokenTag label={action.cluster} compact />
      <StatusPill status={action.status} />
    </div>
    <div style={{ color: variant === 'previous' ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.55, fontWeight: 500 }}>
      {action.text}
    </div>
  </div>
);

const MetricCardView = ({ item, isActive }: { item: MetricCard; isActive: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '14px',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      minHeight: '100%',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.title}
      </div>
      <TokenTag label={item.dateTag} />
    </div>

    <div style={{ fontSize: 'clamp(28px, 3vw, 50px)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
      <AnimatedNumber
        target={item.value.target}
        prefix={item.value.prefix}
        suffix={item.value.suffix}
        decimals={item.value.decimals}
        isActive={isActive}
        duration={3000}
      />
    </div>

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
              borderRadius: '8px',
              background: row.tone === 'positive' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 82, 82, 0.10)',
              border: `1px solid ${row.tone === 'positive' ? 'rgba(34, 197, 94, 0.24)' : 'rgba(255, 82, 82, 0.24)'}`,
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

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
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

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ações da semana anterior
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {item.previousActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="previous" />
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {item.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="week" />
        ))}
      </div>
    </div>
  </motion.article>
);

const FunnelCardView = ({ stage, isActive }: { stage: FunnelStage; isActive: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '14px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
      <div>
        <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {stage.title}
        </div>
        <div style={{ color: WHITE, fontSize: '15px', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase', marginTop: '5px' }}>
          {stage.label}
        </div>
      </div>
      <TokenTag label={stage.dateTag} />
    </div>

    <div style={{ fontSize: 'clamp(26px, 3vw, 42px)', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', color: WHITE }}>
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
              padding: '10px 14px',
              borderRadius: '8px',
              background: row.tone === 'positive' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 82, 82, 0.10)',
              border: `1px solid ${row.tone === 'positive' ? 'rgba(34, 197, 94, 0.24)' : 'rgba(255, 82, 82, 0.24)'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.84)', fontSize: '12px', lineHeight: 1.35 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '999px', background: activeColor, flexShrink: 0 }} />
              {row.text}
            </div>
            {hasValue && (
              <div style={{ color: activeColor, fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                {row.value}
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
      <div style={{ color: 'rgba(255,255,255,0.50)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Leituras
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.bullets.map((row, index) => (
          <div key={`${row.text}-${index}`} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '999px', background: row.tone === 'positive' ? GREEN : RED, flexShrink: 0 }} />
            <div style={{ color: 'rgba(255,255,255,0.74)', fontSize: '13px', lineHeight: 1.45 }}>
              {row.text}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ações da semana anterior
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.previousActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="previous" />
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Ação na semana
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stage.weekActions.map((itemAction, index) => (
          <ActionCardView key={`${itemAction.text}-${index}`} action={itemAction} variant="week" />
        ))}
      </div>
    </div>
  </motion.article>
);

const SectionTitle = ({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '4px', height: '28px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
      <div>
        <div style={{ color: WHITE, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: '12px', lineHeight: 1.5, marginTop: '6px' }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
    {right}
  </div>
);

export function Slide2VisaoLeads({ isActive }: Props) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: BG,
        padding: '140px clamp(28px, 5vw, 72px) 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '4px', height: '32px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Visão Leads MTD
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '8px' }}>
              <StatusCounter status="feito" count={statusCounts.feito} isActive={isActive} />
              <StatusCounter status="pendente" count={statusCounts.pendente} isActive={isActive} />
              <StatusCounter status="bloqueado" count={statusCounts.bloqueado} isActive={isActive} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <TokenTag label="LEADS" compact />
            <TokenTag label="ACQUISITION" compact />
            <TokenTag label="CRO" compact />
            <TokenTag label="CRM" compact />
          </div>
        </motion.div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
        {primaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} />
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
        {secondaryMetrics.map((item) => (
          <MetricCardView key={item.title} item={item} isActive={isActive} />
        ))}
      </section>

      <section
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '14px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <SectionTitle
          title="Cadastro → Orçamento → Pedido"
          right={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <TokenTag label="CRO" compact />
              <TokenTag label="LEADS" compact />
              <TokenTag label="ACQUISITION" compact />
            </div>
          }
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '14px' }}>
          {funnelStages.map((stage) => (
            <FunnelCardView key={stage.label} stage={stage} isActive={isActive} />
          ))}
        </div>
      </section>
    </div>
  );
}
