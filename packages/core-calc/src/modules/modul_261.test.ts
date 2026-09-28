import { describe, it, expect } from "vitest";
import { modul_261 } from "./modul_261";
describe("M261", () => { it("T", () => { const r = modul_261.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
