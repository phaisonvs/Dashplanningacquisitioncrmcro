import { motion } from 'motion/react';
import { BG, WHITE, YELLOW, GRAY } from '../theme';
import { ChevronRight, Check } from 'lucide-react';

interface Props { 
  isActive: boolean;
  onNext?: () => void;
  onNavigate?: (slideIndex: number) => void;
}

export function Slide0Calendar({ isActive, onNext, onNavigate }: Props) {
  const marchWeeks = [
    { week: 'Semana 10', date: '02 Mar — 08 Mar', status: 'Concluído', completed: true, slideIndex: 1 },
    { week: 'Semana 11', date: '09 Mar — 15 Mar', status: 'Concluído', completed: true, slideIndex: 1 },
    { week: 'Semana 12', date: '16 Mar — 22 Mar', status: 'Concluído', completed: true, slideIndex: 1 },
    { week: 'Semana 13', date: '23 Mar — 29 Mar', status: 'Report Atual', active: true, slideIndex: 1 },
    { week: 'Semana 14', date: '30 Mar — 05 Abr', status: 'Agendado', slideIndex: 1 },
  ];

  const aprilWeeks = [
    { week: 'Semana 15', date: '06 Abr — 12 Abr', status: 'Agendado', slideIndex: 1 },
    { week: 'Semana 16', date: '13 Abr — 19 Abr', status: 'Agendado', slideIndex: 1 },
    { week: 'Semana 17', date: '20 Abr — 26 Abr', status: 'Agendado', slideIndex: 1 },
    { week: 'Semana 18', date: '27 Abr — 03 Mai', status: 'Agendado', slideIndex: 1 },
  ];

  const handleCardClick = (week: any) => {
    if (week.active && onNavigate) {
      onNavigate(week.slideIndex);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, padding: '140px clamp(40px, 8vw, 100px) 80px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '4px', height: '32px', background: YELLOW, borderRadius: '2px' }} />
            <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Dashboard Acquisition, CRM, CRO
            </div>
          </div>
        </motion.div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* Março */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: WHITE, marginBottom: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Março 2026
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {marchWeeks.map((w, i) => {
              const isCompleted = w.completed;
              const isActive = w.active;
              const isDisabled = isCompleted;

              return (
              <div 
                key={i} 
                onClick={() => !isDisabled && handleCardClick(w)}
                style={{ 
                  background: isActive ? `${YELLOW}15` : isCompleted ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)', 
                  border: `1px solid ${isActive ? `${YELLOW}60` : isCompleted ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)'}`, 
                  borderRadius: '12px', 
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 8px 32px ${YELLOW}15` : 'none',
                  cursor: isActive ? 'pointer' : isDisabled ? 'not-allowed' : 'default',
                  opacity: isDisabled ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (isActive) {
                    e.currentTarget.style.background = `${YELLOW}25`;
                    e.currentTarget.style.borderColor = YELLOW;
                    e.currentTarget.style.boxShadow = `0 12px 40px ${YELLOW}25`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (isActive) {
                    e.currentTarget.style.background = `${YELLOW}15`;
                    e.currentTarget.style.borderColor = `${YELLOW}60`;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${YELLOW}15`;
                  }
                }}
              >
                <div>
                  <div style={{ 
                    color: isActive ? YELLOW : isCompleted ? 'rgba(255,255,255,0.4)' : WHITE, 
                    fontSize: '18px', 
                    fontWeight: 700, 
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    {w.week}
                    {isCompleted && (
                      <span style={{ fontSize: '16px', opacity: 0.6 }}>✓</span>
                    )}
                  </div>
                  <div style={{ color: isCompleted ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 300 }}>{w.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    padding: '6px 12px', borderRadius: '6px',
                    background: isActive ? YELLOW : isCompleted ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#000' : isCompleted ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.4)'
                  }}>
                    {w.status}
                  </div>
                  {isActive && (
                    <div 
                      style={{
                        background: 'transparent',
                        color: YELLOW,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '50%',
                      }}
                    >
                      <ChevronRight size={24} />
                    </div>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </motion.div>

        {/* Abril */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: WHITE, marginBottom: '24px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Abril 2026
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {aprilWeeks.map((w, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(255,255,255,0.01)', 
                  border: `1px dashed rgba(255,255,255,0.05)`, 
                  borderRadius: '12px', 
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: 0.6
                }}
              >
                <div>
                  <div style={{ color: WHITE, fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{w.week}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 300 }}>{w.date}</div>
                </div>
                <div style={{ 
                  fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '6px 12px', borderRadius: '6px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)'
                }}>
                  {w.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
