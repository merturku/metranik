import { describe, it, expect } from "vitest";
import { modul_253 } from "./modul_253";
describe("M253", () => { it("T", () => { const r = modul_253.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
