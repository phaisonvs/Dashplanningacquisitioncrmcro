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
        borderRadius: '8px',
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '20px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          color: YELLOW,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <Upload size={24} color="#444" />
      <div style={{ color: '#555', fontSize: '12px', textAlign: 'center', lineHeight: 1.5 }}>
        {subtitle || 'Dados a serem anexados'}
      </div>
      <div
        style={{
          fontSize: '10px',
          color: '#3A3A3A',
          border: '1px solid #2A2A2A',
          borderRadius: '4px',
          padding: '3px 10px',
          marginTop: '4px',
        }}
      >
        Inserir imagem / print aqui
      </div>
    </div>
  );
}
