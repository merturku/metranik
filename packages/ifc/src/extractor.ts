/**
 * Extract BIM objects and their metraj properties from IFC
 */

import type { IfcEntity, ExtractedQuantity } from "./types";
import { getIfcEntitiesByType } from "./parser";

const ENTITY_TYPES = [
  "IFCPIPE",
  "IFCDUCT",
  "IFCCABLE",
  "IFCEQUIPMENT",
  "IFCBEAM",
  "IFCCOLUMN",
];

export async function extractAllEntities(
  model: any
): Promise<IfcEntity[]> {
  const allEntities: IfcEntity[] = [];

  for (const type of ENTITY_TYPES) {
    const entities = await getIfcEntitiesByType(model, type);
    allEntities.push(...entities);
  }

  return allEntities;
}

export function quantifyEntity(entity: IfcEntity): ExtractedQuantity | null {
  const quantities = [];
  const type = entity.type.toUpperCase();
  const props = entity.properties as Record<string, any>;

  try {
    switch (type) {
      case "IFCPIPE":
        if (props.Length?.value) {
          quantities.push({
            type: "length",
            value: parseFloat(props.Length.value),
            unit: "m",
            source: "ifc" as const,
          });
        }
        if (props.OuterDiameter?.value) {
          quantities.push({
            type: "diameter",
            value: parseFloat(props.OuterDiameter.value) * 1000,
            unit: "mm",
            source: "ifc" as const,
          });
        }
        break;

      case "IFCDUCT":
        if (props.Length?.value) {
          quantities.push({
            type: "length",
            value: parseFloat(props.Length.value),
            unit: "m",
            source: "ifc" as const,
          });
        }
        if (props.Width?.value && props.Height?.value) {
          quantities.push({
            type: "width",
            value: parseFloat(props.Width.value) * 1000,
            unit: "mm",
            source: "ifc" as const,
          });
          quantities.push({
            type: "height",
            value: parseFloat(props.Height.value) * 1000,
            unit: "mm",
            source: "ifc" as const,
          });
        }
        break;

      case "IFCCABLE":
        if (props.Length?.value) {
          quantities.push({
            type: "length",
            value: parseFloat(props.Length.value),
            unit: "m",
            source: "ifc" as const,
          });
        }
        if (props.OuterDiameter?.value) {
          quantities.push({
            type: "diameter",
            value: parseFloat(props.OuterDiameter.value) * 1000,
            unit: "mm",
            source: "ifc" as const,
          });
        }
        break;

      case "IFCEQUIPMENT":
        if (props.Power?.value) {
          quantities.push({
            type: "power",
            value: parseFloat(props.Power.value),
            unit: "kW",
            source: "ifc" as const,
          });
        }
        break;

      case "IFCBEAM":
        if (props.Length?.value) {
          quantities.push({
            type: "length",
            value: parseFloat(props.Length.value),
            unit: "m",
            source: "ifc" as const,
          });
        }
        break;
    }

    if (quantities.length === 0) {
      return null;
    }

    return {
      entityId: entity.id,
      entityType: entity.type,
      entityName: entity.name,
      quantities,
    };
  } catch (error) {
    console.warn(`Failed to quantify entity ${entity.name}:`, error);
    return null;
  }
}

export async function extractQuantities(
  model: any
): Promise<ExtractedQuantity[]> {
  const entities = await extractAllEntities(model);
  const extracted: ExtractedQuantity[] = [];

  for (const entity of entities) {
    const qty = quantifyEntity(entity);
    if (qty) {
      extracted.push(qty);
    }
  }

  return extracted;
}
