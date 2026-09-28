import { describe, it, expect } from "vitest";
import { modul_271 } from "./modul_271";

describe("Modül 271", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_271.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
