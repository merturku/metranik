import { describe, it, expect } from "vitest";
import * as coreCalc from "../../core-calc/src/index";
import { getMappedModulesForEntity, mapToModules } from "./mapper";
import type { ExtractedQuantity } from "./types";

const motorIdleri = new Set(
  Object.values(coreCalc)
    .filter((v): v is { id: string; compute: unknown } =>
      typeof v === "object" && v !== null && "id" in v && "compute" in v,
    )
    .map((m) => m.id),
);

function miktar(entityType: string, quantities: ExtractedQuantity["quantities"]): ExtractedQuantity {
  return { entityId: 1, entityType, entityName: "test", quantities };
}

describe("IFC → modül eşleme", () => {
  it("her eşleme kuralı core-calc'te var olan bir modüle işaret eder", () => {
    const kurallar = ["IFCPIPE", "IFCDUCT", "IFCCABLE", "IFCEQUIPMENT"].flatMap(getMappedModulesForEntity);
    expect(kurallar.length).toBeGreaterThan(0);
    for (const k of kurallar) {
      expect(motorIdleri, k.moduleId).toContain(k.moduleId);
    }
  });

  it("boru uzunluğu ve çapı IFC'den Boru Basınç Kaybı'na aktarılır", () => {
    const [eslesme] = mapToModules([
      miktar("IFCPIPE", [
        { type: "length", value: 12, unit: "m", source: "ifc" },
        { type: "diameter", value: 50, unit: "mm", source: "ifc" },
      ]),
    ]);
    expect(eslesme?.moduleId).toBe("boru-basinc-kaybi");
    expect(eslesme?.inputs.uzunluk_m).toBe(12);
    expect(eslesme?.inputs.cap_mm).toBe(50);
  });

  it("kablo için yalnız IFC'den okunan uzunluk aktarılır, akım tahmin edilmez", () => {
    const [eslesme] = mapToModules([
      miktar("IFCCABLE", [
        { type: "length", value: 40, unit: "m", source: "ifc" },
        { type: "diameter", value: 20, unit: "mm", source: "ifc" },
      ]),
    ]);
    expect(eslesme?.inputs).toEqual({ uzunluk_m: 40 });
  });

  it("ekipman gücü Motor Anma Akımı'nın mil gücü girdisine aktarılır", () => {
    const [eslesme] = mapToModules([miktar("IFCEQUIPMENT", [{ type: "power", value: 7.5, unit: "kW", source: "ifc" }])]);
    expect(eslesme?.moduleId).toBe("motor-anma-akimi");
    expect(eslesme?.inputs).toEqual({ milGucu_kW: 7.5 });
  });
});
