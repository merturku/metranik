import { describe, it, expect } from "vitest";
import { modul_306 } from "./modul_306";

describe("Modül 306", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_306.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
