import { motion } from 'motion/react';
import { CLUSTERS, BG, WHITE, RED, GREEN } from '../theme';
import { AnimatedNumber } from '../AnimatedNumber';

interface Props { isActive: boolean }

const funelSteps = [
  { label: 'Leads', value: 149, color: 'rgba(255,255,255,0.02)', textColor: WHITE, borderColor: 'rgba(255,255,255,0.1)', sub: '' },
  { label: 'Apresentações', value: 9, color: 'rgba(255,255,255,0.05)', textColor: WHITE, borderColor: 'rgba(255,255,255,0.2)', sub: 'taxa de 6%' },
  { label: 'Oportunidades', value: 6, color: `${CLUSTERS.EXPANSAO}30`, textColor: CLUSTERS.EXPANSAO, borderColor: CLUSTERS.EXPANSAO, sub: 'taxa de 66%' },
  { label: 'Contratos fechados', value: 0, color: `${RED}10`, textColor: RED, borderColor: RED, sub: '' },
];

const widths = [100, 70, 48, 30];

export function Slide8Expansao({ isActive }: Props) {
  const clusterColor = CLUSTERS.EXPANSAO;

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Header */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '32px', background: clusterColor, borderRadius: '2px' }} />
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Funil de Expansão — Pipeline
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', maxWidth: '800px', lineHeight: 1.6, fontWeight: 300 }}>
            Geração de leads qualificados para expansão. Embora o volume seja controlado, a taxa de conversão 
            de apresentação para oportunidade atingiu 66%, indicando alta qualificação.
          </p>
        </motion.div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        {/* Funnel Area */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {funelSteps.map((step, i) => {
              const w = widths[i];
              const nextW = i < widths.length - 1 ? widths[i + 1] : widths[i] - 8;
              const leftPad = (100 - w) / 2;
              const nextLeftPad = (100 - nextW) / 2;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  style={{ width: '100%', maxWidth: '400px', position: 'relative', height: '70px' }}
                >
                  {/* Funnel layer shape */}
                  <div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      clipPath: `polygon(${leftPad}% 0%, ${100 - leftPad}% 0%, ${100 - nextLeftPad}% 100%, ${nextLeftPad}% 100%)`,
                      background: step.color,
                      border: `1px solid ${step.borderColor}`,
                      borderTop: i === 0 ? `1px solid ${step.borderColor}` : 'none'
                    }}
                  />
                  {/* Text */}
                  <div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <div style={{ color: step.textColor, fontSize: '14px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {step.label}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 500, marginTop: '2px' }}>
                      <span style={{ color: WHITE, fontSize: '14px', fontWeight: 700 }}><AnimatedNumber target={step.value} isActive={isActive} duration={3000} /></span>
                      {step.sub ? ` • ${step.sub}` : ''}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Diagnosis and Action Plan */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(255,255,255,0.06)`, borderLeft: `4px solid ${RED}`, borderRadius: '12px', padding: '32px' }}>
            <div style={{ color: RED, fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Diagnóstico de Fricção (Causa)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Redução pontual dos investimentos de mídia de expansão.',
                'Gargalo operacional na aprovação de novos assets e LPs.',
                'Concentração de estratégia em canal único (Google Search).',
                'Déficit em fluxos de nutrição e reaquecimento de leads parados.',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ color: RED, fontSize: '16px', marginTop: '2px' }}>✕</div>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: `${CLUSTERS.ACQUISITION}10`, border: `1px solid ${CLUSTERS.ACQUISITION}30`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ color: CLUSTERS.ACQUISITION, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Plano de Ação ACQUISITION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { text: 'Estratégia "Oportunidade por Praça" (Gatilho Escassez)' },
                  { text: 'Ativação de estratégia LinkedIn Ads (Perfis B2B)' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 300 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `${CLUSTERS.CRO}10`, border: `1px solid ${CLUSTERS.CRO}30`, borderRadius: '12px', padding: '24px' }}>
              <div style={{ color: CLUSTERS.CRO, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Plano de Ação CRO
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { text: 'Nova LP focada em conversão e persona "Executivo"' },
                  { text: 'Teste de formulário multi-step vs simples' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 300 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
