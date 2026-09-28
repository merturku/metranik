import { describe, it, expect } from "vitest";
import { modul_314 } from "./modul_314";

describe("Modül 314", () => {
  it("Test: 10 → 15", () => {
    const r = modul_314.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
