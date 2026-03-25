import { YELLOW } from './theme';

interface Props {
  label: string;
  highlight?: boolean;
}

export function SlideTag({ label, highlight }: Props) {
  return (
    <span
      style={{
        border: `1px solid ${highlight ? 'rgba(255, 239, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
        background: highlight ? 'rgba(255, 239, 0, 0.05)' : 'transparent',
        color: highlight ? YELLOW : 'rgba(255, 255, 255, 0.4)',
        padding: '5px 16px',
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}
