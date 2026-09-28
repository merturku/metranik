import { describe, it, expect } from "vitest";
import { modul_266 } from "./modul_266";

describe("Modül 266", () => {
  it("Test: 10 → 15", () => {
    const r = modul_266.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
