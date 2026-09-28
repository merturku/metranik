import { describe, it, expect } from "vitest";
import { modul_245 } from "./modul_245";

describe("Modül 245", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_245.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
