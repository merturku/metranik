import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-4-41 §411.4.4, TN sistemde otomatik açma koşulu: Zs × Ia ≤ U0.
// Minyatür devre kesicide Ia, ani (manyetik) açma bölgesinin üst sınırıdır
// (IEC 60898-1: B 5·In, C 10·In, D 20·In); bu akımda açma süresi Tablo 41.1'deki
// 0,4 s'nin çok altındadır. Ölçüm ortam sıcaklığında yapıldığı için arıza anında
// ısınan iletkenin direnç artışını karşılamak üzere ölçülen Zs, bir katsayıyla
// küçültülmüş sınırla karşılaştırılır (yaygın uygulama 0,8; tutucu yaklaşım 2/3).
// Sigortalı devrelerde Ia, sigortanın zaman-akım eğrisinden alınmalıdır.
const ANI_ACMA_KATI: Record<"B" | "C" | "D", number> = { B: 5, C: 10, D: 20 };

export const hataCevrimEmpedansiKontroluInputSchema = z.object({
  fazNotrGerilimi_U0_V: z.number().positive(),
  kesiciAnmaAkimi_In_A: z.number().positive(),
  acmaEgrisi: z.enum(["B", "C", "D"]),
  olculenCevrimEmpedansi_Zs_ohm: z.number().positive(),
  sicaklikKatsayisi: z.number().positive().max(1),
});

export type HataCevrimEmpedansiKontroluInput = z.infer<typeof hataCevrimEmpedansiKontroluInputSchema>;

export interface HataCevrimEmpedansiKontroluOutput {
  maksimumCevrimEmpedansi_ohm: number;
}

function compute(input: HataCevrimEmpedansiKontroluInput): CalcResult<HataCevrimEmpedansiKontroluOutput> {
  const acmaAkimiA = ANI_ACMA_KATI[input.acmaEgrisi] * input.kesiciAnmaAkimi_In_A;
  const maksZs = input.fazNotrGerilimi_U0_V / acmaAkimiA;
  const olcumSiniri = maksZs * input.sicaklikKatsayisi;
  const zs = input.olculenCevrimEmpedansi_Zs_ohm;
  const arizaAkimiA = input.fazNotrGerilimi_U0_V / zs;

  const verdict: CalcResult<HataCevrimEmpedansiKontroluOutput>["verdict"] =
    zs <= olcumSiniri
      ? {
          status: "uygun",
          note: `Zs = ${zs} Ω ≤ ${olcumSiniri.toFixed(3)} Ω (sıcaklık katsayılı sınır): arıza akımı ${arizaAkimiA.toFixed(0)} A ≥ Ia = ${acmaAkimiA} A.`,
        }
      : zs <= maksZs
        ? {
            status: "sinirda",
            note: `Zs = ${zs} Ω, U0/Ia = ${maksZs.toFixed(3)} Ω sınırının altında ama sıcaklık payını karşılamıyor; iletken ısındığında açma garanti değil.`,
          }
        : {
            status: "uygunsuz",
            note: `Zs = ${zs} Ω > ${maksZs.toFixed(3)} Ω: arıza akımı ${arizaAkimiA.toFixed(0)} A < Ia = ${acmaAkimiA} A, kesici 0,4 s içinde açmaz. Kesit artırın, eğri/anma akımı düşürün veya RCD ekleyin.`,
          };

  return {
    value: { maksimumCevrimEmpedansi_ohm: maksZs },
    intermediates: {
      ani_acma_akimi_Ia_A: acmaAkimiA,
      sicaklik_katsayili_sinir_ohm: olcumSiniri,
      beklenen_ariza_akimi_A: arizaAkimiA,
    },
    standardsUsed: ["IEC 60364-4-41", "IEC 60898-1"],
    verdict,
  };
}

export const hataCevrimEmpedansiKontrolu: CalcModule<
  HataCevrimEmpedansiKontroluInput,
  HataCevrimEmpedansiKontroluOutput
> = {
  id: "hata-cevrim-empedansi-kontrolu",
  title: "Hata Çevrim Empedansı (Zs) Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60364-4-41", "IEC 60898-1"],
  inputSchema: hataCevrimEmpedansiKontroluInputSchema,
  compute,
};
