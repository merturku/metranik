import { describe, it, expect } from "vitest";
import { modul_270 } from "./modul_270";
describe("M270", () => { it("T", () => { const r = modul_270.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
