import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, WHITE } from '../theme';

interface Props { isActive: boolean }

const clusters = [
  {
    id: 'E-COMMERCE',
    color: CLUSTERS.ECOMMERCE,
    actions: [
      { type: 'ACQUISITION', title: 'Aumentar eficiência de campanhas (ROAS)', sub: 'Foco nos top SKUs conversores e revisão de preço/frete.' },
      { type: 'CRO', title: 'Reestruturar UX do e-commerce (catálogo + filtros)', sub: 'Evolução crítica da API de catálogo e vitrines mais relevantes.' },
      { type: 'CRO', title: 'Evoluir Split de Entregas e análises de experiência', sub: 'Evoluir nos projetos que podem trazer mais receita no curto prazo' },
      { type: 'CRM', title: 'Mecânica de Whatsapp e E-mail Marketing', sub: 'Campanhas para carrinho abandonado e disparos segmentados.' },
    ]
  },
  {
    id: 'LEADS',
    color: CLUSTERS.LEADS,
    actions: [
      { type: 'CRO', title: 'Recuperar conversão de orçamentos → pedidos', sub: 'Escalar campanhas que geram mais pedidos e reter base atual.' },
      { type: 'ACQUISITION', title: 'Redistribuir mídia para lojas com 0 entradas', sub: 'Rebalancear budget por região e pausar campanhas ineficientes.' },
      { type: 'CRM', title: 'Otimização de fluxos e Bot no Site', sub: 'Reativação via CRM + bot e SLA de atendimento por loja.' },
    ]
  },
  {
    id: 'EXPANSÃO',
    color: CLUSTERS.EXPANSAO,
    actions: [
      { type: 'ACQUISITION', title: 'Novas campanhas de B2B e reativação via CRM', sub: 'Fluxo D0, D2, D5 para leads não convertidos. Iniciar Linkedin Ads.' },
    ]
  }
];

const getTagColor = (type: string) => {
  if (type === 'CRO') return CLUSTERS.CRO;
  if (type === 'ACQUISITION') return CLUSTERS.ACQUISITION;
  if (type === 'CRM') return CLUSTERS.CRM;
  return WHITE;
};

const impacts = [
  { value: 15, suffix: '%', label: 'Conversão Lead → Pedido', sub: 'Impacto esperado de curto prazo' },
  { value: 20, suffix: '%', label: 'ROAS E-commerce', sub: 'Com otimização de mídia e UX' },
  { value: 15, suffix: '%', label: 'Receita Incremental', sub: 'Estimativa de ganho com as 8 ações' },
];

export function Slide9Top8({ isActive }: Props) {
  const clusterColor = CLUSTERS.ESTRATEGIA;

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Header */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '32px', background: clusterColor, borderRadius: '2px' }} />
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Top 8 Ações — Priorização Semanal
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', maxWidth: '800px', lineHeight: 1.6, fontWeight: 300 }}>
            Resumo consolidado das iniciativas críticas mapeadas neste report, classificadas por cluster e frente de atuação.
          </p>
        </motion.div>
      </section>

      {/* Action list - clustered view */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'stretch' }}>
        {clusters.map((cluster, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid rgba(255,255,255,0.05)`,
              borderTop: `4px solid ${cluster.color}`,
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div style={{ color: cluster.color, fontSize: '18px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {cluster.id}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cluster.actions.map((action, j) => {
                const tagColor = getTagColor(action.type);
                return (
                  <div key={j} style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: `${tagColor}15`,
                          border: `1px solid ${tagColor}40`,
                          color: tagColor,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {action.type}
                      </span>
                    </div>
                    <div style={{ color: WHITE, fontSize: '15px', fontWeight: 600, lineHeight: 1.4, marginBottom: '8px' }}>{action.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.5, fontWeight: 300 }}>{action.sub}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Impact metrics */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          background: `${clusterColor}10`,
          border: `1px solid ${clusterColor}30`,
          borderRadius: '12px',
          padding: '40px',
          marginTop: '16px'
        }}
      >
        {impacts.map((imp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
            style={{ textAlign: 'center', position: 'relative' }}
          >
            {i > 0 && <div style={{ position: 'absolute', left: '-12px', top: '20%', bottom: '20%', width: '1px', background: `${clusterColor}20` }} />}
            <div style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: clusterColor, lineHeight: 1, letterSpacing: '-0.03em' }}>
              +<AnimatedNumber target={imp.value} suffix={imp.suffix} isActive={isActive} duration={1600 + i * 100} />
            </div>
            <div style={{ color: WHITE, fontSize: '16px', fontWeight: 600, margin: '16px 0 8px', letterSpacing: '-0.01em' }}>{imp.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 300, lineHeight: 1.4 }}>{imp.sub}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

