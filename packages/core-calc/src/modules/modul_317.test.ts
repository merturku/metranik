import { describe, it, expect } from "vitest";
import { modul_317 } from "./modul_317";
describe("M317", () => { it("T", () => { const r = modul_317.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
