import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { BG, WHITE, CLUSTERS } from '../theme';
import { SlideHeroHeader, useDeckViewport } from './sharedDeckTypography';

interface Props {
  isActive: boolean;
}

type SummaryCard = {
  cluster: 'LEADS' | 'E-COMMERCE' | 'EXPANSÃO';
  color: string;
  title: string;
  insight: string;
  actions: string[];
};

type ImpactItem = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
};

type HeroToken = 'ESTRATÉGIA' | 'CRO' | 'ANALYTICS' | 'EXECUÇÃO';

const heroTokenPalette: Record<HeroToken, { color: string; background: string; border: string }> = {
  ESTRATÉGIA: { color: CLUSTERS.ESTRATEGIA, background: 'rgba(254, 240, 138, 0.08)', border: 'rgba(254, 240, 138, 0.22)' },
  CRO: { color: CLUSTERS.CRO, background: 'rgba(147, 197, 253, 0.08)', border: 'rgba(147, 197, 253, 0.22)' },
  ANALYTICS: { color: '#D1D5DB', background: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)' },
  EXECUÇÃO: { color: '#C4B5FD', background: 'rgba(196, 181, 253, 0.08)', border: 'rgba(196, 181, 253, 0.22)' },
};

const TokenTag = ({ label, compact = false }: { label: HeroToken; compact?: boolean }) => {
  const palette = heroTokenPalette[label];

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
        padding: compact ? '4px 9px' : '5px 10px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: 'var(--text-chip)',
        fontWeight: 700,
        letterSpacing: compact ? '0.08em' : '0.09em',
        lineHeight: 1,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

const summaryCards: SummaryCard[] = [
  {
    cluster: 'LEADS',
    color: CLUSTERS.LEADS,
    title: 'Conversão no meio do funil',
    insight: 'O gargalo mais valioso segue entre orçamento e pedido. A maior alavanca continua sendo reduzir perda no meio do funil enquanto a mídia cobre praças sem entrada.',
    actions: [
      'Recuperar conversão de orçamentos → pedidos',
      'Redistribuir mídia para lojas com 0 entradas',
      'Otimização de fluxos e Bot no Site',
    ],
  },
  {
    cluster: 'E-COMMERCE',
    color: CLUSTERS.ECOMMERCE,
    title: 'Eficiência de mídia e UX',
    insight: 'ROAS e UX precisam caminhar juntos para destravar ganho real. Catálogo, filtros e atrito logístico seguem como alavancas de curto prazo.',
    actions: [
      'Aumentar eficiência de campanhas (ROAS)',
      'Reestruturar UX do e-commerce (catálogo + filtros)',
      'Evoluir Split de Entregas e análises de experiência',
      'Mecânica de WhatsApp e E-mail Marketing',
    ],
  },
  {
    cluster: 'EXPANSÃO',
    color: CLUSTERS.EXPANSAO,
    title: 'Qualificação antes de volume',
    insight: 'A expansão funciona melhor quando o pipeline é mais profundo e previsível. Aqui, a qualidade da intenção vale mais do que o volume bruto.',
    actions: [
      'Estratégia "Oportunidade por Praça" (Gatilho Escassez)',
      'Ativação de estratégia LinkedIn Ads (Perfis B2B)',
      'Novas campanhas de B2B e reativação via CRM',
    ],
  },
];

const impacts: ImpactItem[] = [
  { value: 15, suffix: '%', label: 'Conversão Lead → Pedido', sub: 'Impacto esperado de curto prazo' },
  { value: 20, suffix: '%', label: 'ROAS E-commerce', sub: 'Com otimização de mídia e UX' },
  { value: 15, suffix: '%', label: 'Receita Incremental', sub: 'Estimativa de ganho com as 8 ações' },
];

const ImpactRow = ({ item, isActive, index, compact = false }: { item: ImpactItem; isActive: boolean; index: number; compact?: boolean }) => (
  <div
    /* Edita Linha de Impacto */
    style={{
      display: 'flex',
      alignItems: compact ? 'stretch' : 'flex-start',
      justifyContent: 'space-between',
      gap: '16px',
      padding: compact ? '14px 0' : '18px 0',
      borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
      flexDirection: compact ? 'column' : 'row',
    }}
  >
    <div>
      <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'var(--text-meta)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.sub}
      </div>
      <div style={{ color: WHITE, fontSize: 'var(--text-section)', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em', marginTop: '8px' }}>
        {item.label}
      </div>
    </div>

    <div
      style={{
        color: index === 0 ? CLUSTERS.LEADS : index === 1 ? CLUSTERS.ECOMMERCE : CLUSTERS.EXPANSAO,
        fontSize: compact ? 'var(--text-section)' : 'var(--text-hero)',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}
    >
      +<AnimatedNumber target={item.value} suffix={item.suffix} isActive={isActive} duration={3000} />
    </div>
  </div>
);

export function Slide9Top8({ isActive }: Props) {
  const clusterColor = CLUSTERS.ESTRATEGIA;
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: isMobile ? '108px 16px 48px' : isCompact ? '124px 24px 64px' : '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: isCompact ? '40px' : '60px' }}>
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SlideHeroHeader accentColor={clusterColor} title="Fechamento Semanal">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <TokenTag label="ESTRATÉGIA" compact={isCompact} />
              <TokenTag label="CRO" compact={isCompact} />
              <TokenTag label="ANALYTICS" compact={isCompact} />
              <TokenTag label="EXECUÇÃO" compact={isCompact} />
            </div>
          </SlideHeroHeader>
        </motion.div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isCompact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isCompact ? '14px' : '20px' }}>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            gridColumn: isMobile ? 'auto' : '1 / -1',
            background: `${clusterColor}10`,
            border: `1px solid ${clusterColor}28`,
            borderRadius: '18px',
            padding: isCompact ? '18px' : '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: isCompact ? '16px' : '18px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isCompact ? 'stretch' : 'flex-start', gap: '16px', flexWrap: 'wrap', flexDirection: isCompact ? 'column' : 'row' }}>
            <div>
              <div style={{ color: clusterColor, fontSize: 'var(--text-body)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Impacto estimado
              </div>
              <div style={{ color: WHITE, fontSize: 'var(--text-section)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', marginTop: '8px' }}>
                Potencial consolidado das oito ações.
              </div>
            </div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: '999px',
                border: `1px solid ${clusterColor}33`,
                background: `${clusterColor}12`,
                color: clusterColor,
                fontSize: 'var(--text-chip)',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Report Closed
            </span>
          </div>

          <div>
            {impacts.map((item, index) => (
              <ImpactRow key={item.label} item={item} index={index} isActive={isActive} compact={isCompact} />
            ))}
          </div>

          <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'var(--text-body)', lineHeight: 1.55 }}>
            Base direcional para a próxima rodada de execução. As oito ações só capturam o incremental esperado quando entram como sistema.
          </div>
        </motion.article>

        {summaryCards.map((card) => (
          <motion.article
            key={card.cluster}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderTop: `4px solid ${card.color}`,
              borderRadius: '16px',
              padding: isCompact ? '20px' : '26px',
              display: 'flex',
              flexDirection: 'column',
              gap: isCompact ? '14px' : '18px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isCompact ? 'stretch' : 'flex-start', gap: '12px', flexDirection: isCompact ? 'column' : 'row' }}>
              <div>
                <div style={{ color: card.color, fontSize: 'var(--text-body)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {card.cluster}
                </div>
                <div style={{ color: WHITE, fontSize: 'var(--text-section)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.02em', marginTop: '6px' }}>
                  {card.title}
                </div>
              </div>
              <div style={{ width: '10px', height: '10px', borderRadius: '999px', background: card.color, marginTop: '6px' }} />
            </div>

            <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'var(--text-body-lg)', lineHeight: 1.6 }}>
              {card.insight}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {card.actions.map((actionText) => (
                <span
                  key={actionText}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '7px 10px',
                    borderRadius: '999px',
                    background: 'rgba(0,0,0,0.24)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: WHITE,
                    fontSize: 'var(--text-meta)',
                    fontWeight: 700,
                    lineHeight: 1.35,
                  }}
                >
                  {actionText}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </section>

      <div
        /* Edita Rodape de Encerramento */
        style={{
          padding: isCompact ? '16px 18px' : '18px 22px',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          color: 'rgba(255,255,255,0.58)',
          fontSize: 'var(--text-body)',
          lineHeight: 1.6,
        }}
      >
        Deck encerrado: os drivers de curto prazo já estão refletidos nas páginas de Leads, E-commerce e Expansão. O
        fechamento aqui é de direção, não de backlog.
      </div>
    </div>
  );
}
