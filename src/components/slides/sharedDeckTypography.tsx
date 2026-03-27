import { useEffect, useState, type ReactNode } from 'react';
import { WHITE } from '../theme';

export const SLIDE_TITLE_WEIGHT = 700;
export const SLIDE_SECTION_TITLE_WEIGHT = 700;
export const SLIDE_META_WEIGHT = 700;

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1180;

export function useDeckViewport() {
  const [width, setWidth] = useState(() => (typeof window === 'undefined' ? TABLET_BREAKPOINT : window.innerWidth));

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
  const isCompact = width < TABLET_BREAKPOINT;

  return { width, isMobile, isTablet, isCompact };
}

type SlideHeroHeaderProps = {
  accentColor: string;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  titleMaxWidth?: string;
};

type SlideSectionHeaderProps = {
  accentColor?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
};

export function SlideHeroHeader({
  accentColor,
  title,
  subtitle,
  right,
  children,
  titleMaxWidth = '920px',
}: SlideHeroHeaderProps) {
  const { isCompact } = useDeckViewport();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isCompact ? 'stretch' : 'flex-start',
        gap: isCompact ? '14px' : '18px',
        flexDirection: isCompact ? 'column' : 'row',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: isCompact ? '10px' : '12px', minWidth: 0, width: isCompact ? '100%' : 'auto' }}>
        <div style={{ width: '3px', height: isCompact ? '20px' : '24px', background: accentColor, borderRadius: '999px', flexShrink: 0 }} />
        <div style={{ minWidth: 0, maxWidth: isCompact ? '100%' : titleMaxWidth, width: '100%' }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'var(--text-hero)',
              fontWeight: SLIDE_TITLE_WEIGHT,
              letterSpacing: '-0.03em',
              lineHeight: isCompact ? 1.08 : 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: 'var(--text-body)', lineHeight: 1.45, fontWeight: 300, marginTop: isCompact ? '6px' : '8px' }}>
              {subtitle}
            </div>
          ) : null}
          {children ? <div style={{ marginTop: subtitle ? (isCompact ? '14px' : '18px') : (isCompact ? '16px' : '22px') }}>{children}</div> : null}
        </div>
      </div>
      {right ? (
        <div style={{ display: 'flex', width: isCompact ? '100%' : 'auto', justifyContent: isCompact ? 'flex-start' : 'flex-end', flexWrap: 'wrap', gap: isCompact ? '6px' : '8px' }}>
          {right}
        </div>
      ) : null}
    </div>
  );
}

export function SlideSectionHeader({ accentColor, title, subtitle, right }: SlideSectionHeaderProps) {
  const { isCompact } = useDeckViewport();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isCompact ? 'stretch' : 'flex-start',
        gap: isCompact ? '10px' : '12px',
        flexDirection: isCompact ? 'column' : 'row',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, width: isCompact ? '100%' : 'auto' }}>
        {accentColor ? <div style={{ width: '3px', height: '20px', background: accentColor, borderRadius: '999px', flexShrink: 0 }} /> : null}
        <div style={{ minWidth: 0, width: '100%' }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'var(--text-section)',
              fontWeight: SLIDE_SECTION_TITLE_WEIGHT,
              letterSpacing: '-0.028em',
              lineHeight: isCompact ? 1.08 : 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'var(--text-meta)', lineHeight: 1.4, marginTop: isCompact ? '4px' : '5px' }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right ? (
        <div style={{ display: 'flex', width: isCompact ? '100%' : 'auto', justifyContent: isCompact ? 'flex-start' : 'flex-end', flexWrap: 'wrap', gap: isCompact ? '6px' : '8px' }}>
          {right}
        </div>
      ) : null}
    </div>
  );
}
