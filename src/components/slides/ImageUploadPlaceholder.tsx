import { Upload } from 'lucide-react';
import { YELLOW, CARD_BG, CARD_BORDER, GRAY } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  height?: string;
}

export function ImageUploadPlaceholder({ title, subtitle, height = '180px' }: Props) {
  return (
    <div
        style={{
          background: CARD_BG,
          border: `1px dashed ${CARD_BORDER}`,
          borderRadius: '12px',
          height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '16px',
          position: 'relative',
        }}
      >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          color: YELLOW,
          fontSize: 'var(--text-meta)',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <Upload size={20} color="#444" />
      <div style={{ color: '#555', fontSize: 'var(--text-body)', textAlign: 'center', lineHeight: 1.45 }}>
        {subtitle || 'Dados a serem anexados'}
      </div>
      <div
        style={{
          fontSize: 'var(--text-chip)',
          color: '#3A3A3A',
          border: '1px solid #2A2A2A',
          borderRadius: '999px',
          padding: '3px 8px',
          marginTop: '2px',
        }}
      >
        Inserir imagem / print aqui
      </div>
    </div>
  );
}
