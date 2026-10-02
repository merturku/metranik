/**
 * IFC parsing and metraj extraction types
 */

export interface IfcEntity {
  id: number;
  type: string;
  name: string;
  properties: Record<string, unknown>;
}

export interface ExtractedQuantity {
  entityId: number;
  entityType: string;
  entityName: string;
  quantities: {
    type: string;
    value: number;
    unit: string;
    source: "ifc" | "calculated" | "default";
  }[];
}

export interface MappedInput {
  moduleId: string;
  inputs: Record<string, number | string>;
  confidence: "high" | "medium" | "low";
  warning?: string;
}

export interface IfcParseResult {
  fileName: string;
  entities: IfcEntity[];
  extracted: ExtractedQuantity[];
  parseTime: number;
}
