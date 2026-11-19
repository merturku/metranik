"use client";

import { konutNemDengesiHavalandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KonutNemDengesiHavalandirmaPage() {
  return (
    <CalcPage
      module={konutNemDengesiHavalandirma}
      standardsLabel={"Nem kütle dengesi (TS EN ISO 13788 psikrometrik bağıntılar)"}
      description={"Konutta üretilen günlük nem miktarını iç ve dış havanın mutlak nem farkına bölerek iç bağıl nemi hedefte tutmak için gereken havalandırma debisini ve hava değişim sayısını hesaplar."}
      formula={"x = 622·pv/(P − pv),  pv = φ·pws (Magnus);  V̇ = G / (ρ·(xi − xe))"}
      engineeringNote={"Nem üretimi pişirme, duş, çamaşır ve solunumdan gelir; dört kişilik konutta günlük birkaç kg ile on kg mertebesindedir, gerçek değer yaşam biçimine göre değişir (kullanıcı girdisi). Dış havanın mutlak nemi iç hedefin üstündeyse (yaz yağışlı/nemli günler) havalandırma nem atmaz, nem alma cihazı gerekir. Isı geri kazanımlı havalandırmada nem geri kazanımı ayrıca değerlendirilmelidir. Küf riski kontrolü için Duvar/Pencere İç Yüzey Sıcaklığı ve Küf Riski modülüyle birlikte kullanın."}
      fields={[
        { key: "nemUretimi_kggun", label: "Günlük Nem Üretimi (kg/gün)", type: "number", step: 1, min: 0.1 },
        { key: "icSicaklik_C", label: "İç Sıcaklık (°C)", type: "number", step: 1, min: -10 },
        { key: "icBagilNem", label: "İç Hedef Bağıl Nem (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1, min: -40 },
        { key: "disBagilNem", label: "Dış Bağıl Nem (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "odaHacmi_m3", label: "Konut İç Hacmi (m³)", type: "number", step: 10, min: 1 },
        { key: "havaYogunlugu_kgm3", label: "Hava Yoğunluğu (kg/m³)", type: "number", step: 0.05, min: 0.5 },
      ]}
      defaults={{ nemUretimi_kggun: 10, icSicaklik_C: 20, icBagilNem: 0.6, disSicaklik_C: 5, disBagilNem: 0.8, odaHacmi_m3: 300, havaYogunlugu_kgm3: 1.2 }}
      mainUnit={"m³/h"}
      mainValueKey={"gerekliDebi_m3h"}
      mainDecimals={0}
      intermediateLabels={{
        ic_mutlak_nem_gkg: "İç Mutlak Nem (g/kg)",
        dis_mutlak_nem_gkg: "Dış Mutlak Nem (g/kg)",
        mutlak_nem_farki_gkg: "Mutlak Nem Farkı (g/kg)",
        nem_uretimi_gh: "Nem Üretimi (g/h)",
        hava_degisim_sayisi_1h: "Hava Değişim Sayısı (1/h)",
        denge_kontrol_gh: "Denge Kontrol (g/h)",
        uyari: "Uyarı",
      }}
    />
  );
}
