"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Display2,
  Headline,
  Body,
  ButtonPrimary,
  Badge,
} from "@/components/design-system";
import { TUM_MODULLER } from "@/lib/modules";

interface ExtractedQty {
  entityType: string;
  entityName: string;
  type: string;
  value: number;
  unit: string;
}

interface MappedModule {
  moduleId: string;
  inputs: Record<string, number | string>;
  confidence: "high" | "medium" | "low";
  warning?: string;
}

export default function IfcUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedQty[]>([]);
  const [mapped, setMapped] = useState<MappedModule[]>([]);
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
    setMapped([]);
    setLoading(true);

    try {
      const startTime = performance.now();

      const { processIfc } = await import("@metranik/ifc");
      const result = await processIfc(uploadedFile);

      setParseTime(performance.now() - startTime);

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
      setMapped(result.mapped || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse IFC file");
      setExtracted([]);
      setMapped([]);
    } finally {
      setLoading(false);
    }
  }

  function openModule(moduleId: string) {
    const module = TUM_MODULLER.find((m) => m.id === moduleId);
    if (module) {
      router.push(module.href);
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
          <Body className="text-text-secondary">veya buraya sürükleyin</Body>
        </label>
      </div>

      {/* File Info */}
      {file && (
        <div className="mb-6 rounded-lg bg-surface border border-border p-4">
          <Body className="font-medium">📄 {file.name}</Body>
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
        <div className="mb-8">
          <Headline className="mb-4">Çıkarılan Metraj ({extracted.length})</Headline>
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
                    <td className="px-4 py-3 text-text-secondary">{qty.type}</td>
                    <td className="px-4 py-3 text-text-primary font-mono">
                      {qty.value.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{qty.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mapped Modules */}
      {mapped.length > 0 && (
        <div>
          <Headline className="mb-4">Eşleşen Modüller ({mapped.length})</Headline>
          <div className="grid gap-3">
            {mapped.map((m, idx) => {
              const module = TUM_MODULLER.find((x) => x.id === m.moduleId);
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-surface p-4 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Body className="font-medium">{module?.title || m.moduleId}</Body>
                      <Badge
                        variant={
                          m.confidence === "high"
                            ? "success"
                            : m.confidence === "medium"
                              ? "warning"
                              : "error"
                        }
                      >
                        {m.confidence.toUpperCase()}
                      </Badge>
                    </div>
                    {m.warning && (
                      <Body className="text-warning text-sm">{m.warning}</Body>
                    )}
                    <Body className="text-text-secondary text-sm">
                      {Object.entries(m.inputs)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" • ")}
                    </Body>
                  </div>
                  <ButtonPrimary
                    onClick={() => openModule(m.moduleId)}
                    className="ml-4 shrink-0"
                  >
                    Aç
                  </ButtonPrimary>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!extracted.length && !loading && (
        <div className="text-center text-text-tertiary">
          <Body>IFC dosyası yükleyerek başlayın</Body>
        </div>
      )}
    </div>
  );
}
