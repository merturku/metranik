import { describe, it, expect } from "vitest";
import { modul_280 } from "./modul_280";

describe("Modül 280", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_280.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
