import { describe, it, expect } from "vitest";
import { modul_323 } from "./modul_323";
describe("M323", () => { it("T", () => { const r = modul_323.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
