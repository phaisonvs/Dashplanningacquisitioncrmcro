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
  titleMaxWidth = '920px',
}: SlideHeroHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '18px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', minWidth: 0 }}>
        <div style={{ width: '3px', height: '24px', background: accentColor, borderRadius: '999px', flexShrink: 0 }} />
        <div style={{ minWidth: 0, maxWidth: titleMaxWidth }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'var(--text-hero)',
              fontWeight: SLIDE_TITLE_WEIGHT,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.56)', fontSize: 'var(--text-body)', lineHeight: 1.45, fontWeight: 300, marginTop: '8px' }}>
              {subtitle}
            </div>
          ) : null}
          {children ? <div style={{ marginTop: subtitle ? '18px' : '22px' }}>{children}</div> : null}
        </div>
      </div>
      {right}
    </div>
  );
}

export function SlideSectionHeader({ accentColor, title, subtitle, right }: SlideSectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        {accentColor ? <div style={{ width: '3px', height: '20px', background: accentColor, borderRadius: '999px', flexShrink: 0 }} /> : null}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: WHITE,
              fontSize: 'var(--text-section)',
              fontWeight: SLIDE_SECTION_TITLE_WEIGHT,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ color: 'rgba(255,255,255,0.44)', fontSize: 'var(--text-meta)', lineHeight: 1.4, marginTop: '5px' }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {right}
    </div>
  );
}
