import { motion } from 'motion/react';
import { AnimatedNumber } from '../AnimatedNumber';
import { CLUSTERS, BG, WHITE, GREEN, RED } from '../theme';
import { Calendar, ExternalLink, Zap, CheckCircle2, Clock, TrendingUp, Target, Maximize2, Minimize2 } from 'lucide-react';
import { ImageUploadPlaceholder } from './ImageUploadPlaceholder';
import { ImageViewer } from './ImageViewer';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';
import { useState, useRef, useEffect } from 'react';

interface Props { isActive: boolean }

const kpis = [
  { display: '232K', numericTarget: null, label: 'Sessões', comps: [{ text: 'Total de visitas no período', neutral: true }, { text: 'vs 203k MoM', pos: true }] },
  { display: null, numericTarget: 0.58, prefix: '', suffix: '%', decimals: 2, label: 'Taxa de Conversão', comps: [{ text: 'Abaixo do benchmark', neutral: true }, { text: 'vs 0,56% MoM', pos: true }] },
  { display: 'R$1.13M', numericTarget: null, label: 'Receita Captada', comps: [{ text: 'R$876K faturada', neutral: true }, { text: 'vs R$1.36M captada', pos: false }] },
  { display: 'R$102k', numericTarget: null, label: 'Investimento (Ecom)', comps: [{ text: 'vs 121,5k — −16% MoM', pos: false }] },
  { display: null, numericTarget: 11, prefix: '', suffix: '', decimals: 0, label: 'ROAS Ecom', comps: [{ text: 'vs 11,2 MoM', pos: false }] },
  { display: null, numericTarget: 795, prefix: 'R$', suffix: '', decimals: 0, label: 'Ticket Médio', comps: [{ text: 'vs R$994,40 — −20% MoM', pos: false }] },
];

export function Slide5Ecommerce({ isActive }: Props) {
  const clusterColor = CLUSTERS.ECOMMERCE;
  const [isLPExpanded, setIsLPExpanded] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* 1. Hero */}
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '32px', background: clusterColor, borderRadius: '2px' }} />
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Visão de Funil — E-commerce
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px', maxWidth: '800px', lineHeight: 1.6, fontWeight: 300 }}>
            Análise de conversão do canal direto. Identificamos oportunidades de melhoria na experiência de checkout 
            e gaps de eficiência na mídia para alavancar o ROAS.
          </p>
        </motion.div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginTop: '32px' }}>
          {kpis.map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}
            >
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: WHITE, lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '12px' }}>
                {kpi.numericTarget !== null ? (
                  <AnimatedNumber target={kpi.numericTarget} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} isActive={isActive} duration={1400} />
                ) : kpi.display}
              </div>
              {kpi.comps.map((c, j) => (
                <div key={j} style={{ color: c.neutral ? 'rgba(255,255,255,0.4)' : c.pos ? GREEN : RED, fontSize: '12px', fontWeight: 500 }}>
                  {c.text}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Eficiência de Mídia */}
      <section>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: WHITE, fontSize: '20px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '8px', height: '8px', background: CLUSTERS.ACQUISITION, borderRadius: '50%' }} />
            Eficiência de Mídia
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
            <div style={{ color: RED, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diagnóstico</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.5, fontWeight: 300 }}>
              • Déficit de competitividade em categorias core no Google Shopping.<br/>
              • Queda acentuada do Ticket Médio e instabilidade de mix de ofertas.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ color: CLUSTERS.ACQUISITION, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plano de Ação ACQUISITION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               {[
                 'Drill down por campanha: pausar ineficientes.',
                 'Otimização do feed de produtos Google Shopping.',
                 'Campanhas focadas em linhas exclusivas.'
               ].map((item, i) => (
                 <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                   <div style={{ color: CLUSTERS.ACQUISITION, marginTop: '2px' }}>→</div>
                   <div style={{ color: WHITE, fontSize: '14px', fontWeight: 300 }}>{item}</div>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. CONVERSÃO & EXPERIÊNCIA - FULL WIDTH */}
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
            Conversão & Experiência
            <span style={{ background: `${CLUSTERS.CRO}15`, color: CLUSTERS.CRO, border: `1px solid ${CLUSTERS.CRO}40`, padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>CRO</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6, fontWeight: 300 }}>
            Evolução contínua da plataforma de e-commerce com foco em redução de fricções, otimização de conversão e experiência do usuário.
          </p>
        </div>

        {/* Fricções Identificadas */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ color: RED, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} />
            Fricções Mapeadas
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              'Instabilidades no checkout (Gateway Cielo)',
              'Fricção logística: impacto de frete na decisão',
              'Comunicação promocional de baixa pregnância'
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
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                Landing Pages Internas de Conversão
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>Responsável: Phaison</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} />
                  Prazo: [Inserir data]
                </span>
              </div>
            </div>
            <div>
              <div
                style={{
                  color: WHITE,
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* LP Semana do Consumidor com análise */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
                {/* Header */}
                <div>
                  <div style={{ color: WHITE, fontSize: '15px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>
                    LP Interna Semana do Consumidor
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ 
                      background: `${CLUSTERS.LEADS}15`, 
                      color: CLUSTERS.LEADS, 
                      border: `1px solid ${CLUSTERS.LEADS}40`, 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '9px', 
                      fontWeight: 800, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      LEADS
                    </span>
                    <span style={{ 
                      background: `${CLUSTERS.CRO}15`, 
                      color: CLUSTERS.CRO, 
                      border: `1px solid ${CLUSTERS.CRO}40`, 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '9px', 
                      fontWeight: 800, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      CRO
                    </span>
                  </div>
                </div>

                {/* LP Image - Gallery Container */}
                <ImageViewer 
                  id="lp-semana-consumidor"
                  desktopImage={lpSemanaConsumidorImg}
                  mobileImage={lpSemanaConsumidorMobileImg}
                  alt="LP Semana do Consumidor"
                  height={300}
                  label="Landing Page"
                  fullWidth={true}
                />

                {/* Objetivo da Frente */}
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ 
                    color: WHITE, 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ width: '3px', height: '12px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
                    Objetivo da Frente
                  </div>
                  <div style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    fontWeight: 300
                  }}>
                    Geração de leads e conversão de produtos selecionados, com apelo de oportunidade, organização por clusters de categoria e reforço de visibilidade orgânica.
                  </div>
                </div>
              </div>
            </div>

            {/* LP Chance Única */}
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
                {/* Header */}
                <div>
                  <div style={{ color: WHITE, fontSize: '15px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>
                    LP Interna Chance Única
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ 
                      background: `${CLUSTERS.LEADS}15`, 
                      color: CLUSTERS.LEADS, 
                      border: `1px solid ${CLUSTERS.LEADS}40`, 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '9px', 
                      fontWeight: 800, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      LEADS
                    </span>
                    <span style={{ 
                      background: `${CLUSTERS.CRO}15`, 
                      color: CLUSTERS.CRO, 
                      border: `1px solid ${CLUSTERS.CRO}40`, 
                      padding: '4px 10px', 
                      borderRadius: '4px', 
                      fontSize: '9px', 
                      fontWeight: 800, 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      CRO
                    </span>
                  </div>
                </div>

                {/* LP Image - Gallery Container */}
                <ImageViewer 
                  id="lp-chance-unica"
                  desktopImage={lpChanceUnicaImg}
                  mobileImage={lpChanceUnicaMobileImg}
                  alt="LP Chance Única"
                  height={300}
                  label="Landing Page"
                  fullWidth={true}
                />

                {/* Objetivo da Frente */}
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ 
                    color: WHITE, 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ width: '3px', height: '12px', background: CLUSTERS.LEADS, borderRadius: '2px' }} />
                    Objetivo da Frente
                  </div>
                  <div style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    fontWeight: 300
                  }}>
                    Captação de leads apoiada por urgência comercial e apelo de oportunidade.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evoluções Realizadas no Front */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ color: GREEN, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            Evoluções Realizadas no Front
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
                  alt="Evolução da Hero Section"
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
                    Evolução Recente
                  </div>
                  <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                    Reformulação Completa da Hero Section
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
                    Nova interface responsiva com otimização de conversão para desktop e mobile, incluindo sliders interativos e hierarquia visual aprimorada.
                  </div>
                </div>
                
                {/* Evolution Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Adição de sliders no fullbanner',
                    'Otimização de hierarquia visual',
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
              { title: 'Otimização de selos promocionais no Header', image: 'selos-header' },
              { title: 'Subida de vitrine segmentada "Chance Única"', image: 'vitrine-chance-unica' },
              { title: 'A/B Test: Bundles vs Frete Grátis condicionado', image: 'ab-test-bundles' },
              { title: 'Implementação de Venda Apartada (Split)', image: 'venda-apartada' }
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
                  label="Evidência"
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

        {/* Correções e Evoluções Recentes */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ color: CLUSTERS.CRO, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
            Correções e Evoluções Recentes do Site
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
                title: 'Régua de vantagens mobile',
                desc: 'Campanhas para acelerar entrada em LPs: Chance Única, Mês do Consumidor e Lançamentos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'regua-vantagens'
              },
              {
                title: 'Formulário WhatsApp Floating',
                desc: 'Correção de máscaras dos inputs. Em análise: insert do lead na Salesforce',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'whatsapp-floating'
              },
              {
                title: 'Inserção de novas vitrines nas LPs',
                desc: 'Setorização de categorias em novos hotsites',
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

        {/* Evoluções de PDP */}
        <div style={{ background: 'rgba(13,13,13,0.5)', padding: '28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: CLUSTERS.CRO, fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Evoluções de PDP (Product Detail Page)
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
              Melhorias contínuas nas páginas de produto para aumentar conversão e reduzir fricções
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                title: 'Melhorias de front — Variantes por Categoria',
                desc: 'PDPs de Pisos e Revestimentos (variante 1) e Demais categorias (variante 2)',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-variantes'
              },
              {
                title: 'Ajustes de UI na seção product__view',
                desc: 'Otimizações para desktop e mobile',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-product-view'
              },
              {
                title: 'Botão "Falar com especialista"',
                desc: 'Incluído nas PDPs de Pisos e Revestimentos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-especialista'
              },
              {
                title: 'Elementos complementares de conversão',
                desc: 'Badges Livelo, calculadora e recursos de apoio à decisão',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-elementos'
              },
              {
                title: 'Revisão API de cotação de frete',
                desc: 'Otimização do retorno de dados da Frete Rápido',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-frete-api'
              },
              {
                title: 'Próxima evolução mobile',
                desc: 'Acordeom para ficha técnica dos produtos',
                imageDesk: undefined,
                imageMobile: undefined,
                id: 'pdp-acordeom-mobile'
              },
              {
                title: 'Correção: Formas de Pagamento',
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

        {/* Plano de Ação CRO */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '10px', border: `1px solid ${CLUSTERS.CRO}30` }}>
          <div style={{ color: CLUSTERS.CRO, fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Próximos Passos CRO
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              'Continuar testes A/B de ofertas promocionais',
              'Implementar acordeom mobile em PDPs',
              'Monitorar integração Salesforce do WhatsApp form'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ color: CLUSTERS.CRO, marginTop: '2px', fontSize: '14px' }}>→</div>
                <div style={{ color: WHITE, fontSize: '13px', fontWeight: 300, lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>

      </motion.section>

    </div>
  );
}