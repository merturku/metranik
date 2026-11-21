"use client";

import { dereceGunAylikSicaklik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DereceGunAylikSicaklikPage() {
  return (
    <CalcPage
      module={dereceGunAylikSicaklik}
      standardsLabel={"TS 825 (aylık yöntem)"}
      description={"12 aylık ortalama dış hava sıcaklıklarından ve bina denge sıcaklığından yıllık ısıtma derece-gününü ve ısıtma sezonu uzunluğunu hesaplar."}
      formula={"DG = Σ Nay·max(0, Tb − Tay)"}
      engineeringNote={"Aylık ortalama yöntemi, ay ortalaması Tb'nin üstünde olan aylardaki soğuk günleri ihmal eder; bu yüzden günlük veriden hesaplanan DG'den küçük çıkar (özellikle geçiş aylarında). Resmi şehir derece-gün değerleri için TS 825 ekindeki tabloyu kullanın. Tb (bina denge sıcaklığı) iç sıcaklıktan iç/güneş kazançları kadar düşüktür; TS 825'te 15 °C esas alınır (sürümden teyit edin). Sonuç, Derece-Gün ile Yıllık Isıtma Enerjisi modülüne girdi olarak verilebilir."}
      fields={[
        { key: "ocak", label: "Ocak Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "subat", label: "Şubat Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "mart", label: "Mart Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "nisan", label: "Nisan Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "mayis", label: "Mayıs Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "haziran", label: "Haziran Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "temmuz", label: "Temmuz Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "agustos", label: "Ağustos Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "eylul", label: "Eylül Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "ekim", label: "Ekim Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "kasim", label: "Kasım Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "aralik", label: "Aralık Ort. Sıcaklığı (°C)", type: "number", step: 0.1 },
        { key: "denge_Tb_C", label: "Bina Denge Sıcaklığı Tb (°C)", type: "number", step: 0.5 },
      ]}
      defaults={{ ocak: 5.3, subat: 5.5, mart: 7.1, nisan: 11.4, mayis: 16.0, haziran: 20.6, temmuz: 23.2, agustos: 23.4, eylul: 19.8, ekim: 15.6, kasim: 11.2, aralik: 7.4, denge_Tb_C: 15 }}
      mainUnit={"K·gün/yıl"}
      mainValueKey={"dereceGun_Kgun"}
      mainDecimals={0}
      intermediateLabels={{
        isitma_sezonu_gun: "Isıtma Sezonu (gün)",
        en_soguk_ay: "En Soğuk Ay",
        en_soguk_ay_sicakligi_C: "En Soğuk Ay Sıcaklığı (°C)",
        denge_sicakligi_C: "Denge Sıcaklığı (°C)",
      }}
    />
  );
}
