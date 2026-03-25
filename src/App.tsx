import { useState, useEffect, useCallback } from 'react'; 
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { Slide0Calendar } from './components/slides/Slide0Calendar';
import { Slide1Cover } from './components/slides/Slide1Cover';
import { Slide2VisaoLeads } from './components/slides/Slide2VisaoLeads';
import { Slide3Entradas } from './components/slides/Slide3Entradas';
import { Slide4FunilLeads } from './components/slides/Slide4FunilLeads';
import { Slide5Ecommerce } from './components/slides/Slide5Ecommerce';
import { Slide6Produto } from './components/slides/Slide6Produto';
import { Slide7Midia } from './components/slides/Slide7Midia';
import { Slide8Expansao } from './components/slides/Slide8Expansao';
import { Slide9Top8 } from './components/slides/Slide9Top8';
import { YELLOW, BG, CLUSTERS } from './components/theme';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImg from "figma:asset/fa06232f6f0fcb4b35dd8f86211b9feb55b56828.png";

const getClusterColor = (cluster: string | null) => {
  if (!cluster) return YELLOW;
  switch (cluster) {
    case 'LEADS': return CLUSTERS.LEADS;
    case 'ECOMMERCE': return CLUSTERS.ECOMMERCE;
    case 'EXPANSÃO': return CLUSTERS.EXPANSAO;
    case 'CRM': return CLUSTERS.CRM;
    case 'DURATEX': return CLUSTERS.DURATEX;
    case 'CRO': return CLUSTERS.CRO;
    case 'ACQUISITION': return CLUSTERS.ACQUISITION;
    case 'ESTRATÉGIA': return CLUSTERS.ESTRATEGIA;
    default: return YELLOW;
  }
};

const slides = [
  { Component: Slide0Calendar, label: 'Report Library', cluster: null, subject: null },
  { Component: Slide1Cover, label: 'Capa', cluster: null, subject: null },
  { Component: Slide2VisaoLeads, label: 'Leads', cluster: 'LEADS', subject: 'FUNIL & PERFORMANCE' },
  { Component: Slide5Ecommerce, label: 'E-commerce', cluster: 'ECOMMERCE', subject: 'FUNIL & PRODUTO' },
  { Component: Slide8Expansao, label: 'Funil Expansão', cluster: 'EXPANSÃO', subject: 'PIPELINE' },
  { Component: Slide9Top8, label: 'Top 8 Ações', cluster: 'ESTRATÉGIA', subject: 'EXECUÇÃO' },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }, [current]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const goToDashboard = useCallback(() => {
    setDirection(current > 0 ? -1 : 0);
    setCurrent(0);
    setShowMenu(false);
  }, [current]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setShowMenu(false);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const { Component } = slides[current];

  return (
    <div
      style={{
        background: BG,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-family)',
      }}
    >
      {/* Top progress bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255,255,255,0.05)',
          zIndex: 200,
        }}
      >
        <motion.div
          animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: YELLOW }}
        />
      </div>

      {/* Header: Fixed, blurred background, logo + badges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'rgba(13, 13, 13, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 200,
          pointerEvents: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'flex-start',
          padding: '32px 40px 0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', pointerEvents: 'auto' }}>
            <ImageWithFallback 
              src={logoImg} 
              alt="Logo" 
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
            />
            
            <AnimatePresence mode="wait">
              {slides[current].cluster && (
                <motion.div
                  key={slides[current].cluster}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />
                  {/* Cluster Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      background: `${getClusterColor(slides[current].cluster)}15`,
                      border: `1px solid ${getClusterColor(slides[current].cluster)}50`,
                      borderRadius: '4px',
                      padding: '6px 14px',
                    }}
                  >
                    <span style={{ color: getClusterColor(slides[current].cluster), fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {slides[current].cluster}
                    </span>
                  </div>
                  {/* Subject Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid rgba(255, 255, 255, 0.1)`,
                      borderRadius: '4px',
                      padding: '6px 14px',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {slides[current].subject}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Dashboard button - only show if not on dashboard */}
            {current > 0 && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={goToDashboard}
                  title="Voltar ao Dashboard"
                  style={{
                    background: 'rgba(255,239,0,0.08)',
                    border: `1px solid ${YELLOW}30`,
                    borderRadius: '6px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: YELLOW,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,239,0,0.15)';
                    e.currentTarget.style.borderColor = YELLOW;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,239,0,0.08)';
                    e.currentTarget.style.borderColor = `${YELLOW}30`;
                  }}
                >
                  <Home size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                    DASHBOARD
                  </span>
                </motion.button>

                {/* Quick navigation menu */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    title="Menu de navegação"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(255,255,255,0.1)`,
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    {showMenu ? <X size={16} /> : <Menu size={16} />}
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          background: 'rgba(20, 20, 20, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '8px',
                          minWidth: '220px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                          zIndex: 1000,
                        }}
                      >
                        {slides.map((slide, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              background: index === current ? 'rgba(255,239,0,0.1)' : 'transparent',
                              border: 'none',
                              borderRadius: '4px',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              borderLeft: index === current ? `2px solid ${YELLOW}` : '2px solid transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (index !== current) {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (index !== current) {
                                e.currentTarget.style.background = 'transparent';
                              }
                            }}
                          >
                            <span style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: index === current ? YELLOW : 'rgba(255,255,255,0.9)',
                              letterSpacing: '0.02em',
                            }}>
                              {slide.label}
                            </span>
                            {slide.cluster && (
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{
                                  fontSize: '9px',
                                  fontWeight: 700,
                                  color: getClusterColor(slide.cluster),
                                  letterSpacing: '0.08em',
                                  textTransform: 'uppercase',
                                }}>
                                  {slide.cluster}
                                </span>
                                <span style={{
                                  fontSize: '9px',
                                  fontWeight: 500,
                                  color: 'rgba(255,255,255,0.4)',
                                  letterSpacing: '0.05em',
                                }}>
                                  {slide.subject}
                                </span>
                              </div>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            <span
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: '40px',
                padding: '6px 16px',
                minWidth: '60px',
                textAlign: 'center',
              }}
            >
              {current + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            initial: (d: number) => ({ opacity: 0, y: d * 10 }),
            animate: { opacity: 1, y: 0 },
            exit: (d: number) => ({ opacity: 0, y: d * -10 }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', overflowY: 'auto' }}
        >
          <Component isActive={true} onNext={goNext} onNavigate={goToSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Prev button */}
      {current > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goPrev}
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)',
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 300,
            color: 'rgba(255,255,255,0.5)',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,239,0,0.15)';
            e.currentTarget.style.borderColor = YELLOW;
            e.currentTarget.style.color = YELLOW;
            e.currentTarget.style.width = '52px';
            e.currentTarget.style.height = '52px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.width = '48px';
            e.currentTarget.style.height = '48px';
          }}
        >
          <ChevronLeft size={24} />
        </motion.button>
      )}

      {/* Next button */}
      {current < slides.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goNext}
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)',
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 300,
            color: 'rgba(255,255,255,0.5)',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,239,0,0.15)';
            e.currentTarget.style.borderColor = YELLOW;
            e.currentTarget.style.color = YELLOW;
            e.currentTarget.style.width = '52px';
            e.currentTarget.style.height = '52px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.width = '48px';
            e.currentTarget.style.height = '48px';
          }}
        >
          <ChevronRight size={24} />
        </motion.button>
      )}

      {/* Dot navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 200,
          alignItems: 'center',
        }}
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            title={slide.label}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              borderRadius: '10px',
              background: i === current ? YELLOW : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}