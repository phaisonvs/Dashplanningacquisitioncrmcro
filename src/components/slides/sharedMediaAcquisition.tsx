import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import { CLUSTERS, WHITE } from '../theme';
import lpSemanaConsumidorImg from 'figma:asset/6840fdb8c3bbc3a826a9e5bec2992dbca763ee8d.png';
import lpChanceUnicaImg from 'figma:asset/595fd04a2f57291355bfa3c39256501d943983aa.png';
import lpSemanaConsumidorMobileImg from 'figma:asset/f00f311871e56776499aaf7c626a94ff267ec921.png';
import lpChanceUnicaMobileImg from 'figma:asset/63f4568abbe03cbb8b0834a2bb70e3613df7a874.png';
import heroDesktopImg from 'figma:asset/5c0b20dfc3a6d5cd113cf55d3ab6cbf463897ef3.png';
import heroMobileImg from 'figma:asset/81706ef0c74f11093e5858f0fd0a0c0b84c2c931.png';

export type Status = 'feito' | 'pendente' | 'bloqueado';

type StatusItem = {
  status: Status;
};

export type MediaAcquisitionItem = {
  title: string;
  description: string;
  tags: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE'>;
  status: Status;
  image: string;
  formatLabel: string;
  aspectRatio: '1 / 1' | '9 / 16';
  accent: string;
  badgeLabel?: string;
};

export const mediaAcquisitionItems: MediaAcquisitionItem[] = [
  {
    title: 'Facebook Feed - Semana do Consumidor',
    description: 'Feed quadrado para mídia paga com leitura direta, oferta sazonal e foco em alcance qualificado.',
    tags: ['LEADS', 'ACQUISITION'],
    status: 'feito',
    image: lpSemanaConsumidorImg,
    formatLabel: 'Feed 1:1',
    aspectRatio: '1 / 1',
    accent: CLUSTERS.ACQUISITION,
    badgeLabel: 'Feed',
  },
  {
    title: 'Hero Feed - Conversão',
    description: 'Peça quadrada para reforçar hierarquia visual e credibilidade no topo do funil.',
    tags: ['CRO', 'ACQUISITION'],
    status: 'feito',
    image: heroDesktopImg,
    formatLabel: 'Feed 1:1',
    aspectRatio: '1 / 1',
    accent: CLUSTERS.CRO,
    badgeLabel: 'Feed',
  },
  {
    title: 'Remarketing Feed - Oferta Relâmpago',
    description: 'Criativo quadrado de remarketing para reforçar urgência comercial e reduzir dispersão.',
    tags: ['ACQUISITION', 'CRM'],
    status: 'pendente',
    image: lpChanceUnicaImg,
    formatLabel: 'Feed 1:1',
    aspectRatio: '1 / 1',
    accent: CLUSTERS.CRM,
    badgeLabel: 'Feed',
  },
  {
    title: 'Instagram Story - Chance Única',
    description: 'Story vertical com urgência, prova de valor e CTA rápido para absorver intenção alta.',
    tags: ['ACQUISITION', 'CRO'],
    status: 'pendente',
    image: lpChanceUnicaMobileImg,
    formatLabel: 'Story 9:16',
    aspectRatio: '9 / 16',
    accent: CLUSTERS.CRO,
    badgeLabel: 'Story',
  },
  {
    title: 'Instagram Story - WhatsApp & Captura',
    description: 'Story vertical para contato assistido e captura com menos fricção.',
    tags: ['CRM', 'LEADS'],
    status: 'feito',
    image: heroMobileImg,
    formatLabel: 'Story 9:16',
    aspectRatio: '9 / 16',
    accent: CLUSTERS.CRM,
    badgeLabel: 'Story',
  },
  {
    title: 'Instagram Feed - Semana do Consumidor',
    description: 'Peça de feed adicional para fechar a sequência da galeria com variação de mensagem e formato.',
    tags: ['LEADS', 'CRO'],
    status: 'feito',
    image: lpSemanaConsumidorMobileImg,
    formatLabel: 'Feed 1:1',
    aspectRatio: '1 / 1',
    accent: CLUSTERS.LEADS,
    badgeLabel: 'Feed',
  },
];

export const collectStatusCounts = (...groups: ReadonlyArray<ReadonlyArray<StatusItem>>) =>
  groups.reduce(
    (acc, group) => {
      group.forEach((item) => {
        acc[item.status] += 1;
      });
      return acc;
    },
    { feito: 0, pendente: 0, bloqueado: 0 } as Record<Status, number>,
  );

const tokenStyle = (tag: MediaAcquisitionItem['tags'][number]) => {
  switch (tag) {
    case 'LEADS':
      return { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.08)', border: 'rgba(125, 211, 252, 0.22)' };
    case 'ACQUISITION':
      return { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.22)' };
    case 'CRO':
      return { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.22)' };
    case 'CRM':
      return { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.22)' };
    case 'E-COMMERCE':
      return { color: CLUSTERS.ECOMMERCE, background: 'rgba(252, 165, 165, 0.08)', border: 'rgba(252, 165, 165, 0.22)' };
    default:
      return { color: 'rgba(255,255,255,0.72)', background: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' };
  }
};

const TokenTag = ({ label }: { label: MediaAcquisitionItem['tags'][number] }) => {
  const palette = tokenStyle(label);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px',
        borderRadius: '999px',
        border: `1px solid ${palette.border}`,
        background: palette.background,
        color: palette.color,
        fontSize: '10px',
        fontWeight: 700,
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
  const palette = {
    feito: { label: 'Feito', color: '#4ADE80', background: 'rgba(74, 222, 128, 0.08)', border: 'rgba(74, 222, 128, 0.18)' },
    pendente: { label: 'Pendente', color: '#FBBF24', background: 'rgba(251, 191, 36, 0.08)', border: 'rgba(251, 191, 36, 0.18)' },
    bloqueado: { label: 'Bloqueado', color: '#F87171', background: 'rgba(248, 113, 113, 0.08)', border: 'rgba(248, 113, 113, 0.18)' },
  }[status];

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
        fontWeight: 700,
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

const ExpandableMediaCard = ({ item }: { item: MediaAcquisitionItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.032) 0%, rgba(255,255,255,0.018) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          minHeight: '100%',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        <div style={{ padding: '18px 18px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: WHITE, fontSize: '16px', fontWeight: 700, lineHeight: 1.28, letterSpacing: '-0.01em' }}>
              {item.title}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.46)', fontSize: '12px', lineHeight: 1.5 }}>
              {item.description}
            </div>
          </div>
          <StatusPill status={item.status} />
        </div>

        <div
          style={{
            position: 'relative',
            padding: '16px 18px 18px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Expandir ${item.title}`}
            style={{
              position: 'absolute',
              top: '24px',
              right: '30px',
              zIndex: 3,
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,0,0,0.62)',
              color: WHITE,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
            }}
          >
            <Maximize2 size={16} />
          </button>

          <div
            onClick={() => setIsOpen(true)}
            style={{
              position: 'relative',
              aspectRatio: item.aspectRatio,
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              cursor: 'pointer',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                transform: 'scale(1.01)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  item.aspectRatio === '9 / 16'
                    ? 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 45%, rgba(0,0,0,0.72) 100%)'
                    : 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.68) 100%)',
              }}
            />
            <div style={{ position: 'absolute', left: '12px', right: '12px', bottom: '12px' }}>
              <div style={{ color: WHITE, fontSize: '13px', lineHeight: 1.45, fontWeight: 600 }}>
                {item.badgeLabel}
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.94)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(1200px, 100%)',
                maxHeight: '92vh',
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gap: '18px',
                background: 'rgba(18,18,18,0.92)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '22px',
                padding: '20px',
                boxShadow: '0 36px 80px rgba(0,0,0,0.45)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: WHITE, fontSize: '22px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.52)', fontSize: '13px', lineHeight: 1.5, marginTop: '6px', maxWidth: '760px' }}>
                    {item.description}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    color: WHITE,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  minHeight: 0,
                  overflow: 'hidden',
                  borderRadius: '18px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: '#0c0c0c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {item.tags.map((tag) => (
                    <TokenTag key={`modal-${item.title}-${tag}`} label={tag} />
                  ))}
                </div>
                <StatusPill status={item.status} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const MediaAcquisitionSection = ({
  title = 'Mídias Acquisition',
  subtitle = 'Leitura visual das peças e frentes que alimentam aquisição e qualidade de lead.',
  items = mediaAcquisitionItems,
  badges = ['ACQUISITION', 'CRO'],
}: {
  title?: string;
  subtitle?: string;
  items?: MediaAcquisitionItem[];
  badges?: Array<'LEADS' | 'ACQUISITION' | 'CRO' | 'CRM' | 'E-COMMERCE'>;
}) => {
  const badgeColors = useMemo(
    () => ({
      LEADS: { color: '#7DD3FC', background: 'rgba(125, 211, 252, 0.08)', border: 'rgba(125, 211, 252, 0.22)' },
      ACQUISITION: { color: '#A78BFA', background: 'rgba(167, 139, 250, 0.08)', border: 'rgba(167, 139, 250, 0.22)' },
      CRO: { color: '#60A5FA', background: 'rgba(96, 165, 250, 0.08)', border: 'rgba(96, 165, 250, 0.22)' },
      CRM: { color: '#2DD4BF', background: 'rgba(45, 212, 191, 0.08)', border: 'rgba(45, 212, 191, 0.22)' },
      'E-COMMERCE': { color: CLUSTERS.ECOMMERCE, background: 'rgba(252, 165, 165, 0.08)', border: 'rgba(252, 165, 165, 0.22)' },
    }),
    [],
  );

  const itemsByColumn = useMemo(() => {
    const totalColumns = 4;
    const columns = Array.from({ length: totalColumns }, () => [] as MediaAcquisitionItem[]);

    items.forEach((item, index) => {
      columns[index % totalColumns].push(item);
    });

    return columns;
  }, [items]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Evidências da frente
          </div>
          <div style={{ color: WHITE, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', marginTop: '6px' }}>
            {title}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '13px', lineHeight: 1.5, marginTop: '6px', maxWidth: '780px' }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {badges.map((badge) => {
            const palette = badgeColors[badge];
            return (
              <span
                key={badge}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  border: `1px solid ${palette.border}`,
                  background: palette.background,
                  color: palette.color,
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {badge}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          minWidth: 0,
          alignSelf: 'stretch',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
        }}
      >
        {itemsByColumn.map((columnItems, columnIndex) => (
          <div
            key={`media-column-${columnIndex}`}
            style={{
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {columnItems.map((item) => (
              <div key={item.title} style={{ minWidth: 0, height: 'fit-content' }}>
                <ExpandableMediaCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
  </motion.section>
);
};
