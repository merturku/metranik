"use client";

import { useState } from "react";
import { Display2, Headline, Body, ButtonPrimary } from "@/components/design-system";

interface ExtractedQty {
  entityType: string;
  entityName: string;
  type: string;
  value: number;
  unit: string;
}

export default function IfcUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedQty[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [parseTime, setParseTime] = useState(0);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith(".ifc")) {
      setError("Only .ifc files are supported");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setExtracted([]);
    setLoading(true);

    try {
      const startTime = performance.now();

      // Dynamic import to avoid loading web-ifc on initial page load
      const { processIfc } = await import("@metranik/ifc");
      const result = await processIfc(uploadedFile);

      setParseTime(performance.now() - startTime);

      // Convert to flat list for display
      const flatQties = result.extracted.flatMap((ext) =>
        ext.quantities.map((q) => ({
          entityType: ext.entityType,
          entityName: ext.entityName,
          type: q.type,
          value: q.value,
          unit: q.unit,
        }))
      );

      setExtracted(flatQties);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse IFC file");
      setExtracted([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1140px] px-6 py-8">
      <Display2 className="mb-2">IFC Yükleme</Display2>
      <Body className="text-text-secondary mb-8">
        BIM modelinizi (.ifc) yükleyin — metraj otomatik çıkarılacak
      </Body>

      {/* Upload Area */}
      <div className="mb-8 rounded-lg border-2 border-dashed border-border bg-surface p-12 text-center">
        <input
          type="file"
          accept=".ifc"
          onChange={handleUpload}
          disabled={loading}
          className="hidden"
          id="ifc-input"
        />
        <label htmlFor="ifc-input" className="cursor-pointer">
          <Headline className="mb-2">IFC Dosyası Seç</Headline>
          <Body className="text-text-secondary">
            veya buraya sürükleyin
          </Body>
        </label>
      </div>

      {/* File Info */}
      {file && (
        <div className="mb-6 rounded-lg bg-surface border border-border p-4">
          <Body className="font-medium">
            📄 {file.name}
          </Body>
          <Body className="text-text-secondary text-sm">
            {(file.size / 1024 / 1024).toFixed(2)} MB
            {parseTime > 0 && ` · Yükleme süresi: ${parseTime.toFixed(0)}ms`}
          </Body>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mb-6 p-4 rounded-lg bg-info/10 border border-info/30">
          <Body className="text-info">⏳ IFC dosyası işleniyor...</Body>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/30">
          <Body className="text-error">❌ {error}</Body>
        </div>
      )}

      {/* Extracted Metraj Table */}
      {extracted.length > 0 && (
        <div>
          <Headline className="mb-4">
            Çıkarılan Metraj ({extracted.length})
          </Headline>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-medium text-text-primary">
                    Varlık Tipi
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-primary">
                    Adı
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-primary">
                    Miktar
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-primary">
                    Değer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-primary">
                    Birim
                  </th>
                </tr>
              </thead>
              <tbody>
                {extracted.map((qty, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-surface-secondary"
                  >
                    <td className="px-4 py-3 text-text-secondary">
                      {qty.entityType}
                    </td>
                    <td className="px-4 py-3 text-text-primary font-mono text-xs">
                      {qty.entityName}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {qty.type}
                    </td>
                    <td className="px-4 py-3 text-text-primary font-mono">
                      {qty.value.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {qty.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3">
            <ButtonPrimary>İlgili Modülleri Aç</ButtonPrimary>
            <ButtonPrimary>Projeyi Kaydet</ButtonPrimary>
          </div>
        </div>
      )}
    </div>
  );
}
