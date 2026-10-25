import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güneye bakan, düz zemine eşit yükseklikte dizilmiş panel sıralarında öndeki
// sıranın arkadakine gölge düşürmemesi için gereken sıra aralığı. En kötü gün kış
// gündönümüdür (deklinasyon δ = −23,45°, Cooper). Saat açısı ω için güneş yükseklik
// açısı sin α = sin φ·sin δ + cos φ·cos δ·cos ω, güneyden azimut
// cos γ = (sin α·sin φ − sin δ)/(cos α·cos φ). Panelin üst kenar yüksekliği
// h = L·sin β; gölgenin kuzey-güney bileşeni h·cos γ / tan α; sıra aralığı
// (eksenden eksene) = L·cos β + h·cos γ / tan α.
const KIS_GUNDONUMU_DEKLINASYON_DERECE = -23.45;
const SAAT_ACISI_DERECE: Record<"12" | "10-14" | "09-15", number> = {
  "12": 0,
  "10-14": 30,
  "09-15": 45,
};

const radyan = (derece: number) => (derece * Math.PI) / 180;
const derece = (radyanDeger: number) => (radyanDeger * 180) / Math.PI;

export const gesPanelSiraArasiMesafeInputSchema = z.object({
  panelEgikUzunlugu_L_m: z.number().positive(),
  egimAcisi_beta_derece: z.number().min(0).max(90),
  enlem_derece: z.number().min(0).max(55),
  golgesizSaatAraligi: z.enum(["12", "10-14", "09-15"]),
});

export type GesPanelSiraArasiMesafeInput = z.infer<typeof gesPanelSiraArasiMesafeInputSchema>;

export interface GesPanelSiraArasiMesafeOutput {
  siraAraligi_m: number;
}

function compute(input: GesPanelSiraArasiMesafeInput): CalcResult<GesPanelSiraArasiMesafeOutput> {
  const phi = radyan(input.enlem_derece);
  const delta = radyan(KIS_GUNDONUMU_DEKLINASYON_DERECE);
  const omega = radyan(SAAT_ACISI_DERECE[input.golgesizSaatAraligi]);
  const beta = radyan(input.egimAcisi_beta_derece);

  const sinAlfa = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.cos(omega);
  const alfa = Math.asin(sinAlfa);
  const cosGama = Math.min(
    1,
    (sinAlfa * Math.sin(phi) - Math.sin(delta)) / (Math.cos(alfa) * Math.cos(phi)),
  );

  const panelYuksekligiM = input.panelEgikUzunlugu_L_m * Math.sin(beta);
  const izdusumM = input.panelEgikUzunlugu_L_m * Math.cos(beta);
  const golgeBoyuM = (panelYuksekligiM * cosGama) / Math.tan(alfa);
  const siraAraligiM = izdusumM + golgeBoyuM;

  return {
    value: { siraAraligi_m: siraAraligiM },
    intermediates: {
      gunes_yukseklik_acisi_derece: derece(alfa),
      gunes_azimutu_guneyden_derece: derece(Math.acos(cosGama)),
      panel_ust_kenar_yuksekligi_m: panelYuksekligiM,
      panel_yatay_izdusumu_m: izdusumM,
      siralar_arasi_bosluk_m: golgeBoyuM,
      zemin_kaplama_orani: input.panelEgikUzunlugu_L_m / siraAraligiM,
    },
    standardsUsed: [],
  };
}

export const gesPanelSiraArasiMesafe: CalcModule<GesPanelSiraArasiMesafeInput, GesPanelSiraArasiMesafeOutput> = {
  id: "ges-panel-sira-arasi-mesafe",
  title: "GES Panel Sıra Arası Mesafe (Gölgelenme)",
  discipline: "ev",
  standards: [],
  inputSchema: gesPanelSiraArasiMesafeInputSchema,
  compute,
};
