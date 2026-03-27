import { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, Monitor, Smartphone, X } from 'lucide-react';
import { WHITE } from '../theme';

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
  id, 
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

  const hasMultipleVersions = desktopImage && mobileImage;
  const currentImage = viewMode === 'desktop' ? desktopImage : mobileImage;

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
            width: fullWidth ? '100%' : `${width}px`,
            minWidth: fullWidth ? '100%' : undefined,
            height: `${height}px`, 
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
        width: fullWidth ? '100%' : `${width}px`,
        display: 'flex',
        flexDirection: 'column',
        minWidth: fullWidth ? '100%' : undefined,
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
            height: `${height}px`,
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
            padding: viewMode === 'mobile' ? '20px' : '0',
            cursor: 'pointer'
          }}
          className="image-viewer-scroll image-viewer-container"
        >
          {viewMode === 'mobile' ? (
            // Mobile Mockup
            <div style={{
              width: 'fit-content',
              background: '#1a1a1a',
              borderRadius: '28px',
              padding: '10px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              border: '6px solid #2a2a2a',
              position: 'relative'
            }}>
              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '96px',
                height: '20px',
                background: '#1a1a1a',
                borderRadius: '0 0 14px 14px',
                zIndex: 10
              }} />
              
              {/* Screen */}
              <div style={{
                width: 'fit-content',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#fff'
              }}>
                <img
                  src={currentImage}
                  alt={alt}
                  style={{
                    width: 'auto',
                    maxWidth: '100%',
                    height: 'auto',
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
              top: '8px',
              right: '8px',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              padding: '6px',
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
            padding: '24px',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setIsExpanded(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '10px',
              color: WHITE,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-body-lg)',
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
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', 
              gap: '5px', 
              background: 'rgba(0,0,0,0.6)',
              padding: '5px',
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
                  padding: '6px 12px',
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
                  padding: '6px 12px',
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
              paddingTop: '20px'
            }}
          >
            {viewMode === 'mobile' ? (
              // Mobile Mockup in Modal
              <div style={{
                width: 'fit-content',
                background: '#1a1a1a',
                borderRadius: '48px',
                padding: '16px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
                border: '12px solid #2a2a2a',
                position: 'relative',
                margin: '0 auto'
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '160px',
                  height: '32px',
                  background: '#1a1a1a',
                  borderRadius: '0 0 20px 20px',
                  zIndex: 10
                }} />
                
                {/* Screen with fixed width and internal scroll */}
                <div style={{
                  width: '375px',
                  height: 'calc(90vh - 120px)',
                  borderRadius: '32px',
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
                        height: 'auto',
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
