import { describe, it, expect } from "vitest";
import { modul_256 } from "./modul_256";
describe("M256", () => { it("T", () => { const r = modul_256.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
