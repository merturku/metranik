import { describe, it, expect } from "vitest";
import { modul_266 } from "./modul_266";
describe("M266", () => { it("T", () => { const r = modul_266.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
