"use client";

import { izinVerilenDokunmaAdimGerilimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IzinVerilenDokunmaAdimGerilimiPage() {
  return (
    <CalcPage
      module={izinVerilenDokunmaAdimGerilimi}
      standardsLabel="IEEE Std 80"
      description="Trafo merkezi ve şalt sahası topraklamasında insan vücudu için izin verilen dokunma ve adım gerilimlerini, yüzeydeki kırma taş/asfalt tabakasının etkisi ve arıza süresiyle hesaplar; toprak potansiyel yükselmesi (GPR) girilirse ayrıntılı göz/adım gerilimi hesabının gerekip gerekmediğini belirtir."
      formula="Cs = 1 − 0,09(1 − ρ/ρs)/(2hs + 0,09),   Edokunma = (1000 + 1,5·Cs·ρs)·k/√ts,   Eadım = (1000 + 6·Cs·ρs)·k/√ts,   k = 0,116 (50 kg) / 0,157 (70 kg)"
      engineeringNote="Sınırlar Dalziel'in fibrilasyon akımı bağıntısına (IB = k/√ts, 0,03–3 s) ve 1000 Ω vücut direncine dayanır. 50 kg kriteri halka açık alanlar ve tutucu tasarım için, 70 kg yalnız erişimi kontrollü işletme alanlarında kullanılır. ts, koruma rölesinin arızayı temizleme süresidir (yedek koruma süresi tutucu tarafta kalır). Yüzey tabakası (tipik 0,08–0,15 m kırma taş; ρs ıslak koşuldaki değer olmalı, ölçülmeli ya da IEEE 80'in yüzey malzemesi tablosundan alınmalı) izin verilen gerilimi büyük ölçüde artırır; tabaka yoksa ρs = ρ veya hs = 0 girin. ρ, Wenner ölçümünden bulunan üst tabaka özdirencidir. Topraklama Izgarası Direnci modülünün verdiği GPR bu sınırın altındaysa tasarım yeterlidir; üstündeyse IEEE 80 göz (mesh) ve adım gerilimi hesabı yapılıp bu değerlerle karşılaştırılmalıdır."
      fields={[
        { key: "zeminOzdirenci_ohmm", label: "Zemin Özdirenci ρ (Ω·m)", type: "number", min: 1, step: 10 },
        { key: "yuzeyTabakasiOzdirenci_ohmm", label: "Yüzey Tabakası Özdirenci ρs (Ω·m)", type: "number", min: 1, step: 100 },
        { key: "yuzeyTabakasiKalinligi_m", label: "Yüzey Tabakası Kalınlığı hs (m)", type: "number", min: 0, step: 0.01 },
        { key: "arizaSuresi_s", label: "Arıza Süresi ts (s)", type: "number", min: 0.03, step: 0.05 },
        {
          key: "vucutAgirligi",
          label: "Vücut Ağırlığı Kriteri",
          type: "select",
          options: [
            { value: "50", label: "50 kg (k = 0,116) — tutucu, halka açık alan" },
            { value: "70", label: "70 kg (k = 0,157) — kontrollü erişimli alan" },
          ],
        },
        { key: "toprakPotansiyelYukselmesi_GPR_V", label: "Toprak Potansiyel Yükselmesi GPR (V, 0 = karşılaştırma yok)", type: "number", min: 0, step: 100 },
      ]}
      defaults={{
        zeminOzdirenci_ohmm: 400,
        yuzeyTabakasiOzdirenci_ohmm: 2500,
        yuzeyTabakasiKalinligi_m: 0.102,
        arizaSuresi_s: 0.5,
        vucutAgirligi: "70",
        toprakPotansiyelYukselmesi_GPR_V: 5304,
      }}
      mainUnit="V (izin verilen dokunma gerilimi)"
      mainValueKey="dokunmaGerilimi_V"
      mainDecimals={0}
      intermediateLabels={{
        yuzey_tabakasi_katsayisi_Cs: "Yüzey Tabakası Azaltma Katsayısı Cs",
        izin_verilen_vucut_akimi_IB_A: "İzin Verilen Vücut Akımı IB (A)",
        adim_gerilimi_V: "İzin Verilen Adım Gerilimi (V)",
        gecerlilik: "Geçerlilik",
      }}
    />
  );
}
