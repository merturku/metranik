"use client";

import { kazikYatayYukBromsKisa } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazikYatayYukBromsKisaPage() {
  return (
    <CalcPage
      module={kazikYatayYukBromsKisa}
      standardsLabel={"Broms (1964)"}
      description={"Kohezyonsuz zeminde serbest başlı kısa kazığın sınır yatay yük kapasitesini, sıfır kesme derinliğini ve maksimum momentini Broms yöntemiyle hesaplar; verilen tasarım yatay yüküyle karşılaştırır."}
      formula={"Kp = tan²(45°+φ/2);  p = 3·Kp·γ·D·z;  Hu = 0,5·Kp·γ·D·L³/(e+L);  f = √(Hu/(1,5·Kp·γ·D));  Mmaks = Hu·(e + 2f/3)"}
      engineeringNote={"Yalnız kısa (rijit) kazık davranışı için geçerlidir; f > L çıkarsa kazık kısa değildir ve plastik mafsal (uzun kazık) kontrolü gerekir. Zemin tepkisi 3KpγDz kabulü kohezyonsuz zemin ve yeraltı suyu üstü içindir; suyun altında γ' kullanın. Yük altında yatay deformasyon (kullanılabilirlik) bu modülde kontrol edilmez. Grup etkisi ve kazık başı kısıtı dikkate alınmaz."}
      fields={[
        { key: "capD_m", label: "Kazık Çapı D (m)", type: "number", step: 0.05, min: 0.05 },
        { key: "boyL_m", label: "Gömülü Boy L (m)", type: "number", step: 0.5, min: 0.5 },
        { key: "yukYuksekligiE_m", label: "Yatay Yük Yüksekliği e (zemin üstü, m)", type: "number", step: 0.1, min: 0 },
        { key: "zeminBirimHacimAgirligi_kNm3", label: "Zemin Birim Hacim Ağırlığı γ (kN/m³)", type: "number", step: 1, min: 1 },
        { key: "icSurtunmeAcisi_derece", label: "İç Sürtünme Açısı φ (°)", type: "number", step: 1, min: 15 },
        { key: "guvenlikSayisi", label: "Güvenlik Sayısı FS", type: "number", step: 0.1, min: 1 },
        { key: "tasarimYatayYuk_kN", label: "Tasarım Yatay Yükü (kN)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ capD_m: 0.5, boyL_m: 4, yukYuksekligiE_m: 0.5, zeminBirimHacimAgirligi_kNm3: 18, icSurtunmeAcisi_derece: 30, guvenlikSayisi: 2.5, tasarimYatayYuk_kN: 60 }}
      mainUnit={"kN"}
      mainValueKey={"sinirYatayYuk_kN"}
      mainDecimals={1}
      intermediateLabels={{
        Kp_pasif_katsayi: "Pasif Toprak Basıncı Katsayısı Kp",
        izin_yatay_yuk_kN: "İzin Verilen Yatay Yük (kN)",
        sifir_kesme_derinligi_f_m: "Sıfır Kesme Derinliği f (m)",
        maks_moment_kNm: "Maksimum Moment (kNm)",
        kullanim_orani: "Kullanım Oranı",
        uyari: "Uyarı",
      }}
    />
  );
}
