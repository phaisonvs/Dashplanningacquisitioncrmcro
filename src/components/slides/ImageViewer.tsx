import { useState, useRef, useEffect } from 'react';
import { Maximize2, Monitor, Smartphone, X } from 'lucide-react';
import { WHITE } from '../theme';
import { useDeckViewport } from './sharedDeckTypography';

interface ImageViewerProps {
  id: string;
  desktopImageLink?: string;
  mobileImageLink?: string;
  desktopImage?: string;
  mobileImage?: string;
  alt: string;
  width?: number;
  height?: number;
  label?: string;
  fullWidth?: boolean;
}

type ViewMode = "desktop" | "mobile";

type ViewportSize = {
  width: number;
  height: number;
};

type ImageDimensions = {
  width: number;
  height: number;
};

type PhoneFrameProps = {
  image: string;
  alt: string;
  compact: boolean;
  modal?: boolean;
  widthClassName?: string;
  shellWidth?: string;
  shellHeight?: string;
};

const PHONE_FRAME_ASPECT_RATIO = 9 / 19.5;
const FALLBACK_VIEWPORT: ViewportSize = {
  width: 1280,
  height: 720,
};

const readViewportSize = (): ViewportSize => {
  if (typeof window === "undefined") {
    return FALLBACK_VIEWPORT;
  }

  const viewport = window.visualViewport;

  return {
    width: Math.round(viewport?.width ?? window.innerWidth),
    height: Math.round(viewport?.height ?? window.innerHeight),
  };
};

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>(() =>
    readViewportSize(),
  );

  useEffect(() => {
    const updateViewportSize = () => setViewportSize(readViewportSize());

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);
    window.addEventListener("orientationchange", updateViewportSize);
    window.visualViewport?.addEventListener("resize", updateViewportSize);
    window.visualViewport?.addEventListener("scroll", updateViewportSize);

    return () => {
      window.removeEventListener("resize", updateViewportSize);
      window.removeEventListener("orientationchange", updateViewportSize);
      window.visualViewport?.removeEventListener("resize", updateViewportSize);
      window.visualViewport?.removeEventListener("scroll", updateViewportSize);
    };
  }, []);

  return viewportSize;
};

const PhoneFrame = ({
  image,
  alt,
  compact,
  modal = false,
  widthClassName,
  shellWidth,
  shellHeight,
}: PhoneFrameProps) => {
  const resolvedShellWidth = shellWidth ?? (modal
    ? compact
      ? "clamp(360px, 92vw, 520px)"
      : "clamp(380px, 48vw, 620px)"
    : compact
      ? "clamp(248px, 84vw, 360px)"
      : "clamp(224px, 28vw, 320px)");
  const resolvedShellHeight = shellHeight ?? undefined;

  return (
    <div
      className={widthClassName}
      style={{
        width: resolvedShellWidth,
        height: resolvedShellHeight,
        aspectRatio: resolvedShellHeight ? "auto" : "9 / 19.5",
        maxWidth: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "9 / 19.5",
          boxSizing: "border-box",
          borderRadius: compact ? "34px" : "40px",
          padding: compact ? "12px" : "14px",
          background:
            "linear-gradient(145deg, rgba(61,61,61,0.98) 0%, rgba(18,18,18,0.98) 52%, rgba(72,72,72,0.96) 100%)",
          boxShadow:
            modal
              ? "0 34px 90px rgba(0,0,0,0.72)"
              : "0 20px 52px rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: compact ? "11px" : "13px",
            borderRadius: compact ? "26px" : "32px",
            background: "#0b0b0b",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: compact ? "9px" : "11px",
            left: "50%",
            transform: "translateX(-50%)",
            width: compact ? "88px" : "104px",
            height: compact ? "20px" : "22px",
            borderRadius: "0 0 16px 16px",
            background: "#0b0b0b",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: compact ? "12px" : "14px",
            borderRadius: compact ? "24px" : "30px",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#ffffff",
            display: "block",
            zIndex: 1,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <img
            data-ui="visualizador-imagem-mobile"
            src={image}
            alt={alt}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "initial",
              background: "#ffffff",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: compact ? "11px" : "13px",
            transform: "translateX(-50%)",
            width: compact ? "92px" : "110px",
            height: compact ? "4px" : "5px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.16)",
            zIndex: 3,
          }}
        />
      </div>
    </div>
  );
};

export function ImageViewer({
  id,
  desktopImageLink,
  mobileImageLink,
  desktopImage,
  mobileImage,
  alt,
  width = 160,
  height = 100,
  label = "Screenshot",
  fullWidth = false,
}: ImageViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [mobileImageDimensions, setMobileImageDimensions] =
    useState<ImageDimensions | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isMobile, isCompact } = useDeckViewport();
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const viewerUiId = id
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const resolvedDesktopImageLink = desktopImageLink ?? desktopImage ?? "";
  const resolvedMobileImageLink = mobileImageLink ?? mobileImage ?? "";
  const hasDesktopImage = Boolean(resolvedDesktopImageLink);
  const hasMobileImage = Boolean(resolvedMobileImageLink);
  const hasAnyImage = hasDesktopImage || hasMobileImage;
  const hasOnlyMobileImage = hasMobileImage && !hasDesktopImage;
  const hasOnlyDesktopImage = hasDesktopImage && !hasMobileImage;

  const activeViewMode: ViewMode =
    hasOnlyMobileImage
      ? "mobile"
      : hasOnlyDesktopImage
        ? "desktop"
        : viewMode;
  const currentImageLink =
    activeViewMode === "desktop"
      ? resolvedDesktopImageLink || resolvedMobileImageLink
      : resolvedMobileImageLink || resolvedDesktopImageLink;
  const modalFrameInset = isCompact ? 12 : 14;
  const modalChrome = modalFrameInset * 4;
  const containerWidth = fullWidth ? "100%" : isCompact ? "100%" : `${width}px`;
  const containerHeight = fullWidth
    ? hasOnlyMobileImage
      ? isMobile
        ? `clamp(${Math.max(380, Math.round(height * 1.25))}px, 82vw, ${Math.max(height + 240, 720)}px)`
        : isCompact
          ? `clamp(${Math.max(360, Math.round(height * 1.18))}px, 56vw, ${Math.max(height + 220, 660)}px)`
          : `clamp(${Math.max(320, Math.round(height * 1.1))}px, 38vw, ${Math.max(height + 180, 560)}px)`
      : isMobile
        ? `clamp(${Math.max(190, Math.round(height * 0.72))}px, 56vw, ${Math.max(height + 40, 320)}px)`
        : isCompact
          ? `clamp(${Math.max(220, Math.round(height * 0.82))}px, 34vw, ${Math.max(height + 80, 420)}px)`
          : `${height}px`
    : `${height}px`;
  const isMobileModal = isExpanded && activeViewMode === "mobile";
  const mobileModalPaddingX = isCompact ? 16 : 24;
  const mobileModalPaddingTop = isCompact ? 88 : 112;
  const mobileModalPaddingBottom = isCompact ? 16 : 24;
  const mobileModalAvailableWidth = Math.max(
    0,
    viewportWidth - mobileModalPaddingX * 2,
  );
  const mobileModalAvailableHeight = Math.max(
    0,
    viewportHeight - mobileModalPaddingTop - mobileModalPaddingBottom,
  );
  const mobileModalShellWidth = Math.min(
    mobileModalAvailableWidth,
    mobileModalAvailableHeight * PHONE_FRAME_ASPECT_RATIO,
    isCompact ? 300 : 320,
  );
  const mobileModalShellWidthStyle = `${Math.max(0, Math.floor(mobileModalShellWidth))}px`;
  const mobileModalDefaultShellHeight = mobileModalShellWidth / PHONE_FRAME_ASPECT_RATIO;
  const mobileModalAutoFitShellHeight =
    mobileImageDimensions && mobileImageDimensions.width > 0
      ? ((mobileModalShellWidth - modalChrome) *
          (mobileImageDimensions.height / mobileImageDimensions.width)) +
        modalChrome
      : null;
  const mobileModalResolvedShellHeight = Math.max(
    0,
    Math.floor(
      mobileModalAutoFitShellHeight
        ? Math.min(mobileModalDefaultShellHeight, mobileModalAutoFitShellHeight)
        : mobileModalDefaultShellHeight,
    ),
  );

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

  useEffect(() => {
    if (!hasAnyImage) {
      setViewMode("desktop");
      return;
    }

    if (hasOnlyMobileImage) {
      setViewMode("mobile");
      return;
    }

    if (hasOnlyDesktopImage) {
      setViewMode("desktop");
    }
  }, [hasAnyImage, hasOnlyDesktopImage, hasOnlyMobileImage]);

  useEffect(() => {
    if (!isExpanded && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeViewMode, currentImageLink, isExpanded]);

  useEffect(() => {
    if (!isMobileModal || !currentImageLink) {
      setMobileImageDimensions(null);
      return;
    }

    let isCancelled = false;
    const image = new Image();

    image.onload = () => {
      if (isCancelled) {
        return;
      }

      setMobileImageDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      if (!isCancelled) {
        setMobileImageDimensions(null);
      }
    };

    image.src = currentImageLink;

    if (image.complete && image.naturalWidth > 0 && !isCancelled) {
      setMobileImageDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [currentImageLink, isMobileModal]);

  if (!hasAnyImage) {
    return (
      <div
        data-ui="visualizador-imagem-vazio"
        style={{
          width: containerWidth,
          minWidth: containerWidth,
          height: containerHeight,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
          fontSize: "var(--rotulo)",
          color: "rgba(255,255,255,0.38)",
          textAlign: "center",
          padding: "12px",
        }}
      >
        <div style={{ color: WHITE, fontSize: "var(--paragrafo-grande)", fontWeight: 700, lineHeight: 1.3 }}>
          {label}
        </div>
        <div style={{ maxWidth: "240px", lineHeight: 1.45 }}>
          Adicione um link imagem desktop ou um link imagem mobile.
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        data-ui={viewerUiId ? `visualizador-imagem-${viewerUiId}` : "visualizador-imagem"}
        style={{
          position: "relative",
          width: containerWidth,
          display: "flex",
          flexDirection: "column",
          minWidth: containerWidth,
          flex: fullWidth ? 1 : undefined,
          gap: "8px",
        }}
      >
        {hasAnyImage ? (
          <div
            data-ui="visualizador-imagem-alternancia"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: "4px",
                background: "rgba(0,0,0,0.4)",
                padding: "3px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.05)",
                width: "fit-content",
                maxWidth: "100%",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => hasDesktopImage && setViewMode("desktop")}
                disabled={!hasDesktopImage}
                data-ui="visualizador-imagem-botao-desktop"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  background:
                    activeViewMode === "desktop"
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                  border:
                    activeViewMode === "desktop"
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid transparent",
                  borderRadius: "999px",
                  color:
                    activeViewMode === "desktop"
                      ? WHITE
                      : "rgba(255,255,255,0.5)",
                  opacity: hasDesktopImage ? 1 : 0.42,
                  fontSize: "var(--rotulo)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-label)",
                  cursor: hasDesktopImage ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                <Monitor size={14} />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => hasMobileImage && setViewMode("mobile")}
                disabled={!hasMobileImage}
                data-ui="visualizador-imagem-botao-mobile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  background:
                    activeViewMode === "mobile"
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                  border:
                    activeViewMode === "mobile"
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid transparent",
                  borderRadius: "999px",
                  color:
                    activeViewMode === "mobile"
                      ? WHITE
                      : "rgba(255,255,255,0.5)",
                  opacity: hasMobileImage ? 1 : 0.42,
                  fontSize: "var(--rotulo)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-label)",
                  cursor: hasMobileImage ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                <Smartphone size={14} />
                Mobile
              </button>
            </div>

            {(!hasDesktopImage || !hasMobileImage) && (
              <div
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "var(--rotulo)",
                  lineHeight: 1.45,
                }}
              >
                {!hasDesktopImage ? "Sem link imagem desktop." : null}
                {!hasDesktopImage && !hasMobileImage ? " " : null}
                {!hasMobileImage ? "Sem link imagem mobile." : null}
              </div>
            )}
          </div>
        ) : null}

        {/* Image Container */}
        <div
          data-ui="visualizador-imagem-viewport"
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
            alignItems: "flex-start",
            justifyContent: 'center',
            padding: isCompact ? '14px' : activeViewMode === "mobile" ? '20px' : '0',
            cursor: "pointer",
          }}
          className="image-viewer-scroll image-viewer-container"
        >
          {activeViewMode === "mobile" ? (
            <PhoneFrame image={currentImageLink} alt={alt} compact={isCompact} />
          ) : (
            <img
              data-ui="visualizador-imagem-desktop"
              src={currentImageLink}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                objectPosition: 'center top',
              }}
            />
          )}

          {/* Expand indicator - Always visible with sticky position */}
          <div 
            data-ui="visualizador-imagem-expandir"
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
          data-ui="visualizador-imagem-modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobileModal ? 0 : isCompact ? "14px" : "24px",
            overflow: "hidden",
            animation: "fadeIn 0.2s ease",
          }}
          onClick={() => setIsExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            data-ui="visualizador-imagem-modal-fechar"
            style={{
              position: "absolute",
              top: isCompact ? "12px" : "20px",
              right: isCompact ? "12px" : "20px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "10px",
              padding: isCompact ? "8px" : "10px",
              color: WHITE,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: isCompact ? "var(--rotulo)" : "var(--paragrafo-grande)",
              fontWeight: 600,
              transition: "all 0.2s ease",
              zIndex: 10001,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            <X size={20} />
            Fechar
          </button>

          {hasAnyImage ? (
            <div
              data-ui="visualizador-imagem-modal-alternancia"
              style={{
                position: "absolute",
                top: isCompact ? "12px" : "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                zIndex: 10001,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  gap: "4px",
                  background: "rgba(0,0,0,0.6)",
                  padding: isCompact ? "4px" : "5px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  flexWrap: "wrap",
                  maxWidth: "min(92vw, 100%)",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasDesktopImage) {
                      setViewMode("desktop");
                    }
                  }}
                  disabled={!hasDesktopImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: isCompact ? "5px 10px" : "6px 12px",
                    background:
                      activeViewMode === "desktop"
                        ? "rgba(255,255,255,0.15)"
                        : "transparent",
                    border:
                      activeViewMode === "desktop"
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "1px solid transparent",
                    borderRadius: "999px",
                    color: WHITE,
                    fontSize: "var(--rotulo)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-label)",
                    cursor: hasDesktopImage ? "pointer" : "not-allowed",
                    opacity: hasDesktopImage ? 1 : 0.42,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Monitor size={14} />
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasMobileImage) {
                      setViewMode("mobile");
                    }
                  }}
                  disabled={!hasMobileImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: isCompact ? "5px 10px" : "6px 12px",
                    background:
                      activeViewMode === "mobile"
                        ? "rgba(255,255,255,0.15)"
                        : "transparent",
                    border:
                      activeViewMode === "mobile"
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "1px solid transparent",
                    borderRadius: "999px",
                    color: WHITE,
                    fontSize: "var(--rotulo)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-label)",
                    cursor: hasMobileImage ? "pointer" : "not-allowed",
                    opacity: hasMobileImage ? 1 : 0.42,
                    transition: "all 0.2s ease",
                  }}
                >
                  <Smartphone size={14} />
                  Mobile
                </button>
              </div>

              {(!hasDesktopImage || !hasMobileImage) && (
                <div
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "var(--rotulo)",
                    lineHeight: 1.45,
                    textAlign: "center",
                    maxWidth: "280px",
                  }}
                >
                  {!hasDesktopImage ? "Sem link imagem desktop." : null}
                  {!hasDesktopImage && !hasMobileImage ? " " : null}
                  {!hasMobileImage ? "Sem link imagem mobile." : null}
                </div>
              )}
              </div>
            ) : null}

          {isMobileModal ? (
            <div
              data-ui="visualizador-imagem-modal-mobile-stage"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: `${mobileModalPaddingTop}px ${mobileModalPaddingX}px ${mobileModalPaddingBottom}px`,
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <PhoneFrame
                image={currentImageLink}
                alt={alt}
                compact={isCompact}
                modal
                shellWidth={mobileModalShellWidthStyle}
                shellHeight={`${mobileModalResolvedShellHeight}px`}
                widthClassName="image-viewer-modal-phone-frame"
              />
            </div>
          ) : (
            <div
              data-ui="visualizador-imagem-modal"
              onClick={(e) => e.stopPropagation()}
              className="image-viewer-scroll image-viewer-modal-scroll"
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: isCompact ? "72px" : "88px",
              }}
            >
              <div
                style={{
                  maxWidth: "1200px",
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  margin: "0 auto",
                }}
              >
                <img
                  data-ui="visualizador-imagem-modal-desktop"
                  src={currentImageLink}
                  alt={alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    objectPosition: "center top",
                  }}
                />
              </div>
            </div>
          )}
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
