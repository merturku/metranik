import { describe, it, expect } from "vitest";
import { modul_244 } from "./modul_244";

describe("Modül 244", () => {
  it("Test: 10 → 15", () => {
    const r = modul_244.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
