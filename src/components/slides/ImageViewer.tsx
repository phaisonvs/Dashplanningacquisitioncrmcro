import { useState, useRef, useEffect } from 'react';
import { Maximize2, Monitor, Smartphone, X } from 'lucide-react';
import { WHITE } from '../theme';
import { useDeckViewport } from './sharedDeckTypography';

interface ImageViewerProps {
  id: string;
  desktopImage?: string;
  mobileImage?: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  fullWidth?: boolean;
}

export function ImageViewer({ 
  desktopImage, 
  mobileImage, 
  alt, 
  width = 160, 
  height = 100,
  label = 'Screenshot',
  fullWidth = false
}: ImageViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobile, isCompact } = useDeckViewport();

  const hasMultipleVersions = desktopImage && mobileImage;
  const currentImage = viewMode === 'desktop' ? desktopImage : mobileImage;
  const containerWidth = fullWidth ? '100%' : isCompact ? '100%' : `${width}px`;
  const containerHeight = fullWidth
    ? isMobile
      ? `clamp(${Math.max(190, Math.round(height * 0.72))}px, 56vw, ${Math.max(height + 40, 320)}px)`
      : isCompact
        ? `clamp(${Math.max(220, Math.round(height * 0.82))}px, 34vw, ${Math.max(height + 80, 420)}px)`
        : `${height}px`
    : `${height}px`;

  // Auto-reset scroll after 10 seconds of inactivity (only when not expanded)
  const handleScroll = () => {
    if (!isExpanded && scrollContainerRef.current) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current && !isExpanded) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 10000);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  if (!currentImage) {
    return (
      <div 
          style={{
            width: containerWidth,
            minWidth: containerWidth,
            height: containerHeight, 
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-chip)',
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'center',
            padding: '8px'
        }}
      >
        {label}
      </div>
    );
  }

  return (
    <>
      <div style={{ 
        position: 'relative', 
        width: containerWidth,
        display: 'flex',
        flexDirection: 'column',
        minWidth: containerWidth,
        flex: fullWidth ? 1 : undefined
      }}>
        {/* Toggle Desktop/Mobile - Only show if both versions exist */}
        {hasMultipleVersions && (
          <div style={{ 
            display: 'flex', 
            gap: '4px', 
            marginBottom: '6px',
            background: 'rgba(0,0,0,0.4)',
            padding: '3px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.05)',
            width: 'fit-content'
          }}>
            <button
              onClick={() => setViewMode('desktop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                background: viewMode === 'desktop' ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: viewMode === 'desktop' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                borderRadius: '999px',
                color: viewMode === 'desktop' ? WHITE : 'rgba(255,255,255,0.5)',
                fontSize: 'var(--text-chip)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Monitor size={14} />
              Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                background: viewMode === 'mobile' ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: viewMode === 'mobile' ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                borderRadius: '999px',
                color: viewMode === 'mobile' ? WHITE : 'rgba(255,255,255,0.5)',
                fontSize: 'var(--text-chip)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Smartphone size={14} />
              Mobile
            </button>
          </div>
        )}

        {/* Image Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onClick={() => setIsExpanded(true)}
          style={{
            width: '100%',
            height: containerHeight,
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '12px',
            border: '2px solid rgba(255,255,255,0.1)',
            position: 'relative',
            transition: 'all 0.3s ease',
            background: 'rgba(0,0,0,0.4)',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: isCompact ? '14px' : viewMode === 'mobile' ? '20px' : '0',
            cursor: 'pointer'
          }}
          className="image-viewer-scroll image-viewer-container"
        >
          {viewMode === 'mobile' ? (
            // Mobile Mockup
            <div style={{
              width: isCompact ? 'clamp(240px, 84vw, 375px)' : 'fit-content',
              maxWidth: '100%',
              background: '#1a1a1a',
              borderRadius: isCompact ? 'clamp(22px, 6vw, 28px)' : '28px',
              padding: isCompact ? 'clamp(8px, 2vw, 10px)' : '10px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: `${isCompact ? 'clamp(4px, 1.2vw, 6px)' : '6px'} solid #2a2a2a`,
              position: 'relative'
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: isCompact ? '8px' : '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isCompact ? 'clamp(72px, 24vw, 96px)' : '96px',
                height: isCompact ? 'clamp(16px, 5vw, 20px)' : '20px',
                background: '#1a1a1a',
                borderRadius: isCompact ? '0 0 12px 12px' : '0 0 14px 14px',
                zIndex: 10
              }} />
              
              {/* Screen */}
              <div style={{
                width: '100%',
                height: isCompact ? 'clamp(280px, 62vh, 560px)' : 'calc(90vh - 120px)',
                borderRadius: isCompact ? 'clamp(18px, 5vw, 24px)' : '24px',
                overflow: 'hidden',
                background: '#fff'
              }}>
                <img
                  src={currentImage}
                  alt={alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          ) : (
            // Desktop View
            <img
              src={currentImage}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          )}

          {/* Expand indicator - Always visible with sticky position */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            style={{
              position: 'absolute',
              top: isCompact ? '6px' : '8px',
              right: isCompact ? '6px' : '8px',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              padding: isCompact ? '5px' : '6px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              color: WHITE,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 20,
              pointerEvents: 'auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.95)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
              <Maximize2 size={14} />
            </div>
        </div>
      </div>

      {/* Modal/Popup when expanded */}
      {isExpanded && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
              padding: isCompact ? '14px' : '24px',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setIsExpanded(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              position: 'absolute',
              top: isCompact ? '12px' : '20px',
              right: isCompact ? '12px' : '20px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: isCompact ? '8px' : '10px',
              color: WHITE,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: isCompact ? 'var(--text-chip)' : 'var(--text-body-lg)',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              zIndex: 10001
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <X size={20} />
            Fechar
          </button>

          {/* Toggle Desktop/Mobile in Modal */}
          {hasMultipleVersions && (
            <div style={{ 
              position: 'absolute',
              top: isCompact ? '12px' : '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', 
              gap: '4px', 
              background: 'rgba(0,0,0,0.6)',
              padding: isCompact ? '4px' : '5px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              zIndex: 10001
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('desktop');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: isCompact ? '5px 10px' : '6px 12px',
                  background: viewMode === 'desktop' ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: viewMode === 'desktop' ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  borderRadius: '999px',
                  color: WHITE,
                  fontSize: 'var(--text-chip)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Monitor size={14} />
                Desktop
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('mobile');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: isCompact ? '5px 10px' : '6px 12px',
                  background: viewMode === 'mobile' ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: viewMode === 'mobile' ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  borderRadius: '999px',
                  color: WHITE,
                  fontSize: 'var(--text-chip)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Smartphone size={14} />
                Mobile
              </button>
            </div>
          )}

          {/* Modal Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="image-viewer-scroll image-viewer-modal-scroll"
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: isCompact ? '12px' : '20px'
            }}
          >
            {viewMode === 'mobile' ? (
              // Mobile Mockup in Modal
              <div style={{
                width: isCompact ? 'clamp(240px, 84vw, 375px)' : 'fit-content',
                maxWidth: '100%',
                background: '#1a1a1a',
                borderRadius: isCompact ? 'clamp(22px, 6vw, 32px)' : '48px',
                padding: isCompact ? 'clamp(10px, 2vw, 14px)' : '16px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
                border: `${isCompact ? 'clamp(4px, 1.4vw, 8px)' : '12px'} solid #2a2a2a`,
                position: 'relative',
                margin: '0 auto'
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute',
                  top: isCompact ? '10px' : '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isCompact ? 'clamp(90px, 28vw, 160px)' : '160px',
                  height: isCompact ? 'clamp(20px, 6vw, 32px)' : '32px',
                  background: '#1a1a1a',
                  borderRadius: isCompact ? '0 0 14px 14px' : '0 0 20px 20px',
                  zIndex: 10
                }} />
                
                {/* Screen with fixed width and internal scroll */}
                <div style={{
                  width: '100%',
                  height: isCompact ? 'clamp(280px, 62vh, 560px)' : 'calc(90vh - 120px)',
                  borderRadius: isCompact ? 'clamp(18px, 5vw, 28px)' : '32px',
                  overflow: 'hidden',
                  background: '#fff'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                  }}
                  className="image-viewer-scroll image-viewer-modal-image-scroll"
                  >
                    <img
                      src={currentImage}
                      alt={alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block'
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Desktop View in Modal - Full scrollable image
              <div style={{
                maxWidth: '1200px',
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
              }}>
                <img
                  src={currentImage}
                  alt={alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
