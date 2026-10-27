"use client";

import { havuzBuharlasmaIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavuzBuharlasmaIsiKaybiPage() {
  return (
    <CalcPage
      module={havuzBuharlasmaIsiKaybi}
      standardsLabel="ASHRAE HVAC Applications (Natatoriums)"
      description="Kapalı (iç mekân) havuzda su yüzeyinden buharlaşan su miktarını, bunun havuz suyundan çektiği ısıyı ve günlük su kaybını; su ve hava sıcaklığı, bağıl nem ve havuzun kullanım yoğunluğuna göre hesaplar."
      formula="wp = 4,0·10⁻⁵·A·(pw − pa)·Fa  [kg/s],   pa = φ·psat(ta),   Qbuh = wp·hfg"
      engineeringNote="Buharlaşmayı su yüzeyindeki doyma basıncı ile salondaki havanın buhar basıncı arasındaki fark yürütür; havayı sudan 1–2 °C sıcak ve %50–60 bağıl nemde tutmak buharlaşmayı ve yoğuşma riskini birlikte azaltır. Aktivite katsayısı Fa: kullanılmayan havuz 0,5, normal kullanılan havuz 1,0, dalga havuzu/su kaydırağı gibi çalkantılı havuzlar en az 1,5. Hesaplanan buharlaşma hem havuz suyunun ısı kaybı (ısıtıcı kapasitesine eklenir) hem de salonun nem alma yüküdür. Havuz örtüsü kullanılmayan saatlerde buharlaşmayı büyük ölçüde keser. Formül kapalı havuz içindir (su üzerinde hava hızı ≈ 0,05–0,15 m/s); açık havuzda rüzgar etkisi çok daha büyüktür."
      fields={[
        { key: "havuzAlani_m2", label: "Havuz Su Yüzeyi Alanı A (m²)", type: "number", min: 1, step: 1 },
        { key: "suSicakligi_C", label: "Havuz Suyu Sıcaklığı (°C)", type: "number", min: 0, step: 0.5 },
        { key: "havaSicakligi_C", label: "Salon Hava Sıcaklığı (°C)", type: "number", min: 0, step: 0.5 },
        { key: "bagilNem_yuzde", label: "Salon Bağıl Nemi φ (%)", type: "number", min: 0, step: 5 },
        { key: "aktiviteKatsayisi_Fa", label: "Aktivite Katsayısı Fa", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{ havuzAlani_m2: 32, suSicakligi_C: 28, havaSicakligi_C: 29, bagilNem_yuzde: 60, aktiviteKatsayisi_Fa: 0.5 }}
      mainUnit="kg/h (buharlaşma)"
      mainValueKey="buharlasma_kgh"
      mainDecimals={2}
      intermediateLabels={{
        su_yuzeyi_doyma_basinci_pw_kPa: "Su Yüzeyi Doyma Basıncı pw (kPa)",
        havadaki_buhar_basinci_pa_kPa: "Havadaki Buhar Basıncı pa (kPa)",
        basinc_farki_kPa: "Basınç Farkı pw − pa (kPa)",
        buharlasma_kgs: "Buharlaşma (kg/s)",
        buharlasma_gizli_isisi_hfg_kJkg: "Buharlaşma Gizli Isısı hfg (kJ/kg)",
        buharlasma_isi_kaybi_kW: "Buharlaşma Isı Kaybı (kW)",
        gunluk_su_kaybi_L: "Günlük Su Kaybı (L/gün)",
      }}
    />
  );
}
