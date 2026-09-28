import { describe, it, expect } from "vitest";
import { modul_246 } from "./modul_246";

describe("Modül 246", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_246.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
