import { describe, it, expect } from "vitest";
import { modul_293 } from "./modul_293";
describe("M293", () => { it("T", () => { const r = modul_293.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
