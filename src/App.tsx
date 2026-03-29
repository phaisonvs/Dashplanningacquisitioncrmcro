import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ComponentType,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Home, Menu, X } from "lucide-react";
import { Slide0Calendar } from "./components/slides/Slide0Calendar";
import { Slide1Cover } from "./components/slides/Slide1Cover";
import { Slide2VisaoLeads } from "./components/slides/Slide2VisaoLeads";
import { Slide5Ecommerce } from "./components/slides/Slide5Ecommerce";
import { Slide8Expansao } from "./components/slides/Slide8Expansao";
import { Slide9Top8 } from "./components/slides/Slide9Top8";
import { useDeckViewport } from "./components/slides/sharedDeckTypography";
import { YELLOW, BG, CLUSTERS } from "./components/theme";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logoImg from "figma:asset/fa06232f6f0fcb4b35dd8f86211b9feb55b56828.png";

type SlideConfig = {
  Component: ComponentType<{
    isActive: boolean;
    onNext?: () => void;
    onNavigate?: (slideIndex: number) => void;
  }>;
  label: string;
  cluster: string | null;
  subject: string | null;
  slug: string;
  aliases?: string[];
};

const getClusterColor = (cluster: string | null) => {
  if (!cluster) return YELLOW;
  switch (cluster) {
    case "LEADS":
      return CLUSTERS.LEADS;
    case "ECOMMERCE":
      return CLUSTERS.ECOMMERCE;
    case "EXPANSÃO":
      return CLUSTERS.EXPANSAO;
    case "CRM":
      return CLUSTERS.CRM;
    case "DURATEX":
      return CLUSTERS.DURATEX;
    case "CRO":
      return CLUSTERS.CRO;
    case "ACQUISITION":
      return CLUSTERS.ACQUISITION;
    case "ESTRATÉGIA":
      return CLUSTERS.ESTRATEGIA;
    default:
      return YELLOW;
  }
};

const slides: SlideConfig[] = [
  {
    Component: Slide0Calendar,
    label: "Dashboard",
    cluster: null,
    subject: null,
    slug: "dashboard",
    aliases: ["library", "home"],
  },
  {
    Component: Slide1Cover,
    label: "Capa",
    cluster: null,
    subject: null,
    slug: "",
    aliases: ["capa", "cover"],
  },
  {
    Component: Slide2VisaoLeads,
    label: "Leads",
    cluster: "LEADS",
    subject: "FUNIL & PERFORMANCE",
    slug: "leads",
  },
  {
    Component: Slide5Ecommerce,
    label: "E-commerce",
    cluster: "ECOMMERCE",
    subject: "FUNIL & PRODUTO",
    slug: "ecommerce",
    aliases: ["e-com", "e-commerce"],
  },
  {
    Component: Slide8Expansao,
    label: "Expansão",
    cluster: "EXPANSÃO",
    subject: "PIPELINE",
    slug: "expansao",
  },
  {
    Component: Slide9Top8,
    label: "Fechamento Semanal",
    cluster: "ESTRATÉGIA",
    subject: "EXECUÇÃO",
    slug: "fechamento-semanal",
    aliases: ["top-8", "top8"],
  },
];

const slideAliases = new Map<string, number>();
slides.forEach((slide, index) => {
  const values = [slide.slug, slide.label, ...(slide.aliases ?? [])]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  values.forEach((value) => slideAliases.set(value, index));
});

const appBasePath = (() => {
  const rawBase = import.meta.env.BASE_URL ?? "/";
  if (!rawBase || rawBase === "/") return "/";

  const normalized = rawBase.replace(/^\/+/, "").replace(/\/+$/, "");
  return `/${normalized}/`;
})();

const joinAppPath = (path: string) => {
  const cleanPath = path.replace(/^\/+/, "");
  if (appBasePath === "/") {
    return cleanPath ? `/${cleanPath}` : "/";
  }

  return cleanPath ? `${appBasePath}${cleanPath}` : appBasePath;
};

const stripAppBasePath = (pathname: string) => {
  if (appBasePath === "/") return pathname;

  const lowerPath = pathname.toLowerCase();
  const lowerBase = appBasePath.toLowerCase();
  const lowerBaseWithoutTrailingSlash = appBasePath.slice(0, -1).toLowerCase();

  if (lowerPath === lowerBaseWithoutTrailingSlash) return "";
  if (lowerPath.startsWith(lowerBase))
    return pathname.slice(appBasePath.length);

  return pathname;
};

const normalizeRouteKey = (pathname: string, hash: string) => {
  const pathKey = stripAppBasePath(pathname)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .trim()
    .toLowerCase();
  if (pathKey) return pathKey;

  const rawHash = hash.startsWith("#") ? hash.slice(1) : hash;
  return rawHash.replace(/^\/+/, "").trim().toLowerCase();
};

const resolveSlideIndex = (pathname: string, hash: string) => {
  const key = normalizeRouteKey(pathname, hash);
  if (!key) return 0;
  if (slideAliases.has(key)) return slideAliases.get(key) ?? 0;

  const lastSegment = key.split("/").filter(Boolean).pop() ?? "";
  if (slideAliases.has(lastSegment)) return slideAliases.get(lastSegment) ?? 0;

  return 0;
};

const routeForIndex = (index: number) => {
  if (index === 0) return joinAppPath("/#/dashboard");
  if (index === 1) return joinAppPath("/#/cover");
  const slug = slides[index]?.slug;
  return slug ? joinAppPath(`/#/${slug}`) : joinAppPath("/#/dashboard");
};

const canonicalUrlForIndex = (index: number) =>
  `${window.location.origin}${routeForIndex(index)}`;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const currentRef = useRef(0);
  const { isCompact } = useDeckViewport();

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const syncRouteToIndex = useCallback(
    (
      index: number,
      historyMethod: "pushState" | "replaceState" = "pushState",
    ) => {
      const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
      const previousIndex = currentRef.current;
      const nextDirection =
        safeIndex === previousIndex ? 0 : safeIndex > previousIndex ? 1 : -1;

      setDirection(nextDirection);
      setCurrent(safeIndex);
      setShowMenu(false);

      const nextUrl = canonicalUrlForIndex(safeIndex);
      if (window.location.href !== nextUrl) {
        window.history[historyMethod](null, "", nextUrl);
      }
    },
    [],
  );

  const goNext = useCallback(() => {
    if (currentRef.current < slides.length - 1) {
      syncRouteToIndex(currentRef.current + 1);
    }
  }, [syncRouteToIndex]);

  const goPrev = useCallback(() => {
    if (currentRef.current > 0) {
      syncRouteToIndex(currentRef.current - 1);
    }
  }, [syncRouteToIndex]);

  const goToDashboard = useCallback(() => {
    syncRouteToIndex(0);
  }, [syncRouteToIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      syncRouteToIndex(index);
    },
    [syncRouteToIndex],
  );

  const showAdvanceBadge = current === 1;
  const hideNavigationArrows = current === 0;

  useEffect(() => {
    const syncFromLocation = () => {
      const nextIndex = resolveSlideIndex(
        window.location.pathname,
        window.location.hash,
      );
      const safeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
      const previousIndex = currentRef.current;

      setDirection(
        safeIndex === previousIndex ? 0 : safeIndex > previousIndex ? 1 : -1,
      );
      setCurrent(safeIndex);

      const nextUrl = canonicalUrlForIndex(safeIndex);
      if (window.location.href !== nextUrl) {
        window.history.replaceState(null, "", nextUrl);
      }
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ")
        goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const { Component } = slides[current];

  return (
    <div
      data-ui="app-root"
      style={{
        background: BG,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "var(--font-family)",
      }}
    >
      <div
        data-ui="app-progresso"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.05)",
          zIndex: 200,
        }}
      >
        <motion.div
          animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ height: "100%", background: YELLOW }}
        />
      </div>

      <div
        data-ui="app-topbar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: isCompact ? "auto" : "84px",
          minHeight: isCompact ? "auto" : "84px",
          background: "rgba(13, 13, 13, 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          zIndex: 200,
          pointerEvents: "none",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: isCompact ? "stretch" : "flex-start",
          padding: isCompact ? "12px 16px 12px" : "20px 28px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isCompact ? "stretch" : "center",
            width: "100%",
            gap: isCompact ? "10px" : 0,
            flexDirection: isCompact ? "column" : "row",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: isCompact ? "end" : "center",
              gap: isCompact ? "12px" : "16px",
              pointerEvents: "auto",
              flexWrap: "wrap",
              width: isCompact ? "100%" : "auto",
            }}
          >
            <button
              type="button"
              onClick={goToDashboard}
              title="Ir para o Dashboard"
              data-ui="app-home"
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <ImageWithFallback
                src={logoImg}
                alt="Logo"
                style={{
                  height: isCompact ? "24px" : "28px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </button>

            <AnimatePresence mode="wait">
              {slides[current].cluster && (
                <motion.div
                  key={slides[current].cluster}
                  data-ui="app-cluster"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    gap: isCompact ? "5px" : "6px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: isCompact ? "100%" : "auto",
                  }}
                >
                  <div
                    style={{
                      width: "1px",
                      height: "18px",
                      background: "rgba(255,255,255,0.15)",
                      margin: isCompact ? "0 4px 0 0" : "0 6px",
                    }}
                  />
                  <div
                    style={{
                      display: "inline-flex",
                      background: `${getClusterColor(slides[current].cluster)}15`,
                      border: `1px solid ${getClusterColor(slides[current].cluster)}50`,
                      borderRadius: "999px",
                      padding: isCompact ? "3px 8px" : "4px 10px",
                    }}
                  >
                    <span
                      style={{
                        color: getClusterColor(slides[current].cluster),
                        fontSize: "var(--rotulo)",
                        fontWeight: 800,
                        letterSpacing: "0.09em",
                        textTransform: "uppercase",
                      }}
                    >
                      {slides[current].cluster}
                    </span>
                  </div>
                  <div
                    data-ui="app-subject"
                    style={{
                      display: "inline-flex",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "999px",
                      padding: isCompact ? "3px 8px" : "4px 10px",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "var(--rotulo)",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {slides[current].subject}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: isCompact ? "8px" : "10px",
              flexWrap: "wrap",
              justifyContent: isCompact ? "end" : "flex-end",
            }}
          >
            {current > 0 && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={goToDashboard}
                  title="Voltar ao Dashboard"
                  style={{
                    background: "rgba(255,239,0,0.08)",
                    border: `1px solid ${YELLOW}30`,
                    borderRadius: "999px",
                    padding: isCompact ? "5px 10px" : "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    color: YELLOW,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,239,0,0.15)";
                    e.currentTarget.style.borderColor = YELLOW;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,239,0,0.08)";
                    e.currentTarget.style.borderColor = `${YELLOW}30`;
                  }}
                >
                  <motion.span
                    animate={{ x: [0, -4, 0] }}
                    transition={{
                      duration: 1.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ display: "inline-flex" }}
                  >
                    <Home size={14} />
                  </motion.span>
                  <span
                    style={{
                      fontSize: "var(--rotulo)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                    }}
                  >
                    DASHBOARD
                  </span>
                </motion.button>

                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    data-ui="app-menu"
                    title="Menu de navegação"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "999px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      color: "rgba(255,255,255,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    {showMenu ? <X size={14} /> : <Menu size={14} />}
                  </button>

                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        data-ui="app-menu-painel"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        right: "auto",
                        transformOrigin: "top left",
                        background: "rgba(20, 20, 20, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                          padding: "8px",
                          minWidth: isCompact ? "180px" : "220px",
                          maxWidth: isCompact ? "calc(100vw - 32px)" : "none",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                          zIndex: 1000,
                        }}
                      >
                        {slides.map((slide, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            data-ui="app-menu-item"
                            style={{
                              width: "100%",
                              padding: "8px 10px",
                              background:
                                index === current
                                  ? "rgba(255,239,0,0.1)"
                                  : "transparent",
                              border: "none",
                              borderRadius: "10px",
                              textAlign: "left",
                              cursor: "pointer",
                              transition: "all 0.15s",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              borderLeft:
                                index === current
                                  ? `2px solid ${YELLOW}`
                                  : "2px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (index !== current) {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.05)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (index !== current) {
                                e.currentTarget.style.background =
                                  "transparent";
                              }
                            }}
                          >
                            <span
                              style={{
                                fontSize: "var(--paragrafo)",
                                fontWeight: 600,
                                color:
                                  index === current
                                    ? YELLOW
                                    : "rgba(255,255,255,0.9)",
                                letterSpacing: "0.02em",
                              }}
                            >
                              {slide.label}
                            </span>
                            {slide.cluster && (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "6px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "var(--rotulo)",
                                    fontWeight: 700,
                                    color: getClusterColor(slide.cluster),
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {slide.cluster}
                                </span>
                                <span
                                  style={{
                                    fontSize: "var(--rotulo)",
                                    fontWeight: 500,
                                    color: "rgba(255,255,255,0.4)",
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  {slide.subject}
                                </span>
                              </div>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            <span
              data-ui="app-contador-slide"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "var(--rotulo)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "999px",
                padding: isCompact ? "4px 10px" : "5px 12px",
                minWidth: isCompact ? "48px" : "52px",
                textAlign: "center",
              }}
            >
              {current + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          data-ui="app-viewport-slide"
          key={current}
          custom={direction}
          variants={{
            initial: (d: number) => ({ opacity: 0, y: d * 10 }),
            animate: { opacity: 1, y: 0 },
            exit: (d: number) => ({ opacity: 0, y: d * -10 }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", overflowY: "auto" }}
        >
          <Component isActive={true} onNext={goNext} onNavigate={goToSlide} />
        </motion.div>
      </AnimatePresence>

      {!hideNavigationArrows && current > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goPrev}
          data-ui="app-seta-anterior"
          style={{
            position: "absolute",
            left: isCompact ? "12px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "50%",
            width: isCompact ? "40px" : "44px",
            height: isCompact ? "40px" : "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 300,
            color: "rgba(255,255,255,0.5)",
            transition: "all 0.2s",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,239,0,0.15)";
            e.currentTarget.style.borderColor = YELLOW;
            e.currentTarget.style.color = YELLOW;
            if (!isCompact) {
              e.currentTarget.style.width = "48px";
              e.currentTarget.style.height = "48px";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            if (!isCompact) {
              e.currentTarget.style.width = "44px";
              e.currentTarget.style.height = "44px";
            }
          }}
        >
          <motion.span
            animate={{ x: [0, -4, 0] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <ChevronLeft size={20} />
          </motion.span>
        </motion.button>
      )}

      {!hideNavigationArrows && current < slides.length - 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={goNext}
          data-ui="app-seta-proxima"
          style={{
            position: "absolute",
            right: isCompact ? "12px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: showAdvanceBadge ? "999px" : "50%",
            width: showAdvanceBadge ? "auto" : isCompact ? "40px" : "44px",
            height: isCompact ? "40px" : "44px",
            padding: showAdvanceBadge
              ? isCompact
                ? "0 10px 0 10px"
                : "0 12px 0 12px"
              : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: showAdvanceBadge ? "10px" : 0,
            cursor: "pointer",
            zIndex: 300,
            color: "rgba(255,255,255,0.5)",
            transition: "all 0.2s",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,239,0,0.15)";
            e.currentTarget.style.borderColor = YELLOW;
            e.currentTarget.style.color = YELLOW;
            if (!showAdvanceBadge && !isCompact) {
              e.currentTarget.style.width = "48px";
              e.currentTarget.style.height = "48px";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            if (!showAdvanceBadge && !isCompact) {
              e.currentTarget.style.width = "44px";
              e.currentTarget.style.height = "44px";
            }
          }}
        >
          {showAdvanceBadge && (
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 10px",
                borderRadius: "999px",
                border: "1px solid currentColor",
                background: "transparent",
                color: "currentColor",
                fontSize: isCompact
                  ? "var(--paragrafo-grande)"
                  : "var(--rotulo)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              AVANÇAR
            </motion.span>
          )}
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <ChevronRight size={20} />
          </motion.span>
        </motion.button>
      )}

      <div
        data-ui="app-paginacao"
        style={{
          position: "absolute",
          bottom: isCompact ? "20px" : "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 200,
          alignItems: "center",
        }}
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            title={slide.label}
            onClick={() => goToSlide(i)}
            data-ui="app-paginacao-item"
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              borderRadius: "10px",
              background: i === current ? YELLOW : "rgba(255,255,255,0.15)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              outline: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
