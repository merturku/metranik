import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çift donatılı dikdörtgen kirişin eğilme moment kapasitesi (TS 500 §7.1, eşdeğer dikdörtgen gerilme bloğu):
// Denge: 0,85·fcd·b·k1·c + As'·σs' = As·σs,  σs' = Es·εcu·(c − d')/c ≤ fyd,  σs = Es·εcu·(d − c)/c ≤ fyd
// Mr = 0,85·fcd·b·k1·c·(d − k1·c/2) + As'·σs'·(d − d')
// εcu = 0,003, Es = 200 000 MPa, fcd = fck/1,5, fyd = fyk/1,15, k1 = 0,85 − 0,006·(fck − 25) (0,70–0,85).
// Süneklik (TS 500 §7.3): ρ ≤ 0,02 ve ρ − ρ' ≤ 0,85·ρb, ρb = 0,85·k1·(fcd/fyd)·600/(600 + fyd).
// Basınç donatısının yer değiştirdiği beton ihmal edilir.
const ES = 200000;
const ECU = 0.003;

export const ciftDonatiliKirisMomentKapasitesiInputSchema = z
  .object({
    betonKarakteristikDayanim_fck_MPa: z.number().positive(),
    celikAkmaDayanimi_fyk_MPa: z.number().positive(),
    genislik_b_mm: z.number().positive(),
    faydaliYukseklik_d_mm: z.number().positive(),
    basincDonatisiPasPayi_dp_mm: z.number().positive(),
    cekmeDonatisiAlani_As_mm2: z.number().positive(),
    basincDonatisiAlani_Asp_mm2: z.number().min(0),
    tasarimMomenti_Md_kNm: z.number().min(0),
  })
  .refine((v) => v.basincDonatisiPasPayi_dp_mm < v.faydaliYukseklik_d_mm / 2, {
    message: "Basınç donatısı ağırlık merkezi (d') kesitin üst yarısında olmalı",
  });

export type CiftDonatiliKirisMomentKapasitesiInput = z.infer<typeof ciftDonatiliKirisMomentKapasitesiInputSchema>;

export interface CiftDonatiliKirisMomentKapasitesiOutput {
  momentKapasitesi_Mr_kNm: number;
}

function compute(input: CiftDonatiliKirisMomentKapasitesiInput): CalcResult<CiftDonatiliKirisMomentKapasitesiOutput> {
  const fck = input.betonKarakteristikDayanim_fck_MPa;
  const fcd = fck / 1.5;
  const fyd = input.celikAkmaDayanimi_fyk_MPa / 1.15;
  const k1 = Math.min(0.85, Math.max(0.7, 0.85 - 0.006 * (fck - 25)));
  const b = input.genislik_b_mm;
  const d = input.faydaliYukseklik_d_mm;
  const dp = input.basincDonatisiPasPayi_dp_mm;
  const As = input.cekmeDonatisiAlani_As_mm2;
  const Asp = input.basincDonatisiAlani_Asp_mm2;

  const sigmaBasinc = (c: number) => Math.max(-fyd, Math.min(fyd, (ES * ECU * (c - dp)) / c));
  const sigmaCekme = (c: number) => Math.min(fyd, (ES * ECU * (d - c)) / c);
  const kuvvetFarki = (c: number) => 0.85 * fcd * b * k1 * c + Asp * sigmaBasinc(c) - As * sigmaCekme(c);

  // Kuvvet farkı c ile monoton artar: tarafsız eksen ikiye bölmeyle bulunur.
  let alt = 1e-6;
  let ust = d;
  for (let i = 0; i < 200; i++) {
    const orta = (alt + ust) / 2;
    if (kuvvetFarki(orta) < 0) alt = orta;
    else ust = orta;
  }
  const c = (alt + ust) / 2;
  const sigmaS = sigmaCekme(c);
  const sigmaSp = sigmaBasinc(c);
  const epsS = (ECU * (d - c)) / c;
  const epsSp = (ECU * (c - dp)) / c;
  const epsYd = fyd / ES;

  const mr = (0.85 * fcd * b * k1 * c * (d - (k1 * c) / 2) + Asp * sigmaSp * (d - dp)) / 1e6;
  const rho = As / (b * d);
  const rhoP = Asp / (b * d);
  const rhoB = 0.85 * k1 * (fcd / fyd) * (600 / (600 + fyd));
  const sinir = 0.85 * rhoB;

  let verdict: CalcResult<CiftDonatiliKirisMomentKapasitesiOutput>["verdict"];
  if (rho > 0.02) {
    verdict = { status: "uygunsuz", note: `ρ = ${rho.toFixed(4)} > 0,02 (TS 500 üst sınırı): kesiti büyütün.` };
  } else if (rho - rhoP > sinir) {
    verdict = {
      status: "uygunsuz",
      note: `ρ − ρ' = ${(rho - rhoP).toFixed(4)} > 0,85·ρb = ${sinir.toFixed(4)}: gevrek kırılma riski, basınç donatısını artırın.`,
    };
  } else if (epsS < epsYd) {
    verdict = { status: "uygunsuz", note: `Çekme donatısı akmıyor (εs = ${epsS.toFixed(5)} < εyd = ${epsYd.toFixed(5)}).` };
  } else if (mr < input.tasarimMomenti_Md_kNm) {
    verdict = {
      status: "uygunsuz",
      note: `Mr = ${mr.toFixed(1)} kNm < Md = ${input.tasarimMomenti_Md_kNm} kNm: donatıyı veya kesiti artırın.`,
    };
  } else {
    verdict = {
      status: "uygun",
      note: `Mr = ${mr.toFixed(1)} kNm ≥ Md = ${input.tasarimMomenti_Md_kNm} kNm; ρ − ρ' = ${(rho - rhoP).toFixed(4)} ≤ ${sinir.toFixed(4)}.${sigmaSp < fyd ? ` Basınç donatısı akmıyor (σs' = ${sigmaSp.toFixed(0)} MPa).` : ""}`,
    };
  }

  return {
    value: { momentKapasitesi_Mr_kNm: mr },
    intermediates: {
      k1,
      tasarim_beton_dayanimi_fcd_MPa: fcd,
      tasarim_celik_dayanimi_fyd_MPa: fyd,
      tarafsiz_eksen_c_mm: c,
      basinc_blogu_derinligi_a_mm: k1 * c,
      cekme_donatisi_gerilmesi_MPa: sigmaS,
      basinc_donatisi_gerilmesi_MPa: sigmaSp,
      cekme_donatisi_birim_sekil_degistirme: epsS,
      basinc_donatisi_birim_sekil_degistirme: epsSp,
      cekme_donatisi_orani_rho: rho,
      basinc_donatisi_orani_rhop: rhoP,
      dengeli_donati_orani_rhob: rhoB,
      siniri_085_rhob: sinir,
    },
    standardsUsed: ["TS 500"],
    verdict,
  };
}

export const ciftDonatiliKirisMomentKapasitesi: CalcModule<
  CiftDonatiliKirisMomentKapasitesiInput,
  CiftDonatiliKirisMomentKapasitesiOutput
> = {
  id: "cift-donatili-kiris-moment-kapasitesi",
  title: "Çift Donatılı Kiriş Moment Kapasitesi",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: ciftDonatiliKirisMomentKapasitesiInputSchema,
  compute,
};
