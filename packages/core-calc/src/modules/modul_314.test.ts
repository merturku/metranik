import { describe, it, expect } from "vitest";
import { modul_314 } from "./modul_314";

describe("Modül 314", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_314.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
