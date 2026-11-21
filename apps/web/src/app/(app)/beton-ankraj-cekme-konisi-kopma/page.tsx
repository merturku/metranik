"use client";

import { betonAnkrajCekmeKonisiKopma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonAnkrajCekmeKonisiKopmaPage() {
  return (
    <CalcPage
      module={betonAnkrajCekmeKonisiKopma}
      standardsLabel={"ACI 318-19 §17.6.2"}
      description={"Betona gömülü tek ankrajın çekme yükü altında beton kopma konisi dayanımını (hef, f'c, kenar mesafeleri, çatlak durumu) hesaplar ve tasarım çekme kuvvetiyle karşılaştırır."}
      formula={"Nb = kc·√f'c·hef^1,5 (hef ≥ 280 mm yerinde: 3,9·√f'c·hef^(5/3));  Ncb = (ANc/ANco)·ψed·ψc·Nb;  ANco = 9·hef²;  φNcb ≥ Nua"}
      engineeringNote={"Yalnız beton kopma konisi kontrol edilir; ankraj çeliğinin akması/kopması, sıyrılma (pullout), yan patlama ve yarılma ayrıca kontrol edilmelidir. Tek ankraj ve en çok iki komşu kenar kabulü; ankraj grupları, ek donatı (Koşul A) ve ψcp,N (sonradan montaj, çatlaksız) bu modülde yoktur. Sonradan montaj ankrajda ψc,N = 1,0 (tutucu) alınır; ACI 355.2/ETA onaylı ürün değerleri daha yüksek olabilir. φ = 0,70 Koşul B (ek donatısız) değeridir; ACI 318-19 §17.5.3'ten teyit edin. Kenar mesafesi yoksa büyük bir değer girin."}
      fields={[
        { key: "hef_mm", label: "Etkin Gömülme Derinliği hef (mm)", type: "number", step: 5, min: 10 },
        { key: "fck_MPa", label: "Beton Silindir Dayanımı f'c (MPa)", type: "number", step: 1, min: 10 },
        {
          key: "ankrajTipi",
          label: "Ankraj Tipi",
          type: "select",
          options: [
            { value: "yerinde", label: "Yerinde dökme (kc = 10)" },
            { value: "sonradan", label: "Sonradan montaj (kc = 7)" },
          ],
        },
        {
          key: "betonDurumu",
          label: "Beton Durumu",
          type: "select",
          options: [
            { value: "catlaksiz", label: "Çatlaksız" },
            { value: "catlak", label: "Çatlak" },
          ],
        },
        { key: "kenarMesafe1_mm", label: "Kenar Mesafesi 1 (mm)", type: "number", step: 10, min: 10 },
        { key: "kenarMesafe2_mm", label: "Kenar Mesafesi 2 (mm)", type: "number", step: 10, min: 10 },
        { key: "phi", label: "Dayanım Azaltma Katsayısı φ", type: "number", step: 0.05, min: 0.1 },
        { key: "tasarimCekme_Nua_kN", label: "Tasarım Çekme Kuvveti Nua (kN)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ hef_mm: 150, fck_MPa: 30, ankrajTipi: "yerinde", betonDurumu: "catlaksiz", kenarMesafe1_mm: 1000, kenarMesafe2_mm: 1000, phi: 0.7, tasarimCekme_Nua_kN: 60 }}
      mainUnit={"kN"}
      mainValueKey={"phiNcb_kN"}
      mainDecimals={1}
      intermediateLabels={{
        Nb_kN: "Temel Kopma Dayanımı Nb (kN)",
        ANc_ANco: "ANc / ANco",
        psi_ed: "Kenar Faktörü ψed",
        psi_c: "Çatlak Faktörü ψc",
        Ncb_kN: "Ncb (kN)",
        phiNcb_kN: "φNcb (kN)",
        talep_kapasite_orani: "Nua / φNcb",
        Nb_formulu: "Kullanılan Nb Formülü",
      }}
    />
  );
}
