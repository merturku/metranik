/**
 * Map extracted IFC quantities to CalcModule input schemas
 */

import type { ExtractedQuantity, MappedInput } from "./types";

export interface MappingRule {
  entityType: string;
  moduleId: string;
  inputs: Record<string, (qty: ExtractedQuantity) => number | string | undefined>;
  confidence: "high" | "medium" | "low";
}

const MAPPING_RULES: MappingRule[] = [
  // Pipe → Boru Basınç Kaybı
  {
    entityType: "IFCPIPE",
    moduleId: "boru-basınç-kaybı",
    confidence: "high",
    inputs: {
      uzunluk_m: (qty) => getQty(qty, "length"),
      cap_mm: (qty) => getQty(qty, "diameter"),
      debi_m3h: (qty) => estimatePipeFlow(getQty(qty, "diameter") as number),
    },
  },

  // Duct → Kanal Boyutlandırma
  {
    entityType: "IFCDUCT",
    moduleId: "kanal-boyutlandirma-smacna",
    confidence: "medium",
    inputs: {
      debi_m3h: (qty) => estimateDuctFlow(qty),
      hiz_m_s: () => 5, // default SMACNA velocity
    },
  },

  // Cable → Kablo Kesiti
  {
    entityType: "IFCCABLE",
    moduleId: "kablo-kesiti-iec60364",
    confidence: "medium",
    inputs: {
      akim_A: (qty) => estimateCableAmpacity(getQty(qty, "diameter") as number),
      uzunluk_m: (qty) => getQty(qty, "length"),
      faz: () => "tek",
    },
  },

  // Equipment → Power-based modules
  {
    entityType: "IFCEQUIPMENT",
    moduleId: "motor-nominal-akimi",
    confidence: "low",
    inputs: {
      guc_kW: (qty) => getQty(qty, "power"),
      gerilim_V: () => 380,
      cosPhi: () => 0.9,
    },
  },
];

function getQty(qty: ExtractedQuantity, type: string): number | undefined {
  return qty.quantities.find((q) => q.type === type)?.value;
}

function estimatePipeFlow(diameterMm: number): number {
  // Estimate flow from pipe diameter using typical velocity (1.5 m/s for comfort)
  if (!diameterMm || diameterMm <= 0) return 0;
  const radiusM = diameterMm / 2000;
  const areaM2 = Math.PI * radiusM * radiusM;
  const velocity = 1.5; // m/s
  return areaM2 * velocity * 3600; // m³/h
}

function estimateDuctFlow(qty: ExtractedQuantity): number {
  // For ducts, estimate from width × height
  const width = qty.quantities.find((q) => q.type === "width")?.value;
  const height = qty.quantities.find((q) => q.type === "height")?.value;
  if (!width || !height) return 0;
  const areaM2 = (width / 1000) * (height / 1000);
  const velocity = 5; // m/s default SMACNA
  return areaM2 * velocity * 3600; // m³/h
}

function estimateCableAmpacity(diameterMm: number): number {
  // Rough ampacity estimate from cable diameter (copper, 70°C)
  // 1mm² ≈ 9A, cable area from diameter
  if (!diameterMm || diameterMm <= 0) return 0;
  const radiusMm = diameterMm / 2;
  const areaMm2 = Math.PI * radiusMm * radiusMm;
  return areaMm2 * 0.08; // A/mm²
}

export function mapToModules(
  extracted: ExtractedQuantity[]
): MappedInput[] {
  const mapped: MappedInput[] = [];

  for (const qty of extracted) {
    const rules = MAPPING_RULES.filter(
      (r) => r.entityType === qty.entityType
    );

    for (const rule of rules) {
      const inputs: Record<string, number | string> = {};
      let hasRequiredInputs = false;

      for (const [key, extractor] of Object.entries(rule.inputs)) {
        const value = extractor(qty);
        if (value !== undefined) {
          inputs[key] = value;
          hasRequiredInputs = true;
        }
      }

      if (hasRequiredInputs) {
        mapped.push({
          moduleId: rule.moduleId,
          inputs,
          confidence: rule.confidence,
          warning:
            rule.confidence === "low"
              ? "Düşük güvenilirlik — değerleri kontrol edin"
              : undefined,
        });
      }
    }
  }

  return mapped;
}

export function getMappedModulesForEntity(
  entityType: string
): { moduleId: string; confidence: string }[] {
  return MAPPING_RULES.filter((r) => r.entityType === entityType).map((r) => ({
    moduleId: r.moduleId,
    confidence: r.confidence,
  }));
}
