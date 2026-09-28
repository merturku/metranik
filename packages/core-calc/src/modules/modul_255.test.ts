import { describe, it, expect } from "vitest";
import { modul_255 } from "./modul_255";

describe("Modül 255", () => {
  it("Test: 10 → 15", () => {
    const r = modul_255.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
