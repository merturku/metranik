"use client";

import { lmtdDuzeltmeFaktoruF } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function LmtdDuzeltmeFaktoruFPage() {
  return (
    <CalcPage
      module={lmtdDuzeltmeFaktoruF}
      standardsLabel={"TEMA / Bowman-Mueller-Nagle"}
      description={"1 gövde geçişli, çok tüp geçişli gövde-tüp eşanjör için dört sıcaklıktan P ve R parametrelerini, LMTD düzeltme faktörü F'yi ve düzeltilmiş LMTD'yi hesaplar. Eşanjör Boyutlandırma modülünün karşıt akış LMTD'sini gerçek akış düzenine uyarlar."}
      formula={"P = (Tc2−Tc1)/(Th1−Tc1);  R = (Th1−Th2)/(Tc2−Tc1);  S = √(R²+1);  F = [S/(R−1)]·ln[(1−P)/(1−RP)] / ln{[2−P(R+1−S)]/[2−P(R+1+S)]};  LMTD = F·LMTD_karşıt"}
      engineeringNote={"F ≥ 0,75–0,80 olmalıdır; F çok düşükse eşanjörün alanı verimsiz kullanılır, çok gövdeli veya karşıt akışlı (plakalı) tipe geçilmelidir. Sıcak çıkış sıcaklığı soğuk çıkıştan düşükse (sıcaklık kesişmesi) 1 gövde geçişli eşanjörde F tanımsızdır. Gövde tarafı karışmış, tüp tarafı çift geçişli kabul edilir; her akışkanın özgül ısısı sabit varsayılır. Çift geçişli tüp sayısı 2, 4, 6... için F aynıdır."}
      fields={[
        { key: "sicakGiris_C", label: "Sıcak Akışkan Girişi Th1 (°C)", type: "number", step: 1 },
        { key: "sicakCikis_C", label: "Sıcak Akışkan Çıkışı Th2 (°C)", type: "number", step: 1 },
        { key: "soguukGiris_C", label: "Soğuk Akışkan Girişi Tc1 (°C)", type: "number", step: 1 },
        { key: "soguukCikis_C", label: "Soğuk Akışkan Çıkışı Tc2 (°C)", type: "number", step: 1 },
      ]}
      defaults={{ sicakGiris_C: 150, sicakCikis_C: 90, soguukGiris_C: 30, soguukCikis_C: 70 }}
      mainUnit={""}
      mainValueKey={"F"}
      mainDecimals={3}
      intermediateLabels={{
        P: "P (sıcaklık etkinliği)",
        R: "R (ısı kapasitesi oranı)",
        lmtd_karsit_akis_K: "Karşıt Akış LMTD (K)",
        F: "Düzeltme Faktörü F",
        lmtd_duzeltilmis_K: "Düzeltilmiş LMTD (K)",
        uyari: "Uyarı",
      }}
    />
  );
}
