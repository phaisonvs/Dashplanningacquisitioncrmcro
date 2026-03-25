import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, WHITE, GREEN, RED } from '../theme';

interface Props { isActive: boolean }

const kpis = [
  { numericTarget: 4525, display: null, prefix: '', suffix: '', decimals: 0, label: 'Leads MTD', comps: [{ text: 'vs 3.304 em Fev — +37% MoM', pos: true }] },
  { numericTarget: null, display: 'R$1.03M', label: 'Receita Pedidos', comps: [{ text: 'vs R$1.056K — −2% MoM', pos: false }] },
  { numericTarget: null, display: 'R$85K', label: 'Investimento', comps: [{ text: 'vs R$93,4k — −9% MoM', pos: true }] },
  { numericTarget: 323, display: null, prefix: '', suffix: '', decimals: 0, label: 'Pedidos', comps: [{ text: 'vs 342 — −5,5% MoM', pos: false }] },
];

export function Slide2VisaoLeads({ isActive }: Props) {
  const clusterColor = CLUSTERS.LEADS;

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* 1. Hero / Exec Summary */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '32px', background: clusterColor, borderRadius: '2px' }} />
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Visão Leads MTD
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', maxWidth: '800px', lineHeight: 1.6, fontWeight: 300 }}>
            Análise de desempenho mensal com foco em eficiência de funil e conversão. 
            Identificamos oportunidades de otimização no e-commerce e no pipeline de expansão.
          </p>
        </motion.div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '32px', marginBottom: '48px' }}>
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '24px',
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: WHITE, lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '12px' }}>
                {kpi.numericTarget !== null ? (
                  <AnimatedNumber target={kpi.numericTarget} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} isActive={isActive} duration={1400} />
                ) : kpi.display}
              </div>
              {kpi.comps.map((c, j) => (
                <div key={j} style={{ color: c.pos ? GREEN : RED, fontSize: '12px', fontWeight: 500 }}>
                  {c.text}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* FUNNEL COLUMN */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ flex: '0 0 340px' }}>
          <div style={{ color: WHITE, fontSize: '20px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', background: CLUSTERS.CRO, borderRadius: '50%' }} />
            Performance de Funil
            <span style={{ background: `${CLUSTERS.CRO}15`, color: CLUSTERS.CRO, border: `1px solid ${CLUSTERS.CRO}40`, padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>CRO</span>
          </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             {[
               { label: 'LEADS GERADOS', num: 100, suffix: '%', val: 4525, valS: 'leads' },
               { label: 'CADASTRO', num: 31.2, suffix: '%', val: 1411, valS: 'leads' },
               { label: 'ORÇAMENTO', num: 11.1, suffix: '%', val: 502, valS: 'leads' },
               { label: 'PEDIDO', num: 7.1, suffix: '%', val: 323, valS: 'pedidos' },
             ].map((step, i) => (
                <div key={i} style={{ 
                  background: i === 3 ? `${clusterColor}20` : 'rgba(255,255,255,0.03)', 
                  border: `1px solid ${i === 3 ? clusterColor : 'rgba(255,255,255,0.1)'}`, 
                  borderRadius: '8px', 
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: i === 3 ? clusterColor : WHITE, fontSize: '20px', fontWeight: 800 }}>{step.num}{step.suffix}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}>{step.label}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: WHITE, fontSize: '14px', fontWeight: 600 }}>{step.val}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{step.valS}</div>
                  </div>
                </div>
             ))}
           </div>
           
           <div style={{ marginTop: '16px', background: `${RED}10`, border: `1px solid ${RED}30`, borderRadius: '8px', padding: '12px', color: RED, fontSize: '12px', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             Gargalo: Cadastro → Orçamento
           </div>
        </motion.div>

        {/* CONTENT COLUMN */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* 2. Diagnóstico & Causa Raiz */}
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Aquisição & Demanda
                <span style={{ background: `${CLUSTERS.ACQUISITION}15`, color: CLUSTERS.ACQUISITION, border: `1px solid ${CLUSTERS.ACQUISITION}40`, padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>ACQUISITION</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', borderLeft: `2px solid rgba(255,255,255,0.1)` }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300 }}>
                    ROAS Potencial de Orçamentos é <strong>44.2</strong> vs Realizado de <strong>12.1</strong>.
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', borderLeft: `2px solid rgba(255,255,255,0.1)` }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300 }}>
                    Lojas com zero entradas aumentaram na última janela (9 lojas vs 116 em Fev nos últimos 30 dias).
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '8px', borderLeft: `2px solid rgba(255,255,255,0.1)` }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300 }}>
                    Ajuste de script do Range de CEP e estratégia para aumentar o volume geral de leads (Aumento de demanda focado no Sul).
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <div style={{ color: RED, fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Causa Raiz & Fricções
                <span style={{ background: `${CLUSTERS.CRO}15`, color: CLUSTERS.CRO, border: `1px solid ${CLUSTERS.CRO}40`, padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>CRO</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Perda de 100% Leads via Popup de Newsletter de novos usuários após integração.',
                  'Baixo engajamento da rede para concluir cadastros dos leads do Pipe (Taxa de 31,3% vs. 51,9% YoY).',
                  'Poucos pontos de contato e ausência de estratégia de captação contínua na home do e-commerce.',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ color: RED, fontSize: '16px', marginTop: '2px' }}>✕</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.5, fontWeight: 300 }}>{text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 3. Evidências (Horizontal) */}
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}>
              <div style={{ display: 'flex', gap: '24px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                   <div style={{ color: WHITE, fontSize: '16px', fontWeight: 700 }}>Evidências de Fricção (CRM)</div>
                   <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6, fontWeight: 300 }}>
                     A taxa de abandono do Pipe no estágio "Orçamento" atingiu 68% na última semana. Tempo médio de resposta da rede aumentou de 4h para 14h.
                   </div>
                </div>
                <div style={{ width: '300px', height: '120px', background: '#111', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1628763228263-d9ebb07bd0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBtZXRyaWNzJTIwY2hhcnQlMjBkYXJrfGVufDF8fHx8MTc3NDMwMDcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Evidence 1" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                </div>
              </div>
            </motion.div>
          </section>

          {/* 4. Plano de Ação */}
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
              style={{ background: `${CLUSTERS.ACQUISITION}10`, border: `1px solid ${CLUSTERS.ACQUISITION}30`, borderRadius: '12px', padding: '32px' }}
            >
              <div style={{ color: CLUSTERS.ACQUISITION, fontSize: '14px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Plano de Ação ACQUISITION
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Redistribuição Local', text: 'Redistribuir budget focado em regiões com zero demanda e pausar campanhas de baixo ROAS.' },
                  { title: 'Otimização de Mídia', text: 'Escalar as campanhas que trazem mais volume de pedidos e pausar topo de funil ineficiente.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ color: WHITE, fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
              style={{ background: `${CLUSTERS.CRO}10`, border: `1px solid ${CLUSTERS.CRO}30`, borderRadius: '12px', padding: '32px' }}
            >
              <div style={{ color: CLUSTERS.CRO, fontSize: '14px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Plano de Ação CRO
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Integração de Contato', text: 'Adicionar geração de leads no cabeçalho e botão em páginas de pisos com LPs promocionais.' },
                  { title: 'Teste de Qualificação', text: 'Testar novas LPs voltadas para maior qualificação (conversão de Cadastro → Orçamento).' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ color: WHITE, fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
}

