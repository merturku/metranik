import { describe, it, expect } from "vitest";
import * as coreCalc from "../../core-calc/src/index";
import { ESLEME_KURALLARI } from "./mapper";

interface Modul { id: string; inputSchema: { shape?: Record<string, unknown>; _def?: { schema?: { shape?: Record<string, unknown> } } } }
const moduller = new Map(
  Object.values(coreCalc)
    .filter((v): v is Modul => typeof v === "object" && v !== null && "id" in v && "compute" in v)
    .map((m) => [m.id, m]),
);

describe("IFC eşleme kuralları gerçek modül şemalarıyla uyumlu", () => {
  it("her kural var olan bir modüle ve o modülün gerçek girdi anahtarlarına işaret eder", () => {
    expect(ESLEME_KURALLARI.length).toBeGreaterThan(0);
    for (const k of ESLEME_KURALLARI) {
      const m = moduller.get(k.moduleId);
      expect(m, k.moduleId).toBeDefined();
      const shape = (m!.inputSchema.shape ?? m!.inputSchema._def?.schema?.shape) as Record<string, unknown>;
      expect(shape, `${k.moduleId} şeması`).toBeDefined();
      for (const a of k.anahtarlar) expect(Object.keys(shape), `${k.moduleId}.${a}`).toContain(a);
    }
  });
});
