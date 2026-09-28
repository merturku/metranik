import { describe, it, expect } from "vitest";
import { modul_320 } from "./modul_320";

describe("Modül 320", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_320.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
