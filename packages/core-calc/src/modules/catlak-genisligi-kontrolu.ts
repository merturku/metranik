import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1992-1-1 §7.3.4, eğilme etkisindeki dikdörtgen kirişte hesap çatlak genişliği:
// wk = sr,max × (εsm − εcm).
// Çatlamış elastik kesit: ρ = As/(b·d), x = d·(−αe·ρ + √((αe·ρ)² + 2·αe·ρ)),
// σs = M/(As·(d − x/3)), αe = Es/Ecm, Ecm = 22·(fcm/10)^0,3 GPa, fct,eff = fctm = 0,30·fck^(2/3).
// Etkili çekme alanı: hc,eff = min(2,5·(h − d), (h − x)/3, h/2), ρp,eff = As/(b·hc,eff).
// εsm − εcm = [σs − kt·(fct,eff/ρp,eff)·(1 + αe·ρp,eff)]/Es ≥ 0,6·σs/Es (7.9).
// Çubuk aralığı ≤ 5·(c + φ/2) ise sr,max = k3·c + k1·k2·k4·φ/ρp,eff (7.11), aşarsa
// sr,max = 1,3·(h − x) (7.14). k1 = 0,8 (nervürlü), k2 = 0,5 (eğilme), k3 = 3,4,
// k4 = 0,425 önerilen değerlerdir; ulusal ekten teyit edin.
const CELIK_ELASTISITE_MPA = 200000;
const K1_NERVURLU = 0.8;
const K2_EGILME = 0.5;
const K3 = 3.4;
const K4 = 0.425;
const YUK_SURESI_KT: Record<"kisa" | "uzun", number> = { kisa: 0.6, uzun: 0.4 };

export const catlakGenisligiKontroluInputSchema = z
  .object({
    betonKarakteristikDayanim_fck_MPa: z.number().positive().max(50),
    kesitGenisligi_b_mm: z.number().positive(),
    kesitYuksekligi_h_mm: z.number().positive(),
    faydaliYukseklik_d_mm: z.number().positive(),
    cekmeDonatisiAlani_As_mm2: z.number().positive(),
    cubukCapi_mm: z.number().positive(),
    netPasPayi_c_mm: z.number().positive(),
    cubukAraligi_mm: z.number().positive(),
    yariKaliciMoment_kNm: z.number().positive(),
    yukSuresi: z.enum(["kisa", "uzun"]),
    izinVerilenCatlak_mm: z.number().positive(),
  })
  .refine((v) => v.faydaliYukseklik_d_mm < v.kesitYuksekligi_h_mm, {
    message: "Faydalı yükseklik d, kesit yüksekliği h'den küçük olmalı",
  });

export type CatlakGenisligiKontroluInput = z.infer<typeof catlakGenisligiKontroluInputSchema>;

export interface CatlakGenisligiKontroluOutput {
  catlakGenisligi_mm: number;
}

function compute(input: CatlakGenisligiKontroluInput): CalcResult<CatlakGenisligiKontroluOutput> {
  const fck = input.betonKarakteristikDayanim_fck_MPa;
  const b = input.kesitGenisligi_b_mm;
  const h = input.kesitYuksekligi_h_mm;
  const d = input.faydaliYukseklik_d_mm;
  const as = input.cekmeDonatisiAlani_As_mm2;
  const phi = input.cubukCapi_mm;
  const c = input.netPasPayi_c_mm;

  const ecmMPa = 22 * ((fck + 8) / 10) ** 0.3 * 1000;
  const alfaE = CELIK_ELASTISITE_MPA / ecmMPa;
  const fctEff = 0.3 * fck ** (2 / 3);

  const rho = as / (b * d);
  const x = d * (-alfaE * rho + Math.sqrt((alfaE * rho) ** 2 + 2 * alfaE * rho));
  const sigmaS = (input.yariKaliciMoment_kNm * 1e6) / (as * (d - x / 3));

  const hcEff = Math.min(2.5 * (h - d), (h - x) / 3, h / 2);
  const rhoPEff = as / (b * hcEff);

  const kt = YUK_SURESI_KT[input.yukSuresi];
  const birimDeformasyonFarki = Math.max(
    (sigmaS - kt * (fctEff / rhoPEff) * (1 + alfaE * rhoPEff)) / CELIK_ELASTISITE_MPA,
    (0.6 * sigmaS) / CELIK_ELASTISITE_MPA,
  );

  const aralikSiniri = 5 * (c + phi / 2);
  const srMax =
    input.cubukAraligi_mm <= aralikSiniri
      ? K3 * c + (K1_NERVURLU * K2_EGILME * K4 * phi) / rhoPEff
      : 1.3 * (h - x);
  const wk = srMax * birimDeformasyonFarki;
  const uygun = wk <= input.izinVerilenCatlak_mm;

  return {
    value: { catlakGenisligi_mm: wk },
    intermediates: {
      tarafsiz_eksen_x_mm: x,
      donati_gerilmesi_sigma_s_MPa: sigmaS,
      etkili_cekme_yuksekligi_hc_eff_mm: hcEff,
      etkili_donati_orani_rho_p_eff: rhoPEff,
      birim_deformasyon_farki: birimDeformasyonFarki,
      azami_catlak_araligi_sr_max_mm: srMax,
      modul_orani_alfa_e: alfaE,
    },
    standardsUsed: ["TS EN 1992-1-1"],
    verdict: uygun
      ? {
          status: "uygun",
          note: `wk = ${wk.toFixed(3)} mm ≤ ${input.izinVerilenCatlak_mm} mm.`,
        }
      : {
          status: "uygunsuz",
          note: `wk = ${wk.toFixed(3)} mm > ${input.izinVerilenCatlak_mm} mm: donatıyı artırın veya daha ince çaplı, sık aralıklı çubuk kullanın.`,
        },
  };
}

export const catlakGenisligiKontrolu: CalcModule<CatlakGenisligiKontroluInput, CatlakGenisligiKontroluOutput> = {
  id: "catlak-genisligi-kontrolu",
  title: "Çatlak Genişliği Kontrolü",
  discipline: "insaat",
  standards: ["TS EN 1992-1-1"],
  inputSchema: catlakGenisligiKontroluInputSchema,
  compute,
};
