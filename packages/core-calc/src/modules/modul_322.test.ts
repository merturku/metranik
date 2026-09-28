import { describe, it, expect } from "vitest";
import { modul_322 } from "./modul_322";

describe("Modül 322", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_322.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
