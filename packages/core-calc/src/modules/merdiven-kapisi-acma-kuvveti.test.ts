import { describe, it, expect } from "vitest";
import { merdivenKapisiAcmaKuvveti } from "./merdiven-kapisi-acma-kuvveti";

describe("Merdiven Kapısı Açma Kuvveti", () => {
  const o = { kapiKapaticiKuvveti_N: 40, kapiGenisligi_m: 0.9, kapiYuksekligi_m: 2.1, basincFarki_Pa: 50, tutamakMesafesi_m: 0.1, azamiKuvvet_N: 133 };
  it("W 0,9, A 1,89 m², ΔP 50 Pa: F = 40 + 0,9·1,89·50/(2·0,8) = 93,16 N → uygun", () => {
    const r = merdivenKapisiAcmaKuvveti.compute(o);
    expect(r.intermediates.basinc_kuvveti_N as number).toBeCloseTo(53.156, 2);
    expect(r.value.acmaKuvveti_N).toBeCloseTo(93.156, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("ΔP 80 Pa: 40 + 85,05 = 125 N uygun; 100 Pa: 146 N > 133 N uygunsuz", () => {
    expect(merdivenKapisiAcmaKuvveti.compute({ ...o, basincFarki_Pa: 80 }).verdict?.status).toBe("uygun");
    expect(merdivenKapisiAcmaKuvveti.compute({ ...o, basincFarki_Pa: 100 }).verdict?.status).toBe("uygunsuz");
  });
  it("izin verilen azami ΔP: bu basınçta kuvvet tam 133 N olur", () => {
    const dp = merdivenKapisiAcmaKuvveti.compute(o).intermediates.izin_verilen_azami_basinc_farki_Pa as number;
    expect(merdivenKapisiAcmaKuvveti.compute({ ...o, basincFarki_Pa: dp }).value.acmaKuvveti_N).toBeCloseTo(133, 6);
  });
});
