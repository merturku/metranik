import { describe, it, expect } from "vitest";
import { modul_243 } from "./modul_243";

describe("Modül 243", () => {
  it("Test: 10 → 15", () => {
    const r = modul_243.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
