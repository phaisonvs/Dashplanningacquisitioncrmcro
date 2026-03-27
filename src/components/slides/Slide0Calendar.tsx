import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { BG, WHITE, YELLOW } from '../theme';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useDeckViewport } from './sharedDeckTypography';
import coverBg from 'figma:asset/d372e1a58f8718b3849de8fc442cde0f366adde8.png';

interface Props {
  isActive: boolean;
  onNavigate?: (slideIndex: number) => void;
}

type WeekItem = {
  week: string;
  date: string;
  status: string;
  completed?: boolean;
  active?: boolean;
};

const marchWeeks: WeekItem[] = [
  { week: 'Semana 10', date: '02 Mar — 06 Mar', status: 'Concluído', completed: true },
  { week: 'Semana 11', date: '09 Mar — 13 Mar', status: 'Concluído', completed: true },
  { week: 'Semana 12', date: '16 Mar — 20 Mar', status: 'Concluído', completed: true },
  { week: 'Semana 13', date: '23 Mar — 27 Mar', status: 'Report Atual', active: true },
  { week: 'Semana 14', date: '30 Mar — 03 Abr', status: 'Agendado' },
];

const aprilWeeks: WeekItem[] = [
  { week: 'Semana 15', date: '06 Abr — 10 Abr', status: 'Agendado' },
  { week: 'Semana 16', date: '13 Abr — 17 Abr', status: 'Agendado' },
  { week: 'Semana 17', date: '20 Abr — 24 Abr', status: 'Agendado' },
  { week: 'Semana 18', date: '27 Abr — 01 Mai', status: 'Agendado' },
];

const dashboardTags = [
  { label: 'ACQUISITION', color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.28)' },
  { label: 'CRO', color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.28)' },
  { label: 'CRM', color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.28)' },
];

const TagPill = ({ label, color, background, border, compact = false }: (typeof dashboardTags)[number] & { compact?: boolean }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'fit-content',
      maxWidth: '100%',
      alignSelf: 'flex-start',
      flex: '0 0 auto',
      padding: compact ? '6px 10px' : '8px 13px',
      borderRadius: '999px',
      border: `1px solid ${border}`,
      background,
      color,
      fontSize: 'var(--text-chip)',
      fontWeight: 800,
      letterSpacing: '0.1em',
      lineHeight: 1,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);

const WeekCard = ({ week, onClick, compact = false }: { week: WeekItem; onClick?: () => void; compact?: boolean }) => {
  const isCompleted = Boolean(week.completed);
  const isActive = Boolean(week.active);

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? `${YELLOW}14` : isCompleted ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isActive ? `${YELLOW}55` : isCompleted ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '14px',
        padding: compact ? '16px' : '18px 20px',
        display: 'flex',
        alignItems: compact ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: compact ? '12px' : '16px',
        minHeight: compact ? 'auto' : '92px',
        transition: 'transform 0.24s ease, border-color 0.24s ease, background 0.24s ease, box-shadow 0.24s ease',
        boxShadow: isActive ? `0 12px 32px ${YELLOW}12` : 'none',
        cursor: isActive ? 'pointer' : 'default',
        opacity: isCompleted ? 0.7 : 1,
        flexDirection: compact ? 'column' : 'row',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          return;
        }

        e.currentTarget.style.background = `${YELLOW}1c`;
        e.currentTarget.style.borderColor = `${YELLOW}88`;
        e.currentTarget.style.boxShadow = `0 14px 36px ${YELLOW}18`;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          return;
        }

        e.currentTarget.style.background = `${YELLOW}14`;
        e.currentTarget.style.borderColor = `${YELLOW}55`;
        e.currentTarget.style.boxShadow = `0 12px 32px ${YELLOW}12`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', minWidth: 0 }}>
        <div
          style={{
            color: isActive ? YELLOW : isCompleted ? 'rgba(255,255,255,0.44)' : WHITE,
            fontSize: compact ? 'var(--text-body)' : 'var(--text-body-lg)',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
        >
          {week.week}
        </div>
        <div
          style={{
            color: isCompleted ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.56)',
            fontSize: 'var(--text-body)',
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          {week.date}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, alignSelf: compact ? 'flex-start' : 'auto' }}>
        <div
          style={{
            fontSize: 'var(--text-chip)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.11em',
            padding: compact ? '5px 9px' : '6px 10px',
            borderRadius: '999px',
            background: isActive ? YELLOW : isCompleted ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.05)',
            color: isActive ? '#000' : isCompleted ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          {week.status}
        </div>

        {isActive ? (
          <div style={{ color: YELLOW, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={22} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const WeekColumn = ({
  title,
  weeks,
  onNavigate,
  compact = false,
}: {
  title: string;
  weeks: WeekItem[];
  onNavigate?: (slideIndex: number) => void;
  compact?: boolean;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      gap: compact ? '12px' : '16px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
      <div
        style={{
          color: WHITE,
          fontSize: 'var(--text-section)',
          fontWeight: 800,
          letterSpacing: compact ? '0.08em' : '0.09em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '10px' : '12px', minHeight: 0 }}>
      {weeks.map((week) => (
        <WeekCard
          key={week.week}
          week={week}
          compact={compact}
          onClick={week.active && onNavigate ? () => onNavigate(1) : undefined}
        />
      ))}
    </div>
  </motion.section>
);

export function Slide0Calendar({ isActive, onNavigate }: Props) {
  const { isMobile, isCompact } = useDeckViewport();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box',
        background: BG,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        <ImageWithFallback
          src={coverBg}
          alt="Dashboard background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 16%, rgba(255,255,255,0.08), transparent 30%), linear-gradient(90deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.68) 52%, rgba(13,13,13,0.9) 100%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gap: isCompact ? '16px' : 'clamp(18px, 2.2vh, 28px)',
          padding: isMobile ? '96px 16px 18px' : isCompact ? 'calc(90px + 14px) 20px 20px' : 'calc(100px + clamp(22px, 2.6vw, 34px)) clamp(24px, 3.4vw, 48px) clamp(22px, 3vw, 36px)',
        }}
      >
        <section style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '12px' : '14px', maxWidth: 'min(1120px, 100%)' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: isCompact ? '10px' : '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '4px', height: '30px', background: YELLOW, borderRadius: '999px' }} />
              <div
                style={{
                  color: 'rgba(255,255,255,0.42)',
                  fontSize: 'var(--text-meta)',
                  fontWeight: 800,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                }}
              >
                Planning Semanal
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px 14px' }}>
              <div style={{ fontSize: 'var(--text-hero)', fontWeight: 800, color: WHITE, letterSpacing: '-0.03em', lineHeight: 1 }}>
                Dashboard
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {dashboardTags.map((tag) => (
                  <TagPill key={tag.label} {...tag} compact={isCompact} />
                ))}
              </div>
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.58)',
                fontSize: 'var(--text-body-lg)',
                maxWidth: '760px',
                lineHeight: 1.55,
                marginTop: '12px',
                fontWeight: 300,
              }}
            >
              Visão semanal do report, com foco em execução, performance e prioridades.
            </div>
          </motion.div>
        </section>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: isCompact ? '16px' : 'clamp(22px, 3vw, 42px)',
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          <WeekColumn title="Março 2026" weeks={marchWeeks} onNavigate={onNavigate} compact={isCompact} />
          <WeekColumn title="Abril 2026" weeks={aprilWeeks} onNavigate={onNavigate} compact={isCompact} />
        </div>
      </div>
    </div>
  );
}

