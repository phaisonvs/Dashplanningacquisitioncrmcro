import type { ReactNode } from 'react';
import { WHITE } from '../theme';

export const SLIDE_TITLE_WEIGHT = 700;
export const SLIDE_SECTION_TITLE_WEIGHT = 700;
export const SLIDE_META_WEIGHT = 700;

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
  titleMaxWidth = '980px',
}: SlideHeroHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', minWidth: 0 }}>
        <div style={{ width: '4px', height: '32px', background: accentColor, borderRadius: '2px', flexShrink: 0 }} />
        <div style={{ minWidth: 0, maxWidth: titleMaxWidth }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: SLIDE_TITLE_WEIGHT,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.55, fontWeight: 300, marginTop: '10px' }}>
              {subtitle}
            </div>
          ) : null}
          {children ? <div style={{ marginTop: subtitle ? '14px' : '16px' }}>{children}</div> : null}
        </div>
      </div>
      {right}
    </div>
  );
}

export function SlideSectionHeader({ accentColor, title, subtitle, right }: SlideSectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {accentColor ? <div style={{ width: '4px', height: '28px', background: accentColor, borderRadius: '2px', flexShrink: 0 }} /> : null}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'clamp(22px, 2.6vw, 32px)',
              fontWeight: SLIDE_SECTION_TITLE_WEIGHT,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: '12px', lineHeight: 1.5, marginTop: '6px' }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right}
    </div>
  );
}
