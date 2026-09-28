import { describe, it, expect } from "vitest";
import { modul_300 } from "./modul_300";
describe("M300", () => { it("T", () => { const r = modul_300.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
