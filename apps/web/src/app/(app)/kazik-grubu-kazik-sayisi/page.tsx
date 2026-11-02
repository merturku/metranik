"use client";

import { kazikGrubuKazikSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazikGrubuKazikSayisiPage() {
  return (
    <CalcPage
      module={kazikGrubuKazikSayisi}
      standardsLabel="TS EN 1997-1 — kazık tasarımı (ön boyut)"
      description="Kolon yükü ve kazık izin yükünden gerekli kazık adedini, dikdörtgen yerleşimi ve başlık plan boyutunu hesaplar."
      formula="n = ⌈N·(1+f)/Q_izin⌉;   s = 3D;   B = (sütun−1)·s + 2D"
      engineeringNote="Q_izin = Qu/GS olup tekil kazık taşıma kapasitesi Kazık Taşıma Kapasitesi modülünden gelir; grup etkisi için Kazık Grubu Verimliliği modülüne bakın. Aralık 3D (2,5–3D pratiği) ve kazık ekseni–başlık kenarı mesafesi D alınmıştır; kesin değerler yönetmelik ve proje şartnamesiyle doğrulanmalıdır. Eksantrik yük/moment altında kazık yükü ayrıca kontrol edilir."
      fields={[
        { key: "tasarimYuku_kN", label: "Kolon Tasarım Yükü N (kN)", type: "number", min: 1, step: 100 },
        { key: "temelAgirlikPayiYuzde", label: "Başlık / Zemin Ağırlık Payı (%)", type: "number", min: 0, step: 1 },
        { key: "kazikIzinYuku_kN", label: "Kazık İzin Yükü Q_izin (kN)", type: "number", min: 1, step: 50 },
        { key: "kazikCapi_m", label: "Kazık Çapı D (m)", type: "number", min: 0.2, step: 0.05 },
      ]}
      defaults={{ tasarimYuku_kN: 3000, temelAgirlikPayiYuzde: 10, kazikIzinYuku_kN: 800, kazikCapi_m: 0.6 }}
      mainUnit="adet (kazık)"
      mainValueKey="kazikSayisi"
      mainDecimals={0}
      intermediateLabels={{
        toplam_yuk_kN: "Toplam Yük (kN)",
        gerekli_kazik_ham: "Ham Kazık Sayısı",
        yerlesim: "Yerleşim",
        kazik_araligi_m: "Kazık Aralığı (m)",
        baslik_genisligi_m: "Başlık Genişliği B (m)",
        baslik_uzunlugu_m: "Başlık Uzunluğu L (m)",
        kazik_basina_yuk_kN: "Kazık Başına Yük (kN)",
      }}
    />
  );
}
