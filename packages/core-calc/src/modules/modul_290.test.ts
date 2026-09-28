import { describe, it, expect } from "vitest";
import { modul_290 } from "./modul_290";
describe("M290", () => { it("T", () => { const r = modul_290.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
