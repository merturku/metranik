import { describe, it, expect } from "vitest";
import { modul_260 } from "./modul_260";

describe("Modül 260", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_260.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
