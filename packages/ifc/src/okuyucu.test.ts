import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as W from "web-ifc";
import { metrajCikar } from "./okuyucu";
import { modullereEsle, oneriBaglantisi } from "./mapper";

const BASLIK = `ISO-10303-21;
HEADER;
FILE_DESCRIPTION(('ViewDefinition [CoordinationView]'),'2;1');
FILE_NAME('t.ifc','2026-01-01T00:00:00',(''),(''),'','','');
FILE_SCHEMA(('IFC4'));
ENDSEC;
DATA;
#1=IFCPROJECT('0YvctVUKr0kugbFTf53O9L',$,'Test',$,$,$,$,$,#2);
#2=IFCUNITASSIGNMENT((#3));
`;
const SON = `ENDDATA;
END-ISO-10303-21;
`;
const MM = `#3=IFCSIUNIT(*,.LENGTHUNIT.,.MILLI.,.METRE.);\n`;
const M = `#3=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);\n`;
const FOOT = `#3=IFCCONVERSIONBASEDUNIT(#4,.LENGTHUNIT.,'FOOT',#5);
#4=IFCDIMENSIONALEXPONENTS(1,0,0,0,0,0,0);
#5=IFCMEASUREWITHUNIT(IFCLENGTHMEASURE(0.3048),#6);
#6=IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.);\n`;

// mm birimli model: 2 boru Ø114.3 (5000 + 2500 mm), 1 boru Ø60.3 uzunluksuz, 1 kanal 400×300 (3000 mm), 1 kablo, 1 pompa
const MODEL_MM =
  BASLIK + MM + `
#10=IFCPIPESEGMENT('2O2Fr$t4X7Zf8NOew3FNr2',$,'Boru-1',$,$,$,$,$,$);
#11=IFCPIPESEGMENT('2O2Fr$t4X7Zf8NOew3FNr3',$,'Boru-2',$,$,$,$,$,$);
#12=IFCPIPESEGMENT('2O2Fr$t4X7Zf8NOew3FNr4',$,'Boru-3',$,$,$,$,$,$);
#13=IFCDUCTSEGMENT('2O2Fr$t4X7Zf8NOew3FNr5',$,'Kanal-1',$,$,$,$,$,$);
#14=IFCCABLESEGMENT('2O2Fr$t4X7Zf8NOew3FNr6',$,'Kablo-1',$,$,$,$,$,$);
#15=IFCPUMP('2O2Fr$t4X7Zf8NOew3FNr7',$,'Pompa-1',$,$,$,$,$,$);
#20=IFCQUANTITYLENGTH('Length',$,$,5000.,$);
#21=IFCELEMENTQUANTITY('2O2Fr$t4X7Zf8NOew3FNs1',$,'Qto_PipeSegmentBaseQuantities',$,$,(#20));
#22=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNs2',$,$,$,(#10),#21);
#23=IFCPROPERTYSINGLEVALUE('Outside Diameter',$,IFCPOSITIVELENGTHMEASURE(114.3),$);
#24=IFCPROPERTYSET('2O2Fr$t4X7Zf8NOew3FNs3',$,'Dimensions',$,(#23));
#25=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNs4',$,$,$,(#10,#11),#24);
#26=IFCQUANTITYLENGTH('Length',$,$,2500.,$);
#27=IFCELEMENTQUANTITY('2O2Fr$t4X7Zf8NOew3FNs5',$,'Qto_PipeSegmentBaseQuantities',$,$,(#26));
#28=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNs6',$,$,$,(#11),#27);
#30=IFCPROPERTYSINGLEVALUE('Outside Diameter',$,IFCPOSITIVELENGTHMEASURE(60.3),$);
#31=IFCPROPERTYSET('2O2Fr$t4X7Zf8NOew3FNs7',$,'Dimensions',$,(#30));
#32=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNs8',$,$,$,(#12),#31);
#40=IFCQUANTITYLENGTH('Length',$,$,3000.,$);
#41=IFCELEMENTQUANTITY('2O2Fr$t4X7Zf8NOew3FNs9',$,'Qto_DuctSegmentBaseQuantities',$,$,(#40));
#42=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNt1',$,$,$,(#13),#41);
#43=IFCPROPERTYSINGLEVALUE('Width',$,IFCPOSITIVELENGTHMEASURE(400.),$);
#44=IFCPROPERTYSINGLEVALUE('Height',$,IFCPOSITIVELENGTHMEASURE(300.),$);
#45=IFCPROPERTYSET('2O2Fr$t4X7Zf8NOew3FNt2',$,'Dimensions',$,(#43,#44));
#46=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNt3',$,$,$,(#13),#45);
#50=IFCQUANTITYLENGTH('Length',$,$,12000.,$);
#51=IFCELEMENTQUANTITY('2O2Fr$t4X7Zf8NOew3FNt4',$,'Qto_CableSegmentBaseQuantities',$,$,(#50));
#52=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNt5',$,$,$,(#14),#51);
` + SON;

let api: InstanceType<typeof W.IfcAPI>;
beforeAll(async () => {
  api = new W.IfcAPI();
  await api.Init();
});
afterAll(() => {
  /* wasm örneği süreçle birlikte kapanır */
});

function oku(metin: string) {
  const model = api.OpenModel(new TextEncoder().encode(metin));
  try {
    return metrajCikar(api as never, W as never, model);
  } finally {
    api.CloseModel(model);
  }
}

describe("IFC metraj çıkarımı (gerçek web-ifc)", () => {
  it("mm projesi: birim 0,001; boru grupları, kanal, kablo ve ekipman doğru okunur", () => {
    const s = oku(MODEL_MM);
    expect(s.uzunlukBirimi_m).toBe(0.001);
    expect(s.elemanlar.length).toBe(6);
    const g114 = s.gruplar.find((g) => g.ifcSinifi === "IFCPIPESEGMENT" && g.etiket === "Ø114.3 mm")!;
    expect(g114.adet).toBe(2);
    expect(g114.toplamUzunluk_m).toBeCloseTo(7.5, 10); // 5 m + 2,5 m
    expect(g114.enUzunEleman_m).toBeCloseTo(5, 10);
    const g60 = s.gruplar.find((g) => g.etiket === "Ø60.3 mm")!;
    expect(g60.adet).toBe(1);
    expect(g60.toplamUzunluk_m).toBe(0);
    expect(g60.uzunluguOlmayanAdet).toBe(1);
    const kanal = s.gruplar.find((g) => g.kategori === "kanal")!;
    expect(kanal.etiket).toBe("400×300 mm");
    expect(kanal.toplamUzunluk_m).toBeCloseTo(3, 10);
    expect(s.gruplar.find((g) => g.kategori === "kablo")!.toplamUzunluk_m).toBeCloseTo(12, 10);
    expect(s.gruplar.find((g) => g.ifcSinifi === "IFCPUMP")!.adet).toBe(1);
  });

  it("uzunluğu olmayan elemanda değer uydurulmaz, uyarı verilir", () => {
    const s = oku(MODEL_MM);
    const boru3 = s.elemanlar.find((e) => e.ad === "Boru-3")!;
    expect(boru3.uzunluk_m).toBeUndefined();
    expect(boru3.disCap_mm).toBeCloseTo(60.3, 5);
    expect(s.uyarilar.join(" ")).toContain("uzunluk miktarı");
  });

  it("metre projesi ölçeği 1; fit projesi 10 ft = 3,048 m", () => {
    const qto = (v: string) => `#10=IFCPIPESEGMENT('2O2Fr$t4X7Zf8NOew3FNr2',$,'B',$,$,$,$,$,$);
#20=IFCQUANTITYLENGTH('Length',$,$,${v},$);
#21=IFCELEMENTQUANTITY('2O2Fr$t4X7Zf8NOew3FNs1',$,'Qto',$,$,(#20));
#22=IFCRELDEFINESBYPROPERTIES('2O2Fr$t4X7Zf8NOew3FNs2',$,$,$,(#10),#21);\n`;
    const m = oku(BASLIK + M + qto("2.5") + SON);
    expect(m.uzunlukBirimi_m).toBe(1);
    expect(m.elemanlar[0]!.uzunluk_m).toBeCloseTo(2.5, 10);
    const ft = oku(BASLIK + FOOT + qto("10.") + SON);
    expect(ft.uzunlukBirimi_m).toBeCloseTo(0.3048, 10);
    expect(ft.elemanlar[0]!.uzunluk_m).toBeCloseTo(3.048, 10);
  });

  it("birim tanımı yoksa metre varsayılır ve uyarılır; boş modelde uyarı çıkar", () => {
    const s = oku(`ISO-10303-21;\nHEADER;\nFILE_DESCRIPTION((''),'2;1');\nFILE_NAME('t.ifc','',(''),(''),'','','');\nFILE_SCHEMA(('IFC4'));\nENDSEC;\nDATA;\n` + SON);
    expect(s.uzunlukBirimi_m).toBe(1);
    expect(s.uyarilar.join(" ")).toContain("Uzunluk birimi okunamadı");
    expect(s.uyarilar.join(" ")).toContain("bulunamadı");
    expect(s.elemanlar.length).toBe(0);
  });
});

describe("IFC → modül önerileri", () => {
  it("boru, kanal ve kablo için gerçek anahtarlarla öneri üretir; ekipman ve uzunluksuz grup önerilmez", () => {
    const o = modullereEsle(oku(MODEL_MM));
    const boru = o.find((x) => x.moduleId === "boru-basinc-kaybi")!;
    expect(boru.girdiler).toEqual({ uzunluk: 7.5, capD: 0.1143 });
    const kanal = o.find((x) => x.moduleId === "kanal-sac-agirligi")!;
    expect(kanal.girdiler).toEqual({ genislik_mm: 400, yukseklik_mm: 300, uzunluk_m: 3 });
    expect(kanal.guven).toBe("yuksek");
    const kablo = o.find((x) => x.moduleId === "kablo-kesiti-iec60364")!;
    expect(kablo.girdiler).toEqual({ uzunluk_m: 12 });
    expect(kablo.guven).toBe("dusuk");
    expect(o.length).toBe(3); // Ø60.3 grubu uzunluksuz, pompa eşlenmez
    expect(oneriBaglantisi(kanal)).toBe("/kanal-sac-agirligi?genislik_mm=400&yukseklik_mm=300&uzunluk_m=3");
  });
});
