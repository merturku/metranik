import { describe, it, expect } from "vitest";
import { modul_302 } from "./modul_302";
describe("M302", () => { it("T", () => { const r = modul_302.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
