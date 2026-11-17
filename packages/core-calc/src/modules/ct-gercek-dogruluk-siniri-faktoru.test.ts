import { describe, it, expect } from "vitest";
import { ctGercekDogrulukSiniriFaktoru } from "./ct-gercek-dogruluk-siniri-faktoru";

const g = { alf: 10, sn_VA: 15, sb_VA: 5, in_A: 5, rct_ohm: 0.5, gerekliSinir: 12 };

describe("CT Gerçek ALF", () => {
  it("5P10, 15 VA, Sb 5 VA, 5 A, Rct 0,5 Ω: Sin 12,5 VA; ALF′ = 10·27,5/17,5 = 15,714", () => {
    const r = ctGercekDogrulukSiniriFaktoru.compute(g);
    expect(r.intermediates.sin_VA as number).toBeCloseTo(12.5, 10);
    expect(r.value.alfGercek).toBeCloseTo(15.7143, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("Sb = Sn → ALF′ = ALF; gerekli 15,0 → sınırda; gerekli 20 → uygunsuz", () => {
    expect(ctGercekDogrulukSiniriFaktoru.compute({ ...g, sb_VA: 15 }).value.alfGercek).toBeCloseTo(10, 10);
    expect(ctGercekDogrulukSiniriFaktoru.compute({ ...g, gerekliSinir: 15 }).verdict?.status).toBe("sinirda");
    expect(ctGercekDogrulukSiniriFaktoru.compute({ ...g, gerekliSinir: 20 }).verdict?.status).toBe("uygunsuz");
  });
});
