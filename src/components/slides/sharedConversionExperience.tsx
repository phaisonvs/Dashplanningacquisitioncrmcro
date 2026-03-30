import { motion } from "motion/react";
import { CLUSTERS, WHITE } from "../theme";
import { ImageViewer } from "./ImageViewer";
import {
  DeckPill,
  DeckStatusPill,
  SlideEvidenceHeader,
  deckCardPresets,
  deckPillPresets,
  useDeckViewport,
} from "./sharedDeckTypography";

export type ConversionExperienceItem = {
  title: string;
  tags: Array<"LEADS" | "ACQUISITION" | "CRO" | "CRM" | "E-COMMERCE">;
  status: "feito" | "pendente" | "bloqueado";
  objective: string;
  objectiveKpis?: string[];
  desktopImageLink?: string;
  mobileImageLink?: string;
  desktopImage?: string;
  mobileImage?: string;
  imageLabel: string;
  imageHeight?: number;
};

type ConversionExperienceSectionProps = {
  items: ConversionExperienceItem[];
  title?: string;
  subtitle?: string;
};

type EvidenceTag = ConversionExperienceItem["tags"][number];
const EVIDENCE_TAG_ORDER: EvidenceTag[] = ["CRO", "ACQUISITION", "CRM"];

const orderEvidenceTags = (tags: ConversionExperienceItem["tags"]) =>
  [...tags]
    .filter((tag) => tag === "CRO" || tag === "ACQUISITION" || tag === "CRM")
    .sort(
      (left, right) =>
        EVIDENCE_TAG_ORDER.indexOf(left) - EVIDENCE_TAG_ORDER.indexOf(right),
    );

const ObjectiveBlock = ({
  text,
  kpis = [],
  compact = false,
}: {
  text: string;
  kpis?: string[];
  compact?: boolean;
}) => (
  <div
    /* Edita Bloco de Objetivo da Frente */
    data-ui="bloco-objetivo-conversao"
    style={{
      background: "rgba(255,255,255,0.018)",
      padding: compact ? "16px" : "18px",
      borderRadius: "14px",
      border: "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: compact ? "stretch" : "flex-start",
        gap: "10px",
        flexDirection: compact ? "column" : "row",
        marginBottom: compact ? "8px" : "10px",
      }}
    >
      <div
        style={{
          color: WHITE,
          fontSize: "var(--paragrafo)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-label)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div
          style={{
            width: "3px",
            height: "10px",
            background: CLUSTERS.CRO,
            borderRadius: "999px",
          }}
        />
        Objetivo da Frente
      </div>
      {kpis[0] ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: compact ? "flex-start" : "flex-end",
            alignItems: "center",
          }}
        >
          <DeckPill
            key={kpis[0]}
            label={kpis[0]}
            compact={compact}
            preset={deckPillPresets.tokenChip}
            style={{ textTransform: "none" }}
          />
        </div>
      ) : null}
    </div>
    <div
      style={{
        color: "rgba(255,255,255,0.68)",
        fontSize: "var(--paragrafo)",
        lineHeight: 1.5,
        fontWeight: 300,
      }}
    >
      {text}
    </div>
  </div>
);

const EvidenceCard = ({ item }: { item: ConversionExperienceItem }) => {
  const desktopImageLink = item.desktopImageLink ?? item.desktopImage;
  const mobileImageLink = item.mobileImageLink ?? item.mobileImage;
  const hasAnyImage = Boolean(desktopImageLink || mobileImageLink);
  const { isCompact } = useDeckViewport();

  return (
    <motion.article
      data-ui="card-evidencia-conversao"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      style={deckCardPresets.mediaCard(isCompact)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isCompact ? "16px" : "20px",
        }}
      >
        <div
          style={{
            padding: isCompact ? "16px 16px 0" : "18px 18px 0",
            display: "flex",
            alignItems: isCompact ? "stretch" : "flex-start",
            justifyContent: "space-between",
            gap: "14px",
            flexDirection: isCompact ? "column" : "row",
          }}
        >
          <div
            data-ui="card-evidencia-conteudo"
            style={{
              display: "flex",
              minWidth: 0,
              flex: "1 1 auto",
              alignItems: "flex-start",
              gap: isCompact ? "10px" : "12px",
              flexDirection: "column",
            }}
          >
            <div
              data-ui="card-evidencia-titulo"
              style={{
                color: WHITE,
                fontSize: "var(--paragrafo-grande)",
                fontWeight: 700,
                marginBottom: "0",
                lineHeight: 1.25,
              }}
            >
              {item.title}
            </div>
            <div
              data-ui="card-evidencia-tags"
              style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
            >
              {orderEvidenceTags(item.tags).map((tag) => (
                <DeckPill
                  key={`${item.title}-${tag}`}
                  label={tag}
                  compact={isCompact}
                  preset={deckPillPresets.conversionToken}
                />
              ))}
            </div>
          </div>
          <div
            data-ui="card-evidencia-status"
            style={{ alignSelf: isCompact ? "flex-start" : "auto" }}
          >
            <DeckStatusPill
              status={item.status}
              preset={deckPillPresets.statusTight}
            />
          </div>
        </div>

        {hasAnyImage ? (
          <div
            style={{
              position: "relative",
              padding: isCompact ? "14px 16px 16px" : "0 18px 16px",
            }}
          >
            <ImageViewer
              id={item.title}
              desktopImageLink={desktopImageLink}
              mobileImageLink={mobileImageLink}
              alt={item.title}
              height={item.imageHeight ?? 240}
              label={item.imageLabel}
              fullWidth
            />
          </div>
        ) : null}

        <div
          style={{
            marginTop: isCompact ? "0" : "0",
            padding: isCompact ? "0 16px 16px" : "0 18px 18px",
          }}
        >
          <ObjectiveBlock
            text={item.objective}
            kpis={item.objectiveKpis}
            compact={isCompact}
          />
        </div>
      </div>
    </motion.article>
  );
};

export function ConversionExperienceSection({
  items,
  title = "Conversão & Experiência",
  subtitle = "Leitura visual das peças e frentes que alimentam conversão e experiência.",
}: ConversionExperienceSectionProps) {
  const { isMobile, isCompact } = useDeckViewport();
  const orderedItems = [...items].reverse();

  return (
    <motion.section
      /* Edita Secao de Experiencia de Conversao */
      data-ui="secao-evidencias-conversao"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={deckCardPresets.section(isCompact)}
    >
      <SlideEvidenceHeader
        accentColor={CLUSTERS.CRO}
        title={title}
        subtitle={subtitle}
        badge={
          <DeckPill
            label="CRO"
            compact
            preset={deckPillPresets.conversionToken}
            style={{
              padding: "5px 9px",
              letterSpacing: "0.1em",
              fontWeight: 700,
            }}
          />
        }
      />

      <div
        data-ui="grid-evidencias-conversao"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isCompact
              ? "repeat(2, minmax(0, 1fr))"
              : "repeat(3, minmax(0, 1fr))",
          gap: isCompact ? "16px" : "22px",
        }}
      >
        {orderedItems.map((item) => (
          <EvidenceCard key={item.title} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
