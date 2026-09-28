import { describe, it, expect } from "vitest";
import { modul_269 } from "./modul_269";

describe("Modül 269", () => {
  it("Test: 10 → 15", () => {
    const r = modul_269.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
