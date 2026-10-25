"use client";

import { ahsapKirisEgilmeKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AhsapKirisEgilmeKontroluPage() {
  return (
    <CalcPage
      module={ahsapKirisEgilmeKontrolu}
      standardsLabel="TS EN 1995-1-1"
      description="Dikdörtgen kesitli masif ahşap kirişin (çatı makası, aşık, döşeme kirişi) tasarım eğilme gerilmesini, dayanım sınıfı, yük süresi ve servis sınıfına göre hesaplanan tasarım eğilme dayanımıyla karşılaştırır."
      formula="σm,d = MEd / (b·h²/6),   fm,d = kmod·kh·fm,k / γM,   kh = min((150/h)^0,2; 1,3) (h < 150 mm)"
      engineeringNote="Yük süresi sınıfı: kalıcı (öz ağırlık), uzun (depolama), orta (kullanım yükü), kısa (kar, rüzgar*), ani (kaza, rüzgar*); yük kombinasyonunda en kısa süreli yükün sınıfı kullanılır (*ulusal eke göre). Servis sınıfı 1: ısıtılan iç mekân, 2: korunaklı dış (çatı arası), 3: açık hava. Ahşap kiriş tasarımında çoğu zaman sehim (sünme etkisiyle) belirleyicidir; kayma, mesnet ezilmesi ve yanal burulma ayrıca kontrol edilmelidir. Dayanım sınıfı ahşabın üzerindeki damgadan veya tedarikçi belgesinden alınmalıdır."
      fields={[
        {
          key: "dayanimSinifi",
          label: "Dayanım Sınıfı",
          type: "select",
          options: [
            { value: "C16", label: "C16 (fm,k 16 MPa)" },
            { value: "C24", label: "C24 (fm,k 24 MPa)" },
            { value: "C30", label: "C30 (fm,k 30 MPa)" },
          ],
        },
        { key: "genislik_b_mm", label: "Kesit Genişliği b (mm)", type: "number", min: 10, step: 10 },
        { key: "yukseklik_h_mm", label: "Kesit Yüksekliği h (mm)", type: "number", min: 10, step: 10 },
        { key: "tasarimMomenti_MEd_kNm", label: "Tasarım Momenti MEd (kNm)", type: "number", min: 0, step: 0.5 },
        {
          key: "yukSuresi",
          label: "Yük Süresi Sınıfı",
          type: "select",
          options: [
            { value: "kalici", label: "Kalıcı (> 10 yıl)" },
            { value: "uzun", label: "Uzun süreli (6 ay – 10 yıl)" },
            { value: "orta", label: "Orta süreli (1 hafta – 6 ay)" },
            { value: "kisa", label: "Kısa süreli (< 1 hafta)" },
            { value: "ani", label: "Ani" },
          ],
        },
        {
          key: "servisSinifi",
          label: "Servis Sınıfı",
          type: "select",
          options: [
            { value: "1-2", label: "1–2 (iç mekân / korunaklı)" },
            { value: "3", label: "3 (açık hava)" },
          ],
        },
        { key: "gammaM", label: "Malzeme Katsayısı γM", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        dayanimSinifi: "C24",
        genislik_b_mm: 100,
        yukseklik_h_mm: 200,
        tasarimMomenti_MEd_kNm: 6,
        yukSuresi: "orta",
        servisSinifi: "1-2",
        gammaM: 1.3,
      }}
      mainUnit="MPa (σm,d)"
      mainValueKey="egilmeGerilmesi_MPa"
      mainDecimals={2}
      intermediateLabels={{
        karakteristik_egilme_dayanimi_fmk_MPa: "Karakteristik Eğilme Dayanımı fm,k (MPa)",
        kmod: "Değiştirme Katsayısı kmod",
        boyut_katsayisi_kh: "Boyut Katsayısı kh",
        tasarim_egilme_dayanimi_fmd_MPa: "Tasarım Eğilme Dayanımı fm,d (MPa)",
        mukavemet_momenti_W_cm3: "Mukavemet Momenti W (cm³)",
        kullanim_orani: "Kullanım Oranı σm,d/fm,d",
        gerekli_yukseklik_kh1_mm: "Gereken Yükseklik, kh = 1 (mm)",
      }}
    />
  );
}
