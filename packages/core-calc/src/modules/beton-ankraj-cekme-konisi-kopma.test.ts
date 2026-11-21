import { describe, it, expect } from "vitest";
import { betonAnkrajCekmeKonisiKopma } from "./beton-ankraj-cekme-konisi-kopma";

describe("Beton Ankraj Çekme Konisi Kopma", () => {
  const g = { hef_mm: 150, fck_MPa: 30, ankrajTipi: "yerinde" as const, betonDurumu: "catlaksiz" as const, kenarMesafe1_mm: 1000, kenarMesafe2_mm: 1000, phi: 0.7, tasarimCekme_Nua_kN: 60 };
  it("hef 150, f'c 30, yerinde dökme, çatlaksız, kenardan uzak: Nb = 100,62 kN, φNcb = 88,05 kN", () => {
    const r = betonAnkrajCekmeKonisiKopma.compute(g);
    expect(r.intermediates.Nb_kN as number).toBeCloseTo(100.623, 3);
    expect(r.intermediates.ANc_ANco as number).toBeCloseTo(1, 10);
    expect(r.value.phiNcb_kN).toBeCloseTo(88.045, 2);
    expect(r.verdict?.status).toBe("uygun"); // 60/88,05 = 0,68
  });
  it("kenar mesafeleri 100 ve 225 mm: ANc/ANco = 0,7222, ψed = 0,8333, φNcb = 52,99 kN", () => {
    const r = betonAnkrajCekmeKonisiKopma.compute({ ...g, kenarMesafe1_mm: 100, kenarMesafe2_mm: 225 });
    expect(r.intermediates.ANc_ANco as number).toBeCloseTo(0.72222, 4);
    expect(r.intermediates.psi_ed as number).toBeCloseTo(0.83333, 4);
    expect(r.value.phiNcb_kN).toBeCloseTo(52.99, 2);
    expect(r.verdict?.status).toBe("uygunsuz"); // 60/52,99 = 1,13
  });
  it("hef 300 mm yerinde dökme: Nb = 3,9·√f'c·hef^(5/3) = 287,18 kN", () => {
    const r = betonAnkrajCekmeKonisiKopma.compute({ ...g, hef_mm: 300 });
    expect(r.intermediates.Nb_kN as number).toBeCloseTo(287.184, 2);
  });
  it("çatlak beton ψc = 1,0 → kapasite çatlaksızın 1/1,25'i", () => {
    const a = betonAnkrajCekmeKonisiKopma.compute(g).value.phiNcb_kN;
    const b = betonAnkrajCekmeKonisiKopma.compute({ ...g, betonDurumu: "catlak" }).value.phiNcb_kN;
    expect(b).toBeCloseTo(a / 1.25, 8);
  });
  it("sonradan montaj kc = 7: Nb = 7/10 × yerinde dökme", () => {
    const a = betonAnkrajCekmeKonisiKopma.compute(g).intermediates.Nb_kN as number;
    const b = betonAnkrajCekmeKonisiKopma.compute({ ...g, ankrajTipi: "sonradan" }).intermediates.Nb_kN as number;
    expect(b).toBeCloseTo(a * 0.7, 8);
  });
});
