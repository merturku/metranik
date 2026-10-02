/**
 * IFC file parser using web-ifc library
 */

import * as WebIFC from "web-ifc";
import type { IfcEntity } from "./types";

let ifcApi: WebIFC.IfcAPI | null = null;

export async function initIfcApi(): Promise<WebIFC.IfcAPI> {
  if (ifcApi) return ifcApi;

  ifcApi = new WebIFC.IfcAPI();
  await ifcApi.Init();
  return ifcApi;
}

export async function parseIfc(file: File): Promise<WebIFC.IFCModel> {
  const api = await initIfcApi();
  const arrayBuffer = await file.arrayBuffer();
  const model = await api.OpenIfc(new Uint8Array(arrayBuffer));
  return model;
}

export async function getIfcEntitiesByType(
  model: WebIFC.IFCModel,
  type: string
): Promise<IfcEntity[]> {
  const api = await initIfcApi();
  const entities: IfcEntity[] = [];

  try {
    const subset = api.GetLineIDsWithType(model.modelID, getIfcTypeCode(type));

    for (const lineId of subset) {
      const entity = await api.GetLine(model.modelID, lineId);

      if (entity && typeof entity === "object") {
        entities.push({
          id: lineId,
          type,
          name: (entity as any).Name?.value || `${type}_${lineId}`,
          properties: entity as Record<string, unknown>,
        });
      }
    }
  } catch (error) {
    console.warn(`Failed to extract ${type}:`, error);
  }

  return entities;
}

function getIfcTypeCode(type: string): number {
  const typeMap: Record<string, number> = {
    IFCPIPE: 106,
    IFCDUCT: 106,
    IFCCABLE: 106,
    IFCEQUIPMENT: 87,
    IFCBEAM: 51,
    IFCCOLUMN: 78,
    IFCDOOR: 83,
    IFCWALL: 242,
  };

  return typeMap[type.toUpperCase()] || 0;
}

export function closeIfc(modelID: number): void {
  if (ifcApi) {
    try {
      ifcApi.CloseModel(modelID);
    } catch (error) {
      console.warn("Failed to close IFC model:", error);
    }
  }
}
