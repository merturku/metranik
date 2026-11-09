import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Beton şantiye karışımında agrega nem düzeltmesi (kuru agrega bazlı tasarımdan): serbest su = M_kuru·(w − emme)/100;
// tartılacak nemli agrega = M_kuru·(1 + w/100); eklenecek karışım suyu = tasarım suyu − Σ serbest su (w < emme ise agrega su çeker ve su artar).
// Burada tasarım suyu "yüzey kuru doygun (SSD) agrega" esasına göre verilmiş kabul edilir; mevcut karışım tasarımı kuru esaslıysa emme değerini
// hesabın dışında tutun (emme = 0 girin). İki agrega (ince, iri) için yapılır; nem ve emme değerleri laboratuvar ölçümünden gelir (TS EN 1097-6, TS EN 1097-5).
export const agregaNemDuzeltmesiInputSchema = z.object({
  tasarimSuyu_kgm3: z.number().min(0),
  ince_kuru_kgm3: z.number().min(0),
  ince_nem_yuzde: z.number().min(0),
  ince_emme_yuzde: z.number().min(0),
  iri_kuru_kgm3: z.number().min(0),
  iri_nem_yuzde: z.number().min(0),
  iri_emme_yuzde: z.number().min(0),
});

export type AgregaNemDuzeltmesiInput = z.infer<typeof agregaNemDuzeltmesiInputSchema>;

export interface AgregaNemDuzeltmesiOutput {
  eklenecekSu_kgm3: number;
}

function compute(input: AgregaNemDuzeltmesiInput): CalcResult<AgregaNemDuzeltmesiOutput> {
  const serbestInce = (input.ince_kuru_kgm3 * (input.ince_nem_yuzde - input.ince_emme_yuzde)) / 100;
  const serbestIri = (input.iri_kuru_kgm3 * (input.iri_nem_yuzde - input.iri_emme_yuzde)) / 100;
  const su = input.tasarimSuyu_kgm3 - serbestInce - serbestIri;
  return {
    value: { eklenecekSu_kgm3: su },
    intermediates: {
      ince_serbest_su_kgm3: serbestInce,
      iri_serbest_su_kgm3: serbestIri,
      tartilacak_ince_kgm3: input.ince_kuru_kgm3 * (1 + input.ince_nem_yuzde / 100),
      tartilacak_iri_kgm3: input.iri_kuru_kgm3 * (1 + input.iri_nem_yuzde / 100),
      toplam_serbest_su_kgm3: serbestInce + serbestIri,
    },
    standardsUsed: ["TS EN 1097-6 (agrega su emme); TS 802 (karışım tasarımı)"],
    verdict:
      su < 0
        ? { status: "uygunsuz", note: "Eklenecek su negatif: agrega çok ıslak, karışım tasarımını/stoku gözden geçirin." }
        : { status: "uygun", note: "Su düzeltmesi uygulanabilir." },
  };
}

export const agregaNemDuzeltmesi: CalcModule<AgregaNemDuzeltmesiInput, AgregaNemDuzeltmesiOutput> = {
  id: "agrega-nem-duzeltmesi",
  title: "Agrega Nem Düzeltmesi (Karışım Suyu)",
  discipline: "insaat",
  standards: ["TS EN 1097-6"],
  inputSchema: agregaNemDuzeltmesiInputSchema,
  compute,
};
